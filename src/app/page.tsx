"use client";

import { useState } from "react";
import data from "../api/data.json";
import { ProductCard } from "./components/ProductCard";
import { SummaryCardItem } from "./components/SummaryCardItem";

interface CartItem {
  price: number;
  quantity: number;
}

interface Cart {
  [key: string]: CartItem;
}

export default function Home() {
  const [productsInCart, setProductsInCart] = useState<Cart>({});

  const addToCart = (productName: string, price: number) => {
    setProductsInCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productName]) {
        updatedCart[productName].quantity += 1;
      } else {
        updatedCart[productName] = { price, quantity: 1 };
      }
      return updatedCart;
    });
  };

  const removeFromCart = (productName: string) => {
    setProductsInCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productName]) {
        updatedCart[productName].quantity -= 1;
        if (updatedCart[productName].quantity <= 0) {
          delete updatedCart[productName];
        }
      }
      return updatedCart;
    });
  };

  const getTotalCartCost = () => {
    return Object.values(productsInCart).reduce(
      (total, { price, quantity }) => total + price * quantity,
      0
    );
  };

  const totalItemsInCart = Object.values(productsInCart).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="text-black p-4 flex flex-col lg:flex-row min-h-screen">
      <div className="flex-grow">
        <header className="text-black text-4xl font-extrabold mb-10">
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
                productsInCart[product.name]?.quantity || 0
              }
              handleAddToCart={() => addToCart(product.name, product.price)}
              handleRemoveFromCart={() => removeFromCart(product.name)}
              isSelectedProduct={!!productsInCart[product.name]}
            />
          ))}
        </div>
      </div>
      {/* summary card */}
      <div className="lg:w-1/4  lg:h-1/4 lg:p-10 bg-white max-sm:p-10 rounded-lg">
        <div className="text-red-700 text-4xl font-extrabold">
          Your Cart ({totalItemsInCart})
        </div>
        <div className="bg-white p-4 rounded-lg mt-8 lg:mt-0 lg:sticky lg:top-4">
          {Object.entries(productsInCart).map(([name, { price, quantity }]) => (
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
          <div className="flex justify-center w-full  mt-4">
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
