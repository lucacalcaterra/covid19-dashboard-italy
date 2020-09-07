<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    label: {
      type: String,
    },
    chartData: {
      type: Array,
    },
    options: {
      type: Object,
    },
    chartColors: {
      type: Object,
    },
  },
  mounted() {
      this.render()
  },

  methods: {
    render: function () {
      const dates = this.chartData.map((d) => d.date); //.reverse();
      const totals = this.chartData.map((d) => d.total); //.reverse();

      const {
        borderColor,
        pointBorderColor,
        pointBackgroundColor,
        backgroundColor,
      } = this.chartColors;

      this.renderChart(
        {
          labels: dates,
          datasets: [
            {
              label: this.label,
              data: totals,
              borderColor: borderColor,
              pointBorderColor: pointBorderColor,
              pointBackgroundColor: pointBackgroundColor,
              backgroundColor: backgroundColor,
            },
          ],
        },
        this.options
      );
    },
  },
  watch: {
    chartData() {
        this.render();
    },
  },
};
</script>
