<template>
  <div class="app">
    <div class="app-wrapper">
      <CustomerNavigationBar />
      <div class="container">
        <div class="top-container">
          <div class="top-image-container">
            <img :src="this.merchant.imageUrl" alt="" />
          </div>
          &emsp;&emsp;
          <div class="text">
            <h1>{{ merchant.name }}</h1>
            <h2>{{ merchant.location }}</h2>
            <h2>{{ merchant.operatingHours }}</h2>
          </div>
        </div>
        <div class="middle-container">
          <div class="middle-image-container">
            <img :src="item.imageUrl" alt="" />
          </div>
          &emsp;&emsp;
          <div class="middle-content">
            <h3>{{ item.name }}</h3>
            <h2>
              {{ item.description }}
            </h2>
            <h2>Quantity Available: {{ item.quantity }}</h2>
            <h2>Best Before Date: {{ formattedBestByDate }}</h2>
            <h2>Best Before Time: {{ formattedBestByTime }}</h2>
            <h2>Price: ${{ item.price }}</h2>
          </div>
        </div>
        <div class="bottom-container">
          <CounterButton v-bind:setCounterValue="setCounterValue" />
          <div>
            <p></p>
          </div>
          <NormalButton
            @click="addToCart"
            :buttonName="buttonName"
          ></NormalButton>
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
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import CustomerNavigationBar from "@/components/CustomerNavigationBar.vue";
import NormalButton from "@/components/NormalButton.vue";
import CounterButton from "@/components/CounterButton.vue";

const db = getFirestore(firebaseApp);

export default {
  name: "IndividualProduct",
  components: {
    CustomerNavigationBar,
    NormalButton,
    CounterButton,
  },
  data: function () {
    return {
      item: {},
      buttonName: "Add To Cart",
      counterValue: 0,
      merchant: {},
      cart: {},
    };
  },
  mounted: async function () {
    this.loadItems();
    this.loadMerchant();
    this.getUser();
    this.loadUserCart();
  },
  methods: {
    loadMerchant: async function (id) {
      let allDocuments = await getDocs(collection(db, "merchants"));
      let values = allDocuments.docs
        .map((v) => {
          const data = v.data();
          return {
            ...data,
            id: data.uid,
          };
        })
        .find((v) => v.id === id);
      this.merchant = values;
    },
    setCounterValue: function (counterValue) {
      this.counterValue = counterValue;
    },
    loadItems: async function () {
      const id = this.$route.params.id;
      let allDocuments = await getDocs(collection(db, "listings"));
      let values = allDocuments.docs
        .map((v) => {
          const data = v.data();
          return {
            ...data,
            id: v.id,
          };
        })
        .find((v) => v.id === id);
      this.item = values;
      this.loadMerchant(this.item.merchantId);
    },
    getUser: function () {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
        }
      });
    },
    addToCart: async function () {
      // (-1 means not found)

      if (this.merchant.uid !== this.cart.merchantId) {
        this.cart.products = [];
      }
      let indexProduct = -1;

      for (let i = 0; i < this.cart.products.length; i++) {
        const currentProduct = this.cart.products[i];
        if (currentProduct.productId === this.item.id) {
          indexProduct = i;
          break;
        }
      }

      if (this.item.quantity < this.counterValue) {
        alert("Add item count exceeds item quantity!");
        this.$router.push(`/individualproduct/${this.item.id}`);
      } else if (indexProduct === -1) {
        this.cart.merchantId = this.merchant.uid;
        this.cart.merchantName = this.merchant.name;
        this.cart.merchantimageUrl = this.merchant.imageUrl;
        const product = {
          productId: this.item.id,
          quantity: this.counterValue,
          price: this.item.price * this.counterValue,
          name: this.item.name,
          imageUrl: this.item.imageUrl,
        };
        this.cart.products.push(product);
        await updateDoc(doc(db, "carts", this.cart.id), this.cart);
        this.$router.push(`/cart/${this.user.uid}`);
      } else {
        this.cart.products[indexProduct].quantity += this.counterValue;
        await updateDoc(doc(db, "carts", this.cart.id), this.cart);
        this.$router.push(`/cart/${this.user.uid}`);
      }

      // if (indexProduct === -1) {
      //   this.cart.merchantId = this.merchant.uid;
      //   this.cart.merchantName = this.merchant.name;
      //   this.cart.merchantimageUrl = this.merchant.imageUrl;
      //   const product = {
      //     productId: this.item.id,
      //     quantity: this.counterValue,
      //     price: this.item.price * this.counterValue,
      //     name: this.item.name,
      //     imageUrl: this.item.imageUrl,
      //   };
      //   this.cart.products.push(product);
      // } else {
      //   this.cart.products[indexProduct].quantity += this.counterValue;
      // }

      // await updateDoc(doc(db, "carts", this.cart.id), this.cart);
      // this.$router.push(`/cart/${this.user.uid}`);
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
    },
  },
  computed: {
    formattedBestByDate() {
      const date = new Date(this.item.bestByDate);
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      };
      return date.toLocaleDateString("en-SG", options);
    },
    formattedBestByTime() {
      const date = new Date(this.item.bestByDate);
      const options = {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      };
      return date.toLocaleTimeString("en-SG", options);
    },
  },
};
</script>

<style scoped>
.app {
  margin: auto;
  width: 100%;
  /* max-width: 1048px; */
}
.app-warpper {
  margin: auto;
}
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
}
p {
  padding: 25px 50px;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* grid-template-columns: 1fr 1fr 1fr; */
  background-color: #ffffff;
  /* margin: 100px; */
  display: flex;
  align-items: center;
  justify-content: center;
}
.top-container {
  margin-top: 20px;
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
  align-items: center;
  justify-content: center;
  width: 100%;
}
.middle-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.middle-content {
}
img {
  width: 230px;
  height: 180px;
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
