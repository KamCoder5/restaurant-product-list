"use client";

import { useState } from "react";
import data from "../api/data.json";
import { ProductCard } from "./components/ProductCard";
import { SummaryCardItem } from "./components/SummaryCardItem";
import { isMobile, isTablet } from "react-device-detect";

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
      console.log("Updated cart after adding:", updatedCart);
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
      console.log("Updated cart after removing:", updatedCart);
      return updatedCart;
    });
  };

  const getTotalCartCost = () => {
    return Object.values(productsInCart).reduce(
      (total, { price, quantity }) => {
        return total + price * quantity;
      },
      0
    );
  };

  const productImage = (product: any) => {
    if (isMobile) return product.image.mobile;
    if (isTablet) return product.image.tablet;
    return product.image.desktop;
  };

  const totalItemsInCart = Object.values(productsInCart).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="text-black p-4">
      <header className="text-black text-4xl font-extrabold mb-10">
        Desserts
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.map((product, index) => (
          <ProductCard
            key={index}
            image={productImage(product)}
            category={product.category}
            name={product.name}
            price={product.price}
            productQuantityInCart={productsInCart[product.name]?.quantity || 0}
            handleAddToCart={() => addToCart(product.name, product.price)}
            handleRemoveFromCart={() => removeFromCart(product.name)}
            isSelectedProduct={!!productsInCart[product.name]}
          />
        ))}
      </div>
      <div className="h-full w-full bg-white p-4 rounded-lg mt-8">
        <div className="text-red-700 text-4xl font-extrabold mb-5">
          Your Cart ({totalItemsInCart})
        </div>
        {Object.entries(productsInCart).map(([name, { price, quantity }]) => (
          <SummaryCardItem
            key={name}
            name={name}
            price={price}
            quantity={quantity}
          />
        ))}
        <div className="text-xl font-bold mt-4">
          Total: ${getTotalCartCost().toFixed(2)}
        </div>
      </div>
    </div>
  );
}
