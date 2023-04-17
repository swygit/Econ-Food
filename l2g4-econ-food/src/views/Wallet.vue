<template>
    <div class="container" v-if="user">
        <CustomerNavigationBar/>
        <div class="center">
            <div class="balance mt-8 mb-5">
                Current Balance:
                <h1> $ {{ balance }}</h1>
            </div>
            <div class="buttons mb-8">
                <NormalButton
                    @click="topup10"
                    :buttonName="amount10"
                ></NormalButton>
                <NormalButton
                    @click="topup20"
                    :buttonName="amount20"
                ></NormalButton>
                <NormalButton
                    @click="topup50"
                    :buttonName="amount50"
                ></NormalButton>
                <NormalButton
                    @click="topup100"
                    :buttonName="amount100"
                ></NormalButton>
            </div>
            <h2 class="mb-2">Transaction History</h2>
            <div class="topUpHistory mt-3 mb-2" v-for="topUp in topUpHistory" v-if="loaded">
                <p class="topUpAmount ms-3 mt-2"> ${{ Object.values(topUp)[0] }} </p>
                <p class="topUpInfo ms-3 mb-2"> {{ Object.keys(topUp)[0] }} </p>
            </div>
        </div>
    </div>
</template>
<script>
import firebaseApp from "@/firebase.js";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { loadStripe } from '@stripe/stripe-js';
import CustomerNavigationBar from "@/components/CustomerNavigationBar.vue";
import NormalButton from "@/components/NormalButton.vue"

const db = getFirestore(firebaseApp);

export default {
    name: "Wallet",
    data() {
        return {
            user: false,
            loaded: false,
            balance: null,
            userId: "",
            topUpHistory: null,
            amount10: "$10",
            amount20: "$20",
            amount50: "$50",
            amount100: "$100",
            publishableKey: "pk_test_51MqfYlFyCavaBQIYQrdDrJI5LF2F6NyUmKt1MlPpG8aKmgINwC6Z0BE2mHOWVhnKMK8Qp2CMZX7s5FDjfjc7g0yH00dvVLRKBF",
            lineItems: [
                {
                    price: "price_1MtX3yFyCavaBQIYwdg5rZDm",
                    quantity: 1
                },
                {
                    price: "price_1MtX8HFyCavaBQIY81R9H9tq",
                    quantity: 1
                },
                {
                    price: "price_1MtXDFFyCavaBQIYESAQykxa",
                    quantity: 1
                },
                {
                    price: "price_1MtXDoFyCavaBQIYE1pBN40c",
                    quantity: 1
                }
            ],
            successURL: "https://econfood-9aa79.web.app/topupsuccessful",
            cancelURL: "https://econfood-9aa79.web.app/topuperror"
        }
    },
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            this.user = user;
            this.getBalance()
            this.getTopUpHistory()
        }
        });
    },
    components: {
        CustomerNavigationBar,
        NormalButton
    },
    methods: {
        async getBalance() {
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
            this.balance = await customerDocRef.data().balance.toFixed(2)
            console.log('User balance loaded.')
        },
        async getTopUpHistory() {
            const customerDocQuery = query(
                collection(db, "customers"),
                where("email", "==", this.user.email)
            );
            const customerDocsRef = await getDocs(customerDocQuery);
            customerDocsRef.forEach((doc) => {
                this.userId = doc.id;
                this.topUpHistory = doc.data().topUpHistory.reverse();
            });
            console.log('User transaction history loaded.')
            this.loaded = true
        },
        async topup10() {
            var stripe = await loadStripe(this.publishableKey);
            stripe.redirectToCheckout({
                lineItems: [this.lineItems[0]],
                mode: 'payment',
                successUrl: this.successURL + "?amount=10",
                cancelUrl: this.cancelURL
            })
        },
        async topup20() {
            var stripe = await loadStripe(this.publishableKey);
            stripe.redirectToCheckout({
                lineItems: [this.lineItems[1]],
                mode: 'payment',
                successUrl: this.successURL + "?amount=20",
                cancelUrl: this.cancelURL
            })
        },
        async topup50() {
            var stripe = await loadStripe(this.publishableKey);
            stripe.redirectToCheckout({
                lineItems: [this.lineItems[2]],
                mode: 'payment',
                successUrl: this.successURL + "?amount=50", 
                cancelUrl: this.cancelURL
            })
        },
        async topup100() {
            var stripe = await loadStripe(this.publishableKey);
            stripe.redirectToCheckout({
                lineItems: [this.lineItems[3]],
                mode: 'payment',
                successUrl: this.successURL + "?amount=100",
                cancelUrl: this.cancelURL
            })
        },
    }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;1,900&display=swap");
.center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: "Nunito Sans"
}
.balance {
    background-color: #16703c;
    color: #fff;
    border-radius: 30px;
    font-size: 24px;
    padding: 20px;
}
.buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
.topUpHistory {
    border: 1px solid lightgrey;
    padding: 10px;
    flex: 1;
    width: 45%;
    font-size: 20px;
    border-radius: 10px;
    background-color: #ffff;
}
.topUpAmount 
{
    font-weight: bold;
    font-size: 24px;
}
.topUpInfo {
    font-size: 14px;
}
h1 {
    text-align: center;
}
h2 {
    font-size: 30px;
    margin-top: 10px;
}
</style>

