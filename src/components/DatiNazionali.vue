<template>
  <v-card
    height="100%"
    width="100%"
    class="mx-auto pa-2"
    :elevation="6"
    :shaped="false"
  >
    <v-row v-if="jsonNazioneOggi">
      <v-col cols="3">
        <v-card
          height="100%"
          class="d-flex flex-column mx-auto"
          color="red"
          :elevation="6"
          outlined
          tile
        >
          <v-card-title class="text-left">
            <span class="subtitle-2 font-weight-light white--text"
              >Attuali <br />Positivi
            </span></v-card-title
          >
          <v-card-text
            class="headline text-center font-weight-black white--text"
            >{{ jsonNazioneOggi.totale_positivi }}</v-card-text
          >
          <v-divider style="border-color: white"></v-divider>
          <v-card-subtitle
            class="caption text-center font-weight-light white--text"
            >Variazione</v-card-subtitle
          >
          <v-card-text
            class="headline text-center font-weight-light white--text"
            >{{ jsonNazioneOggi.variazione_totale_positivi }}</v-card-text
          >
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
          height="100%"
          class="d-flex flex-column mx-auto"
          color="green"
          :elevation="6"
          outlined
          tile
        >
          <v-card-title class="text-left">
            <span class="subtitle-2 font-weight-light white--text"
              >Dimessi/ <br />Guariti
            </span></v-card-title
          >
          <v-card-text
            class="headline text-center font-weight-black white--text"
            >{{ jsonNazioneOggi.dimessi_guariti }}</v-card-text
          >
          <v-divider style="border-color: white"></v-divider>
          <v-card-subtitle
            class="caption text-center font-weight-light white--text"
            >Variazione</v-card-subtitle
          >
          <v-card-text
            v-if="jsonNazioneOggi.dimessi_guariti"
            class="headline text-center font-weight-light white--text"
            >{{
              jsonNazioneOggi.dimessi_guariti - jsonNazioneIeri.dimessi_guariti
            }}</v-card-text
          >
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
          height="100%"
          class="d-flex flex-column mx-auto"
          color="black"
          :elevation="6"
          outlined
          tile
        >
          <v-card-title class="text-left">
            <span class="subtitle-2 font-weight-light white--text"
              >Deceduti<br />
              <br /></span
          ></v-card-title>
          <v-card-text
            class="headline text-center font-weight-bold white--text"
          >
            {{ jsonNazioneOggi.deceduti }}
          </v-card-text>
          <v-divider style="border-color: white"></v-divider>
          <v-card-subtitle
            class="caption text-center font-weight-light white--text"
            >Variazione</v-card-subtitle
          >
          <v-card-text
            class="headline text-center font-weight-light white--text"
            >{{
              jsonNazioneOggi.deceduti - jsonNazioneIeri.deceduti
            }}</v-card-text
          >
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
          height="100%"
          class="d-flex flex-column mx-auto"
          color="orange"
          :elevation="6"
          outlined
          tile
        >
          <v-card-title class="text-left">
            <span class="subtitle-2 font-weight-light white--text"
              >Totale <br />
              Casi
            </span></v-card-title
          >
          <v-card-text
            class="headline text-center font-weight-black white--text"
          >
            {{ jsonNazioneOggi.totale_casi }}</v-card-text
          >
          <v-divider style="border-color: white"></v-divider>
          <v-card-subtitle
            class="caption text-center font-weight-light white--text"
            >Variazione</v-card-subtitle
          >
          <v-card-text
            class="headline text-center font-weight-light white--text"
            >{{ jsonNazioneOggi.nuovi_positivi }}</v-card-text
          >
        </v-card>
      </v-col>
    </v-row>

    <v-card width="100%" class="mx-auto pa-2" :elevation="6" :shaped="false">
      row 2
    </v-card>
  </v-card>
</template>

<script>
export default {
  components: {},
  props: {
    jsonTrendNazione: {
      type: Array,
    },
  },
  data: function () {
    return {};
  },
  mounted() {},

  computed: {
    jsonNazioneIeri() {
      return this.jsonTrendNazione[this.jsonTrendNazione.length - 2];
    },
    jsonNazioneOggi() {
      return this.jsonTrendNazione[this.jsonTrendNazione.length - 1];
    },
  },
};
</script>