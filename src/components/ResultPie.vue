<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import * as d3 from "d3";
import { onMounted, ref, reactive } from "vue";
import { groupByCategory, getImpactsForCategory } from "../utils/category";
import { data } from "../utils/coffeeData"; // Import your data

const chartRef = ref<HTMLElement | null>(null);
const state = reactive({
  level: "category", // "category" or "indicator"
  categoryData: groupByCategory(data),
  currentCategory: null,
  impactsData: [] as { indicator: string; value: number }[],
});

onMounted(() => {
  if (!chartRef.value) return;

  const margin = 40;
  const width = 450 - margin * 2;
  const height = 450 - margin * 2;
  const radius = Math.min(width, height) / 2;

  // Set up the SVG canvas
  const svg = d3
    .select(chartRef.value)
    .append("svg")
    .attr("width", width + margin * 2)
    .attr("height", height + margin * 2)
    .append("g")
    .attr(
      "transform",
      `translate(${width / 2 + margin}, ${height / 2 + margin})`
    );

  // Define a function to render the chart based on the current state
  function renderChart() {
    svg.selectAll("*").remove(); // Clear previous chart

    const dataToUse =
      state.level === "category" ? state.categoryData : state.impactsData;

    const pie = d3
      .pie<any>()
      .value((d) => (state.level === "category" ? d.totalImpact : d.value))(
      dataToUse
    );

    // Create the arc generator
    const arc = d3
      .arc<d3.PieArcDatum<any>>()
      .innerRadius(0)
      .outerRadius(radius);

    // Set up the color scale
    const color = d3
      .scaleOrdinal()
      .domain(
        dataToUse.map((d) =>
          state.level === "category"
            ? (d as any).category
            : (d as any).indicator
        )
      )
      .range(d3.schemeCategory10);

    // Create the pie chart
    const paths = svg
      .selectAll("path")
      .data(pie)
      .enter()
      .append("path")
      .attr("d", (d) => arc(d) as any)
      .attr(
        "fill",
        (d) =>
          color(
            state.level === "category" ? d.data.category : d.data.indicator
          ) as string
      )
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
      .on("click", function (event, d) {
        if (state.level === "category") {
          state.level = "indicator";
          state.currentCategory = d.data.category;
          state.impactsData = getImpactsForCategory(d.data.category, data);
        } else {
          state.level = "category";
          state.currentCategory = null;
          state.impactsData = [];
        }
        renderChart(); // Re-render chart based on new level
      });

    // Add text labels to the slices
    svg
      .selectAll("text")
      .data(pie)
      .enter()
      .append("text")
      .text((d) =>
        state.level === "category" ? d.data.category : d.data.indicator
      )
      .attr("transform", (d) => `translate(${arc.centroid(d as any)})`)
      .style("text-anchor", "middle")
      .style("font-size", "10px")
      .style("fill", "#fff");
  }

  renderChart(); // Initial render
});
</script>

<style scoped>
.chart {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
