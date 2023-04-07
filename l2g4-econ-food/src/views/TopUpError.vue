<template>
    <div class="container">
    <CustomerNavigationBar/>
    <h1>Payment unsuccessful. Try again.</h1><br>
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
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;1,900&display=swap");
.container {
    font-family: "Nunito Sans"
}
</style>
