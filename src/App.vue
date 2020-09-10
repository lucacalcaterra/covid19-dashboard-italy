<template>
  <v-app id="app">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-toolbar-title>Monitoraggio Covid 19</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container class="background-white" fluid>
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
              </v-card>-->
              <div class="vld-parent">
                <loading :active.sync="isLoading"></loading>
                <chart-province :chartData="datiProv" ></chart-province>
              </div>
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

// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

//import LineChart from "./components/LineChart";
import ChartProvince from "./components/ChartProvince.vue";

export default {
  components: {
    //LineChart,
    ChartProvince,
    Loading,
  },
  /* name: "Dashboard",
  props: {
    source: String,
  }, */
  data: () => ({
    //drawer: null,
    isLoading: false,
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
    await this.getDatiNaz();
    this.selProv = "MC";
    await this.updDatiProvincia();
  },
  mounted() {
    this.isLoading=true;
  },

  methods: {
    getDatiNaz: async function () {
      this.isLoading = true;
      const { data } = await axios.get(
        "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province.json"
      );
      this.jsonNaz = data;
      this.isLoading = false;
    },
    updDatiProvincia: function () {
      this.isLoading = true;

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
      this.isLoading = false;
    },
  },
};
</script>

<style>
/* #app {
  background-color: var(--v-background-base);
} */
</style>