<template>
  <div class="app">
    <div class="app-wrapper">
      <CustomerNavigationBar />
      <h1>Cart</h1>
      <div class="listing" v-if="this.cart.merchantId">
        <div class="listing-item">
          <div class="top-container">
            <div class="top-image-container">
              <img :src="this.cart.merchantimageUrl" alt="" />
            </div>
            &emsp;&emsp;&emsp;&emsp;
            <div>
              <h2>{{ this.cart.merchantName }}</h2>
              <div class="text" v-for="item in cartItems" :key="item.productId">
                <h3>{{ item.name }} -x{{ item.quantity }}</h3>
              </div>
              <h3>Total: ${{ totalPrice }}</h3>
            </div>
          </div>
          <div class="buttons">
            <NormalButtonUnfilled
              @click="viewItem"
              :buttonName="viewButtonName"
            ></NormalButtonUnfilled>
            <div>&emsp;&emsp;&emsp;&emsp;</div>
            <NormalButton
              @click="checkoutItem"
              :buttonName="checkoutButtonName"
            ></NormalButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from "@/firebase.js";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  getDocs
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { loadStripe } from '@stripe/stripe-js';
import CustomerNavigationBar from "@/components/CustomerNavigationBar.vue";
import NormalButton from "@/components/NormalButton.vue";
import NormalButtonUnfilled from "@/components/NormalButtonUnfilled.vue";

const db = getFirestore(firebaseApp);

export default {
  name: "Cart",
  data: function () {
    return {
      cartItems: [],
      viewButtonName: "View",
      checkoutButtonName: "Checkout",
      cart: {},
      totalPrice: 0,
      publishableKey: "pk_test_51MqfYlFyCavaBQIYQrdDrJI5LF2F6NyUmKt1MlPpG8aKmgINwC6Z0BE2mHOWVhnKMK8Qp2CMZX7s5FDjfjc7g0yH00dvVLRKBF",
      lineItems: [
        {
          price: "price_1MsU62FyCavaBQIYwKtZkWRJ",
          quantity: 1
        }
      ],
      successURL: "http://localhost:5173/ordersummary",
      cancelURL: "http://localhost:5173/error"
    };
  },
  mounted() {
    this.getUser();
    this.loadUserCart();
  },
  components: {
    CustomerNavigationBar,
    NormalButton,
    NormalButtonUnfilled,
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
    loadUserCart: async function () {
      let allDocuments = await getDocs(collection(db, "carts"));
      let values = allDocuments.docs
        .map((v) => {
          const data = v.data();
          return {
            ...data,
            id: v.id,
          };
        })
        .find((v) => v.uid === this.user.uid);
      this.cart = values;
      this.cartItems = this.cart.products;
      
      for (let i = 0; i < this.cart.products.length; i++) {
        // sum up the total price of the items in cart to display
        const currentProductPrice = this.cart.products[i].price;
        this.totalPrice += currentProductPrice;
        // create products for checkout
      }
    },
    viewItem() {
      const id = this.$route.params.id;
      this.$router.push(`/individualcart/${id}`);
    },
    async checkoutItem() {
      var stripe = await loadStripe(this.publishableKey);
      stripe.redirectToCheckout({
        lineItems: this.lineItems,
        mode: 'payment',
        successUrl: this.successURL,
        cancelUrl: this.cancelURL
      })
    }
  }
}
</script>

<style scoped>
:root {
  font-size: 8px;
}
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;1,900&display=swap");
body {
  background-color: #f5f5ef;
}
h1 {
  font-family: "Nunito Sans", sans-serif;
  font-size: 4rem;
  font-weight: 500;
  text-align: left;
  letter-spacing: 2%;
  line-height: 30px;
  color: #000000;
}
.app {
  margin: auto;
  width: 100%;
  /* max-width: 1048px; */
}
.app-warpper {
  margin: auto;
}
h2 {
  font-family: "Nunito Sans", sans-serif;
  font-weight: 500;
  letter-spacing: 2%;
  line-height: 24px;
  font-size: 18px;
  font-weight: 700;
}
h3 {
  font-family: "Nunito Sans", sans-serif;
  font-weight: 500;
  letter-spacing: 2%;
  line-height: 24px;
  font-size: 15px;
}
.top-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.top-image-container {
  display: flex;
  /* flex-grow: 1; */
  justify-content: left;
  align-items: center;
  border-radius: 28px;
}
img {
  width: 230px;
  height: 180px;
  border-radius: 28px;
}
.listing {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 28px;
}

.listing-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
}
</style>
