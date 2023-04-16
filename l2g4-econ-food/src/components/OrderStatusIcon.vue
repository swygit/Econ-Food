<template>
  <div>
    <svg width="300" height="100">
      <circle
        @click="$emit('update:status', 'Received')"
        cx="50"
        cy="50"
        r="20"
        :style="{ cursor: cursorStyle }"
        :class="{ active: true }"
      />
      <text
        x="50"
        y="50"
        text-anchor="middle"
        dy="40"
        font-size="14px"
        font-family="Nunito Sans"
      >
        Received
      </text>

      <circle
        @click="$emit('update:status', 'Prepared')"
        cx="150"
        cy="50"
        r="20"
        :style="{ cursor: cursorStyle }"
        :class="{ active: status === 'Prepared' || status === 'Collected' }"
      />
      <text
        x="150"
        y="50"
        text-anchor="middle"
        dy="40"
        font-size="14px"
        font-family="Nunito Sans"
      >
        Prepared
      </text>

      <circle
        @click="$emit('update:status', 'Collected')"
        cx="250"
        cy="50"
        r="20"
        :style="{ cursor: cursorStyle }"
        :class="{ active: status === 'Collected' }"
      />
      <text
        x="250"
        y="50"
        text-anchor="middle"
        dy="40"
        font-size="14px"
        font-family="Nunito Sans"
      >
        Collected
      </text>

      <path
        d="M70,50 H130 M170,50 H230"
        stroke="green"
        stroke-width="5"
        stroke-linecap="round"
        fill="none"
      />

      <path
        v-if="status === 'Prepared' || status === 'Collected'"
        d="M50,50 H150"
        stroke="green"
        stroke-width="5"
        stroke-linecap="round"
        fill="none"
      />

      <path
        v-if="status === 'Collected'"
        d="M150,50 H250"
        stroke="green"
        stroke-width="5"
        stroke-linecap="round"
        fill="none"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    status: String,
    cursor: String,
  },
  methods: {
    toggleCircle(circleStatus) {
      if (this.status === circleStatus) {
        this.status = "";
      } else {
        this.status = circleStatus;
      }
    },
  },
  computed: {
    cursorStyle() {
      return this.cursor;
    },
  },
};
</script>

<style>
.active {
  fill: green;
}
circle:not(.active) {
  stroke: green;
  stroke-width: 4;
  fill: white;
}
</style>
