"use client";
import data from "../api/data.json";
import { ProductCard } from "./components/ProductCard";
import { SummaryCardItem } from "./components/SummaryCardItem";

export default function Home() {
  const handleAddToCart = (name: string) => {
    console.log(`Added ${name} to cart`);
  };

  return (
    <div className="text-black p-4">
      <header className="text-black text-4xl font-extrabold mb-6">
        Desserts
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {data.map((product, index) => (
          <ProductCard
            key={index}
            image={product.image.mobile}
            category={product.category}
            name={product.name}
            price={product.price}
            handleAddToCart={() => handleAddToCart(product.name)}
          />
        ))}
      </div>
      <div className="h-full w-full bg-white">
        <div className="text-red-700 text-4xl font-extrabold">Your Chart</div>
      </div>
      <SummaryCardItem />
    </div>
  );
}
