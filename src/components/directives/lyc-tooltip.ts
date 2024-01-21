import { getUniqueId } from '@/utils';
import { isEmpty } from 'lodash';
import type { Directive } from 'vue';

// 層級紀錄
let zIndexCount = 0;

/**
 * 取得 tooltip 座標
 * @param {HTMLElement} targetElement - 插入 tooltip 的元件
 * @param {DOMRect} containerRect - 容器座標
 * @param {number} containerRect.left - 容器左位移
 * @param {number} containerRect.top - 容器右位移
 * @returns {LycLib.Data<number>} - tooltip 座標
 */
function getOffset(targetElement: HTMLElement, { left, top }: DOMRect): LycLib.Data<number> {
  const rect = targetElement.getBoundingClientRect();
  return { top: rect.bottom + top, left: rect.left + left + (rect.width / 2) - 8 };
}

/**
 * 設置 tooltip 定位樣式
 * @param {HTMLElement} targetElement - 插入 tooltip 的元件
 * @param {HTMLElement} container - 容器
 * @returns {string} - 樣式字串
 */
function setTooltipStyle(targetElement: HTMLElement, container: HTMLElement): string {
  // 取得容器座標
  const containerRect = container.getBoundingClientRect();
  const { top, left } = getOffset(targetElement, containerRect);
  // 賦予樣式
  return `z-index: ${2000 + zIndexCount}; top: ${top}px; left: ${left}px`;
}



class LycTooltip {
  // tooltip 紀錄表
  allTooltips: LycLib.Data<HTMLElement>

  constructor() {
    // tooltip 紀錄表
    this.allTooltips = {};
  }

  /**
   * 建立 tooltip
   * @param {HTMLElement} el - 插入 tooltip 的目標元件
   * @param {string} content - tooltip 內容
   * @returns {LycLib.Data<HTMLDivElement> | null}
   */
  createTooltip(el: HTMLElement, content: string,): LycLib.Data<HTMLDivElement> | null {
    const container = document.getElementById('lyc-app');
    if (!container) return null;

    const uniqueId = `lyc-tooltip-${getUniqueId()}`;

    // 建立 tooltip 元件
    const tooltipElement = document.createElement('div');

    // 設置 tooltip id
    tooltipElement.setAttribute('id', uniqueId);

    // 更新層級紀錄
    zIndexCount += 1;

    tooltipElement.style.cssText = setTooltipStyle(el, container);
    // 賦予 class name
    tooltipElement.classList.add('lyc-tooltip');
    // 賦予內容
    tooltipElement.innerText = `${content}`;

    el.setAttribute('data-tooltip', uniqueId)

    // 掛載游標進入事件監聽
    el.addEventListener('mouseenter', (el) => {
      tooltipElement.classList.add('lyc-tooltip--hover');
    });
    // 掛載游標離開事件監聽
    el.addEventListener('mouseleave', () => {
      tooltipElement.classList.remove('lyc-tooltip--hover');
    });

    // 插入 tooltip 元件
    container.appendChild(tooltipElement);

    return { [uniqueId]: tooltipElement }
  }

  updateAllPosition() {
    const container = document.getElementById('lyc-app');
    Object.entries(this.allTooltips).forEach(([key, tooltip]) => {
      const target = document.querySelector(`[data-tooltip="${key}"]`) as HTMLElement;
      if (target && container)
        tooltip.style.cssText = setTooltipStyle(target, container);
    })
  }

  getDirective() {
    return {
      mounted: (el: HTMLElement, { value }) => {
        // 建立 tooltip 物件
        const tooltipInstance = this.createTooltip(el, value)
        if (!tooltipInstance) return;

        if (isEmpty(this.allTooltips)) {
          window.addEventListener("resize", () => {
            const container = document.getElementById('lyc-app');
            Object.entries(this.allTooltips).forEach(([key, tooltip]) => {
              const target = document.querySelector(`[data-tooltip="${key}"]`) as HTMLElement;
              if (target && container)
                tooltip.style.cssText = setTooltipStyle(target, container);
            })
          })
        }

        // 紀錄 tooltip 實例
        Object.assign(this.allTooltips, tooltipInstance)
      },
      updated: (el, { value }) => {
        const uniqueId = el.getAttribute("data-tooltip");
        if (!uniqueId) return
        const tooltipElement = this.allTooltips[uniqueId]
        if (!tooltipElement) return;
        // 更新 tooltip 定位
        const container = document.getElementById('lyc-app');
        if (container)
          tooltipElement.style.cssText = setTooltipStyle(el, container);
        // 更新 tooltip 內容
        tooltipElement.innerText = value;
      },
      beforeUnmount: (el) => {
        const uniqueId = el.getAttribute("data-tooltip");
        if (!uniqueId) return
        const tooltipElement = this.allTooltips[uniqueId]
        if (!tooltipElement) return;

        // 移除 tooltip 元件
        tooltipElement.remove();

        delete this.allTooltips[uniqueId]

        el.removeAttribute('data-tooltip')

        // 移除游標進入事件監聽
        el.removeEventListener('mouseenter', () => { });
        // 移除游標離開事件監聽
        el.removeEventListener('mouseleave', () => { });

        if (isEmpty(this.allTooltips)) {
          window.removeEventListener("resize", () => { })
        }
      },
    } as Directive;
  }
}
const LycTooltipCollection = new LycTooltip();

export default () => LycTooltipCollection.getDirective()
