/* eslint-disable no-unused-vars */
export { };

export enum DeviceEnum {
  'desktop', // -------------- 桌機
  'tablet', // --------------- 平板
  'mobile' // ---------------- 手機
}


declare global {
  namespace LycLib {
    type Enum = Record<(string | number), (string | number)>
    type Data<T = unknown> = Record<string, T>;
    type Rule = (val: unknown) => (boolean | string);
    type Rules = Data<Rule>
  }

}
