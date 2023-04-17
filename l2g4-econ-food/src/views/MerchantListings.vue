<template>
  <div>
    <MerchantNavigationBar />
    <div class="header-wrapper">
      <h1>Active Listings</h1>
      <ListingSearchBar
        v-bind:value="searchQuery"
        v-on:update:value="searchQuery = $event"
        v-on:search="searchListings"
        v-on:reset="getListings"
      />
      <router-link to="/addlisting" class="add-listing-btn">
        Add Listing
      </router-link>
    </div>
    <div class="merchant-listings">
      <div class="merchant-listings-wrapper">
        <TheListing
          v-for="listing in listings"
          :key="listing.id"
          :listing="listing"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MerchantNavigationBar from "@/components/MerchantNavigationBar.vue";
import TheListing from "@/components/TheListing.vue";
import ListingSearchBar from "@/components/ListingSearchBar.vue";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import firebaseApp from "../firebase.js";

const db = getFirestore(firebaseApp);

// setInterval(function() {
//     console.log("reloading")
//     location.reload();
//   }, 60000);

export default {
  name: "MerchantListings",
  components: {
    MerchantNavigationBar,
    TheListing,
    ListingSearchBar,
  },
  data() {
    return {
      user: null,
      userId: null,
      listings: [],
      searchQuery: "",
      intervalTimer: null
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.userId = user.uid;
        this.getListings();
      }
    });
    this.intervalTimer = setInterval(() => {
      if (this.$route.name === "MerchantListings") {
        console.log("reloading")
        location.reload();
        console.log("reloading")
      }
    }, 60000);
  },
  methods: {
    beforeRouteLeave(to, from, next) {
      // Clear the interval timer before leaving the current route
      clearInterval(this.intervalTimer);
      next();
    },
    async getListings() {
      const q = query(
        collection(db, "listings"),
        where("merchantId", "==", this.userId)
      );
      const querySnapshot = await getDocs(q);
      const listings = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      this.listings = listings;
    },
    async searchListings() {
      const query1 = this.searchQuery.toLowerCase();
      const q = query(
        collection(db, "listings"),
        where("merchantId", "==", this.userId)
      );
      const querySnapshot = await getDocs(q);
      const listings = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      const filteredListings = listings.filter((listing) => {
        return (
          listing.name.toLowerCase().includes(query1) ||
          listing.quantity.toString().includes(query1) ||
          listing.price.toString().includes(query1) ||
          (listing.formattedBestByDateTime &&
            listing.formattedBestByDateTime.toLowerCase().includes(query1))
        );
      });
      this.listings = filteredListings;
    },
  },
};
</script>

<style scoped>
.merchant-listings {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.merchant-listings-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow-x: auto;
  margin: 0 60px;
  width: 100%;
}

.merchant-listings-item {
  display: flex;
  flex: 0 0 auto;
  margin-right: 16px;
}

.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 50px 0px 50px;
}

h1 {
  font-family: "Nunito Sans", sans-serif;
  font-size: 5rem;
  font-weight: bold;
  color: black;
  margin-left: 10px;
  margin-right: 16px;
}

.add-listing-btn {
  display: inline-block;
  padding: 14px 28px;
  font-family: "Nunito Sans", sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #16703c;
  border-radius: 8px;
  text-decoration: none;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease-in-out;
}

.add-listing-btn:hover {
  background-color: #16703c;
  transform: translateY(-2px);
}
</style>
