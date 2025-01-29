<template>
  <div class="container-chart">
    <div class="title">
      <div class="hint">
        <h3>Analyse hidden cost:</h3>
        <div>
          Click on a node to navigate thourgh coffee impacts. Select a specific
          impact to get more details below.
        </div>
      </div>

      <ReturnButton
        :click="returnToAncestor"
        :style="{ opacity: ancestors.length == 0 ? '0.4' : '1' }"
        >Previous impact category</ReturnButton
      >
    </div>

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

const addAmountToLabel = computed(() => current.value.children.length <= 10);

const formatterLabel = (params: any) => {
  let name = params.name;

  return addAmountToLabel.value
    ? name + "\n" + params.value.toPrecision(2) + " .- \n"
    : name;
};

const returnToAncestor = () => {
  store.selectImpact(undefined);
  if (ancestors.value.length > 0)
    current.value = ancestors.value.pop() as ImpactLevel;
  else console.error("No ancestor in ancestors array.");
};
const coffeeName = computed(() => store.selectedRecipe);

const option = {
  series: [
    {
      name: coffeeName.value,
      type: "pie",
      data: sunburstData.value?.children, // Add the transformed data here
      radius: "60%",
      startAngle: 180,
      label: {
        padding: [10, 1, 10, 1],
        formatter: formatterLabel, // Shows the name of the node
        color: "white",
        fontWeight: "bold",
        overflow: "truncate",
        bleedMargin: 5,
        position: "outer",
        // lineHeight: 14,
      },
      minShowLabelAngle: 0,
      avoidLabelOverlap: true,
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
        label: {
          textShadowBlur: 20,
          textShadowOffsetX: 1,
          textShadowColor: "rgba(0, 0, 0, 0.9)",
          fontWeight: "bold",
          textBorderColor: "#333",
        },
      },
    },
  ],
};

const updateData = (data: ImpactLevel) => {
  console.log("Width", echartInstance.value?.getWidth());
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
      console.log("Resized");
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
.container-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* padding: 1.2em; */
  width: 100%;
}
.sunburst {
  /* padding-top: 20px; */
  position: relative;
  width: 95vw;
  min-height: 30vh;
}

@media screen and (min-width: 768px) {
  .sunburst {
    height: 40vh;
  }
  .title > .hint {
    max-width: 50%;
  }
  .title {
    padding-top: 30px;
    text-align: left;
    display: flex;
    flex-direction: row;
    gap: 2em;
    justify-content: space-between;
  }
}

.title h3 {
  margin-bottom: 2px;
}
</style>
