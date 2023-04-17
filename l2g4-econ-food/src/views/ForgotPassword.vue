<template>
  <div class="container">
    <div class="center">
      <h1>Forgot password?</h1>
      <form>
        <input
          v-model="email"
          type="text"
          name="email"
          placeholder="Email"
          style="width: 240px"
        />
        <br />
        <button id="verifyEmail" @click.prevent="submitForgotPasswordForm">
          Verify Email
        </button>
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
import firebaseApp from "@/firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "@firebase/auth";

const auth = getAuth();

export default {
  name: "ForgotPassword",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async submitForgotPasswordForm() {
      try {
        await sendPasswordResetEmail(auth, this.email);
        alert(
          "An email has been sent to your email address. Please follow the instructions to reset your password."
        );
      } catch (error) {
        alert(error.message);
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
  background-color: rgba(0, 0, 0, 0.4);
}
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 28%;
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
input[type="text"] {
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
#verifyEmail {
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
