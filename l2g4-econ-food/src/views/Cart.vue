<template>
  <div class="app">
    <CustomerNavigationBar />
    <div class="app-wrapper">
      <h1 class="mb-8">Cart</h1>
      <div class="listing" v-if="this.cart.merchantId">
        <div class="listing-item" v-if="this.cartItems.length != 0">
          <div class="top-container">
            <div class="top-image-container">
              <img :src="this.cart.merchantimageUrl" alt="" />
            </div>
            <br />
            <div class="ms-6">
              <h2 class="mb-2">{{ this.cart.merchantName }}</h2>
              <div
                class="text mb-2"
                v-for="item in cartItems"
                :key="item.productId"
              >
                <h3>{{ item.name }} x {{ item.quantity }}</h3>
              </div>
              <h3>Subtotal: ${{ totalPrice.toFixed(2) }}</h3>
            </div>
          </div>
          <div class="buttons">
            <NormalButtonUnfilled
              @click="viewItem"
              :buttonName="viewButtonName"
            ></NormalButtonUnfilled>
            <br />
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
  doc,
  getDocs,
  increment,
  query,
  where,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import router from "../router";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import CustomerNavigationBar from "@/components/CustomerNavigationBar.vue";
import NormalButton from "@/components/NormalButton.vue";
import NormalButtonUnfilled from "@/components/NormalButtonUnfilled.vue";
const db = getFirestore(firebaseApp);
export default {
  name: "Cart",
  data() {
    return {
      user: false,
      userId: "",
      merchantId: "",
      listingIds: [],
      quantities: [],
      cartId: "",
      cartItems: [],
      viewButtonName: "View",
      checkoutButtonName: "Checkout",
      cart: {},
      totalPrice: 0,
      merchant: {},
      orderid: "",
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
    this.loadUserCart();
    this.loadMerchant();
  },
  components: {
    CustomerNavigationBar,
    NormalButton,
    NormalButtonUnfilled,
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
      // to obtain the current balance of the user, first obtain customer doc
      const customerDocQuery = query(
        collection(db, "customers"),
        where("email", "==", this.user.email)
      );
      const customerDocsRef = await getDocs(customerDocQuery);
      let customerDocRef;
      customerDocsRef.forEach((doc) => {
        customerDocRef = doc;
        this.userId = doc.id;
      });
      // to update the merchant balance, first obtain the cart doc
      const cartDocQuery = query(
        collection(db, "carts"),
        where("uid", "==", this.user.uid)
      );
      const cartDocsRef = await getDocs(cartDocQuery);
      let cartDocRef;
      cartDocsRef.forEach((doc) => {
        cartDocRef = doc;
        this.cartId = doc.id;
      });
      // obtain the Firebase id of all the listings from cart doc
      //console.log(cartDocRef.data().products);
      for (let i = 0; i < cartDocRef.data().products.length; i++) {
        this.listingIds.push(cartDocRef.data().products[i].productId);
        this.quantities.push(cartDocRef.data().products[i].quantity);
      }
      // to update merchant balance, now obtain the merchant doc from the cart doc
      const merchantDocQuery = query(
        collection(db, "merchants"),
        where("uid", "==", cartDocRef.data().merchantId)
      );
      const merchantDocsRef = await getDocs(merchantDocQuery);
      let merchantDocRef;
      merchantDocsRef.forEach((doc) => {
        merchantDocRef = doc;
        this.merchantId = doc.id;
      });
      // if balance is sufficient, successful checkout, and update user's balance in Firebase
      if (customerDocRef.data().balance > this.totalPrice) {
        const customerDoc = await doc(db, "customers", this.userId);
        await updateDoc(customerDoc, {
          balance: customerDocRef.data().balance - this.totalPrice,
        });
        // update merchant's balance in Firebase
        const merchantDoc = await doc(db, "merchants", this.merchantId);
        await updateDoc(merchantDoc, {
          balance: merchantDocRef.data().balance + this.totalPrice,
        });
        // update merchant's quantity of listing
        for (let i = 0; i < this.listingIds.length; i++) {
          const listingDoc = await doc(db, "listings", this.listingIds[i]);
          await updateDoc(listingDoc, {
            quantity: increment(-this.quantities[i]),
          });
        }
        // create the order containing all the listings/products in the cart
        const displyId = Math.floor(Math.random() * 10000 + 1);
        const ordersData = {
          merchantData: this.merchant,
          cart: this.cartItems,
          price: this.totalPrice,
          customerId: this.user.uid,
          merchantID: this.merchant.id,
          merchant: this.merchant.name,
          datetime: new Date(),
          status: "Received",
          displayid: displyId,
        };
        const ordersRef = collection(db, "orders");
        addDoc(ordersRef, ordersData)
          .then((docRef) => {
            // Update the newly added document with an orderid field
            const orderid = docRef.id;
            this.orderid = orderid;
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
        // clear cart in view and Firebase
        const cartDoc = await doc(db, "carts", this.cartId);
        await updateDoc(cartDoc, {
          merchantId: "",
          merchantName: "",
          merchantimageUrl: "",
          products: [],
        });
        this.cart = {};
        this.cartItems = [];
        this.totalPrice = 0;
        // show order summary page with successful checkout
        this.$router.push(`/customerorderstatus/${this.orderid}`);
        // if balance is insufficient, redirect to wallet page for topup
      } else {
        alert("Insufficient funds. Top up your wallet.");
        router.push("/wallet");
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;1,900&display=swap");

:root {
  font-size: 8px;
}
.app {
  margin: auto;
  width: 100%;
}
.app-wrapper {
  margin-top: 40px;
  margin-left: 120px;
  margin-right: 120px;
}
body {
  background-color: #f5f5ef;
}
h1 {
  font-family: "Nunito Sans", sans-serif;
  font-size: 4rem;
  font-weight: bold;
  text-align: left;
  letter-spacing: 2%;
  line-height: 30px;
  color: #000000;
}
h2 {
  font-family: "Nunito Sans", sans-serif;
  font-weight: bold;
  letter-spacing: 2%;
  line-height: 24px;
  font-size: 20px;
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
  justify-content: left;
  align-items: center;
  border-radius: 28px;
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
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
  margin-left: 1rem;
  margin-right: 1rem;
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
  margin-right: 20px;
}
</style>
