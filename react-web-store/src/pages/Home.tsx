import { useState } from "react";
import DoksStock from "../components/common/DoksStock";

export default function Home() {
  const [showDokStock, setShowDokStock] = useState(false);

  const dokStockItems = [
    {
      id: 1,
      imgUrl: "/images/huge-choppa.jpg",
      title: "Uge Choppa",
      price: 75330,
      description:
        "Good for slashin! Good for choppin! It's big! Great for krumpin!",
    },
    {
      id: 2,
      imgUrl: "/images/power-klaw.png",
      title: "Powah Klaw",
      price: 305512,
      description: "It's UGE! Great for krumpin! Really great for krumpin!",
    },
    {
      id: 3,
      imgUrl: "/images/dakka.jpg",
      title: "Supa Shootah",
      price: 6942069,
      description: "Goes DAKKADAKKADAKKADAKKA! Great for krumpin!",
    },
    {
      id: 4,
      imgUrl: "/images/kustom-dakka.jpg",
      title: "Kustom Shootah",
      price: 420420420,
      description: "Goes DAKKA DAKKA DAKKA DAKKA! Great for krumpin!",
    },
  ];
  return (
    <div className="flex-box relative">
      <div className="justify-center text-center m-4 text-5xl text-lime-100">
        Da Dok's Speshul Show off Collekshun!
      </div>
      <button
        className="text-cyan-200 hover:text-cyan-100"
        onClick={() => setShowDokStock(!showDokStock)}
      >
        {showDokStock ? "Hide da Dok's Stock" : "Show off da Dok's Stock"}
      </button>
      {showDokStock && (
        <div className="flex-box relative">
          {dokStockItems.map((item) => (
            <DoksStock
              key={item.id}
              imgUrl={item.imgUrl}
              title={item.title}
              price={item.price}
              description={item.description}
            />
          ))}
        </div>
      )}
    </div>
  );
}
