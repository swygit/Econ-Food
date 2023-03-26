<template>
    <div class="container" v-if="user">
        <CustomerNavBar/>
        <div class="center">
            <img src="https://i.ibb.co/GxMZDwr/user-icon.png" class="user-icon">
            <input type="text" placeholder="Name" v-model="name">
			<input type="text" placeholder="Email" v-model="email">
			<input type="text" placeholder="Phone Number" v-model="phoneNumber">
            <button @click="" id="save">Save</button>
			<button @click="" id="changePassword">Change Password</button>
            <button @click="signOut" id="signOut">Sign Out</button>
        </div>
    </div>
</template>

<script>
import CustomerNavBar from '@/components/CustomerNavBar.vue'
// import LogOut from "@/components/LogOut.vue";
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebaseApp from '../firebase.js'
import router from '../router';

const db = getFirestore(firebaseApp);

export default {
  name: "CustomerProfile",
  components: {
    CustomerNavBar,
    // LogOut,
  },
  data() {
    return {
      user: false,
      name: "",
      email: "",
      phoneNumber: ""
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
        console.log("Current user:", user);
        const customerDocRef = await getDoc(doc(db, "customers", user.email))
        console.log(customerDocRef)
        this.name = customerDocRef.data().name
        this.email = customerDocRef.data().email
        this.phoneNumber = customerDocRef.data().phoneNumber
      }
    });
  },
  methods: {
    async updateProfile() {},
    async signOut() {
        await signOut(getAuth(firebaseApp))
        router.push("/login")
    }
  }
};
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        height: 100vh; /* Set the height of the container to 100% of viewport height */
        background-color: #F5F5EF;
        background-size: cover;
        position: relative;
    }
    .center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
    .CustomerNavBar {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }
    .user-icon {
        padding-top: 20px;
        padding-bottom: 20px;
        width: 100px;
        height: 100px;
    }
    input[type="text"], input[type="password"] {
		display: block;
		width: 200px;
		margin-bottom: 10px;
		padding: 10px;
		border: none;
		border-radius: 30px;
		box-shadow: 0px 0px 5px #999;
		font-size: 16px;
		font-family: 'Nunito Sans';
	}
	#save, #changePassword {
		display: block;
		width: 220px;
		margin-bottom: 10px;
		padding: 10px;
		border: none;
		border-radius: 30px;
		box-shadow: 0px 0px 5px #999;
		background-color: #16703C;
		color: #fff;
		font-size: 16px;
		font-family: 'Nunito Sans';
		cursor: pointer;
	}
    #signOut {
        display: block;
        width: 220px;
        margin-bottom: 10px;
        padding: 10px;
        border: 2px solid #16703C;
        border-radius: 30px;
        box-shadow: 0px 0px 5px #999;
        background-color: transparent;
        color: #000;
        font-size: 16px;
        font-family: 'Nunito Sans';
        cursor: pointer;
    }
</style>