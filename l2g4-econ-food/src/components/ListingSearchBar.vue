<template>
  <div class="search-bar">
    <input type="text" class="search-input" v-bind:value="value" v-on:input="$emit('update:value', $event.target.value)" placeholder="Listing Name...">
    <button class="search-button me-2" v-on:click="$emit('search')">Search</button>
    <button class="reset-button" v-on:click="$emit('reset')">Show All</button>
  </div>
</template>

<script>
export default {
  name: "ListingSearchBar",
  props: {
    value: String
  }
};
</script>

<style scoped>
.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 32px;
}

.search-input {
  width: 400px;
  height: 48px;
  border: none;
  border-bottom: 3px solid #ddd;
  border-radius: 0;
  padding: 8px;
  font-size: 18px;
  font-weight: 400;
  color: #555;
  margin-right: 8px;
  outline: none;
  transition: all 0.3s ease;
  font-family: "Nunito Sans", sans-serif;
}

.search-input:focus {
  border-bottom-color: #16703c;
}

.search-button,
.reset-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #16703c;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  width: 120px;
  height: 48px;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 8px;
  transition: background-color 0.3s ease;
  font-family: "Nunito Sans", sans-serif;
}

.search-button:hover,
.reset-button:hover {
  background-color: #127031;
}

.reset-button {
  background-color: #ddd;
  color: #555;
  margin-left: 0;
  transition: background-color 0.3s ease;
}

.reset-button:hover {
  background-color: #bbb;
}
</style>
