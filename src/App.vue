<template>
  <v-app id="app">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-toolbar-title>Monitoraggio Covid 19</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container  class="background-white" fluid>
        <loading :active.sync="isLoading"></loading>
        <v-row justify-center>
          <v-col class="text-center"  md="4" sm="12">
            <v-card   class="mx-auto pa-2" :elevation="16" :shaped="false">
                <italy-map v-if="!isLoading" :datiProv="jsonProvinceLatest"></italy-map>
            </v-card>
          </v-col>
          <v-col md="8" sm="12">
            <v-card class="mx-auto pa-5" :elevation="16" :shaped="false">
              <v-row class="mx-auto align-center">
                <v-col cols="6">
                  <v-autocomplete
                    solo
                    hide-details
                    v-model="selProv"
                    :items="province"
                    item-key="key"
                    item-value="denominazione_provincia"
                    v-on:change="updDatiProvincia()"
                    label="Provincia"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="6">
                  <v-chip-group
                    v-on:change="updPeriodo()"
                    v-model="selPeriodo"
                    active-class="primary--text"
                    mandatory
                  >
                    <v-chip v-for="periodo in periodi" :key="periodo">{{ periodo }}</v-chip>
                  </v-chip-group>
                </v-col>
              </v-row>

              <v-card outlined class="mt-2">
                <p class="font-weight-black pa-2 pt-5">Provincia</p>
                <chart-province ref="chartprovince" :chartData="datiProv"></chart-province>
              </v-card>
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
import ItalyMap from "./components/ItalyMap";
import ChartProvince from "./components/ChartProvince.vue";

export default {
  components: {
    //LineChart,
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
    jsonProvince: [],
    jsonProvinceLatest: [],
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
    moment.locale("it");

    await this.getDatiNaz();
    this.getProvince();
    await this.updDatiProvincia();
  },
  mounted() {
    //this.isLoading=true;
  },

  methods: {
    getDatiNaz: async function () {
      this.isLoading = true;
      let { data:tmpJsonProvince } = await axios.get(
        "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province.json"
      );
      this.jsonProvince = tmpJsonProvince;

      let  { data:tmpJsonProvinceLatest } = await axios.get(
        "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province-latest.json"
      )      

      this.jsonProvinceLatest = tmpJsonProvinceLatest.filter(
              (el) =>
                el.lat != null
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
    updDatiProvincia: function () {
      this.isLoading = true;

      this.datiProv = [];
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
        this.datiProv.push({
          date,
          total: totale_casi,
          prov: denominazione_provincia,
        });
      });
      //console.log (this.datiProv)
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