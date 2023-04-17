<template>
  <CustomerNavigationBar />
  <div class="container">
    <div class="top-container mt-8 mb-10">
      <div class="top-image-container me-8">
        <img :src="this.merchant.imageUrl" alt="" />
      </div>
      <div class="text">
        <h1 class="mb-2">{{ merchant.name }}</h1>
        <h2>{{ merchant.location }}</h2>
        <h2>{{ merchant.operatingHours }}</h2>
      </div>
    </div>
    <div class="middle-container ms-16 me-16 mb-2">
      <div class="middle-image-container me-8">
        <img :src="item.imageUrl" alt="" />
      </div>

      <div class="middle-content">
        <h3 class="mb-2">{{ item.name }}</h3>
        <h2>
          {{ item.description }}
        </h2>
        <h2>Quantity Available: {{ item.quantity }}</h2>
        <h2>Best Before Date: {{ formattedBestByDate }}</h2>
        <h2>Best Before Time: {{ formattedBestByTime }}</h2>
        <h2 class="mt-4">Price: ${{ item.price }}</h2>
      </div>
    </div>
    <div class="bottom-container">
      <CounterButton
        v-bind:setCounterValue="setCounterValue"
        class="mt-6 me-10 mb-10"
      />
      <NormalButton
        @click="addToCart"
        :buttonName="buttonName"
        class="mt-6 ms-10 mb-10"
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
      cartItemCount: 0,
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
      console.log(this.merchantId);
      console.log(this.cart.merchantId);

      if (
        this.cart.merchantId != "" &&
        this.merchant.uid !== this.cart.merchantId
      ) {
        alert("Adding item from another merchant will override current one!");
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

      if (this.counterValue == 0) {
        alert("Must add minimum of one item!");
      } else if (this.item.quantity < this.counterValue) {
        alert("Add item count exceeds item quantity!");
        this.$router.push(`/individualproduct/${this.item.id}`);
      } else if (this.cartItemCount + this.counterValue > this.item.quantity) {
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

      for (let i = 0; i < this.cart.products.length; i++) {
        const currentProduct = this.cart.products[i];
        if (currentProduct.productId === this.item.id) {
          this.cartItemCount = currentProduct.quantity;
        }
      }
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
  font-weight: bold;
  letter-spacing: 2%;
  line-height: 24px;
  font-size: 20px;
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
}
.middle-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  width: 250px;
  height: 180px;
}
.bottom-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px;
}
</style>
