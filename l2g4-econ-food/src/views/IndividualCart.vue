<template>
  <CustomerNavigationBar />
  <div class="container" v-if="this.cartItems.length != 0">
    <div class="top-container">
      <div class="top-image-container mt-8 mb-8 me-8">
        <img :src="this.merchant.imageUrl" alt="" />
      </div>

      <div class="text">
        <h1 class="mb-2">{{ merchant.name }}</h1>
        <h2>{{ merchant.location }}</h2>
        <h2>{{ merchant.operatingHours }}</h2>
      </div>
    </div>
    <div
      class="middle-container mt-6"
      v-for="item in cartItems"
      :key="item.productId"
    >
      <div class="middle-image-container ms-16 me-6">
        <img :src="item.imageUrl" alt="" />
      </div>

      <div class="middle-content">
        <h3>{{ item.name }}</h3>
        <h2>Quantity: {{ item.quantity }}</h2>
        <button @click="deleteItem(item)" class="delete-button">Delete</button>
      </div>
      <h2 style="margin-left: auto" class="me-16">
        Price: ${{ item.price.toFixed(2) }}
      </h2>
    </div>
    <div style="margin-left: auto" class="mt-6 me-16">
      <h3>Subtotal: ${{ totalPrice.toFixed(2) }}</h3>
    </div>
    <div class="bottom-container">
      <NormalButton
        @click="checkoutItem"
        :buttonName="buttonName"
      ></NormalButton>
      <p></p>
      <NormalButtonUnfilled
        @click="back"
        :buttonName="backButton"
      ></NormalButtonUnfilled>
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
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import CustomerNavigationBar from "@/components/CustomerNavigationBar.vue";
import NormalButton from "@/components/NormalButton.vue";
import NormalButtonUnfilled from "@/components/NormalButtonUnfilled.vue";

const db = getFirestore(firebaseApp);

export default {
  name: "IndividualProduct",
  components: {
    CustomerNavigationBar,
    NormalButton,
    NormalButtonUnfilled,
  },
  data: function () {
    return {
      user: false,
      userId: "",
      merchantId: "",
      listingIds: [],
      quantities: [],
      cartId: "",
      cartItems: [],
      buttonName: "Checkout",
      backButton: "Back",
      merchant: {},
      cart: {},
      totalPrice: 0,
    };
  },
  mounted: async function () {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
    this.loadMerchant();
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
        const displyId = Math.floor(Math.random() * 100 + 1);

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
    back: function () {
      this.$router.push(`/cart/${this.user.uid}`);
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
p {
  padding: 25px 50px;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: left;
  /* grid-template-columns: 1fr 1fr 1fr; */
  background-color: #ffffff;
  margin-left: 18rem;
  margin-right: 18rem;
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
  align-items: center;
  justify-content: left;
  width: 100%;
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
  margin-top: 8rem;
  margin-bottom: 8rem;
}
.delete-button {
  font-family: "Nunito Sans", sans-serif;
  font-weight: bold;
  letter-spacing: 2%;
  line-height: 24px;
  font-size: 16px;
  color: #b12e21;
  background-color: #ffffff;
  border: 0px;
}
.delete-button:hover {
  cursor: pointer;
}
</style>
