<template>
  <div class="app">
    <CustomerNavigationBar />
    <div class="app-wrapper">
      <IndividualProduct />
    </div>
  </div>
</template>

<script>
import CustomerNavigationBar from "@/components/CustomerNavigationBar.vue";
import IndividualProduct from "../components/IndividualProduct.vue";

export default {
  name: "IndividualProductPage",
  components: {
    CustomerNavigationBar,
    IndividualProduct,
  },
};
</script>
<!-- need to put style scoped? -->
<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;1,900&display=swap");

:root {
  font-size: 8px;
}

body {
  background-color: #f5f5ef;
}

.app {
  margin: auto;
  width: 100%;
}

.app-wrapper {
  margin-top: 40px;
  margin-left: 120px;
  margin-right: 120px;
}
</style>
