<template>
  <v-app>
  <div class="container">
        <LandingHeader />
        <AboutCustomer />
        <AboutMerchant />
        <v-footer
          class="text-center d-flex flex-column"
          style="background-color: #16703C; color: white;"
        >
          <div class="mt-3" style="font-size: 16px;">
            Connect with us on our socials!
          </div>
          
          <div class="mb-4">
            <v-btn
              v-for="icon in icons"
              :key="icon"
              class="mx-4"
              :icon="icon"
              variant="text"
              style="font-size: 16px;"
            ></v-btn>
          </div>

          <v-divider></v-divider>

          <div style="font-size: 14px; font-family: 'Nunito Sans', sans-serif;">
              <strong>Econ Food</strong> © {{ new Date().getFullYear() }}
          </div>
        </v-footer>
    </div>
    </v-app>
</template>

<script>
import { mdiFacebook, mdiTwitter, mdiLinkedin, mdiInstagram } from '@mdi/js';
import LandingHeader from "../components/LandingHeader.vue";
import AboutCustomer from "../components/AboutCustomer.vue";
import AboutMerchant from "../components/AboutMerchant.vue";

export default {
    name: "Landing",
    components: {
      LandingHeader,
      AboutCustomer,
      AboutMerchant
    },
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
};
</script>

<style scoped>  
@import url('https://fonts.googleapis.com/css?family=Nunito+Sans');

/* .container {
  height: 100vh;
} */

body {
  margin: 0;
}

.v-footer div:nth-of-type(2) {
  font-family: 'Nunito Sans', sans-serif;
}
</style>
