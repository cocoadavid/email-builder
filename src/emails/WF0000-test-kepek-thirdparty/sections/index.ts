const sectionsModules = import.meta.glob('./*.html', { eager: false });

const sections: Record<string, string> = {};

await Promise.all(
  Object.entries(sectionsModules).map(async ([path]) => {
    // path pl.: './section1.html'
    // hozzádjuk a ?raw-t a dinamikus importhoz
    const rawPath = path + '?raw';

    // dinamikus import a ?raw hozzáadásával
    const contentModule = await import(/* @vite-ignore */ rawPath);
    
    // contentModule default exportként tartalmazza a raw stringet
    sections[path.replace('./', '').replace('.html', '')] = contentModule.default;
  })
);

console.log(Object.keys(sections));

export default sections;
