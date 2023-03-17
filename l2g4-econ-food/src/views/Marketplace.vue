<template>
  <div class="app">
    <div class="app-wrapper">
      <div class="search-bar">
        <h1>Marketplace</h1>

        <input
          id="search"
          v-model="searchPayload"
          type="search"
          class="search"
          placeholder="Search"
        />

        <div id="app">
          <button class="button" @click="toggleAll">All</button>
          <button class="button" @click="toggleHotel">Hotel</button>
          <button class="button" @click="toggleSupermarket">Supermarket</button>
          <button class="button" @click="toggleOthers">Others</button>
        </div>
      </div>

      <div class="items-wrapper" id="items-wrapper">
        <!-- Decide id later -->
        <div class="item-card" v-for="item in filteredItems" :key="item.id">
          <div class="item-card-icon-circle">
            <img :src="item.image" alt="" />
          </div>
          <h2 class="item-card-category">{{ item.category }}</h2>
          <p class="item-card-title">{{ item.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as data from "@/items.js";
export default {
  name: "Marketplace",
  components: {},
  data: function () {
    return {
      filteredItems: [],
      searchPayload: "",
    };
  },
  methods: {
    toggleAll: function () {
      this.filteredItems = [];
      this.filteredItems = data.items.filter((item) => item.title);
    },
    toggleHotel: function () {
      this.filteredItems = [];
      this.filteredItems = data.items.filter(
        (item) => item.category == "Hotel"
      );
    },
    toggleSupermarket: function () {
      this.filteredItems = [];
      this.filteredItems = data.items.filter(
        (item) => item.category == "Supermarket"
      );
    },
    toggleOthers: function () {
      this.filteredItems = [];
      this.filteredItems = data.items.filter(
        (item) => item.category == "Others"
      );
    },
  },
  watch: {
    searchPayload: function () {
      this.filteredItems = data.items.filter((item) =>
        item.title.toLowerCase().includes(this.searchPayload.toLowerCase())
      );
    },
  },
  created: function () {
    this.filteredItems = data.items;
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

h1 {
  font-family: "Nunito Sans", sans-serif;
  font-size: 4rem;
  font-weight: 500;
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

.app {
  margin: auto;
  width: 100%;
  max-width: 1048px;
}

.app-warpper {
  margin: auto;
}

.search-bar {
  text-align: left;
  margin-top: 4rem;
}

.search-bar input {
  padding: 2rem;
  min-width: 40rem;
  outline: none;
  border: none;
  border-radius: 1.625rem;
  width: 100%;
}

button {
  margin-top: 8px;
  margin-right: 8px;
  padding: 10px 20px;
  border: 0px solid #ffffff;
  color: #000000;
  background-color: #ffffff;
  border-radius: 4px;
  font-size: 1.5rem;
  border-radius: 1.625rem;
  cursor: pointer;
}
.button:hover {
  background: #16703c;
  color: #ffffff;
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

/* item card */
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
