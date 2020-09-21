<template>
  <v-layout column>
    <v-tabs v-model="tab">
      <v-tab v-for="tabname in tabnames" :key="tabname">{{ tabname }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="tabname in tabnames" :key="tabname">
        <v-card class="mt-2" v-if="tabname == 'Province'" height="470px">
          <!-- <div style="height: 200px overflow: auto;">
      <p>First marker is placed at {{ withPopup.lat }}, {{ withPopup.lng }}</p>
      <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>
      <button @click="showLongText">
        Toggle long popup
      </button>
      <button @click="showMap = !showMap">
        Toggle map
      </button>
          </div>-->
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
            </l-marker> -->
            <l-circle-marker              
              v-for="(marker,index) in markers"
              :key="index"
              :lat-lng="marker.latlng"
              :radius="5"
              :color='LightenDarkenColor("#F06D06",marker.intensita)'
            >
              <l-tooltip :options="{ permanent: false, interactive: false }">
                <div @click="innerClick">
                  {{ marker.denominazione_provincia }}
                  <p v-show="showParagraph"></p>
                </div>
              </l-tooltip>
            </l-circle-marker>
          </l-map>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-layout>
</template>

<script>
import { latLng } from "leaflet";
import {
  LMap,
  LTileLayer,
  LCircleMarker,
  LTooltip,
} from "vue2-leaflet";

export default {
  name: "MappaItalia",
  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
    LTooltip,
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
      tabnames: ["Regioni", "Province"],
      //map
      zoom: 5.5,
      center: latLng(42.146902, 12.502441),
      url:
        "https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
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
    
    LightenDarkenColor(colorCode, amount) {
    var usePound = false;
 
    if (colorCode[0] == "#") {
        colorCode = colorCode.slice(1);
        usePound = true;
    }
 
    var num = parseInt(colorCode, 16);
 
    var r = (num >> 16) + amount;
 
    if (r > 255) {
        r = 255;
    } else if (r < 0) {
        r = 0;
    }
 
    var b = ((num >> 8) & 0x00FF) + amount;
 
    if (b > 255) {
        b = 255;
    } else if (b < 0) {
        b = 0;
    }
 
    var g = (num & 0x0000FF) + amount;
 
    if (g > 255) {
        g = 255;
    } else if (g < 0) {
        g = 0;
    }
 
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}
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
    // aggiunge intensità marker
    this.markers.forEach((d) => {
      d.intensita= ((30*d.totale_casi)/this.maxValContagi);      
    });
            

    
  },
};
</script>