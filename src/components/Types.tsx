import { FC } from "react";

const Types: FC = () => {
  const types = [
    { id: 1, name: "Sås", icon: "🥣" },
    { id: 2, name: "Huvudrätt", icon: "🧆" },
    { id: 3, name: "Bakverk", icon: "🍪" },
    { id: 3, name: "Tillbehör", icon: "🎗" },
  ];

  return (
    <div>
      <h2 className="text-center mt-5 mb-8">Typer</h2>
      <div className="grid grid-cols-3 gap-4">
        {types.map(({ id, name, icon }) => (
          <div
            className="p-4 rounded-lg shadow-lg bg-slate-500 text-center"
            key={id}
          >
            <div className="text-5xl mb-5">{icon}</div>
            <div className="text-white">{name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Types;
