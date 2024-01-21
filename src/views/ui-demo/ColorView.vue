<template>
  <div>
    <div
      v-for="color in colorSheets"
      :key="color"
      class="color-row"
    >
      <div
        v-for="i in 9"
        :key="i"
        :class="['color-block', `color-block--${color}-${i}`]"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const colorSheets = ['primary', 'secondary', 'text'] as Array<string>;
</script>

<style lang="scss" scoped>
.color-row {
  display: flex;
}

.color-block {
  width: 120px;
  height: 120px;
}

@each $name in ("primary", "secondary", "text") {
  @for $i from 1 through 9 {
    .color-block--#{$name}-#{$i} {
      background-color: color($name, $i);
    }
  }
}
</style>
