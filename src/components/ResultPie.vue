<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import * as d3 from "d3";
import { computed, onMounted, ref, watch } from "vue";
import { Leaf, Root, sunburstData, SunburstNode } from "@/utils/coffeeData";
import { useCoffeeStore } from "../stores/coffeeStore";

const chartRef = ref<HTMLElement | null>(null);
const color = d3.scaleOrdinal().range([
  "#e8e2d8", // color-primary-light
  "#e2cca6", // color-primary-dark
  "#8f6a48", // color-secondary-light
  "#3c2619", // color-secondary-dark
]);

const store = useCoffeeStore();

const width = 450;
const height = width;
const radius = width / 5;
const innerRadius = radius * 0.5;

const hierarchy: d3.HierarchyNode<Root> = d3
  .hierarchy<Root>(sunburstData)
  .sum((d: any) => d.value)
  .sort((a: any, b: any) => b.value - a.value);

type HierarchyRectangularNode = d3.HierarchyRectangularNode<SunburstNode> & {
  current: any;
  target: any;
};

const root = d3
  .partition<Root>()
  .size([2 * Math.PI, hierarchy.height + 1])(hierarchy)
  .each((d: any) => {
    if (d.depth > 1) {
      // Hide deeper layers initially
      d.current = {
        x0: d.x0,
        x1: d.x1,
        y0: d.y1,
        y1: d.y1,
      };
    } else {
      d.current = d;
    }
    d.target = d.current;
  }) as HierarchyRectangularNode;

const arc = d3
  .arc<any, HierarchyRectangularNode>()
  .startAngle((d) => d.x0)
  .endAngle((d) => d.x1)
  .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
  .padRadius(radius)
  .innerRadius((d) => d.y0 * innerRadius)
  .outerRadius((d) => d.y1 * radius - 1);

const paths =
  ref<
    d3.Selection<
      SVGPathElement | d3.BaseType,
      HierarchyRectangularNode,
      SVGGElement,
      unknown
    >
  >();

// Variable to keep track of the currently selected path
const selectedPath = computed(() =>
  paths.value?.filter((d) => d.data.name == store.selectedImpact?.indicators)
);

const labels =
  ref<
    d3.Selection<
      d3.BaseType | SVGTextElement,
      HierarchyRectangularNode,
      SVGGElement,
      unknown
    >
  >();

const selectedLabel = computed(() =>
  labels.value?.filter((d) => d.data.name == store.selectedImpact?.indicators)
);

watch(selectedPath, (newVal, oldVal) => {
  oldVal?.classed("selected", false);
  newVal?.classed("selected", true);
});

watch(selectedLabel, (newVal, oldVal) => {
  oldVal?.classed("selected", false);
  newVal?.classed("selected", true);
});

onMounted(() => {
  if (!chartRef.value) return;
  store.selectImpact(undefined);

  const svg = d3
    .select(chartRef.value)
    .append("svg")
    .attr("viewBox", [-width / 2, -height / 2, width, width])
    .style("font", "10px sans-serif");

  paths.value = svg
    .append("g")
    .selectAll("path")
    .data(root.descendants().slice(1))
    .join("path")
    .attr("fill", (d: HierarchyRectangularNode) => {
      while (d.depth > 1 && d.parent) d = d.parent;
      return color(d.data.name) as string; // Ensure the return type is string
    })
    .attr("fill-opacity", (d) =>
      arcVisible(d.current) ? (d.children ? 1 : 0) : 0
    )
    .attr("pointer-events", (d) => (arcVisible(d.current) ? "auto" : "none"))
    .attr("d", (d) => arc(d.current));

  paths.value
    .style("cursor", "pointer")
    .style("display", "inline")
    .filter((d: any) => d.children)
    .on("click", clicked);

  paths.value.filter((d: any) => !d.children).on("click", impactClicked);

  const format = d3.format(",d");
  paths.value.append("title").text(
    (d) =>
      `${d
        .ancestors()
        .map((d) => d.data.name)
        .reverse()
        .join("/")}\n${format(d.value || 0)}`
  );

  labels.value = svg
    .append("g")
    .attr("pointer-events", "none")
    .attr("text-anchor", "middle")
    .style("user-select", "none")
    .selectAll("text")
    .data(root.descendants().slice(1))
    .join("text")
    .attr("dy", "0.35em")
    .attr("fill-opacity", (d: any) => +labelVisible(d.current))
    .attr("transform", (d: any) => labelTransform(d.current));

  // Handle multi-line labels
  labels.value.each(function (d) {
    const text = d3.select(this);
    const words = d.data.name.split(" ");
    if (words.length > 2) {
      const mid = Math.ceil(words.length / 2);
      const line1 = words.slice(0, mid).join(" ");
      const line2 = words.slice(mid).join(" ");
      text.text("");
      text.append("tspan").attr("x", 0).attr("dy", "-0.6em").text(line1);
      text.append("tspan").attr("x", 0).attr("dy", "1em").text(line2);
    } else {
      text.text(d.data.name);
    }
  });

  const parent = svg
    .append("g")
    .datum(root)
    .attr("pointer-events", "all")
    .on("click", clicked);

  parent
    .append("circle")
    .attr("r", innerRadius * 0.9)
    .attr("fill", "none");

  parent
    .append("text")
    .attr("text-anchor", "middle")
    .attr("font-size", "larger")
    .text("Coffee");

  const subTitle = parent
    .append("text")
    .attr("text-anchor", "middle")
    .attr("font-size", "middle")
    .attr("transform", "translate(0 , 15)");

  function impactClicked(_: MouseEvent, p: HierarchyRectangularNode) {
    console.log("Clicked on impact", p.data, selectedPath.value);
    if (
      store.selectedImpact &&
      store.selectedImpact.indicators === p.data.name
    ) {
      store.selectImpact(undefined);
    } else {
      store.selectImpact(p.data as Leaf);
    }
  }
  function clicked(_event: MouseEvent, p: HierarchyRectangularNode) {
    parent
      .datum(p.parent || root)
      .attr("cursor", p.data.name == root.data.name ? "default" : "zoom-out");

    if (p.data.name == root.data.name) {
      console.log(p.data.name, root.data.name);
      store.selectImpact(undefined);
    }

    subTitle.text(p.data.name !== root.data.name ? p.data.name : "");

    root.each((d) => {
      d.target = {
        x0:
          Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        x1:
          Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        y0: Math.max(0, d.y0 - p.depth),
        y1: Math.max(0, d.y1 - p.depth),
      };
    });

    const t = svg.transition().duration(750);

    // Set display to inline for elements that will be visible
    paths.value?.filter((d) => arcVisible(d.target)).style("display", "inline");

    paths.value
      ?.transition(t as any)
      .tween("data", (d) => {
        const i = d3.interpolate(d.current, d.target);
        return (t) => (d.current = i(t));
      })
      .attr("fill-opacity", (d) => (arcVisible(d.target) ? 1 : 0))
      .attr("pointer-events", (d) => (arcVisible(d.target) ? "auto" : "none"))
      .attrTween("d", (d) => () => arc(d.current) as string)
      .on("end", function (d) {
        if (!arcVisible(d.target)) {
          d3.select(this).style("display", "none");
        }
      });

    // Apply the same logic to labels
    labels.value
      ?.filter((d) => labelVisible(d.target))
      .style("display", "inline");

    labels.value
      ?.transition(t as any)
      .attr("fill-opacity", (d) => +labelVisible(d.target))
      .attrTween("transform", (d) => () => labelTransform(d.current))
      .on("end", function (d) {
        if (!labelVisible(d.target)) {
          d3.select(this).style("display", "none");
        }
      });
  }

  function arcVisible(d: HierarchyRectangularNode) {
    return d.y1 <= 2 && d.y0 >= 1 && d.x1 > d.x0;
  }

  function labelVisible(d: HierarchyRectangularNode) {
    return d.y1 <= 2 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
  }

  function labelTransform(d: HierarchyRectangularNode) {
    const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
    const y = ((d.y0 + d.y1) / 2) * radius * 0.8;
    return `rotate(${x - 90}) translate(${y + 10},0) rotate(${
      x < 180 ? 0 : 180
    })`;
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
  /* background-color: white; */
}

/* Define a filter for the shadow effect */
:deep()defs {
  filter: url(#shadow);
}

:deep()text {
  font-size: 1.6em;
}

:deep()path,
:deep()text {
  /* Add a smooth transition */
  transition: scale 0.3s;
}

/* Selected path styles */
:deep().selected {
  scale: 1.2;
  fill-opacity: 1;
  color: white;
  filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.1));
}

@media screen and (max-width: 600px) {
  .chart {
    min-width: 90vw;
  }
}
</style>
