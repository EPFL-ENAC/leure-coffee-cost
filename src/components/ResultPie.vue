<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import * as d3 from "d3";
import { onMounted, ref } from "vue";
import { sunburstData } from "../utils/coffeeData"; // Use the hierarchical data structure

const chartRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!chartRef.value) return;

  const width = 600;
  const height = width;
  const radius = width / 6;

  const color = d3.scaleOrdinal(
    d3.quantize(d3.interpolateRainbow, sunburstData.children.length + 1)
  );

  const hierarchy = d3
    .hierarchy(sunburstData)
    .sum((d) => d.value as number)
    .sort((a, b) => (b.value as number) - (a.value as number));

  const root = d3.partition().size([2 * Math.PI, hierarchy.height + 1])(
    hierarchy
  );

  root.each((d) => ((d as any).current = d));

  const arc = d3
    .arc<any>()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius * 1.5)
    .innerRadius((d) => d.y0 * radius)
    .outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius - 1));

  const svg = d3
    .select(chartRef.value)
    .append("svg")
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .style("font", "10px sans-serif");

  const path = svg
    .append("g")
    .selectAll("path")
    .data(root.descendants().slice(1))
    .join("path")
    .attr("fill", (d) => {
      while (d.depth > 1) d = d.parent;
      return color(d.data.name);
    })
    .attr("fill-opacity", (d) =>
      arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0
    )
    .attr("pointer-events", (d) => (arcVisible(d.current) ? "auto" : "none"))
    .attr("d", (d) => arc(d.current));

  path
    .filter((d) => d.children)
    .style("cursor", "pointer")
    .on("click", clicked);

  const format = d3.format(",d");
  path.append("title").text(
    (d) =>
      `${d
        .ancestors()
        .map((d) => d.data.name)
        .reverse()
        .join("/")}\n${format(d.value)}`
  );

  const label = svg
    .append("g")
    .attr("pointer-events", "none")
    .attr("text-anchor", "middle")
    .style("user-select", "none")
    .selectAll("text")
    .data(root.descendants().slice(1))
    .join("text")
    .attr("dy", "1em")
    .attr("class", "label")
    .attr("fill-opacity", (d) => +labelVisible(d.current))
    .attr("transform", (d) => labelTransform(d.current))
    .text((d) => d.data.name);

  const parent = svg
    .append("circle")
    .datum(root)
    .attr("r", radius)
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .on("click", clicked);

  function clicked(event, p) {
    parent.datum(p.parent || root);

    root.each(
      (d) =>
        ((d as any).target = {
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

    path
      .transition(t)
      .tween("data", (d) => {
        const i = d3.interpolate((d as any).current, (d as any).target);
        return (t) => ((d as any).current = i(t));
      })
      .filter(function (d) {
        return (
          +this.getAttribute("fill-opacity") || arcVisible((d as any).target)
        );
      })
      .attr("fill-opacity", (d) =>
        arcVisible((d as any).target) ? (d.children ? 0.6 : 0.4) : 0
      )
      .attr("pointer-events", (d) =>
        arcVisible((d as any).target) ? "auto" : "none"
      )
      .attrTween("d", (d) => () => arc((d as any).current));

    label
      .filter(function (d) {
        return (
          +this.getAttribute("fill-opacity") || labelVisible((d as any).target)
        );
      })
      .transition(t)
      .attr("fill-opacity", (d) => +labelVisible((d as any).target))
      .attrTween("transform", (d) => () => labelTransform((d as any).current));
  }

  function arcVisible(d) {
    return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
  }

  function labelVisible(d) {
    return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
  }

  function labelTransform(d) {
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

:deep() .label {
  font-size: 12px;
  font-weight: bold;
  max-width: 100px;
}
</style>
