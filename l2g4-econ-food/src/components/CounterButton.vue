<template>
  <form class="counter-form">
    <div
      class="value-button"
      id="decrease"
      @click="decreaseValue"
      value="Decrease Value"
    >
      -
    </div>
    <input type="number" id="number" value="0" />
    <div
      class="value-button"
      id="increase"
      @click="increaseValue"
      value="Increase Value"
    >
      +
    </div>
  </form>
</template>

<script>
export default {
  Name: "CounterButton",
  data() {
    return {
      value: 0,
    };
  },
  props: {
    setCounterValue: Function,
  },
  methods: {
    increaseValue: function () {
      var value = parseInt(document.getElementById("number").value, 10);
      value = isNaN(value) ? 0 : value;
      value++;
      document.getElementById("number").value = value;
      this.setCounterValue(value);
    },

    decreaseValue: function () {
      var value = parseInt(document.getElementById("number").value, 10);
      value = isNaN(value) ? 0 : value;
      value < 1 ? (value = 1) : "";
      value--;
      document.getElementById("number").value = value;
      this.setCounterValue(value);
    },
  },
};
</script>

<style scoped>
.counter-form {
  text-align: center;
  display: flex;
}

.value-button {
  display: inline-block;
  /* border: 1px solid #ddd; */
  /* margin: 0px; */
  width: 40px;
  height: 15px;
  text-align: center;
  /* vertical-align: 5px; */
  padding: 11px 0px;
  /* background: #eee; */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.value-button:hover {
  cursor: pointer;
}

form #decrease {
  border-radius: 28px 0 0 28px;
  background-color: #16703c;
  color: #ffffff;
}

form #increase {
  border-radius: 0 28px 28px 0;
  background-color: #16703c;
  color: #ffffff;
}

form #input-wrap {
  margin: 10px;
  padding: 0px;
}

input#number {
  text-align: center;
  border: none;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  width: 45px;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
