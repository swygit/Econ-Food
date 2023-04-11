<template>
  <MerchantNavigationBar />
  <div class="container mt-3" v-if="user">
    <div class="center">
      <div class="formDiv">
        <div class="imageDiv">
          <img
            :src="imageUrl || 'https://i.ibb.co/vhNdMn5/upload-icon.png'"
            class="merchant-image"
          />
          <!-- <br /> -->
          <input class="mt-3" type="file" @change="onUpload" accept=".jpg,.png" />
        </div>
        <div class="profileDiv">
          <form @submit.prevent="updateProfile">
            <input type="text" placeholder="Company Name" v-model="name" />
            <input
              type="text"
              placeholder="Type of Business"
              v-model="businessType"
            />
            <input type="text" placeholder="Email" v-model="email" readonly />
            <input
              type="text"
              placeholder="Operating Hours"
              v-model="operatingHours"
            />
            <input type="text" placeholder="Location" v-model="location" />
            <input type="tel" placeholder="Phone Number" v-model="phoneNumber" />
            <input type="text" placeholder="Bank Number" v-model="bankNumber" />
            <button type="submit" id="save">Save</button>
            <button @click="" id="changePassword">Change Password</button>
            <button @click="signOut" id="signOut">Sign Out</button>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MerchantNavigationBar from "@/components/MerchantNavigationBar.vue";
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import {
  getFirestore,
  getDoc,
  getDocs,
  updateDoc,
  collection,
  doc,
  query,
  where,
} from "firebase/firestore";
import firebaseApp from "../firebase.js";
import router from "../router";

const db = getFirestore(firebaseApp);

export default {
  name: "MerchantProfile",
  components: {
    MerchantNavigationBar,
  },
  data() {
    return {
      user: false,
      userId: "",
      imageUrl: "",
      name: "",
      businessType: "",
      email: "",
      operatingHours: "",
      location: "",
      phoneNumber: "",
      bankNumber: "",
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
        const merchantDocQuery = query(
          collection(db, "merchants"),
          where("email", "==", user.email)
        );
        const merchantDocsRef = await getDocs(merchantDocQuery);
        let merchantDocRef;
        merchantDocsRef.forEach((doc) => {
          merchantDocRef = doc;
          this.userId = doc.id;
        });
        this.imageUrl = merchantDocRef.data().imageUrl;
        this.name = merchantDocRef.data().name;
        this.businessType = merchantDocRef.data().businessType;
        this.email = merchantDocRef.data().email;
        this.operatingHours = merchantDocRef.data().operatingHours;
        this.location = merchantDocRef.data().location;
        this.phoneNumber = merchantDocRef.data().phoneNumber;
        this.bankNumber = merchantDocRef.data().bankNumber;
        // fetch the saved profile image
      }
    });
  },
  methods: {
    async updateProfile() {
      const merchantDoc = await doc(db, "merchants", this.userId);
      await updateDoc(merchantDoc, {
        imageUrl: this.imageUrl,
        name: this.name,
        businessType: this.businessType,
        operatingHours: this.operatingHours,
        location: this.location,
        phoneNumber: this.phoneNumber,
        bankNumber: this.bankNumber,
      });
      // check if the profile has been filled up
      const merchantDocRef = await getDoc(doc(db, "merchants", this.userId));
      for (const key in merchantDocRef.data()) {
        const value = merchantDocRef.data()[key];
        if (value === "") {
          await updateDoc(merchantDoc, {
            updatedProfile: false,
          });
          break;
        }
        await updateDoc(merchantDoc, {
          updatedProfile: true,
        });
      }
      alert("Profile successfully updated!");
    },
    async onUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    },
    async signOut() {
      await signOut(getAuth(firebaseApp));
      router.push("/login");
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5ef;
  background-size: cover;
  position: relative;
}
.center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
}
.formDiv {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.imageDiv {
  margin-right: 20px;
  flex-basis: 50%;
}
.profileDiv {
  flex-basis: 40%;
}
.CustomerNavigationBar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.merchant-image {
  width: 400px;
  height: 400px;
  border: 2px solid #000;
}
form {
  display: flex;
  flex-direction: column;
}
input[type="file"] {
  font-family: "Nunito Sans";
  font-size: 16px;
}
input[type="file"]::-webkit-file-upload-button {
  font-family: "Nunito Sans";
  font-size: 16px;
  color: #fff;
  background-color: #16703c;
  padding: 10px 15px;
  border-radius: 30px;
  cursor: pointer;
  outline: none;
}
input[type="text"],
input[type="tel"],
input[type="password"] {
  display: block;
  /* width: 220px; */
  margin-bottom: 10px;
  padding: 10px;
  border: none;
  border-radius: 30px;
  box-shadow: 0px 0px 5px #999;
  font-size: 16px;
  font-family: "Nunito Sans";
}
#save,
#changePassword {
  display: block;
  /* width: 220px; */
  margin-top: 10px;
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
#signOut {
  display: block;
  /* width: 220px; */
  margin-bottom: 10px;
  padding: 10px;
  border: 2px solid #16703c;
  border-radius: 30px;
  box-shadow: 0px 0px 5px #999;
  background-color: transparent;
  color: #000;
  font-size: 16px;
  font-family: "Nunito Sans";
  cursor: pointer;
}
</style>
