<template>
  <div class="app">
    <CustomerNavigationBar />
    <div class="app-wrapper">
      <h1>{{ this.merchant.name }}</h1>

      <!-- Search bar -->
      <div class="search-bar mt-7">
        <SearchBar @searchPayloadEvent="searchPayload" />
      </div>

      <div>
        <FilterButton
          @click="toggleLowHigh"
          :buttonName="lowHighButtonName"
        ></FilterButton>
        <FilterButton
          @click="toggleHighLow"
          :buttonName="highLowButtonName"
        ></FilterButton>
      </div>

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
import FilterButton from "@/components/FilterButton.vue";

const db = getFirestore(firebaseApp);

export default {
  name: "IndividualMarketplace",
  components: {
    SearchBar,
    CustomerNavigationBar,
    ProductItemCard,
    FilterButton,
  },
  data: function () {
    return {
      merchant: {},
      filteredItems: [],
      currentDate: new Date().toISOString(),
      lowHighButtonName: "Lowest to Highest",
      highLowButtonName: "Highest to Lowest",
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
    toggleLowHigh: function () {
      this.filteredItems = this.filteredItems.sort((a, b) => a.price - b.price);
    },
    toggleHighLow: function () {
      this.filteredItems = this.filteredItems.sort((a, b) => b.price - a.price);
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
      this.items = values.filter(
        (item) => item.quantity > 0 && item.bestByDate > this.currentDate
      );
      this.filteredItems = values.filter(
        (item) => item.quantity > 0 && item.bestByDate > this.currentDate
      );
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
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;1,900&display=swap");

:root {
  font-size: 8px;
}
body {
  background-color: #f5f5ef;
}
h1 {
  font-family: "Nunito Sans", sans-serif;
  font-size: 4rem;
  font-weight: bold;
  text-align: left;
  letter-spacing: 2%;
  line-height: 30px;
  color: #000000;
}
.app {
  margin: auto;
  width: 100%;
}
.app-wrapper {
  margin-top: 40px;
  margin-left: 120px;
  margin-right: 120px;
}
</style>
