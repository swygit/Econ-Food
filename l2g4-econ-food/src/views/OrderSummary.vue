<template>
  <CustomerNavigationBar />
  <div class="container">
    <div class="top-container">
      <div class="top-image-container">
        <img :src="this.merchant.imageUrl" alt="" />
      </div>
      <div class="text">
        <h1 class="merchant-name">{{ merchant.name }}</h1>
        <h2 class="location">{{ merchant.location }}</h2>
        <h2 class="detail">{{ merchant.operatingHours }}</h2>
      </div>
    </div>
    <div class="order-id">
      <h1>Order #{{ orderid }}</h1>
    </div>
    <div class="time">
      <h2>Completed at {{ datetime }}</h2>
    </div>
    <h1>Order Summary</h1>
    <div class="middle-container" v-for="item in cart" :key="item.productId">
      <div class="middle-content">
        <h3>{{ item.name }} x {{ item.quantity }}</h3>
      </div>
      <h2 style="margin-left: auto">${{ item.price }}&emsp;&emsp;</h2>
    </div>
    <div style="margin-left: auto">
      <h3>Subtotal: ${{ totalPrice }}</h3>
    </div>

    <div class="bottom-container">
      <NormalButton
        @click="goBackOrders(orderid)"
        :buttonName="backToOrder"

      ></NormalButton>
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
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import NormalButton from "@/components/NormalButton.vue";
import CustomerNavigationBar from "@/components/CustomerNavigationBar.vue";

const db = getFirestore(firebaseApp);

export default {
  name: "OrderSummary",
  components: {
    NormalButton,
    CustomerNavigationBar,
  },
  data: function () {
    return {
      backToOrder: "Back",
      cart: [],
      merchant: {},
      orderid: "",
      datetime: "",
      totalPrice: 0,
      customerid: "",
    };
  },
  mounted: async function () {
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
      (this.datetime = this.datetime
        .toDate()
        .toLocaleString("en-SG", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
        .replace(",", " ")),
        console.log(this.datetime);
      for (let i = 0; i < this.cart.length; i++) {
        const currentProductPrice = this.cart[i].price;
        this.totalPrice += currentProductPrice;
      }
    },
    goBackOrders(orderid) {
      this.$router.push(`/customerorderstatus/${orderid}`);
    },
  },
};
</script>

<style scoped>
h1 {
  font-family: "Nunito Sans", sans-serif;
  font-weight: 500;
  letter-spacing: 2%;
  line-height: 24px;
  font-size: 25px;
  font-weight: 700;
}
h2 {
  font-family: "Nunito Sans", sans-serif;
  font-weight: 500;
  letter-spacing: 2%;
  line-height: 24px;
  font-size: 15px;
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
p {
  padding: 25px 50px;
}
.container {
  display: flex;
  flex-direction: column;
  /* grid-template-columns: 1fr 1fr 1fr; */
  background-color: #ffffff;
  /* margin: 100px; */
  display: flex;
  align-items: center;
  justify-content: center;
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
  align-items: left;
  width: 200px;
  height: 120px;
}
.bottom-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px;
}
.text {
  font-size: 70px;
}
</style>
