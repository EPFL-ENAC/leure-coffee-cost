/* eslint:disable */

<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
// Example from https://observablehq.com/@d3/zoomable-sunburst
import * as d3 from "d3";
import { onMounted, ref } from "vue";
import { Root, sunburstData } from "../utils/coffeeData";

const chartRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!chartRef.value) return;
  // Specify the chart’s dimensions.
  const width = 450;
  const height = width;
  const radius = width / 6;

  // Create the color scale.
  const color = d3.scaleOrdinal(
    d3.quantize(d3.interpolateRainbow, sunburstData.children.length + 1)
  );

  // Compute the layout.
  const hierarchy: d3.HierarchyNode<Root> = d3
    .hierarchy<Root>(sunburstData)
    .sum((d: any) => d.value)
    .sort((a: any, b: any) => b.value - a.value);

  type HierarchyRectangularNode = d3.HierarchyRectangularNode<Root> & {
    current: any;
    target: any;
  };

  const root = d3
    .partition<Root>()
    .size([2 * Math.PI, hierarchy.height + 1])(hierarchy)
    .each((d: any) => {
      d.current = d;
      d.target = d;
    }) as HierarchyRectangularNode;

  // Create the arc generator.
  const arc = d3
    .arc<any, HierarchyRectangularNode>()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius * 1.5)
    .innerRadius((d) => d.y0 * radius)
    .outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius - 1));

  // Create the SVG container.
  const svg = d3
    .select(chartRef.value)
    .append("svg")
    .attr("viewBox", [-width / 2, -height / 2, width, width])
    .style("font", "10px sans-serif");

  // Append the arcs.
  const path = svg
    .append("g")
    .selectAll("path")
    .data(root.descendants().slice(1))
    .join("path")
    .attr("fill", (d) => {
      while (d.depth > 1 && d.parent) d = d.parent;
      return color(d.data.name);
    })
    .attr("fill-opacity", (d) =>
      arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0
    )
    .attr("pointer-events", (d) => (arcVisible(d.current) ? "auto" : "none"))

    .attr("d", (d) => arc(d.current));

  // Make them clickable if they have children.
  path
    .filter((d: any) => d.children)
    .style("cursor", "pointer")
    .on("click", clicked);

  const format = d3.format(",d");
  path.append("title").text(
    (d) =>
      `${d
        .ancestors()
        .map((d) => d.data.name)
        .reverse()
        .join("/")}\n${format(d.value || 0)}`
  );

  const label = svg
    .append("g")
    .attr("pointer-events", "none")
    .attr("text-anchor", "middle")
    .style("user-select", "none")
    .selectAll("text")
    .data(root.descendants().slice(1))
    .join("text")
    .attr("dy", "0.35em")
    .attr("fill-opacity", (d: any) => +labelVisible(d.current))
    .attr("transform", (d: any) => labelTransform(d.current))
    .text((d) => d.data.name);

  const parent = svg
    .append("circle")
    .datum(root)
    .attr("r", radius)
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .on("click", clicked);

  // Handle zoom on click.
  function clicked(_event: MouseEvent, p: HierarchyRectangularNode) {
    parent.datum(p.parent || root);

    root.each(
      (d) =>
        (d.target = {
          x0:
            Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) *
            2 *
            Math.PI,
          x1:
            Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) *
            2 *
            Math.PI,
          y0: Math.max(0, d.y0 - p.depth),
          y1: Math.max(0, d.y1 - p.depth),
        })
    );

    const t = svg.transition().duration(750);

    // Transition the data on all arcs, even the ones that aren’t visible,
    // so that if this transition is interrupted, entering arcs will start
    // the next transition from the desired position.
    path
      .transition(t as any)
      .tween("data", (d) => {
        const i = d3.interpolate(d.current, d.target);
        return (t) => (d.current = i(t));
      })
      .filter(function (d: HierarchyRectangularNode) {
        const fillOpacity = (this as SVGPathElement).getAttribute(
          "fill-opacity"
        );
        return !!fillOpacity || arcVisible(d.target);
      })
      .attr("fill-opacity", (d) =>
        arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0
      )
      .attr("pointer-events", (d) => (arcVisible(d.target) ? "auto" : "none"))

      .attrTween("d", (d) => () => arc(d.current) as string);

    label
      .filter(function (d: HierarchyRectangularNode) {
        const fillOpacity = (this as SVGPathElement).getAttribute(
          "fill-opacity"
        );
        return !!fillOpacity || labelVisible(d.target);
      })
      .transition(t as any)
      .attr("fill-opacity", (d) => +labelVisible(d.target))
      .attrTween("transform", (d) => () => labelTransform(d.current));
  }

  function arcVisible(d: HierarchyRectangularNode) {
    return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
  }

  function labelVisible(d: HierarchyRectangularNode) {
    return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
  }

  function labelTransform(d: HierarchyRectangularNode) {
    const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
    const y = ((d.y0 + d.y1) / 2) * radius;
    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
  }
});
</script>

<style scoped>
.chart {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: visible;
}
</style>
