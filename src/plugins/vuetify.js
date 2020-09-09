import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import colors from 'vuetify/lib/util/colors'


Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.pink.darken4,
                secondary: colors.grey.darken1,
                accent: '#3ea2fb',
                error: '#dc3545',
                petrol: '#17a499',
                background: '#F3F3FB',
            }
        },
        options: {
            customProperties: true
        },
    }
});
