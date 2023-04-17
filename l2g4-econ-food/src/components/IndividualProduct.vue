<!-- <template>
  <div class="container">
    <div class="top-container">
      <div class="top-image-container">
        <img src="@/images/coldstorage.jpg" />
      </div>
      <div class="text">
        <h1>Cold Storage - West Coast Park</h1>
        <h2>71 W Coast Hwy, Singapore 126844</h2>
        <h2>Open 24 hours</h2>
      </div>
    </div>
    <div class="middle-container">
      <div class="middle-image-container">
        <img src="@/images/lemons.jpg" />
      </div>
      <div class="middle-content">
        <h3>Basket of Lemons</h3>
        <h2>
          The fruit color is green to bright yellow at maturity and is with or
          without a collar at the neck. Thickness and smoothness of rind vary
          among varieties and lemons are either seedless or seedy.
        </h2>
        <h2>Best Before Date: 01/03/2023</h2>
        <h2>Best Before Time: 23:59</h2>
        <h2>Price: $4.00</h2>
      </div>
    </div>
    <div class="bottom-container">
      <CounterButton></CounterButton>
      <div>
        <p></p>
      </div>
      <NormalButton @click="addToCart" :buttonName="buttonName"></NormalButton>
    </div>
  </div>
</template>

<script>
import NormalButton from "@/components/NormalButton.vue";
import CounterButton from "@/components/CounterButton.vue";

export default {
  name: "IndividualProduct",
  components: {
    NormalButton,
    CounterButton,
  },
  data: function () {
    return {
      buttonName: "Add To Cart",
    };
  },
  props: {},
  methods: {
    addToCart: function () {
      //
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;1,900&display=swap");

:root {
  font-size: 8px;
}

body {
  background-color: #f5f5ef;
}
h1 {
  font-family: "Nunito Sans", sans-serif;
  font-weight: 500;
  letter-spacing: 2%;
  line-height: 24px;
  font-size: 25px;
  font-weight: 700;
}
h2 {
  font-family: "Nunito Sans", sans-serif;
  font-weight: 500;
  letter-spacing: 2%;
  line-height: 24px;
  font-size: 15px;
}
h3 {
  font-family: "Nunito Sans", sans-serif;
  font-weight: 500;
  letter-spacing: 2%;
  line-height: 24px;
  font-size: 20px;
}

p {
  padding: 25px 50px;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* grid-template-columns: 1fr 1fr 1fr; */
  background-color: #ffffff;
  /* margin: 100px; */
  display: flex;
  align-items: center;
  justify-content: center;
}
.top-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.top-image-container {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
}
.middle-container {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.middle-image-container {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
}
.middle-content {
  flex-grow: 4;
}
img {
  width: 280px;
  height: 180px;
}
.bottom-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px;
}
.text {
  font-size: 70px;
}
</style> -->
