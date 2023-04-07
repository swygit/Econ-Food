<template>
    <div class="container" v-if="user">
        <CustomerNavigationBar/>
        Top Up Successful!
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
import NormalButton from "@/components/NormalButton.vue"


const db = getFirestore(firebaseApp);

export default {
    name: "TopUpSuccessful",
    data() {
        return {
            user: false,
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
            const customerDoc = await doc(db, "customers", this.userId);
            await updateDoc(customerDoc, {
                balance: customerDocRef.data().balance + this.amount
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
</style>
