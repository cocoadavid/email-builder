const ColorGuide = () => {
  const colors = [
    { name: 'vsRed', hex: '#e60000' },
    { name: 'vsRedDark', hex: '#820000' },
    { name: 'vsBlack', hex: '#000000' },
    { name: 'vsPurple', hex: '#9C2AA0' },
    { name: 'vsGrayDark', hex: '#4a4d4e' },
    { name: 'vsGrayLight', hex: '#D2D2D2' },
    { name: 'vsGray', hex: '#A6A6A6' },
    { name: 'vsWhite', hex: '#f2f2f2' },
    { name: 'vsBlue', hex: '#00B0CA' },
    { name: 'vsGreen', hex: '#A8B400' },
    { name: 'vsYellow', hex: '#FECB00' },
  ];

  return (
    <div className="p-8 space-y-10">
      <div className="hidden">
        bg-vsRed bg-vsRedDark bg-vsBlack bg-vsPurple bg-vsGrayDark bg-vsGrayLight bg-vsGray
        bg-vsWhite bg-vsBlue bg-vsGreen bg-vsYellow border-vsRed border-vsRedDark border-vsBlack
        border-vsPurple border-vsGrayDark border-vsGrayLight border-vsGray border-vsWhite
        border-vsBlue border-vsGreen border-vsYellow text-vsRed text-vsRedDark text-vsBlack
        text-vsPurple text-vsGrayDark text-vsGrayLight text-vsGray text-vsWhite text-vsBlue
        text-vsGreen text-vsYellow
      </div>

      <h1 className="text-3xl font-bold mb-6">🎨 UI Style Guide</h1>

      {/* Színpaletta */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Színek</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {colors.map(c => (
            <div key={c.name} className="rounded-lg shadow border border-gray-200 overflow-hidden">
              <div
                className={`h-20 bg-${c.name}`}
                style={{ backgroundColor: `var(--color-${c.name})` }}
              />
              <div className="p-2 text-sm">
                <p className="font-semibold">{c.name}</p>
                <p className="text-xs text-gray-500">{c.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gomb példák */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Gombok</h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-vsRed hover:bg-vsRedDark text-vsWhite px-4 py-2 rounded shadow">
            Piros
          </button>
          <button className="bg-vsBlue hover:bg-vsBlue/80 text-vsWhite px-4 py-2 rounded shadow">
            Kék
          </button>
          <button className="bg-vsGreen hover:bg-vsGreen/80 text-vsBlack px-4 py-2 rounded shadow">
            Zöld
          </button>
          <button className="bg-vsYellow hover:bg-vsYellow/80 text-vsBlack px-4 py-2 rounded shadow">
            Sárga
          </button>
        </div>
      </section>

      {/* Szövegszínek */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Szövegszínek</h2>
        <div className="space-y-2">
          {colors.map(c => (
            <p key={c.name} className={`text-${c.name} font-medium`}>
              Ez a szöveg {c.name} színű.
            </p>
          ))}
        </div>
      </section>

      {/* Border példák */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Border színek</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {colors.map(c => (
            <div key={c.name} className={`border-4 border-${c.name} rounded p-4 text-center`}>
              {c.name}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ColorGuide;
