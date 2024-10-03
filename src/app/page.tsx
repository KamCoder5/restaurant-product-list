"use client";

import { useState } from "react";
import data from "../api/data.json";
import { ProductCard } from "./components/ProductCard";
import { SummaryCardItem } from "./components/SummaryCardItem";

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
      {/* summary card */}
      <div className="lg:w-1/4 lg:h-1/4 lg:p-10 bg-white max-sm:p-10 md:p-10 rounded-lg">
        <div className="text-red-700 text-4xl font-extrabold">
          Your Cart ({totalItemsInCart})
        </div>
        <div className="bg-white p-4 rounded-lg mt-8 lg:mt-0 lg:sticky lg:top-4">
          {productsInCart.map(({ name, price, quantity }) => (
            <SummaryCardItem
              key={name}
              name={name}
              price={price}
              quantity={quantity}
            />
          ))}

          <div className="flex flex-row text-lg mt-4 justify-between items-center">
            <span>Order Total </span>
            <span className="font-extrabold text-3xl">
              ${getTotalCartCost().toFixed(2)}
            </span>
          </div>
          <div className="flex justify-center w-full mt-4">
            <button
              type="button"
              className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full w-1/2 mt-5"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
