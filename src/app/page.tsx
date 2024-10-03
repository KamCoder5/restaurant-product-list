"use client";

import { useState } from "react";
import data from "../api/data.json";
import { ProductCard } from "./components/ProductCard";
import { SummaryCard } from "./components/SummaryCard";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

export default function Home() {
  const [productsInCart, setProductsInCart] = useState<CartItem[]>([]);

  const addToCart = (productName: string, price: number) => {
    setProductsInCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === productName);
      if (existingItem) {
        return prevCart.map((item) =>
          item.name === productName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { name: productName, price, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productName: string) => {
    setProductsInCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.name === productName
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      return updatedCart.filter((item) => item.quantity > 0);
    });
  };

  const getTotalCartCost = () => {
    return productsInCart.reduce(
      (total, { price, quantity }) => total + price * quantity,
      0
    );
  };

  const totalItemsInCart = productsInCart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="text-black p-10 flex flex-col lg:flex-row min-h-screen">
      <div className="flex-grow">
        <header className="text-black text-4xl font-extrabold md:ml-5 mb-5">
          Desserts
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((product, index) => (
            <ProductCard
              key={index}
              image={product.image.desktop}
              category={product.category}
              name={product.name}
              price={product.price}
              productQuantityInCart={
                productsInCart.find((item) => item.name === product.name)
                  ?.quantity || 0
              }
              handleAddToCart={() => addToCart(product.name, product.price)}
              handleRemoveFromCart={() => removeFromCart(product.name)}
              isSelectedProduct={productsInCart.some(
                (item) => item.name === product.name
              )}
            />
          ))}
        </div>
      </div>
      <SummaryCard
        productsInCart={productsInCart}
        totalItemsInCart={totalItemsInCart}
        getTotalCartCost={getTotalCartCost}
      />
    </div>
  );
}
