<template>
  <div>
    <lyc-row class="">
      <lyc-column>
        <div
          v-for="color in colorSheets"
          :key="color"
          class="color-row df jcc mb-g-4"
        >
          <div
            v-for="i in 9"
            :key="i"
            :class="['color-block', `color-block--${color}-${i}`]"
          ></div>
        </div>
      </lyc-column>
    </lyc-row>
  </div>
</template>

<script setup lang="ts">
const colorSheets = ['primary', 'secondary', 'text', 'alert'] as Array<string>;
</script>

<style lang="scss" scoped>
$block-size: 15;

.color-row {
  display: flex;
  width: s-unit($block-size*3);
}

.color-block {
  width: s-unit($block-size);
  height: s-unit($block-size);
}

@each $name in ("primary", "secondary", "text", "alert") {
  @for $i from 1 through 9 {
    .color-block--#{$name}-#{$i} {
      background-color: color($name, $i);
    }
  }
}
</style>
