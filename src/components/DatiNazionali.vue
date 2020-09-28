<template>
  <v-card
    height="100%"
    width="100%"
    class="mx-auto pa-2"
    :elevation="6"
    :shaped="false"
  >
    <v-row>
      <v-col>
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
              >Attuali Positivi
            </span></v-card-title
          >
          <v-card-text
            class="headline text-center font-weight-black white--text"
            >{{ jsonNazioneLatest.totale_positivi }}</v-card-text
          >
          <v-divider></v-divider>
          <v-card-subtitle
            class="caption text-center font-weight-light white--text"
            >Variazione</v-card-subtitle
          >
          <v-card-text
            class="headline text-center font-weight-light white--text"
            >{{ jsonNazioneLatest.variazione_totale_positivi }}</v-card-text
          >
        </v-card>
      </v-col>
      <v-col>
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
              >Dimessi/Guariti
            </span></v-card-title
          >
          <v-card-text
            class="headline text-center font-weight-black white--text"
            >{{ jsonNazioneLatest.dimessi_guariti }}</v-card-text
          >
        </v-card>
      </v-col>
      <v-col>
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
              >Deceduti<br /></span
          ></v-card-title>
          <v-card-text
            class="headline text-center font-weight-bold white--text"
          >
            {{ jsonNazioneLatest.deceduti }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
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
              >Totale Casi
            </span></v-card-title
          >
          <v-card-text
            class="headline text-center font-weight-black white--text"
          >
            {{ jsonNazioneLatest.totale_casi }}</v-card-text
          >
          <v-divider></v-divider>
          <v-card-subtitle
            class="caption text-center font-weight-light white--text"
            >Variazione</v-card-subtitle
          >
          <v-card-text
            class="headline text-center font-weight-light white--text"
            >{{ jsonNazioneLatest.nuovi_positivi }}</v-card-text
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
    jsonNazioneLatest: {
      type: Array,
    },
  },
  data: function () {
    return {};
  },
  mounted() {},

  computed: {},
};
</script>