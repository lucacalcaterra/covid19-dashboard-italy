<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-toolbar-title>Monitoraggio Covid 19</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="4">
          <v-card class="mx-auto">
            <v-btn small>Normale</v-btn>
            <!-- <li v-for="el in  datiProvincia" v-bind:key="el"> {{index }} {{el}}</li>  -->
          </v-card>
        </v-col>
        <v-col cols="8">
          <v-card class="mx-auto pa-5">
            <v-select
              v-model="selProv"
              :items="items"
              v-on:change="updDatiProvincia()"
              label="Provincia"
            ></v-select>
            <v-divider class="pa-5"></v-divider>
            <p class="font-weight-black">Provincia</p>
            <v-card v-if="loaded">
              <line-chart
                :chartData="datiProv"
                :options="chartOptions"
                :chartColors="positiveChartColors"
                label="Positivi"
              />
            </v-card>
          </v-card>
        </v-col>
      </v-row>
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
    loaded: false,
    items: ["MC", "PU"],
    selProv: "",
    jsonNaz: [],
    datiProv: [],

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
    this.jsonNaz = data;
    this.selProv = "MC";
  },
  mounted() {
    this.loaded = true

  },

  methods: {
    updDatiProvincia: function () {
      this.datiProv = [];
      const res = this.jsonNaz.filter((elem) => {
        return elem.sigla_provincia === this.selProv;
      });
      res.forEach((d) => {
        const date = moment(d.data, "YYYYMMDD").format("DD/MM");
        const {
          totale_casi,
          sigla_provincia,
          //totpositivi,
        } = d;
        this.datiProv.push({ date, total: totale_casi, prov: sigla_provincia });
      });
      //console.log (this.datiProv)
    },
  },
};
</script>