<template>
  <div class="container">
    <div class="center">
      <h1>Login</h1>
      <form @submit.prevent="login">
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
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          required
        />
        <p v-if="errMsg" v-text="errMsg" class="error-message"></p>
        <button type="submit" id="login">Login</button>
        <button id="loginGoogle" @click.prevent="loginGoogle">
          <img id="googleLogo" src="https://i.ibb.co/ySrpjSd/google-icon.png" />
          Login with Google
        </button>
        <div class="links">
          <router-link to="/register">
            <div class="link">Register</div>
          </router-link>
          <router-link to="/forgotpassword">
            <div class="link">Forgot password?</div>
          </router-link>
        </div>
      </form>
    </div>

    <div class="topleft">
      <a href="/">
        <img src="../assets/logowhite.png" class='logo'>
      </a>
    </div>

  </div>
</template>

<script>
import App from "../App.vue";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import firebaseApp from "../firebase.js";
import router from "../router";

const provider = new GoogleAuthProvider();

const db = getFirestore(firebaseApp);

export default {
  components: { App },
  name: "Login",
  data() {
    return {
      // default option is Customer
      isCustomer: true,
      user: false,
      email: "",
      password: "",
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
    async login() {
      this.errMsg = "";
      try {
        if (this.isCustomer) {
          const customerDocQuery = query(
            collection(db, "customers"),
            where("email", "==", this.email)
          );
          const customerDocsRef = await getDocs(customerDocQuery);
          let customerDocRef;
          customerDocsRef.forEach((doc) => {
            customerDocRef = doc;
          });
          // if there is no such customer document with specified email address
          if (customerDocRef === undefined) {
            throw new Error();
          }
          await signInWithEmailAndPassword(
            getAuth(firebaseApp),
            this.email,
            this.password
          );
          console.log("Successfully logged in as a customer!");
          const updatedProfile = customerDocRef.data().updatedProfile;
          if (updatedProfile) {
            console.log("User has updated all details in profile.");
            router.push("/marketplace");
          } else if (!updatedProfile) {
            console.log("User has not updated all details in profile.");
            router.push("/customerprofile");
          }
        } else if (!this.isCustomer) {
          const merchantDocQuery = query(
            collection(db, "merchants"),
            where("email", "==", this.email)
          );
          const merchantDocsRef = await getDocs(merchantDocQuery);
          let merchantDocRef;
          merchantDocsRef.forEach((doc) => {
            merchantDocRef = doc;
          });
          // if there is no such merchant document with specified email address
          if (merchantDocRef === undefined) {
            throw new Error();
          }
          await signInWithEmailAndPassword(
            getAuth(firebaseApp),
            this.email,
            this.password
          );
          console.log("Successfully logged in as a merchant!");
          const updatedProfile = merchantDocRef.data().updatedProfile;
          if (updatedProfile) {
            console.log("User has updated all details in profile.");
            router.push("/dashboard");
          } else if (!updatedProfile) {
            console.log("User has not updated all details in profile.");
            router.push("/merchantprofile");
          }
        }
      } catch (error) {
        console.log(error);
        switch (error.code) {
          case "auth/wrong-password":
            this.errMsg = "Incorrect password.";
            break;
          default:
            this.errMsg =
              "The provided email address does not belong to a registered customer/merchant.";
            break;
        }
      }
    },
    async loginGoogle() {
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      // customer doc
      const customerDocQuery = query(
        collection(db, "customers"),
        where("email", "==", user.email)
      );
      const customerDocsRef = await getDocs(customerDocQuery);
      let customerDocRef;
      customerDocsRef.forEach((doc) => {
        customerDocRef = doc;
      });
      // merchant doc
      const merchantDocQuery = query(
        collection(db, "merchants"),
        where("email", "==", user.email)
      );
      const merchantDocsRef = await getDocs(merchantDocQuery);
      let merchantDocRef;
      merchantDocsRef.forEach((doc) => {
        merchantDocRef = doc;
      });
      if (this.isCustomer && merchantDocRef === undefined) {
        // if there is no such customer document with specified email address
        if (customerDocRef === undefined) {
          const customerData = {
            name: "",
            email: user.email,
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
          addDoc(collection(db, "customers"), customerData);
          addDoc(collection(db, "carts"), customerCart);
          console.log("User has not updated all details in profile.");
          router.push("/customerprofile");
          // if customer has logged in with Google before
        } else {
          const updatedProfile = customerDocRef.data().updatedProfile;
          if (updatedProfile) {
            console.log("User has updated all details in profile.");
            router.push("/marketplace");
          } else if (!updatedProfile) {
            console.log("User has not updated all details in profile.");
            router.push("/customerprofile");
          }
        }
      } else if (!this.isCustomer && customerDocRef === undefined) {
        // if there is no such merchant document with specified email address
        if (merchantDocRef === undefined) {
          const merchantData = {
            imageUrl: "",
            name: "",
            businessType: "",
            email: user.email,
            operatingHours: "",
            location: "",
            phoneNumber: "",
            bankNumber: "",
            uid: result.user.uid,
            balance: 0,
            updatedProfile: false,
          };
          addDoc(collection(db, "merchants"), merchantData);
          console.log("User has not updated all details in profile.");
          router.push("/merchantprofile");
          // if merchant has logged in with Google before
        } else {
          const updatedProfile = merchantDocRef.data().updatedProfile;
          if (updatedProfile) {
            console.log("User has updated all details in profile.");
            router.push("/dashboard");
          } else if (!updatedProfile) {
            console.log("User has not updated all details in profile.");
            router.push("/merchantprofile");
          }
        }
      } else {
        this.errMsg =
          "The provided email address already belongs to a registered customer/merchant.";
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
#login {
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
#loginGoogle {
  display: block;
  width: 95%;
  margin-bottom: 10px;
  padding: 10px;
  border: none;
  border-radius: 30px;
  box-shadow: 0px 0px 5px #999;
  background-color: #fff;
  font-size: 16px;
  font-family: "Nunito Sans";
  cursor: pointer;
}
#googleLogo {
  width: 20px;
  height: 20px;
  float: left;
}
p {
  font-family: "Nunito Sans";
}
.error-message {
  font-size: 1.8rem;
  margin-bottom: 1rem;
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
