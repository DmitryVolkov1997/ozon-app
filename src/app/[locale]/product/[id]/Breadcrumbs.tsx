import { ChartBarStacked, Copy, Forward } from "lucide-react";

const crumbs = [
  "Электроника",
  "Ноутбуки, планшеты и электронные книги",
  "Игровые ноутбуки",
  "Lenovo",
];

const menu = [
  {
    icon: Copy,
    label: "Артикул: 3635170018",
  },
  {
    icon: ChartBarStacked,
    label: "В сравнение",
  },
  {
    icon: Forward,
    label: "Поделиться",
  },
];

function Breadcrumbs() {
  return (
    <div className="flex justify-between items-center my-3 text-gray-500 font-semibold text-sm">
      <div className="flex gap-x-3 items-center">
        {crumbs.map((crumb, index) => (
          <div
            key={crumb}
            className="flex items-center gap-x-1.5 hover:text-blue-700 transition-colors"
          >
            {crumb}
            {index !== crumbs.length - 1 && (
              <span className="w-1 aspect-square bg-gray-500 inline-block rounded-md" />
            )}
          </div>
        ))}
      </div>

      <div>
        <div className="flex gap-x-3 items-center">
          {menu.map((menu) => (
            <div
              key={menu.label}
              className="flex gap-x-3 items-center hover:text-blue-700 transition-colors"
            >
              <div>{<menu.icon size={16} />}</div>
              <div>{menu.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Breadcrumbs;
