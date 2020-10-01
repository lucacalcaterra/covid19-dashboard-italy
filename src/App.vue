<template>
  <v-app id="app">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-toolbar-title>Dashboard - Covid 19 - ITALIA</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container class="background-white" fluid>
        <loading :active.sync="isLoading"></loading>
        <v-row no-gutters>
          <v-col cols="12">
            <dati-nazionali
              :jsonTrendNazione="jsonTrendNazione"
              :jsonNote="jsonNote"
            ></dati-nazionali>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <v-row>
          <v-col lg="3" md="12" sm="12" cols="12">
            <v-card
              class="mx-auto pa-2 fill-height"
              :elevation="6"
              :shaped="false"
            >
              <v-card-subtitle class="text-subtitle-1 pa-1"
                >Mappa
              </v-card-subtitle>
              <italy-map
                v-if="!isLoading"
                :jsonRegioniLatest="jsonRegioniLatest"
                :jsonProvinceLatest="jsonProvinceLatest"
                :isLoading="isLoading"
              ></italy-map>
              <v-skeleton-loader
                v-else
                class=""
                type="card"
              ></v-skeleton-loader>
            </v-card>
          </v-col>
          <v-col lg="5" md="12" sm="12" cols="12">
            <v-card
              width="100%"
              class="mx-auto pa-2 fill-height"
              :elevation="6"
            >
              <v-card-subtitle class="text-subtitle-1 pa-1"
                >Trend Nazione
              </v-card-subtitle>
              <v-card flat class="mt-5">
                <chart-trend-nazione
                  ref="chartTrendNazione"
                  :chartData="jsonTrendNazione"
                ></chart-trend-nazione>
              </v-card>
            </v-card>
          </v-col>
          <v-col lg="4" md="12" sm="12" cols="12">
            <v-card
              class="mx-auto pa-2 fill-height"
              :elevation="6"
              :shaped="false"
            >
              <v-card-subtitle class="text-subtitle-1 pa-1"
                >Trend Provincia
              </v-card-subtitle>
              <v-row class="mx-auto align-center mt-5">
                <v-toolbar flat>
                  <v-autocomplete
                    hide-details
                    v-model="selProv"
                    :items="province"
                    item-key="key"
                    item-value="denominazione_provincia"
                    v-on:change="upddatiTrendProvSel()"
                    label="Provincia"
                  ></v-autocomplete>
                  <v-chip-group
                    v-on:change="updPeriodo()"
                    v-model="selPeriodo"
                    active-class="primary--text"
                    mandatory
                  >
                    <v-chip x-small v-for="periodo in periodi" :key="periodo">{{
                      periodo
                    }}</v-chip>
                  </v-chip-group>
                </v-toolbar>
              </v-row>

              <!-- <p class="font-weight-black pa-2 pt-5">Provincia</p> -->
              <chart-province
                ref="chartprovince"
                :chartData="datiTrendProvSel"
              ></chart-province>
            </v-card>
          </v-col>
        </v-row>
        <v-footer color="transparent" padless>
          <v-col
            class="d-flex text-center justify-center align-center"
            cols="12"
          >
            <v-card flat class="d-flex text-center justify-center">
              <span class="subtitle-2"
                >2020 - Luca Calcaterra - built with
              </span>
              <a href="https://vuejs.org/" target="_blank">
                <v-img
                  class="mx-2"
                  src="./assets/vue-logo.svg"
                  max-height="30"
                  max-width="30"
                  contain
                ></v-img>
              </a>
              +
              <a href="https://vuetifyjs.com/" target="_blank">
                <v-img
                  class="mx-2"
                  src="./assets/vuetify-logo.svg"
                  max-height="30"
                  max-width="30"
                  contain
                ></v-img>
              </a>
              +
              <a href="https://apexcharts.com/" target="_blank">
                <v-img
                  class="mx-2"
                  src="./assets/apexchart-logo.png"
                  max-height="30"
                  max-width="30"
                  contain
                ></v-img>
              </a>
              <v-spacer></v-spacer>
              <a
                href="https://github.com/lucacalcaterra/Covid19-Dashboard-Italy/"
                target="_blank"
              >
                <v-img
                  class="mx-2"
                  src="./assets/github-logo.png"
                  max-height="30"
                  max-width="30"
                  contain
                ></v-img>
              </a>
            </v-card>
          </v-col>
        </v-footer>
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

import DatiNazionali from "./components/DatiNazionali";
import ChartTrendNazione from "./components/ChartTrendNazione";
import ItalyMap from "./components/ItalyMap";
import ChartProvince from "./components/ChartProvince.vue";

export default {
  components: {
    DatiNazionali,
    ChartTrendNazione,
    ItalyMap,
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
    province: [],
    selProv: "Macerata",
    selPeriodo: "",
    periodi: ["Tutto", "1 Sett.", "1 Mese", "3 Mesi", "6 Mesi"],
    jsonNote: [],
    jsonTrendNazione: [],
    jsonNazioneLatest: [],
    jsonProvince: [],
    jsonProvinceLatest: [],
    jsonRegioni: [],
    jsonRegioniLatest: [],
    datiTrendProvSel: [],

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
    moment.locale("it");

    await this.getDatiNaz();
    this.getProvince();
    await this.upddatiTrendProvSel();
  },
  mounted() {
    //this.isLoading=true;
  },

  methods: {
    getDatiNaz: async function () {
      this.isLoading = true;

      let { data: tmpJsonNote } = await axios.get(
        "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-note.json"
      );
      this.jsonNote = tmpJsonNote;

      let { data: tmpJsonTrendNazione } = await axios.get(
        "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json"
      );
      this.jsonTrendNazione = tmpJsonTrendNazione;

      // let { data: tmpJsonNazioneLatest } = await axios.get(
      //   "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale-latest.json"
      // );
      // this.jsonNazioneLatest = tmpJsonNazioneLatest[0];

      let { data: tmpJsonRegioniLatest } = await axios.get(
        "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni-latest.json"
      );
      this.jsonRegioniLatest = tmpJsonRegioniLatest;

      let { data: tmpJsonProvince } = await axios.get(
        "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province.json"
      );
      this.jsonProvince = tmpJsonProvince;

      let { data: tmpJsonProvinceLatest } = await axios.get(
        "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province-latest.json"
      );

      this.jsonProvinceLatest = tmpJsonProvinceLatest.filter(
        (el) => el.lat != null
      );
      this.isLoading = false;
    },
    getProvince: function () {
      const res = [
        ...new Set(
          this.jsonProvince
            .filter((el) => el.denominazione_provincia != null)
            .filter(
              (el) =>
                el.denominazione_provincia !==
                "In fase di definizione/aggiornamento"
            )
            .filter(
              (el) =>
                el.denominazione_provincia !==
                "Fuori Regione / Provincia Autonoma"
            )
            .map((el) => el.denominazione_provincia)
        ),
      ].sort();
      this.province = res;
    },
    upddatiTrendProvSel: function () {
      this.isLoading = true;

      this.datiTrendProvSel = [];
      const res = this.jsonProvince.filter((elem) => {
        return elem.denominazione_provincia === this.selProv;
      });
      res.forEach((d) => {
        const date = moment(d.data, "YYYYMMDD").format();
        const {
          totale_casi,
          denominazione_provincia,
          //totpositivi,
        } = d;
        this.datiTrendProvSel.push({
          date,
          total: totale_casi,
          prov: denominazione_provincia,
        });
      });
      //console.log (this.datiTrendProvSel)
      this.isLoading = false;
      this.selPeriodo = 0;
      this.$refs.chartprovince.$refs.chart.resetSeries(true, true);
    },
    updPeriodo: function () {
      switch (this.selPeriodo) {
        case 0: {
          this.$refs.chartprovince.$refs.chart.resetSeries(true, true);
          break;
        }
        case 1: {
          const start = moment().startOf("day").subtract(1, "week").valueOf();
          const end = moment().subtract(1, "day").valueOf();
          this.$refs.chartprovince.$refs.chart.zoomX(start, end);
          break;
        }
        case 2: {
          const start = moment().startOf("day").subtract(1, "month").valueOf();
          const end = moment().subtract(1, "day").valueOf();
          this.$refs.chartprovince.$refs.chart.zoomX(start, end);
          break;
        }
        case 3: {
          const start = moment().startOf("day").subtract(3, "month").valueOf();
          const end = moment().subtract(1, "day").valueOf();
          this.$refs.chartprovince.$refs.chart.zoomX(start, end);
          break;
        }
        case 4: {
          const start = moment().startOf("day").subtract(6, "month").valueOf();
          const end = moment().subtract(1, "day").valueOf();
          this.$refs.chartprovince.$refs.chart.zoomX(start, end);
          break;
        }
      }
    },
  },
};
</script>

<style>
/* #app {
  background-color: var(--v-background-base);
} */
</style>