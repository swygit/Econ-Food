<template>
  <div class="app">
    <div class="app-wrapper">
      <CustomerNavigationBar />

      <h1>{{ this.merchant.name }}</h1>

      <!-- Search bar -->
      <div class="search-bar">
        <SearchBar @searchPayloadEvent="searchPayload" />
      </div>

      <!-- Buttons -->
      <!-- <div id="app">
        <Button @click="toggleAll" :buttonName="allButtonName"></Button>
        <Button @click="toggleHotel" :buttonName="hotelButtonName"></Button>
        <Button
          @click="toggleSupermarket"
          :buttonName="supermarketButtonName"
        ></Button>
        <Button @click="toggleOthers" :buttonName="othersButtonName"></Button>
      </div> -->

      <!-- Items -->
      <ProductItemCard v-bind:filteredItems="filteredItems" />
    </div>
  </div>
</template>

<script>
import firebaseApp from "@/firebase.js";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import SearchBar from "@/components/SearchBar.vue";
import CustomerNavigationBar from "../components/CustomerNavigationBar.vue";
import ProductItemCard from "@/components/ProductItemCard.vue";

const db = getFirestore(firebaseApp);

export default {
  name: "IndividualMarketplace",
  components: {
    SearchBar,
    CustomerNavigationBar,
    ProductItemCard,
  },
  data: function () {
    return {
      merchant: {},
      filteredItems: [],
    };
  },
  mounted: async function () {
    this.loadMerchant();
    this.loadItems();
  },
  methods: {
    searchPayload: function (search) {
      this.filteredItems = this.items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    },
    loadMerchant: async function () {
      const id = this.$route.params.id;
      let allDocuments = await getDocs(collection(db, "merchants"));
      let values = allDocuments.docs
        .map((v) => {
          const data = v.data();
          return {
            ...data,
            id: data.uid,
          };
        })
        .find((v) => v.id === id);
      this.merchant = values;
    },
    loadItems: async function () {
      const id = this.$route.params.id;
      let allDocuments = await getDocs(collection(db, "listings"));
      let values = allDocuments.docs
        .map((v) => {
          const data = v.data();
          return {
            ...data,
            id: v.id,
          };
        })
        .filter((v) => v.merchantId === id);
      this.items = values;
      this.filteredItems = values;
    },
    getUser: function () {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
        }
      });
    },
  },
};
</script>

<style scoped>
h1 {
  font-family: "Nunito Sans", sans-serif;
  font-size: 4rem;
  font-weight: 500;
  text-align: left;
  letter-spacing: 2%;
  line-height: 30px;
  color: #000000;
}
.app {
  margin: auto;
  width: 100%;
  /* max-width: 1048px; */
}

.app-warpper {
  margin: auto;
}
</style>
