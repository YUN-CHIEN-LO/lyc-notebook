import { App, ComponentOptions } from 'vue';

export default async (app: App<Element>): Promise<void> => {
  // Grab all components in `/src/lib/components/` that start with "Base"
  const components = import.meta.glob('../**/Lyc*.vue');
  Object.entries(components).forEach(async ([path, component]) => {
    const pathSplit = path.split('/');
    const fileName = pathSplit[pathSplit.length - 1].split('.vue')[0].split('Lyc')[1];

    // Convert to kebab-case and register with a "jvp-" prefix
    const kebab = fileName.replace(/([a-z0–9])([A-Z])/g, '$1-$2').toLowerCase();

    // Resolve the component from the promise
    const resolvedComponent: ComponentOptions = await component() as ComponentOptions;

    if (resolvedComponent) {
      // Register the component
      app.component(`lyc-${kebab}`, resolvedComponent.default);
      app.component(`Lyc${fileName}`, resolvedComponent.default);
    }
  });
};
