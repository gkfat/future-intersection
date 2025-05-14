import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import { createVuetify } from 'vuetify';
import * as directives from 'vuetify/directives';

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        directives,
        ssr: false,
    });
    app.vueApp.use(vuetify);
});
