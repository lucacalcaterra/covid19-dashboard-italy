<template>
  <v-app id="app">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-toolbar-title>Monitoraggio Covid 19</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height background-white" fluid>
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="4">
            <v-card class="mx-auto">
              <v-btn small>Normale</v-btn>
              <!-- <li v-for="el in  datiProvincia" v-bind:key="el"> {{index }} {{el}}</li>  -->
            </v-card>
          </v-col>
          <v-col cols="8">
            <v-card class="mx-auto pa-5" :elevation="16" :shaped="false">
              <v-select
                outlined
                hide-details
                v-model="selProv"
                :items="items"
                v-on:change="updDatiProvincia()"
                label="Provincia"
              ></v-select>
              <p class="font-weight-black pa-2 pt-5">Provincia</p>
             <!--  <v-card :elevation="1" v-show="this.datiProv.length > 0">
                <line-chart
                  :chartData="datiProv"
                  :options="chartOptions"
                  :chartColors="positiveChartColors"
                  label="Positivi"
                />
              </v-card> -->
              <chart-province :chartData="datiProv" v-if="datiProv.length > 0"></chart-province>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import colors from "vuetify/lib/util/colors";
import axios from "axios";
import moment from "moment";

//import LineChart from "./components/LineChart";
import ChartProvince from "./components/ChartProvince.vue"

export default {
  components: {
    //LineChart,
    ChartProvince
  },
  /* name: "Dashboard",
  props: {
    source: String,
  }, */
  data: () => ({
    //drawer: null,
    loading: false,
    items: ["MC", "PU"],
    selProv: "",
    jsonNaz: [],
    datiProv: [],

    arrPositivi: [],
    positiveChartColors: {
      borderColor: colors.pink.darken1,
      pointBorderColor: colors.pink.darken1,
      pointBackgroundColor: colors.pink.lighten2,
      backgroundColor: colors.green.lighten2,
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
    this.updDatiProvincia();
  },
  mounted() {
    this.loading = true;
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

<style>
/* #app {
  background-color: var(--v-background-base);
} */
</style>