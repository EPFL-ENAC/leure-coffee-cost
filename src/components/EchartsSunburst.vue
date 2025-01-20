<template>
  <div>
    <div v-if="ancestors.length == 0" class="title">
      <h3 class="title">Analyse hidden cost:</h3>
      <div>
        Click on a node to navigate thourgh coffee impacts. Select a specific
        impact to get more details below.
      </div>
    </div>
    <ReturnButton
      v-else
      :click="returnToAncestor"
      :style="{ visibility: ancestors.length > 0 ? 'visible' : 'hidden' }"
      >Previous impact category</ReturnButton
    >
    <div ref="chart" class="sunburst"></div>
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

// Transform sunburst data for the chart
const sunburstData = computed(() => {
  return store.sunburstData;
});

type Impact = {
  value: number;
  name: string;
};
type ImpactLevel = Impact & {
  children: Impact[];
};

const ancestors = ref<ImpactLevel[]>([]);

const current = ref<ImpactLevel>(
  (sunburstData.value as ImpactLevel) ?? {
    value: 0,
    name: "root",
    children: [],
  }
);

const returnToAncestor = () => {
  if (ancestors.value.length > 0)
    current.value = ancestors.value.pop() as ImpactLevel;
  else console.error("No ancestor in ancestors array.");
};
const coffeeName = computed(() => store.selectedRecipe);

const option = {
  // tooltip: {
  //   formatter: function (info: any) {
  //     const value = info.value;
  //     const treePathInfo = info.treePathInfo;
  //     const treePath = [];
  //     for (let i = 1; i < treePathInfo.length; i++) {
  //       treePath.push(treePathInfo[i].name);
  //     }
  //     return [
  //       `<div class="tooltip-title">${echarts.format.encodeHTML(
  //         treePath.join("/")
  //       )}</div>`,
  //       "Value: " + echarts.format.addCommas(value.toPrecision(3)) + " CHF",
  //     ].join("");
  //   },
  // },

  series: [
    {
      name: coffeeName.value,
      type: "pie",
      data: sunburstData.value?.children, // Add the transformed data here
      radius: "80%",
      startAngle: 180,
      // nodeClick: false,
      label: {
        show: true,
        formatter: (params: any) => {
          const name = params.name;
          return name + "\n" + params.value.toPrecision(2) + " .-";
        }, // Shows the name of the node
        fontSize: 14,
        minAngle: 6,
        // minMargin: 20,
        // overflow: "break",
        color: "white",
        // width: 80,
      },
      itemStyle: {
        borderColor: "#fff",
      },
      tooltip: {
        trigger: "item",
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};

const updateData = (data: ImpactLevel) => {
  console.log("Update data with", data);
  echartInstance.value?.setOption({
    series: [
      {
        data: data.children,
      },
    ],
  });
};

watch(
  () => sunburstData.value,
  (newData) => {
    if (newData !== undefined) current.value = newData;
  }
);

watch(
  () => current.value,
  (newImpactLevel) => {
    updateData(newImpactLevel);
  }
);

const initChart = () => {
  if (chart.value) {
    const myChart = echarts.init(chart.value);
    echartInstance.value = myChart;

    // Set chart options
    myChart.setOption(option);
    myChart.on("click", (params: any) => {
      console.log(params);
      if (params.data.children) {
        ancestors.value.push(current.value);
        current.value = params.data;
      }
      // updateData(current.value);
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
    // if (store.sunburstData) updateData(store.sunburstData);
    // echartInstance.value?.setOption(option.value);
  }
);
</script>

<style scoped>
.sunburst {
  /* padding-top: 20px; */
  width: 100%;
  height: 60vh;
}
.title {
  padding-top: 30px;
  text-align: left;
}

.title h3 {
  margin-bottom: 2px;
}
</style>
