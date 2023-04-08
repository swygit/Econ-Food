<template>
  <div class="background">
    <MerchantNavigationBar></MerchantNavigationBar>
    <h1 class="title">Orders</h1>
    <div v-for="(entries, date) in orders" :key="date">
      <h2 class="date">{{ date }}</h2>
      <div class="orders">
        <OrdersList
          v-for="order in entries"
          :key="order.id"
          :id="order.id"
          :orderid="order.orderid"
          :merchant="order.merchant"
          :datetime="order.datetime"
          :price="order.price"
          :status="order.status"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MerchantNavigationBar from "../components/MerchantNavigationBar.vue";
import OrdersList from "../components/OrdersList.vue";
import firebaseApp from "../firebase.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const db = getFirestore(firebaseApp);
export default {
  name: "CustomerOrders",
  components: {
    MerchantNavigationBar,
    OrdersList,
  },
  data() {
    return {
      orders: {},
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.useremail = auth.currentUser.email;
        this.user = user;
      }
    });
    const myCollection = collection(db, "orders");
    const myCollectionByTime = query(myCollection, orderBy("datetime", "desc"));
    getDocs(myCollectionByTime)
      .then((querySnapshot) => {
        const groupedByDate = {};
        const today = new Date();
        const merchantid = this.$route.params.id;
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // if the customer id matches, display the orders
          if (data.merchantID === merchantid) {
            const order = {
              id: doc.id,
              orderid: data.orderid,
              merchant: data.merchant,
              price: data.price,
              status: data.status,
              // The line of code below basically changes the timestamp format in fire base to the
              // format that we want
              datetime: data.datetime
                .toDate()
                .toLocaleString("en-SG", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
                .replace(",", " "),
            };
            // Check if the date is today
            const orderDateTime = data.datetime.toDate();
            let dateDisplay = "";
            if (
              orderDateTime.getFullYear() === today.getFullYear() &&
              orderDateTime.getMonth() === today.getMonth() &&
              orderDateTime.getDate() === today.getDate()
            ) {
              dateDisplay = "Today";
            } else {
              // Group the data by dates
              dateDisplay = orderDateTime.toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              });
            }
            if (!groupedByDate[dateDisplay]) {
              groupedByDate[dateDisplay] = [order];
            } else {
              groupedByDate[dateDisplay].push(order);
            }
          }
        });
        this.orders = groupedByDate;
      })
      .catch((error) => {
        console.error("Error getting documents:", error);
      });
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Nunito Sans");
.title {
  font-size: 50px;
  font-family: "Nunito Sans", sans-serif;
  margin-bottom: 20px;
}

.date {
  font-size: 20px;
}
.background {
  background-size: cover;
  background-color: #f5f5ef;
}
</style>
