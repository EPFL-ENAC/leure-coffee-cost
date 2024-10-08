<template>
  <div class="title">
    <h3 class="title">Analyse hidden cost:</h3>
    <div>
      Click on a node to navigate thourgh coffee impacts. Select a specific
      impact to get more details below.
    </div>
  </div>

  <div ref="chart" class="sunburst" style="width: 100%; height: 800px"></div>

  <div v-if="store.selectedImpact" class="impact">
    <h3>Selected Impact:</h3>
    <p>{{ store.selectedImpact?.indicators.toLocaleUpperCase() }}</p>
    <p>{{ store.selectedImpact?.costValue }} CHF</p>
    <h3>Impact Definition:</h3>
    <p>{{ store.selectedImpact?.impactDefinition }}</p>
    <h3>Reference:</h3>
    <p>{{ store.selectedImpact?.reference }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import * as echarts from "echarts";
import { useCoffeeStore } from "@/stores/coffeeStore";

// Create a reference for the chart container
const chart = ref<HTMLDivElement | null>(null);
const store = useCoffeeStore();

const getLevelOption = () => {
  return [
    {
      itemStyle: {
        borderColor: "#777",
        borderWidth: 0,
        gapWidth: 1,
      },
      upperLabel: {
        show: false,
      },
    },
    {
      itemStyle: {
        borderColor: "#555",
        borderWidth: 5,
        gapWidth: 1,
      },
      emphasis: {
        itemStyle: {
          borderColor: "#ddd",
        },
      },
    },
    {
      colorSaturation: [0.35, 0.5],
      itemStyle: {
        borderWidth: 1,
        gapWidth: 1,
        borderColorSaturation: 0.6,
      },
    },
    {
      label: {
        minAngle: 10,
        fontSize: 12,
        overflow: "break",
        width: 80,
      },
      downplay: {
        label: {
          opacity: 0.5,
        },
      },
    },
  ];
};

const initChart = () => {
  if (chart.value) {
    const myChart = echarts.init(chart.value);

    // Generate sunburst data grouped by stage
    const sunburstDataByStage = store.sunburstData;

    // Transform sunburst data for the chart
    const sunburstData = sunburstDataByStage
      ? Object.values(sunburstDataByStage)
      : []; // Get an array of Root objects or an empty array if null

    // Define the ECharts option
    const option = {
      tooltip: {
        formatter: function (info: any) {
          const value = info.value;
          const treePathInfo = info.treePathInfo;
          const treePath = [];
          for (let i = 1; i < treePathInfo.length; i++) {
            treePath.push(treePathInfo[i].name);
          }
          return [
            `<div class="tooltip-title">${echarts.format.encodeHTML(
              treePath.join("/")
            )}</div>`,
            "Value: " + echarts.format.addCommas(value.toPrecision(3)) + " CHF",
          ].join("");
        },
      },

      series: [
        {
          name: "Coffee Impact Data",
          type: "sunburst",
          leafDepth: 2, // Limits the depth of leaf nodes visible
          data: sunburstData, // Add the transformed data here
          startAngle: 180,
          radius: [0, "100%"],
          label: {
            show: true,
            formatter: (params: any) => {
              const name = params.name;
              return name + "\n" + params.value.toPrecision(2) + " .-";
            }, // Shows the name of the node
            color: "#000",
            textBorderColor: "#fff",
            textBorderWidth: 2,
            fontSize: 14,
          },
          upperLabel: {
            show: true,
            height: 30,
          },
          itemStyle: {
            borderColor: "#fff",
          },
          levels: getLevelOption(), // Apply the custom levels configuration
          emphasis: {
            focus: "ancestor",
          },
        },
      ],
    };

    // Set chart options
    myChart.setOption(option);
    myChart.on("click", (params: any) => {
      if (params.data.indicators) store.selectImpact(params.data);
      else store.selectImpact(undefined);
    });

    // Handle responsive behavior
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  }
};

// Initialize the chart when the component is mounted
onMounted(() => {
  initChart();
});

watch(
  () => store.sunburstData,
  () => {
    initChart();
  }
);
</script>

<style scoped>
.sunburst {
  padding-top: 20px;
}
.title {
  padding-top: 30px;
  text-align: left;
}

.title h3 {
  margin-bottom: 2px;
}
</style>
