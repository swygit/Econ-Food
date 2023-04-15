<template>
    <CustomerNavigationBar/>
    <div class="container">
        <img src="../assets/redcross.png" class="logo mt-8 mb-4" alt="Logo" />
        <h1 class="mb-1">Payment unsuccessful. Please try again.</h1><br>
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
