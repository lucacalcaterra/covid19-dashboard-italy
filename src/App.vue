<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-toolbar-title>Monitoraggio Covid 19</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container class fluid>
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="4">
            <v-card class="mx-auto">
              <span>Provincia</span>
            </v-card>
          </v-col>
          <v-col cols="8">
            <v-card class="mx-auto pa-5">
              <p class="font-weight-black">Provincia</p>
              <line-chart
                :chartData="arrPositivi"
                :options="chartOptions"
                :chartColors="positiveChartColors"
                label="Positivi"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import moment from "moment";

import LineChart from "./components/LineChart";

export default {
  components: {
    LineChart,
  },
  /* name: "Dashboard",
  props: {
    source: String,
  }, */
  data: () => ({
    //drawer: null,

    arrPositivi: [],
    positiveChartColors: {
      borderColor: "#077187",
      pointBorderColor: "#0E1428",
      pointBackgroundColor: "#AFD6AC",
      backgroundColor: "#74A57F",
    },
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),

  async created() {
    const { data } = await axios.get(
      "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province.json"
    );
    //const {data} = await axios.get('/db.json')
    //console.log(data);

    let dataMc = data.filter((elem) => elem.sigla_provincia === "MC");
    dataMc.forEach((d) => {
      const date = moment(d.data, "YYYYMMDD").format("DD/MM");
      const {
        totale_casi,
        //totpositivi,
      } = d;

      // this.arrTotali.push({ date, total: totale_casi });
      this.arrPositivi.push({ date, total: totale_casi });
    });
  },
};
</script>