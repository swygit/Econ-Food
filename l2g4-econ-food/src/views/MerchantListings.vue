<template>
    <div>
      <h1 class="title"> Merchant Listings</h1>
      <div class="listings">
        <TheListing v-for="listing in listings"
            :key="listing.id"
            :id="listing.id"
            :imageUrl="listing.imageUrl"
            :name="listing.name"
            :price="listing.price"
            :quantity="listing.quantity"
            :bestBy="listing.bestBy"
            @updateQuantity="updateQuantity(listing.id, $event)"
            @deleteListing="deleteListing(listing.id)" />
      </div>
    </div>
  </template>
  
  <script>
  import TheListing from "@/components/TheListing.vue";
  import firebaseApp from "../firebase.js";
    import { getFirestore, collection, getDocs } from "firebase/firestore";
    import { getAuth, onAuthStateChanged } from "@firebase/auth";

    const db = getFirestore(firebaseApp);
  

  export default {
    name: 'MerchantListings',
    components: {
      TheListing,
    },
    data() {
      return {
        listings: []
      }
    },
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            this.useremail = auth.currentUser.email;
            this.user = user;
        }
        });
      const myCollection = collection(db, String(this.useremail)+'listings');
      getDocs(myCollection)
        .then((querySnapshot) => {
          const listings = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const listing = {
              id: doc.id,
              imageUrl: data.imageUrl,
              name: data.name,
              price: data.price,
              quantity: data.quantity,
              bestBy: data.bestBy
            };
            listings.push(listing);
          });
          this.listings = listings;
        })
        .catch((error) => {
          console.error('Error getting documents:', error);
        });
    },
  methods: {
    deleteListing(id) {
      this.listings = this.listings.filter((listing) => listing.id !== id);
    }
  }

}
  </script>

  <style>
  .title {
    font-size: 50px;
    font-family: 'Nunito Sans', sans-serif;
    margin-bottom: 20px;
  }

</style>

  

   <!-- <template>
    <div>
      <CustomerNavigationBar />
    </div>
  </template>
  
  <script>
  import CustomerNavigationBar from "@/components/CustomerNavigationBar.vue";
  
  export default {
      name: "MerchantListings",
      components: {
          CustomerNavigationBar
      }
  };
  </script> -->