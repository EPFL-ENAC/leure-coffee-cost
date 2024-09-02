<template>
  <div ref="chart" class="chart"></div>
</template>

<script setup lang="ts">
import * as d3 from "d3";
import { onMounted, ref } from "vue";
import { data } from "../utils/coffeeData"; // Import your data

const chartRef = ref<HTMLElement | null>(null);

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

  // Prepare the data for the pie chart
  const processedData = d3
    .pie<any>()
    .value((d) => parseFloat(d["Impact Value"].replace(",", ".")))(data);

  // Create the arc generator
  const arc = d3.arc<d3.PieArcDatum<any>>().innerRadius(0).outerRadius(radius);

  // Set up the color scale
  const color = d3
    .scaleOrdinal()
    .domain(data.map((d) => d.Indicators))
    .range(d3.schemeCategory10);

  // Create the pie chart
  svg
    .selectAll("path")
    .data(processedData)
    .enter()
    .append("path")
    .attr("d", (d) => arc(d) as any)
    .attr("fill", (d) => color((d.data as { Indicators: string }).Indicators)) // Explicitly typing d.data
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 0.7);

  // Add text labels to the slices
  svg
    .selectAll("text")
    .data(processedData)
    .enter()
    .append("text")
    .text((d) => d.data.Indicators)
    .attr("transform", (d) => `translate(${arc.centroid(d as any)})`)
    .style("text-anchor", "middle")
    .style("font-size", "10px")
    .style("fill", "#fff");
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
