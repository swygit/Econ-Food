<template>
  <div class="container" v-if="user">
      <MerchantNavigationBar />
      <div class="top">
          <div class="revenue">
              Lifetime Revenue
              <h1>${{ revenue.toFixed(2) }}</h1>
          </div>
          
          <div class="numOrders">
               Lifetime orders
              <h1>{{ numOrders }}</h1>
          </div>
          
          <div class="activeListings">
              <a href="/merchantlistings" id="links">Active listings</a>
              <h1>{{ activeListings }}</h1>
          </div>
          
          <div class="topListing">
              Top Listing
              <h4>{{ topListing }}</h4>
          </div>
      </div>  
      <div class="middle">
          <h2 class="mb-2">Daily Revenue</h2>
          <line-chart v-if="loaded" :data="dailyRevenue" :colors="['#16703c']" height="60rem" ></line-chart>
      </div>
      <div class="bottom">
          <div class="bottomLeft me-6">
              <h3 class="mb-2">Daily number of orders</h3>
              <bar-chart v-if="loaded" :data="dailyOrders" :colors="['#16703c']" ></bar-chart>
          </div>
          <div class="bottomRight ms-6">
              <h3 class="mb-2">Top listings by revenue</h3>
              <column-chart v-if="loaded" :data="topListings" :colors="['#16703c']" prefix="$" ></column-chart>
          </div>
      </div>
  </div>
</template>

<script defer> 

import firebaseApp from "@/firebase.js";
import { getFirestore } from "firebase/firestore";
import {
collection,
getDocs,
query,
where
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import MerchantNavigationBar from "@/components/MerchantNavigationBar.vue";

const db = getFirestore(firebaseApp);

export default {
  name: "Dashboard",
  components: {
      MerchantNavigationBar,
  },
  data() {
      return {
          loaded: false,
          user: false,
          userId: "",
          revenue: 0,
          numOrders: 0,
          activeListings: 0,
          dailyRevenue : {},
          dailyOrders: {},
          topListings: {},
          topListing: ""
      };
  },
  mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
      if (user) {
          this.user = user;
          this.userId = user.uid;
          this.getData()
      }
      });
  },
  methods: {
      async getData() {
          // prepare dailyRevenue and dailyOrders with keys as dates of the month up till current date
          const today = new Date();
          const currentYear = today.getYear() + 1900
          const currentMonth = (today.getMonth() + 1).toString().padStart(2, 0)
          for (let i = 1; i < today.getDate() + 1; i++) {
              this.dailyRevenue[currentYear + '-' + currentMonth + '-' + i.toString().padStart(2, 0)] = 0
              this.dailyOrders[currentYear + '-' + currentMonth + '-' + i.toString().padStart(2, 0)] = 0
          }
          // load merchant lifetime revenue
          const merchantDocQuery = query(
              collection(db, "merchants"),
              where("email", "==", this.user.email)
          );
          const merchantDocsRef = await getDocs(merchantDocQuery);
          let merchantDocRef;
          merchantDocsRef.forEach((doc) => {
              merchantDocRef = doc;
          });
          this.revenue = merchantDocRef.data().balance
          // load merchant total number of listings and prepare topListings with keys as tuple of (Firebase Listing ID, Listing Name)
          const listingsDocQuery = query(
              collection(db, "listings"),
              where("merchantId", "==", this.userId)
          );
          const listingDocsRef = await getDocs(listingsDocQuery);
          listingDocsRef.forEach((doc) => {
              // get active of listings
              const listingExpiryDate = new Date(doc.data().bestByDate)
              if (listingExpiryDate > today) {
                this.activeListings += 1
              }
              // load tuple into topListings
              this.topListings[[doc.id, doc.data().name]] = 0
          })
          // load merchant lifetime number of orders and daily number of orders
          const ordersDocQuery = query(
              collection(db, "orders"),
              where("merchantID", "==", this.userId)
          );
          const orderDocsRef = await getDocs(ordersDocQuery);
          orderDocsRef.forEach((doc) => {
              // increment total number of orders
              this.numOrders += 1
              // daily revenue
              const orderMonth = (doc.data().datetime.toDate().getMonth() + 1).toString().padStart(2, 0)
              // only get orders that belong to the current month
              if (orderMonth == currentMonth) {
                  const orderDay = doc.data().datetime.toDate().getDate().toString().padStart(2, 0)
                  const orderDate = currentYear + '-' + orderMonth + '-' + orderDay
                  // increment daily number of orders
                  this.dailyOrders[orderDate] += 1
                  // increment daily revenue from all items in order
                  for (let i = 0; i < doc.data().cart.length; i++) {
                      this.dailyRevenue[orderDate] +=  doc.data().cart[i].price // * doc.data().cart[i].quantity
                  }
              }
              // top listings
              for (let i = 0; i < doc.data().cart.length; i++) {
                  const productId = doc.data().cart[i].productId
                  const productName = doc.data().cart[i].name
                  this.topListings[[productId, productName]] += doc.data().cart[i].price // * doc.data().cart[i].quantity
              }
          });
          // modify topListings to show only top 5 listings by revenue
          var items = Object.keys(this.topListings).map((key) => { 
              return [key, this.topListings[key]] 
          });
          items.sort((first, second) => { 
              return first[1] - second[1] 
          })
      
          var finalTopListings = {}
          var count = 0
          for (let i = items.length-1; i >= 0 ; i--) {
              // get top 5 listings by revenue
              if (count == 5) {
                  break;
              }
              // get top listing
              if (count == 0) {
                  this.topListing = items[i][0].split(',')[1]
              }
              finalTopListings[items[i][0].split(',')[1]] = items[i][1]
              count += 1
          }
          this.topListings = finalTopListings
          this.loaded = true
      },
  }
  };
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;1,900&display=swap");

.container {
  font-family: 'Nunito Sans'
}

h1 {
  font-size: 50px
}

h2 {
  font-size: 42px;
  margin-left: 20px;
}
h3 {
  font-size: 30px;
  margin-left: 20px;
}
h4 {
  font-size: 30px;
}
a {
    color: white;
    text-decoration: none;
}
.top {
  display: flex;
  flex-direction: row;
  margin: 2rem 6rem 0rem 6rem;
}
.middle {
  margin: 1rem 6rem 0rem 6rem;
}
.revenue, .numOrders, .activeListings, .topListing {
  flex: 1;
  margin-right: 20px;
  background-color: #16703c;
  color: #fff;
  border-radius: 30px;
  font-size: 24px;
  padding: 20px;
  margin: 20px;
}
.bottom {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  margin: 6rem 6rem 6rem 6rem;
}
.bottomLeft, .bottomRight {
  flex: 1;
}
</style>