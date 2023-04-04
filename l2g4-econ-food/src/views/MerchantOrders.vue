<template>
  <div class="merchant-orders-container">
    <MerchantNavigationBar />
    <div class="merchant-orders">
      <h1 class="merchant-orders-heading">My Orders</h1>
      <div class="merchant-orders-grid">
        <MerchantOrder v-for="(order, index) in orders" :key="index" :order="order" />
        <!-- <div class="merchant-order-actions">
            <button @click="goToChat(order.id)" class="merchant-order-chat-btn">Chat</button>
            <button class="merchant-order-track-btn">Track</button>
        </div> -->

      </div>
    </div>
  </div>
</template>

<script>
import MerchantNavigationBar from "@/components/MerchantNavigationBar.vue";
import MerchantOrder from "@/components/MerchantOrder.vue";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import firebaseApp from "../firebase.js";

const db = getFirestore(firebaseApp);

export default {
  name: "MerchantOrders",
  components: {
    MerchantNavigationBar,
    MerchantOrder,
  },
  data() {
    return {
      user: null,
      userId: null,
      orders: [],
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.userId = user.uid;
        this.getOrders();
      }
    });
  },
  methods: {
    async getOrders() {
      const q = query(collection(db, "orders"), where("merchantID", "==", this.userId));
      const querySnapshot = await getDocs(q);
      const orders = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      this.orders = orders;
    },
    goToChat(orderId) {
      this.$router.push({ name: "OrderChat", params: { orderId: orderId } });
    },
  },
};
</script>

<style scoped>
.merchant-orders-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5ef;
}

.merchant-orders {
  margin-top: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.merchant-orders-heading {
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-align: center;
  text-shadow: 1px 1px #fff;
  color: #16703c;
}

.merchant-orders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  justify-items: center;
}

@media screen and (max-width: 768px) {
  .merchant-orders-heading {
    font-size: 2rem;
  }
}

@media screen and (max-width: 480px) {
  .merchant-orders-heading {
    font-size: 1.5rem;
  }

  .merchant-orders-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

.merchant-order-actions {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.merchant-order-chat-btn {
  width: 120px;
  padding: 10px;
  background-color: #16703c;
  color: #fff;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-family: "Nunito Sans", sans-serif;
  cursor: pointer;
  margin-right: 10px;
}

.merchant-order-chat-btn:hover {
  background-color : #134c2e;
}

.merchant-order-track-btn {
width: 120px;
padding: 10px;
background-color: #b5e1b5;
color: #16703c;
border: none;
border-radius: 30px;
font-size: 1rem;
font-family: "Nunito Sans", sans-serif;
cursor: pointer;
}

.merchant-order-track-btn:hover {
background-color: #a4d8a4;
}
</style>
