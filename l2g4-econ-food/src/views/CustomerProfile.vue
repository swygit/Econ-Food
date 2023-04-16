<template>
  <div class="container" v-if="user">
    <CustomerNavigationBar />
    <div class="containertwo">
      <div class="center">
        <img
          src="https://i.ibb.co/GxMZDwr/user-icon.png"
          class="user-icon mt-5 mb-5"
        />
        <form @submit.prevent="updateProfile">
          <input type="text" placeholder="Name" v-model="name" />
          <input type="text" placeholder="Email" v-model="email" readonly />
          <input type="tel" placeholder="Phone Number" v-model="phoneNumber" />
          <button type="submit" id="save">Save</button>
        </form>

        <div class="center">
          <input
            type="password"
            placeholder="Enter Current Password"
            v-model="currentPassword"
          />
          <input
            type="password"
            placeholder="Enter New Password"
            v-model="newPassword"
          />
          <button @click="updatePassword" id="changePassword">
            Change Password
          </button>
          <button @click="signOut" id="signOut">Sign Out</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerNavigationBar from "@/components/CustomerNavigationBar.vue";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "@firebase/auth";
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
  name: "CustomerProfile",
  components: {
    CustomerNavigationBar,
  },
  data() {
    return {
      user: false,
      userId: "",
      name: "",
      email: "",
      phoneNumber: "",
      newPassword: "",
      currentPassword: "",
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
        const customerDocQuery = query(
          collection(db, "customers"),
          where("email", "==", user.email)
        );
        const customerDocsRef = await getDocs(customerDocQuery);
        let customerDocRef;
        customerDocsRef.forEach((doc) => {
          customerDocRef = doc;
          this.userId = doc.id;
        });
        this.name = customerDocRef.data().name;
        this.email = customerDocRef.data().email;
        this.phoneNumber = customerDocRef.data().phoneNumber;
      }
    });
  },
  methods: {
    async updateProfile() {
      const customerDoc = await doc(db, "customers", this.userId);
      var checkPhoneNumber = /^\d{8}$/
      if (!checkPhoneNumber.test(this.phoneNumber)) {
        alert("Enter a valid 8-digit phone number.")
        return
      }
      await updateDoc(customerDoc, {
        name: this.name,
        phoneNumber: this.phoneNumber,
      });
      // check if the profile has been filled up
      const customerDocRef = await getDoc(doc(db, "customers", this.userId));
      for (const key in customerDocRef.data()) {
        const value = customerDocRef.data()[key];
        if (value === "") {
          await updateDoc(customerDoc, {
            updatedProfile: false,
          });
          break;
        }
        await updateDoc(customerDoc, {
          updatedProfile: true,
        });
      }
      alert("Profile successfully updated!");
    },
    async updatePassword() {
      const auth = getAuth();
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(
        user.email,
        this.currentPassword
      );
      try {
        if (this.currentPassword == "") {
          return alert("Enter current password!");
        }
        await reauthenticateWithCredential(user, credential);
      } catch (error) {
        if (error.code === "auth/wrong-password") {
          throw alert("Current password is incorrect!");
        }
        throw error;
      }
      try {
        if (this.newPassword == "") {
          return alert("Enter a new password!");
        }
        await updatePassword(user, this.newPassword);
        alert("Password updated successfully!");
        this.currentPassword = "";
        this.newPassword = "";
      } catch (error) {
        throw error;
      }
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
  height: 100vh; /* Set the height of the container to 100% of viewport height */
  background-color: #f5f5ef;
  background-size: cover;
  position: relative;
}
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.CustomerNavigationBar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.user-icon {
  width: 100px;
  height: 100px;
}
input[type="text"],
input[type="tel"],
input[type="password"] {
  display: block;
  width: 220px;
  margin-bottom: 10px;
  padding: 10px;
  border: none;
  border-radius: 30px;
  box-shadow: 0px 0px 5px #999;
  font-size: 16px;
  font-family: "Nunito Sans";
}
.containertwo {
  display: flex;
  flex-direction: column;
  background-color: #f5f5ef;
  background-size: cover;
  position: relative;
}
#save,
#changePassword {
  display: block;
  width: 220px;
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
  width: 220px;
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
