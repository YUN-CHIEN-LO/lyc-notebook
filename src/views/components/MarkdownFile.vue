<template>
  <div>
    <lyc-row>
      <lyc-column>
        <RoutePanel
          color="primary"
          :name="pageTitle"
          :icon="pageIcon"
        />
      </lyc-column>
    </lyc-row>
    <div v-html="markdownContent"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import MarkdownIt from 'markdown-it';
import RoutePanel from '@/views/components/RoutePanel.vue';

const md = new MarkdownIt({
  html: true, // Enable HTML tags in the Markdown content
  breaks: true, // Convert '\n' in paragraphs into <br>
});

const route = useRoute();
const markdownContent = ref('');
const pageTitle = ref('' as string);
const pageIcon = ref('' as string);

const fetchMarkdownContent = async (filePath: string): Promise<string> => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch Markdown file: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.warn('Error loading Markdown file:', error);
    throw error;
  }
};

const renderFile = async () => {
  try {
    const markdownFile = await fetchMarkdownContent(`src/assets/markdown/${route.params.filename}.md`);
    const regex = /\[(.*?)\/\/\/(.*?)\]\s+$/;
    const match = regex.exec(markdownFile);
    if (match) {
      const [, matchedPageTitle, matchedPageIcon] = match;
      pageTitle.value = matchedPageTitle;
      pageIcon.value = matchedPageIcon;
    } else {
      pageTitle.value = route.name as string;
      pageIcon.value = route.meta.icon as string;
    }
    const markdownText = markdownFile.replace(regex, '');
    markdownContent.value = md.render(markdownText);
  } catch (error) {
    markdownContent.value = `Error loading Markdown file: ${route.params.filename}`;
  }
};

watch(() => route.params.filename, () => {
  renderFile();
});

renderFile(); // Initial render when component is mounted
</script>

<style scoped></style>
