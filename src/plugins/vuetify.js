import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import colors from 'vuetify/lib/util/colors'


Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.pink.darken1,
                secondary: colors.pink.lighten4,
                accent: '#3ea2fb',
                error: '#dc3545',
                petrol: '#17a499',
                background: colors.grey.lighten5,
            }
        },
        options: {
            customProperties: true
        },
    }
});
