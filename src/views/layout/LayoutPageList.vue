<template>
  <div>
    <div
      v-for="page in pages.list"
      :key="page"
      @click="handlePage(page)"
    >
      {{ page }}
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onBeforeMount, reactive,
} from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const pages = reactive({ list: [] as string[] });
    /**
     *
     */
    function getAllFiles(): string[] {
      const files = import.meta.glob('@/assets/markdown/*.md');
      return Object.keys(files).map((path) => {
        const pathSplit = path.split('/');
        const fileName = pathSplit[pathSplit.length - 1].split('.md')[0];
        return fileName;
      });
    }
    /**
     *
     * @param name
     */
    function handlePage(name: string) {
      router.push({
        name: 'notebookPage',
        params: { filename: name },
      });
    }
    onBeforeMount(() => {
      pages.list = getAllFiles();
    });

    return { pages, handlePage };
  },
});
</script>

<style scoped></style>
