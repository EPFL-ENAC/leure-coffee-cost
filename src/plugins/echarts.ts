import { App } from "vue";
import ECharts from "vue-echarts";
import "echarts";

export default {
  install: (app: App) => {
    app.component("v-chart", ECharts);
  },
};
