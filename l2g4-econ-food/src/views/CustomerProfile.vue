<template>
    <div class="container" v-if="user">
        <CustomerNavBar/>
        <div class="center">
            <img src="https://i.ibb.co/GxMZDwr/user-icon.png" class="user-icon">
            <form @submit.prevent="updateProfile">
                <input type="text" placeholder="Name" v-model="name">
                <input type="text" placeholder="Email" v-model="email" readonly>
                <input type="tel" placeholder="Phone Number" v-model="phoneNumber">
                <button type="submit" id="save">Save</button>
            </form>
			<button @click="" id="changePassword">Change Password</button>
            <button @click="signOut" id="signOut">Sign Out</button>
        </div>
    </div>
</template>

<script>
import CustomerNavBar from '@/components/CustomerNavBar.vue'
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import { getFirestore, getDoc, getDocs, updateDoc, collection, doc, query, where } from "firebase/firestore";
import firebaseApp from '../firebase.js'
import router from '../router';

const db = getFirestore(firebaseApp);

export default {
  name: "CustomerProfile",
  components: {
    CustomerNavBar,
  },
  data() {
    return {
      user: false,
      userId: "",
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
        const customerDocQuery = query(collection(db, "customers"), where('email', '==', user.email))
        const customerDocsRef = await getDocs(customerDocQuery)
        let customerDocRef
        customerDocsRef.forEach((doc) => {
          customerDocRef = doc
          this.userId = doc.id
        })
        this.name = customerDocRef.data().name
        this.email = customerDocRef.data().email
        this.phoneNumber = customerDocRef.data().phoneNumber
      }
    });
  },
  methods: {
    async updateProfile() {
        const customerDoc = await doc(db, "customers", this.userId)
        await updateDoc(customerDoc, {
            name: this.name,
            phoneNumber: this.phoneNumber
        })
        // check if the profile has been filled up
        const customerDocRef = await getDoc(doc(db, "customers", this.userId))
        for (const key in customerDocRef.data()) {
            const value = customerDocRef.data()[key]
            if (value === "") {
                await updateDoc(customerDoc, {
                    updatedProfile: false,
                })
                break;
            }
            await updateDoc(customerDoc, {
                updatedProfile: true,
            })
        }
        alert("Profile successfully updated!")
    },
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
    input[type="text"], input[type="tel"], input[type="password"] {
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