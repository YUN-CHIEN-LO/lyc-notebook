<template>
  <div v-html="markdownContent"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

export default defineComponent({
  setup() {
    const route = useRoute();
    const markdownContent = ref('');
    onBeforeMount(async () => {
      console.log('onBeforeMount');
      try {
        const markdownFile = await import(`../../assets/notebook/${route.params.filename}.md`);
        markdownContent.value = md.render(markdownFile.default);
      } catch (error) {
        console.error(error);
        markdownContent.value = 'Error loading markdown file';
      }
    });
    return {
      markdownContent,
    };
  },
});
</script>

<style scoped></style>
