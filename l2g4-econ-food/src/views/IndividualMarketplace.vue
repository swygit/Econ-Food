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
      <ItemCard v-bind:filteredItems="filteredItems" />
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
import SearchBar from "@/components/SearchBar.vue";
import CustomerNavigationBar from "../components/CustomerNavigationBar.vue";
import ItemCard from "@/components/ItemCard.vue";

const db = getFirestore(firebaseApp);

export default {
  name: "IndividualMarketplace",
  components: {
    SearchBar,
    CustomerNavigationBar,
    ItemCard,
  },
  data: function () {
    return {
      merchant: {},
      filteredItems: [],
    };
  },
  methods: {
    searchPayload: function (search) {
      this.filteredItems = this.items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    },
    loadMerchant: async function () {
      const id = this.$route.params.id;
      const document = await getDoc(doc(db, "merchant", id));
      this.merchant = document.data();
    },
    loadItems: async function () {
      const id = this.$route.params.id;
      let allDocuments = await getDocs(collection(db, "items"));
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
  },
  mounted: async function () {
    this.loadMerchant();
    this.loadItems();
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
