import {
  defineConfig, loadEnv, splitVendorChunkPlugin,
} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
/**
 * 插入 scss 全域檔案
 * @param {string} content - 檔案內容
 * @param {string} filePath - 檔案路徑
 * @returns {string} - 插入檔案文字
 */
function setScssAdditionalData(content: string, filePath: string) {
  // 若檔案為 module.scss，不需要插入全域變數
  if ((filePath.endsWith('.module.scss'))) return content;

  // 使用 sass map 方法
  const useSassMap = '@use "sass:map";';
  // 全域 scss 檔案路徑
  const globalScss = '@import "@/styles/_global.scss";';

  // 在每個檔案前綴全域變數
  return useSassMap + globalScss + content;
}

// https://vitejs.dev/config/
/**
 * 設定 vite
 * @param {NodeJS.ProcessEnv} env - 環境變數
 * @returns {import('vite').UserConfig} - 返回 vite 設定
 */
function setConfig(env) {
  return defineConfig({
    plugins: [
      vue(),
      splitVendorChunkPlugin(),
      visualizer({
        emitFile: true,
        filename: 'build.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
      })],
    base: `./`,
    css: {
      preprocessorOptions: {
        scss: {
          // 使用全域變數
          additionalData: setScssAdditionalData,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      host: env.VITE_HOST,
      port: env.VITE_PORT,
      open: true,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: any) {
            if (id.includes("node_modules")) {
              return id.toString().split("node_modules/")[1].split("/")[0].toString();
            }
          },
        },
      },
    },
  });
}

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return setConfig(process.env);
};
