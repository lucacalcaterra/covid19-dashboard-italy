<template>
  
    <apexchart type="line" height="350" :options="chOptions" :series="chSeries"></apexchart>
  
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    chartData: {
      type: Array,
    },
  },
  data: function () {
    return {
    };
  },
  mounted() {},

  computed: {
    chOptions: function () {
      return {
        ...this.chartOptions,
        ...{
          chart: {
            id: "vuechart-example",
            animations: {
              //enabled: false,
            },
          },
          xaxis: {
            categories: this.chartData.map((d) => d.date),
          },
        },
      };
    },
    chSeries: function () {
      return [
        {
          data: this.chartData.map((d) => d.total),
        },
      ];
    },
  },
};
</script>