<template>
  <div class="items-wrapper" id="items-wrapper">
    <!-- Decide id later-->
    <div class="item-card" v-for="item in filteredItems" :key="item.id">
      <div class="item-card-icon-circle">
        <img :src="item.imageUrl" alt="" />
      </div>
      <div class="item-card-text">
        <p class="item-card-name">{{ item.name }}</p>
        &emsp;
        <p class="item-card-price">{{ "$" + item.price }}</p>
      </div>
      <div class="button">
        <NormalButton
          @click="viewItem(item.id)"
          :buttonName="viewButtonName"
        ></NormalButton>
      </div>
    </div>
  </div>
</template>

<script>
import NormalButton from "@/components/NormalButton.vue";

export default {
  name: "ProductItemCard",
  components: {
    NormalButton,
  },
  data: function () {
    return {
      viewButtonName: "View Item",
    };
  },
  props: { filteredItems: Array },
  methods: {
    viewItem: function (id) {
      this.$router.push(`/individualproduct/${id}`);
    },
  },
};
</script>

<style scoped>
h1 {
  font-family: "Nunito Sans", sans-serif;
  font-size: 4rem;
  font-weight: 500;
  text-align: left;
  letter-spacing: 2%;
  line-height: 30px;
  color: #000000;
}
p {
  font-family: "Nunito Sans", sans-serif;
  font-size: 1.5rem;
  font-weight: weight(regular);
  letter-spacing: 2%;
  line-height: 20px;
}
.success {
  background-color: #13ce66;
  color: #fff;
}
.items-wrapper {
  margin-top: 40px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.item-card {
  height: 32rem;
  width: 26rem;
  background-color: #ffffff;
  border-radius: 13px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 20px 20px 0;
  padding: 10px;
}
.item-card-icon-circle {
  background-color: #ffffff;
  width: 16rem;
  height: 16rem;
  border-radius: 50%;
  margin: 0 auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-card-icon-circle img {
  margin-top: 2rem;
  max-width: 18rem;
  max-height: 18rem;
  object-fit: fill;
}
.item-card-variety {
  text-align: center;
  margin: 15px auto 0 auto;
  text-transform: lowercase;
  text-transform: capitalize;
}
.item-card-name {
  font-weight: bold;
  font-size: 14px;
  color: #000000;
  margin: 15px auto 10px auto;
  text-transform: lowercase;
  text-transform: capitalize;
}
.item-card-price {
  font-weight: 500;
  font-size: 14px;
  color: #000000;
  margin: 15px auto auto auto;
  text-transform: lowercase;
  text-transform: capitalize;
}
.item-card-text {
  color: #ffffff;
  margin: 15px auto 0 auto;
  font-size: 1.5rem;
  /* font-weight: bold; */
  display: flex;
}
.button {
  padding: 8px 5px;
  font-size: 1.5rem;
}
</style>
