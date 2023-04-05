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
        <div
          class="middle-container"
          v-for="item in cartItems"
          :key="item.productId"
        >
          <div class="middle-image-container">
            <img :src="item.imageUrl" alt="" />
          </div>
          &emsp;&emsp;
          <div class="middle-content">
            <h3>{{ item.name }}</h3>
            <h2>Quantity: {{ item.quantity }}</h2>
            <button @click="deleteItem(item)" class="delete-button">
              Delete
            </button>
          </div>
          <h2 style="margin-left: auto">
            Price: ${{ item.price }}&emsp;&emsp;
          </h2>
        </div>
        <div style="margin-left: auto">
          <h3>Subtotal: ${{ totalPrice }} &emsp;</h3>
        </div>
        <div class="bottom-container">
          <NormalButton
            @click="checkoutItem"
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

const db = getFirestore(firebaseApp);

export default {
  name: "IndividualProduct",
  components: {
    CustomerNavigationBar,
    NormalButton,
  },
  data: function () {
    return {
      cartItems: [],
      buttonName: "Checkout",
      merchant: {},
      cart: {},
      totalPrice: 0,
    };
  },
  mounted: async function () {
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
    getUser: function () {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
        }
      });
    },
    // Hi just tryin to creat new order from cart with
    // check out here, can delete if merging - Nat
    checkoutItem(item) {
      const ordersData = {
        merchantData: this.merchant,
        cart: this.cartItems,
        price: this.totalPrice,
        customerId: this.user.uid,
        merchantID: this.merchant.id,
        merchant: this.merchant.name,
        datetime: new Date(),
      };
      const ordersRef = collection(db, "orders");
      addDoc(ordersRef, ordersData)
        .then((docRef) => {
          // Update the newly added document with an orderid field
          const orderid = docRef.id;
          const updateData = { orderid: orderid };
          updateDoc(doc(ordersRef, orderid), updateData)
            .then(() => {
              console.log("Document updated with orderid:", orderid);
            })
            .catch((error) => {
              console.error("Error updating document:", error);
            });
        })
        .catch((error) => {
          console.error("Error adding document:", error);
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
      this.loadMerchant(this.cart.merchantId);

      for (let i = 0; i < this.cart.products.length; i++) {
        const currentProductPrice = this.cart.products[i].price;
        this.totalPrice += currentProductPrice;
      }
    },
    deleteItem: async function (item) {
      const index = this.cartItems.indexOf(item);
      console.log(index);
      if (index !== -1) {
        const deletedItem = this.cartItems.splice(index, 1)[0];
        this.totalPrice -= deletedItem.price;
        await updateDoc(doc(db, "carts", this.cart.id), {
          products: this.cartItems,
        });
      }
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
  align-items: left;
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
  justify-content: left;
  width: 100%;
}
.middle-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.middle-content {
  font-size: 15px;
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
.delete-button {
  font-family: "Nunito Sans", sans-serif;
  font-weight: 500;
  letter-spacing: 2%;
  line-height: 24px;
  font-size: 15px;
  color: #b12e21;
  background-color: #ffffff;
  border: 0px;
}
.delete-button:hover {
  cursor: pointer;
}
.text {
  font-size: 70px;
}
</style>
