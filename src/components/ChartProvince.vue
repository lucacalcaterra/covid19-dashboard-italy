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
            type: 'area',
            animations: {
              //enabled: false,
            },
            zoom: {
              enabled: false
            }
          },
          fill: {
              type: 'gradient',
              gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100]
              },
            },
          stroke: {
              curve: 'smooth'
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
          name: 'Positivi',
          data: this.chartData.map((d) => d.total),
        },
      ];
    },
  },
};
</script>