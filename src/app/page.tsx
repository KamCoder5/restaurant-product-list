"use client";

import { useState } from "react";
import data from "../api/data.json";
import { ProductCard } from "./components/ProductCard";
import { SummaryCardItem } from "./components/SummaryCardItem";

export default function Home() {
  const [productsInCart, setProductsInCart] = useState<{
    [key: string]: number;
  }>({});

  const handleCartQuantity = (productName: string, option: string) => {
    setProductsInCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (option === "add") {
        updatedCart[productName] = (updatedCart[productName] || 0) + 1;
      } else if (option === "remove" && updatedCart[productName]) {
        updatedCart[productName] -= 1;
        if (updatedCart[productName] === 0) {
          delete updatedCart[productName];
        }
      }
      return updatedCart;
    });
  };

  const handleAddToCartSelected = (productName: string) => {
    setProductsInCart((prevCart) => ({
      ...prevCart,
      [productName]: 1,
    }));
  };

  return (
    <div className="text-black p-4">
      <header className="text-black text-4xl font-extrabold mb-10">
        Desserts
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.map((product, index) => (
          <ProductCard
            key={index}
            image={product.image.mobile}
            category={product.category}
            name={product.name}
            price={product.price}
            productQuantityInCart={productsInCart[product.name] || 0}
            handleCartQuantity={(option: string) =>
              handleCartQuantity(product.name, option)
            }
            handleAddToCartSelected={() =>
              handleAddToCartSelected(product.name)
            }
            isSelectedProduct={productsInCart}
          />
        ))}
      </div>
      <SummaryCardItem />
    </div>
  );
}
