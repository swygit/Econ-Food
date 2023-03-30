<template>
  <div class="app">
    <div class="app-wrapper">
      <CustomerNavigationBar />

      <h1>Marketplace</h1>

      <!-- Search bar -->
      <div>
        <SearchBar @searchPayloadEvent="searchPayload" />
      </div>

      <!-- Buttons -->
      <div id="app">
        <FilterButton
          @click="toggleAll"
          :buttonName="allButtonName"
        ></FilterButton>
        <FilterButton
          @click="toggleHotel"
          :buttonName="hotelButtonName"
        ></FilterButton>
        <FilterButton
          @click="toggleSupermarket"
          :buttonName="supermarketButtonName"
        ></FilterButton>
        <FilterButton
          @click="toggleOthers"
          :buttonName="othersButtonName"
        ></FilterButton>
      </div>

      <!-- Items -->
      <ItemCard
        v-bind:filteredItems="filteredMerchants"
        v-bind:clickRouter="clickRouter"
      />
    </div>
  </div>
</template>

<script>
import firebaseApp from "@/firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

import SearchBar from "@/components/SearchBar.vue";
import FilterButton from "@/components/FilterButton.vue";
import ItemCard from "@/components/ItemCard.vue";
import CustomerNavigationBar from "@/components/CustomerNavigationBar.vue";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  name: "Marketplace",
  data: function () {
    return {
      merchants: [],
      filteredMerchants: [],
      allButtonName: "All",
      hotelButtonName: "Hotel",
      supermarketButtonName: "Supermarket",
      othersButtonName: "Others",
    };
  },
  mounted() {
    this.getUser();
    this.display();
  },
  components: {
    CustomerNavigationBar,
    SearchBar,
    FilterButton,
    ItemCard,
  },

  methods: {
    toggleAll: function () {
      this.filteredMerchants = this.merchants.filter((item) => item.name);
    },
    toggleHotel: function () {
      this.filteredMerchants = this.merchants.filter(
        (item) => item.businessType == "Hotel"
      );
    },
    toggleSupermarket: function () {
      this.filteredMerchants = this.merchants.filter(
        (item) => item.businessType == "Supermarket"
      );
    },
    toggleOthers: function () {
      this.filteredMerchants = this.merchants.filter(
        (item) => item.businessType == "Others"
      );
    },
    clickRouter: function (id) {
      this.$router.push(`/merchant/${id}`);
    },
    searchPayload: function (search) {
      this.filteredMerchants = this.merchants.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    },
    display: async function () {
      let allDocuments = await getDocs(collection(db, "merchants"));
      let values = allDocuments.docs.map((v) => {
        const data = v.data();
        return {
          ...data,
          id: data.uid,
        };
      });
      this.merchants = values;
      this.filteredMerchants = values;

      // 1. Store it as a url (if hardcoded)
      // 2. Store as base64 string
      // 3. Blob in firebase (https://firebase.google.com/docs/storage/web/upload-files)
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
:root {
  font-size: 8px;
}
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;1,900&display=swap");
body {
  background-color: #f5f5ef;
}
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
