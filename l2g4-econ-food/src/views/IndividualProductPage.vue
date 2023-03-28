<template>
  <div class="app">
    <div class="app-wrapper">
      <CustomerNavigationBar />
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

<style>
:root {
  font-size: 8px;
}
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;1,900&display=swap");
body {
  background-color: #f5f5ef;
}

.app {
  margin: auto;
  width: 100%;
  /* max-width: 1048px; */
}

.app-warpper {
  margin: auto;
}
</style>
