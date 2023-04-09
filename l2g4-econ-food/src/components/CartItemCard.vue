<!-- unused as currently we only allow cart of one merchant, see Cart.vue -->
<template>
  <div class="listing">
    <div class="listing-item">
      <!-- <span>{{ item.name }}</span> -->
      <div class="top-container">
        <div class="top-image-container">
          <img src="@/images/cs2.jpg" />
        </div>
        <div class="text">
          <h1>Cold Storage - West Coast Park</h1>
          <h2>Basket of Lemons - x1</h2>
          <h2>Honey Glazed Roasted Chicken - x1</h2>
          <h2>Total: $8.95</h2>
        </div>
      </div>
      <div class="buttons">
        <NormalButtonUnfilled
          @click="viewItem"
          :buttonName="viewButtonName"
        ></NormalButtonUnfilled>
        <br />
        <NormalButton
          @click="checkoutItem"
          :buttonName="checkoutButtonName"
        ></NormalButton>
      </div>
    </div>
  </div>
</template>

<script>
import NormalButton from "@/components/NormalButton.vue";
import NormalButtonUnfilled from "@/components/NormalButtonUnfilled.vue";

export default {
  name: "CartItemCard",
  components: {
    NormalButton,
    NormalButtonUnfilled,
  },
  data: function () {
    return {
      viewButtonName: "View",
      checkoutButtonName: "Checkout",
    };
  },
  props: {
    // items: { filteredItems: Array },
  },
  methods: {
    viewItem(item) {
      // handle edit item logic
    },
    checkoutItem(item) {
      // handle delete item logic
    },
  },
};
</script>

<style scoped>
h1 {
  font-family: "Nunito Sans", sans-serif;
  font-weight: 500;
  letter-spacing: 2%;
  line-height: 24px;
  font-size: 18px;
  font-weight: 700;
}
h2 {
  font-family: "Nunito Sans", sans-serif;
  font-weight: 500;
  letter-spacing: 2%;
  line-height: 24px;
  font-size: 15px;
}
.top-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.top-image-container {
  display: flex;
  /* flex-grow: 1; */
  justify-content: left;
  align-items: center;
  border-radius: 28px;
}
img {
  width: 280px;
  height: 180px;
  border-radius: 28px;
}
.listing {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 28px;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.listing-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  margin-right: 4.5rem;
}
</style>
