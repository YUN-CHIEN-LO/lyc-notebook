<template>
  <div class="lyc-avatar">
    <img
      v-if="hasUrl"
      class="lyc-avatar__image"
      :src="url"
      :alt="alt"
    />
    <LycIcon v-else />
  </div>
</template>

<script lang="ts">
import { isEmpty } from 'lodash';
import { computed, PropType, defineComponent } from 'vue';
import LycIcon from '@/components/basic/LycIcon.vue';

export default defineComponent({
  name: 'LycAvatar',
  props: {
    url: {
      type: String as PropType<string>,
      default: null,
    },
    alt: {
      type: String as PropType<string>,
      default: 'lyc-avatar',
    },
  },
  setup(props) {
    const hasUrl = computed(() => !isEmpty(props.url));
    return { hasUrl };
  },
  components: { LycIcon },
});
</script>

<style scoped lang="scss">
.lyc-avatar {
  border-radius: 100%;
  width: g-unit(6);
  height: g-unit(6);
  box-sizing: border-box;
  @include flex($jc: center);
  background-color: color(primary, 1);
  @include transitions(box-shadow 0.1s linear);
  overflow: hidden;

  &:hover {
    @include shadow(0px 0px g-unit(0.5) g-unit(0.5) color(primary, 5));
  }

  &__image {
    width: g-unit(6);
    height: g-unit(6);
    object-fit: cover;
  }

  &>.lyc-icon {
    color: color(primary);
  }
}
</style>
