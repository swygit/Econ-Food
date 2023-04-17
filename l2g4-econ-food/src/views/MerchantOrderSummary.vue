<template>
  <MerchantNavigationBar />
  <div class="loading" v-show="isLoading"><h1>Loading...</h1></div>
  <div v-show="!isLoading" class="container">
    <div class="top-container mt-8 mb-8">
      <div class="top-image-container me-8">
        <img :src="this.merchant.imageUrl" alt="" />
      </div>
      <div class="text">
        <h1 class="merchant-name mb-2">{{ merchant.name }}</h1>
        <h2 class="location">{{ merchant.location }}</h2>
        <h2 class="detail">{{ merchant.operatingHours }}</h2>
      </div>
    </div>
    <div class="order-id mb-2">
      <h1>Order #{{ orderidDisplay }}</h1>
    </div>
    <div class="time mb-6">
      <h2>Recieved at {{ datetime }}</h2>
    </div>
    <h1 class="mb-2">Order Summary</h1>
    <div
      class="middle-container mt-4 mb-1"
      v-for="item in cart"
      :key="item.productId"
    >
      <div class="middle-content">
        <h3>{{ item.name }} x {{ item.quantity }}</h3>
      </div>
      <h2 style="margin-left: auto">
        ${{ item.price.toFixed(2) }}&emsp;&emsp;
      </h2>
    </div>
    <div style="margin-left: auto" class="mt-6">
      <h3>Subtotal: ${{ totalPrice.toFixed(2) }}</h3>
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
import { collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import NormalButton from "@/components/NormalButton.vue";
import MerchantNavigationBar from "@/components/MerchantNavigationBar.vue";

const db = getFirestore(firebaseApp);

export default {
  name: "OrderSummary",
  components: {
    NormalButton,
    MerchantNavigationBar,
  },
  data: function () {
    return {
      isLoading: true,
      backToOrder: "Back",
      cart: [],
      merchant: {},
      orderid: "",
      datetime: "",
      totalPrice: 0,
      customerid: "",
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
      this.orderidDisplay = values.displayid;
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
      this.$router.push(`/merchantorderstatus/${orderid}`);
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
  margin-top: 20px;
  margin-bottom: 50px;
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
