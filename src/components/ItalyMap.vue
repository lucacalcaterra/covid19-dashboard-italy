<template>

  <v-card height="500px">
    <!-- <div style="height: 200px overflow: auto;">
      <p>First marker is placed at {{ withPopup.lat }}, {{ withPopup.lng }}</p>
      <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>
      <button @click="showLongText">
        Toggle long popup
      </button>
      <button @click="showMap = !showMap">
        Toggle map
      </button>
    </div> -->
    <l-map
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style=""
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-marker  :lat-lng="withPopup">
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
      </l-marker>
      <l-circle-marker v-for="(marker,index) in markers" :key="index" :lat-lng="marker">
        <l-tooltip :options="{ permanent: false, interactive: false }">
          <div @click="innerClick">
            I am a tooltip
            <p v-show="showParagraph">              
            </p>
          </div>
        </l-tooltip>
      </l-circle-marker>
    </l-map>
  </v-card>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LCircleMarker, LPopup, LTooltip } from "vue2-leaflet";
export default {
  name: "MappaItalia",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LCircleMarker,
    LPopup,
    LTooltip
  },
  props: {
    datiProv: {
      type: Array,
    },
  },
  data() {
    return {
      zoom: 5,
      center: latLng(42.146902, 12.502441),
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(47.41322, -1.219482),
      withTooltip: latLng(47.41422, -1.250482),
      currentZoom: 6,
      currentCenter: latLng(41.539645, 12.449227),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true,
      markers: [
        //latLng( 42.35122196, 13.39843823),
        //latLng( 40.63947052, 15.80514834)
      ]
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
    }
  },
  created () {    
    this.datiProv.forEach((d) => {
      this.markers.push(latLng(d.lat,d.long))
      //console.log(d)
    })
  }
};
</script>