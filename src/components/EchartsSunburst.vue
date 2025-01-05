<template>
  <div class="title">
    <h3 class="title">Analyse hidden cost:</h3>
    <div>
      Click on a node to navigate thourgh coffee impacts. Select a specific
      impact to get more details below.
    </div>
  </div>

  <ReturnButton v-if="depth > 0" :click="() => depth--">
    Back {{ depth }}</ReturnButton
  >
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
import { ref, onMounted, watch, computed } from "vue";
import * as echarts from "echarts";
import { useCoffeeStore } from "@/stores/coffeeStore";
import ReturnButton from "./ReturnButton.vue";

// Create a reference for the chart container
const chart = ref<HTMLDivElement | null>(null);
const store = useCoffeeStore();

const echartInstance = ref<echarts.ECharts | null>(null);

const listRadius = [
  ["0%", "50%"],
  ["50%", "100%"],
];

const depth = ref<number>(0);
watch(depth, (newDepth) => {
  echartInstance.value?.setOption({
    series: [
      {
        levels: getLevelOption(newDepth),
      },
    ],
  });
});

const getLevelOption = (depth: number = 0) => {
  console.log("depth", depth);
  return [
    {
      radius: ["0%", "15%"],
    },
    {
      radius: ["15%", "30%"],
      label: {
        formatter: (params: any) => {
          return params.name + "\n" + params.value.toPrecision(2) + " CHF";
        },
      },
    },
    {
      radius: ["30%", "60%"],
      label: {
        formatter: (params: any) => {
          return params.name + "\n" + params.value.toPrecision(2) + " CHF";
        },
      },
    },
    {
      radius: ["60%", "90%"],
      colorSaturation: [0.1, 0.5],
    },
    {
      radius: ["90%", "100%"],
      label: {
        show: false,
      },
      downplay: {
        label: {
          opacity: 0.5,
        },
      },
    },
  ].map((d, i) => {
    const isRootVisible = depth > 0 && i == 0;
    const show =
      isRootVisible || (i > depth && i - depth - 1 < listRadius.length);
    const indexRadius = isRootVisible ? 0 : i - depth - 1;

    return {
      ...d,
      radius: show ? listRadius[indexRadius] : [0, 0],
      label: {
        ...d.label,
        show,
      },
    };
  });
};

// Transform sunburst data for the chart
const sunburstData = computed(() => {
  console.log(store.sunburstData);
  return store.sunburstData;
});

const coffeeName = computed(() => store.selectedRecipe);

const option = computed(() => ({
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
      name: coffeeName.value,
      type: "sunburst",
      data: sunburstData.value, // Add the transformed data here
      radius: [0, "100%"],
      startAngle: 180,
      // nodeClick: false,
      label: {
        show: true,
        formatter: (params: any) => {
          const name = params.name;
          return name;
          // return name + "\n" + params.value.toPrecision(2) + " .-";
        }, // Shows the name of the node
        color: "#000",
        textBorderColor: "#fff",
        textBorderWidth: 2,
        fontSize: 14,
        minAngle: 6,
        minMargin: 20,
        overflow: "break",
        width: 80,
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
}));

const initChart = () => {
  if (chart.value) {
    const myChart = echarts.init(chart.value);
    echartInstance.value = myChart;

    // Set chart options
    myChart.setOption(option.value);
    myChart.on("click", (params: any) => {
      // console.log(params);
      // const newSunburstData = generateSunburstDataDepth(
      //   params.treePathInfo.length + 2
      // );
      // myChart.setOption({
      //   series: [
      //     {
      //       data: newSunburstData,
      //     },
      //   ],
      // });
      depth.value = Math.min(2, params.treePathInfo.length - 1);

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
    // echartInstance.value?.setOption(option.value);
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
