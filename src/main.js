import './plugins/axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    theme: {
        defaultTheme: 'myCustomTheme',
        themes: {
          myCustomTheme: {
            dark: false,
            colors: {
             // ..., // We have omitted the standard color properties here to emphasize the custom one that we've added
              table_bg: '#eeeff8',
              violet: '#7103f2'
            }
          }
        }
    },
    components,
    directives,
  })

import { LocaleManager } from '@bryntum/calendar/calendar.module.js';
//import '@bryntum/calendar/css/light.css'; // Import the desired theme
import '@bryntum/calendar/locales/calendar.locale.FrFr'; // Import the English language pack

LocaleManager.locale = 'FrFr';

createApp(App).use(store).use(router).use(vuetify).mount('#app')