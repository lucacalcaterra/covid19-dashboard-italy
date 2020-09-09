<template>
  <div>
    <apexchart width="500" type="bar" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
    components: {
        'apexchart': VueApexCharts
    },
    props: {
        charttype: {
            type: String
        },
        series: {
            type: Object
        }

    },
  data() {
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 35, 50, 49, 60, 70, 91],
        },
      ],
    }
    },
    methods: {
        updateChart() {

        }
    }
  },
};
</script>