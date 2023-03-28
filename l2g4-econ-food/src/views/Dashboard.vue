<template>
  <div>
    <MerchantNavigationBar />
  </div>
</template>

<script>
import MerchantNavigationBar from "@/components/MerchantNavigationBar.vue";

export default {
  name: "Dashboard",
  components: {
    MerchantNavigationBar,
  },
  data: function () {
    return {};
  },
};
</script>

<style scoped></style>
