<template>
    <CustomerNavigationBar/>
    <div class="container" v-if="user">
        <img src="../assets/greentick.png" class="logo mt-8 mb-4" alt="Logo" />
        <h1 class="mb-1">Top Up Successful!</h1><br>
        <NormalButton
            @click="toMarketplace"
            :buttonName="buttonName"
        ></NormalButton>
    </div>
</template>

<script>
import firebaseApp from "@/firebase.js";
import { getFirestore } from "firebase/firestore";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  where,
  updateDoc
} from "firebase/firestore";
import router from "../router";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import CustomerNavigationBar from "@/components/CustomerNavigationBar.vue";
import NormalButton from "@/components/NormalButton.vue";

const db = getFirestore(firebaseApp);

export default {
    components: {CustomerNavigationBar, NormalButton},
    name: "TopUpSuccessful",
    data() {
        return {
            user: false,
            amount: 0,
            userId: "",
            buttonName: "Back to Marketplace"
        }
    },
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            this.user = user;
            this.updateBalance()
        }
        });
    },
    methods: {
        async updateBalance() {
            // get the topup amount 
            const urlSearchParams = new URLSearchParams(window.location.search);
            if (!parseInt(urlSearchParams.get('amount'))) {
                return
            }
            this.amount = parseInt(urlSearchParams.get('amount'));
            // get customer doc
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
            const currentDate = new Date();
            const updateTopUpHistory = {};
            updateTopUpHistory[currentDate] = this.amount
            const customerDoc = doc(db, "customers", this.userId);
            await updateDoc(customerDoc, {
                balance: customerDocRef.data().balance + this.amount,
                topUpHistory: arrayUnion(updateTopUpHistory)
            })
        },
        toMarketplace() {
            router.push('/marketplace')
        }
    }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;1,900&display=swap");
.container {
    font-family: "Nunito Sans";
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
}
h1{
    font-weight: 1000;
    font-size: 30px;
}
.logo {
  width: 100px;
  height: 100px;
}
</style>
