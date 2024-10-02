"use client";

import { useState } from "react";
import data from "../api/data.json";
import { ProductCard } from "./components/ProductCard";
import { SummaryCardItem } from "./components/SummaryCardItem";
import { isMobile, isDesktop, isTablet } from "react-device-detect";

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
  const productImage = (product: any) => {
    if (isMobile) {
      return product.image.mobile;
    }
    if (isDesktop) {
      return product.image.desktop;
    }
    if (isTablet) {
      return product.image.tablet;
    } else {
      return product.image.desktop;
    }
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
            image={productImage(product)}
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
