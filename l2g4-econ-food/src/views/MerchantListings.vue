<template>
  <div>
    <MerchantNavBar />
    <div class="header-wrapper">
      <h1>Listings</h1>
      <router-link to="/AddListing" class="add-listing-btn">
        Add Listing
      </router-link>
    </div>
    <div class="merchant-listings">
      <div class="merchant-listings-wrapper">
        <TheListing v-for="listing in listings" :key="listing.id" :listing="listing" />
      </div>
    </div>
  </div>
</template>

<script>
import MerchantNavBar from "@/components/MerchantNavBar.vue";
import TheListing from "@/components/TheListing.vue";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import firebaseApp from "../firebase.js";

const db = getFirestore(firebaseApp);

export default {
  name: "MerchantListings",
  components: {
    MerchantNavBar,
    TheListing,
  },
  data() {
    return {
      user: null,
      userId: null,
      listings: [],
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
  },
  methods: {
    async getListings() {
      const q = query(collection(db, "listings"), where("merchantId", "==", this.userId));
      const querySnapshot = await getDocs(q);
      const listings = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      this.listings = listings;
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
  margin: 0 16px;
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
  margin: 32px 35px ;
}

h1 {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 48px;
  font-weight: bold;
  color: black;
  margin-right: 16px;
}

.add-listing-btn {
  display: inline-block;
  padding: 14px 28px;
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
