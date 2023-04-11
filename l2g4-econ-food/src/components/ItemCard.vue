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
      <h2 class="item-card-category">
        {{ item.businessType }}
      </h2>
      <p class="item-card-title">{{ item.name }}</p>
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
.success {
  background-color: #13ce66;
  color: #fff;
}
.items-wrapper {
  margin-top: 40px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  cursor: pointer
}
.item-card {
  min-width: 160px;
  min-height: 180px;
  background-color: #ffffff;
  border-radius: 7px;
  /* display: flex; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 10px 10px 0;
  padding: 10px;
}

.item-card-icon-circle {
  background-color: #ffffff;
  width: 85px;
  height: 85px;
  border-radius: 50%;
  margin: 0 auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-card-icon-circle img {
  max-width: 60px;
  max-height: 60px;
  object-fit: fill;
}

.item-card-variety {
  text-align: center;
  margin: 15px auto 0 auto;
  text-transform: lowercase;
  text-transform: capitalize;
}

.item-card-title {
  font-weight: 500;
  color: #000000;
  margin: 15px auto 15px auto;
  text-transform: lowercase;
  text-transform: capitalize;
}

.item-card-category {
  color: #ffffff;
  margin: 15px auto 0 auto;
  font-size: 1.5rem;
}
</style>
