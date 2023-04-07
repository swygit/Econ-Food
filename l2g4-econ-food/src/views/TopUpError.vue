<template>
    <div class="container">
    <CustomerNavigationBar/>
    Payment unsuccessful. Try again.
    <NormalButton
            @click="toMarketplace"
            :buttonName="buttonName"
    ></NormalButton>
    </div>
</template>
<script>
import router from "../router";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import CustomerNavigationBar from "@/components/CustomerNavigationBar.vue";
import NormalButton from "@/components/NormalButton.vue";

export default {
  components: { CustomerNavigationBar, NormalButton },
    name: "TopUpError",
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
        }
        });
    },
    methods: {
        toMarketplace() {
            router.push('/marketplace')
        }
    }
}
</script>
