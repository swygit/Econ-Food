<template>
  <div class="container">
    <div class="center">
      <h1>Register</h1>
      <form @submit.prevent="register">
        <div class="buttons">
          <button
            :class="{ active: isCustomer }"
            @click.prevent="toggle('customer')"
          >
            Customer
          </button>
          <button
            :class="{ active: !isCustomer }"
            @click.prevent="toggle('merchant')"
          >
            Merchant
          </button>
        </div>
        <input type="email" placeholder="Email" v-model="email" required />
        <input type="password" placeholder="Password" v-model="password" />
        <input
          type="password"
          placeholder="Confirm Password"
          v-model="confirmpassword"
        />
        <button type="submit" id="register">Register</button>
        <p v-if="errMsg" v-text="errMsg" class="error-message"></p>
        <div class="links">
          <router-link to="/login">
            <div class="link">Login</div>
          </router-link>
          <router-link to="/forgotpassword">
            <div class="link">Forgot password?</div>
          </router-link>
        </div>
      </form>
    </div>
    <div class="topleft">
      <a href="/">
        <img src="../assets/logowhite.png" class="logo" />
      </a>
    </div>
  </div>
</template>
<script>
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

import firebaseApp from "../firebase.js";
import router from "../router";
export default {
  name: "Register",
  data() {
    return {
      // default option is Customer
      isCustomer: true,
      user: false,
      email: "",
      password: "",
      confirmpassword: "",
      errMsg: "",
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
  methods: {
    toggle(client) {
      if (client === "customer") {
        this.isCustomer = true;
      } else {
        this.isCustomer = false;
      }
    },
    async register() {
      this.errMsg = "";
      if (this.password === this.confirmpassword) {
        try {
          const result = await createUserWithEmailAndPassword(
            getAuth(firebaseApp),
            this.email,
            this.password
          );
          // set up the customer data
          if (this.isCustomer) {
            const customerData = {
              name: "",
              email: this.email,
              phoneNumber: "",
              uid: result.user.uid,
              balance: 0,
              topUpHistory: [],
              updatedProfile: false
            };
            const customerCart = {
              uid: result.user.uid,
              products: [],
              merchantId: "",
              merchantName: "",
              merchantimageUrl: "",
            };
            await addDoc(collection(db, "customers"), customerData);
            await addDoc(collection(db, "carts"), customerCart);
            // set up merchant data
          } else if (!this.isCustomer) {
            const merchantData = {
              imageUrl: "",
              name: "",
              businessType: "",
              email: this.email,
              operatingHours: "",
              location: "",
              phoneNumber: "",
              bankNumber: "",
              uid: result.user.uid,
              balance: 0,
              updatedProfile: false,
            };
            console.log("merchant", merchantData);
            await addDoc(collection(db, "merchants"), merchantData);
          }
          console.log("Successfully registered!");
          router.push("/login");
        } catch (error) {
          console.log(error);
          switch (error.code) {
            case "auth/email-already-in-use":
              this.errMsg = "Email already in use. Try another one.";
              break;
            case "auth/invalid-email":
              this.errMsg = "Invalid email. Try again.";
              break;
          }
        }
      } else {
        this.errMsg = "Passwords do not match!";
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Nunito Sans");
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/bg2png.png");
  background-size: cover;
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}
.container::before {
  content: "";
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.4)
}
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
}
h1 {
  color: #fff;
  font-size: 40px;
  font-family: "Nunito Sans";
  text-shadow: 2px 2px #000;
  margin-bottom: 30px;
}
form {
  background-color: #fff;
  padding: 20px;
  border-radius: 30px;
  box-shadow: 0px 0px 10px #999;
  display: flex;
  flex-direction: column;
  align-items: center;
}
input[type="email"],
input[type="password"] {
  display: block;
  width: 90%;
  margin-bottom: 10px;
  padding: 10px;
  border: none;
  border-radius: 30px;
  box-shadow: 0px 0px 5px #999;
  font-size: 16px;
  font-family: "Nunito Sans";
}
#register {
  display: block;
  width: 95%;
  margin-bottom: 10px;
  padding: 10px;
  border: none;
  border-radius: 30px;
  box-shadow: 0px 0px 5px #999;
  background-color: #16703c;
  color: #fff;
  font-size: 16px;
  font-family: "Nunito Sans";
  cursor: pointer;
}
p {
  font-family: "Nunito Sans";
}
.error-message {
  font-size: 1.8rem;
}
.links {
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin: 0 auto;
  margin-top: 20px;
}
.link {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  font-family: "Nunito Sans";
}
button {
  font-family: "Nunito Sans";
  font-size: 16px;
  height: 50px;
  width: 150px;
  margin-left: 15px;
  margin-bottom: 15px;
  margin-right: 15px;
  border-radius: 15px;
  border-radius: 30px;
  box-shadow: 0px 0px 5px #999;
  cursor: pointer;
}
.active {
  background-color: #16703c;
  color: white;
}
.topleft {
  position: absolute;
  top: 0;
  left: 0;
}
.logo {
  width: 200px;
  height: 100px;
}
</style>
