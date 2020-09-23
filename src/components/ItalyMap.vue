<template>
  <v-layout column>
    <v-card class="mt-2">
      <v-toolbar dense elevation="2">
        <v-btn-toggle v-model="modalita" dense>
          <v-btn>Regioni</v-btn>
          <v-btn>Province</v-btn>
        </v-btn-toggle>
      </v-toolbar>
      <v-card height="465px" class="mt-3">
        <l-map
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
          style
          @update:center="centerUpdate"
          @update:zoom="zoomUpdate"
        >
          <l-tile-layer :url="url" :attribution="attribution" />
          <!--             <l-marker :lat-lng="withPopup">
              <l-popup>
                <div @click="innerClick">
                  I am a popup
                  <p v-show="showParagraph">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                    sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
                    Donec finibus semper metus id malesuada.
                  </p>
                </div>
              </l-popup>
          </l-marker>-->
          <l-circle-marker
            v-for="(marker,index) in markers"
            :key="index"
            :lat-lng="marker.latlng"
            :radius="1"
          >
            <l-tooltip :options="{ permanent: false, interactive: false}">
              <div @click="innerClick">
                <div>
                  <h2>{{ marker.denominazione_provincia }}</h2>
                </div>
                <div>
                  <h3>tot: {{ marker.totale_casi }}</h3>
                </div>
                <p v-show="showParagraph"></p>
              </div>
            </l-tooltip>
          </l-circle-marker>
          <Vue2LeafletHeatmap
            :lat-lng="heatArr"
            :max="maxValContagi"
            :radius="11"
            :min-opacity="0.80"
            :max-zoom="12"
            :blur="10"
          ></Vue2LeafletHeatmap>
        </l-map>
      </v-card>
    </v-card>
  </v-layout>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LCircleMarker, LTooltip } from "vue2-leaflet";
import Vue2LeafletHeatmap from "vue2-leaflet-heatmap/Vue2LeafletHeatmap";

export default {
  name: "MappaItalia",
  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
    LTooltip,
    Vue2LeafletHeatmap,
  },
  props: {
    datiProv: {
      type: Array,
    },
  },
  data() {
    return {
      //tabs
      tab: 1,
      modalita: undefined,
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
    heatArr() {
      return this.markers.map((el) => {
        return { lat: el.latlng.lat, lng: el.latlng.lng, int: el.intensita };
      });
    },
  },
  created() {
    // forma array per marker
    this.datiProv.forEach((d) => {
      this.markers.push({
        latlng: latLng(d.lat, d.long),
        denominazione_provincia: d.denominazione_provincia,
        totale_casi: d.totale_casi,
      });
      //console.log(d)
    });
    // DEPR-aggiunge intensità marker
    // this.markers.forEach((d) => {
    //   d.intensita = (30 * d.totale_casi) / this.maxValContagi;
    // });
  },
};
</script>