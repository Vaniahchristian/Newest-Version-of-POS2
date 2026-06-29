<template>
  <b-card class="mb-30 report-chart-card">
    <h4 class="card-title m-0">{{ title }}</h4>
    <p v-if="subtitle" class="text-muted mb-3 mt-1 small">{{ subtitle }}</p>
    <div class="chart-wrapper">
      <div v-if="loading" class="text-center py-4">
        <div class="spinner sm spinner-primary"></div>
      </div>
      <v-chart v-else :options="options" :autoresize="true" />
    </div>
  </b-card>
</template>

<script>
import ECharts from "vue-echarts/components/ECharts.vue";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";

export default {
  name: "ReportChartPanel",
  components: { "v-chart": ECharts },
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    options: { type: Object, default: () => ({}) },
    loading: { type: Boolean, default: false },
  },
};
</script>

<style scoped>
.report-chart-card .chart-wrapper {
  min-height: 280px;
}
</style>
