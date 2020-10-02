<template>
  <apexchart
    type="area"
    ref="chart"
    height="400px"
    :options="chOptions"
    :series="chSeries"
  ></apexchart>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
var it = require("apexcharts/dist/locales/it.json");

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
    return {};
  },
  mounted() {},

  computed: {
    chOptions: function () {
      return {
        ...this.chartOptions,
        ...{
          chart: {
            id: "chart-trendprovince",
            type: "area",
            /* animations: {
              enabled: false,
            }, */
            locales: [it],
            defaultLocale: "it",
            zoom: {
              enabled: false,
              autoScaleYaxis: true,
            },
          },
          dataLabels: {
            enabled: false,
          },
          markers: {
            size: 0,
            style: "hollow",
          },
          /* fill: {
              type: 'gradient',
              gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.3,
                opacityTo: 0.2,
                stops: [ 800,2000]
              },
            }, */
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            type: "datetime",
            categories: this.chartData.map((d) => d.date),

            //tickAmount: 6,
          },
        },
      };
    },
    chSeries: function () {
      return [
        {
          name: "Positivi",
          data: this.chartData.map((d) => d.total),
        },
      ];
    },
  },
};
</script>