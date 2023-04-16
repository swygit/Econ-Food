<template>
  <CustomerNavigationBar />
  <div class="loading" v-show="isLoading"><h1>Loading...</h1></div>
  <div v-show="!isLoading" class="container">
    <div class="top-container mt-8 mb-8">
      <div class="top-image-container me-8">
        <img :src="this.merchant.imageUrl" alt="" />
      </div>
      <div class="text">
        <h1 class="mb-2">{{ merchant.name }}</h1>
        <h2>{{ merchant.location }}</h2>
        <h2>{{ merchant.operatingHours }}</h2>
      </div>
    </div>
    <div class="order-id mb-2">
      <h1>Order #{{ orderidDisplay }}</h1>
    </div>
    <div class="time">
      <h2>Received at {{ datetime }}</h2>
    </div>
    <OrderStatusIcon :status="orderstatus" />

    <div class="bottom-container mt-4 mb-1">
      <button @click="viewDetail(orderid)" id="viewdetails">
        View Details
      </button>
    </div>

    <div>
      <button @click="goToChat(orderid)" id="chat">Chat With Merchant</button>
    </div>

    <div class="bottom-container mt-1 mb-4">
      <button @click="goBack(customerid)" id="back">Back</button>
    </div>
  </div>
</template>

<script>
import firebaseApp from "@/firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const db = getFirestore(firebaseApp);
import NormalButton from "@/components/NormalButton.vue";
import NormalButtonUnfilled from "@/components/NormalButtonUnfilled.vue";
import CustomerNavigationBar from "@/components/CustomerNavigationBar.vue";
import OrderStatusIcon from "@/components/OrderStatusIcon.vue";
export default {
  name: "OrderSummary",
  components: {
    NormalButton,
    NormalButtonUnfilled,
    CustomerNavigationBar,
    OrderStatusIcon,
  },
  data: function () {
    return {
      isLoading: true,
      viewdetails: "View Details",
      chat: "Chat with Merchant",
      back: "Back",
      merchant: {},
      orderid: "",
      datetime: "",
      totalPrice: 0,
      customerid: "",
      orderstatus: "",
      orderidDisplay: "",
    };
  },
  mounted: async function () {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
    this.getUser();
    this.loadOrder();
  },
  methods: {
    getUser: function () {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
        }
      });
    },
    loadOrder: async function () {
      let allDocuments = await getDocs(collection(db, "orders"));
      const orderid = this.$route.params.id;
      console.log(orderid); // Output: 123
      let values = allDocuments.docs
        .map((v) => {
          const data = v.data();
          return {
            ...data,
            id: v.id,
          };
        })
        .find((v) => v.orderid === orderid);
      this.merchant = values.merchantData;
      this.cart = values.cart;
      this.orderid = values.orderid;
      this.datetime = values.datetime;
      this.customerid = values.customerId;
      this.orderstatus = values.status;
      this.orderidDisplay = values.displayid;
      this.datetime = this.datetime
        .toDate()
        .toLocaleString("en-SG", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
        .replace(",", " ");
    },
    viewDetail(orderid) {
      this.$router.push(`/order/${orderid}`);
    },
    goToChat(orderId) {
      this.$router.push({ name: "OrderChat", params: { orderId: orderId } });
    },
    goBack(customerid) {
      this.$router.push(`/customerorders/${customerid}`);
    },
  },
};
</script>

<style scoped>
h1 {
  font-family: "Nunito Sans", sans-serif;
  font-weight: bold;
  letter-spacing: 2%;
  line-height: 24px;
  font-size: 26px;
  font-weight: 700;
}
h2 {
  font-family: "Nunito Sans", sans-serif;
  font-weight: 500;
  letter-spacing: 2%;
  line-height: 24px;
  font-size: 16px;
}
h3 {
  font-family: "Nunito Sans", sans-serif;
  font-weight: 500;
  letter-spacing: 2%;
  line-height: 24px;
  font-size: 20px;
  margin-right: 170px;
}
h4 {
  font-family: "Nunito Sans", sans-serif;
  font-weight: 700;
  letter-spacing: 2%;
  line-height: 24px;
  font-size: 15px;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  margin-left: 18rem;
  margin-right: 18rem;
}
.top-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.top-image-container {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
}
.middle-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.middle-left-content {
  justify-content: left;
  display: flex;
  align-items: left;
  flex-direction: column;
}
.middle-right-content {
  justify-content: right;
  display: flex;
  align-items: right;
  flex-direction: column;
}
.middle-content {
  justify-content: right;
  display: flex;
  align-items: right;
}
img {
  width: 250px;
  height: 180px;
}
.bottom-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
#viewdetails {
  display: block;
  width: 220px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  border: none;
  border-radius: 30px;
  background-color: #16703c;
  color: #fff;
  font-size: 16px;
  font-family: "Nunito Sans";
  cursor: pointer;
}
#back,
#chat {
  display: block;
  width: 220px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #16703c;
  border-radius: 30px;
  background-color: #ffffff;
  color: #000;
  font-size: 16px;
  font-family: "Nunito Sans";
  cursor: pointer;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.loading h1 {
  font-size: 3rem;
  color: white;
  text-align: center;
}
</style>
