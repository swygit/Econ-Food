<template>
    <div class="container" v-if="user">
        <CustomerNavigationBar/>
        <div class="center">
            <div class="balance">
                Current Balance:
                <h1> ${{ balance }}</h1>
            </div>
            <div class="buttons">
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
            <h2>Transaction History</h2>
            <div class="topUpHistory" v-for="topUp in topUpHistory.reverse()">
                ${{ Object.values(topUp)[0] }} <br>
                {{ Object.keys(topUp)[0] }}
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
            successURL: "http://localhost:5173/topupsuccessful",
            cancelURL: "http://localhost:5173/error"
        }
    },
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            this.user = user;
            this.getBalance()
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
            this.balance = customerDocRef.data().balance
            this.topUpHistory = customerDocRef.data().topUpHistory
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
  margin: 20px;
}
.buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
.topUpHistory {
  border: 2px solid black;
  padding: 10px;
  display: flex;
  width: 75%;
  font-size: 20px;
  align-items: center;
  border-radius: 10px;
  margin-top: 15px;
  margin-bottom: 30px;
  background-color: #ffff;
}
h1 {
    text-align: center;
}
h2 {
    font-size: 30px;
    margin-top: 10px;
}
</style>

