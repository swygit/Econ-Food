<template>
  <div class="items-wrapper" id="items-wrapper">
    <!-- Decide id later-->
    <div
      class="item-card"
      v-for="item in filteredItems"
      :key="item.id"
      @click="clickRouter(item.id)"
    >
      <div class="item-card-icon-circle">
        <img :src="item.imageUrl" alt="" />
      </div>
      <h2 class="item-card-category pl-2">
        {{ item.businessType }}
      </h2>
      <p class="item-card-title pl-1">{{ item.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemCard",
  data: function () {
    return {};
  },
  props: { filteredItems: Array, clickRouter: Function },
};
</script>

<style scoped>
h1 {
  font-family: "Nunito Sans", sans-serif;
  font-size: 4rem;
  font-weight: bold;
  text-align: left;
  letter-spacing: 2%;
  line-height: 30px;
  color: #000000;
}
h2 {
  background-color: #00bf63;
  font-family: "Nunito Sans", sans-serif;
  font-weight: 500;
  letter-spacing: 2%;
  line-height: 24px;
}
p {
  font-family: "Nunito Sans", sans-serif;
  font-size: 1.5rem;
  font-weight: weight(regular);
  letter-spacing: 2%;
  line-height: 20px;
}
.items-wrapper {
  margin-top: 40px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  cursor: pointer
}
.item-card {
  height: 32rem;
  width: 26rem;
  background-color: #ffffff;
  border-radius: 13px;
  /* display: flex; */
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

.item-card-title {
  font-family: "Nunito Sans";
  font-weight: bold;
  font-size: 14px;
  color: #000000;
  margin: 15px 0px 15px 0px;
}

.item-card-category {
  color: #ffffff;
  margin: 20px auto 0 auto;
  font-size: 1.5rem;
}
</style>
