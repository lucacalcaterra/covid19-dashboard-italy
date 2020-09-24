<template>
  <v-layout column>
    <v-card class="mt-2">
      <v-toolbar dense elevation="2">
        <v-btn-toggle @change="updateMarkers" v-model="modalita" dense>
          <v-btn>Regioni</v-btn>
          <v-btn>Province</v-btn>
        </v-btn-toggle>
      </v-toolbar>
      <v-card height="465px" class="mt-2">
        <l-map
          ref="mappa"
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
          style
          @update:center="centerUpdate"
          @update:zoom="zoomUpdate"
        >
          <l-tile-layer :url="url" :attribution="attribution" />
          <l-circle-marker
            color="#1976d2"
            fill-color="#35A7DB"
            :fill-opacity="0.3"
            v-for="(marker, index) in markers"
            :key="index"
            :lat-lng="marker.latlng"
            :radius="heatArr[index].int"
          >
            <l-tooltip :options="{ permanent: false, interactive: false }">
              <div @click="innerClick">
                <div>
                  <h2>{{ marker.denominazione }}</h2>
                </div>
                <div>
                  <h3>tot: {{ marker.totale_casi }}</h3>
                </div>
                <p v-show="showParagraph"></p>
              </div>
            </l-tooltip>
          </l-circle-marker>
        </l-map>
      </v-card>
    </v-card>
  </v-layout>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LCircleMarker, LTooltip } from "vue2-leaflet";

export default {
  name: "MappaItalia",
  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
    LTooltip,
  },
  props: {
    jsonRegioniLatest: {
      type: Array,
    },
    jsonProvinceLatest: {
      type: Array,
    },
  },
  data() {
    return {
      //tabs
      tab: 1,
      modalita: 1,
      //map
      zoom: 5.5,
      center: latLng(42.146902, 12.502441),
      url:
        "https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
      withPopup: latLng(47.41322, -1.219482),
      withTooltip: latLng(47.41422, -1.250482),
      currentZoom: 6,
      currentCenter: latLng(41.539645, 12.449227),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5,
      },
      showMap: true,
      markers: [],
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    },
    updateMarkers: function () {
      this.markers.length = 0;
      switch (this.modalita) {
        case 0:
          this.jsonRegioniLatest.forEach((d) => {
            this.markers.push({
              latlng: latLng(d.lat, d.long),
              denominazione: d.denominazione_regione,
              totale_casi: d.totale_casi,
            });
            //console.log(d)
          });
          this.componentKey += 1;

          break;
        case 1: {
          this.jsonProvinceLatest.forEach((d) => {
            this.markers.push({
              latlng: latLng(d.lat, d.long),
              denominazione: d.denominazione_provincia,
              totale_casi: d.totale_casi,
            });
            //console.log(d)
          });
          this.componentKey += 1;
          break;
        }
      }
    },
  },
  computed: {
    //utility per calcoli
    maxValContagi() {
      return Math.max.apply(
        Math,
        this.markers.map((el) => {
          return el.totale_casi;
        })
      );
    },
    // heat Array, uso solo la property intensita per il raggio dei markers
    heatArr() {
      return this.markers.map((el) => {
        return {
          lat: el.latlng.lat,
          lng: el.latlng.lng,
          int: ((25 - 2) * (el.totale_casi - 0)) / (this.maxValContagi - 0) + 2, //(30 * el.totale_casi) / this.maxValContagi,
        };
      });
    },
  },

  created() {},
  mounted() {
    /* this.$nextTick(() => {
      // The whole view is rendered, so I can safely access or query
      // the DOM. ¯\_(ツ)_/¯
      this.modalita = 0;
    }); */
    this.updateMarkers();
  },
};
</script>