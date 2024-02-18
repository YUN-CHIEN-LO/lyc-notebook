<template>
  <div>
    <lyc-row class="my-g-4">
      <lyc-column
        :sm="12"
        :md="12"
        :lg="12"
        class="home__title"
      >

        <LycIcon
          icon="lycLogo"
          class="c-primary"
          :font-size="20"
        />
        <h1 class="c-primary"> {{ t('system.projectName') }} </h1>
      </lyc-column>
    </lyc-row>
    <lyc-row>
      <lyc-column
        v-for="route in frontRoutes"
        :key="route.name"
        :sm="12"
        :md="isNotebookRoute(route.name) ? 12 : 6"
        :lg="isNotebookRoute(route.name) ? 12 : 6"
      >
        <RoutePanel
          :color="isNotebookRoute(route.name) ? 'primary' : 'secondary'"
          :name="`${route.name}.title`"
          :icon="route.meta?.icon"
          clickable
        />
      </lyc-column>
      <lyc-column>
        <lyc-card>
          <ol>
            <li>loading</li>
            <li>alert</li>
            <li>user page</li>
          </ol>
        </lyc-card>
      </lyc-column>
    </lyc-row>
  </div>
</template>

<script setup lang="ts">
import frontRoutes from '@/router/routes/front';
import RoutePanel from '@/views/components/RoutePanel.vue';
import { useI18n } from 'vue-i18n';
import { RouteRecordName } from 'vue-router';

const { t } = useI18n();

/**
 *
 * @param name
 */
function isNotebookRoute(name: RouteRecordName): boolean {
  return name === 'notebook';
}

</script>

<style scoped lang="scss">
.home {
  &__title {
    @include flex($fw: wrap, $jc: space-between, $ai: flex-end);

    @include small-device {
      justify-content: center;
    }

    &>h1 {
      font-size: fz(20) !important;
      line-height: 0;

      @include small-device {
        font-size: fz(10);
        width: 100%;
        text-align: center;
        line-height: 1.2;
      }
    }
  }
}
</style>
