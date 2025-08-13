import type { ComponentType } from 'react';

const sectionModules = import.meta.glob<{ default: ComponentType }>('./*.tsx', { eager: true });

const sections: Record<string, ComponentType> = {};

for (const path in sectionModules) {
  // path eg: './Section1.tsx'
  const name = path.replace('./', '').replace('.tsx', ''); // Section1
  sections[name] = sectionModules[path].default;
}

export default sections;
