<template>
  <CustomerNavBar></CustomerNavBar>
  <div>
    <h1 class="title">Orders</h1>
    <div class="orders">
      <OrdersList
        v-for="order in orders"
        :key="order.id"
        :id="order.id"
        :orderid="order.orderid"
        :merchant="order.merchant"
        :datetime="order.datetime"
        :price="order.price"
      />
    </div>
  </div>
</template>

<script>
import CustomerNavBar from "../components/CustomerNavBar.vue";
import OrdersList from "../components/OrdersList.vue";
import firebaseApp from "../firebase.js";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const db = getFirestore(firebaseApp);
export default {
  name: "CustomerOrders",
  components: {
    CustomerNavBar,
    OrdersList,
  },
  data() {
    return {
      orders: [],
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
    getDocs(myCollection)
      .then((querySnapshot) => {
        const orders = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const order = {
            id: doc.id,
            orderid: data.orderid,
            merchant: data.merchant,
            price: data.price,
            datetime: data.datetime,
            bestBy: data.bestBy,
          };
          orders.push(orders);
        });
        this.orders = orders;
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
</style>
