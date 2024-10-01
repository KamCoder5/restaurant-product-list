"use client";

import { useState } from "react";
import data from "../api/data.json";
import { ProductCard } from "./components/ProductCard";
import { SummaryCardItem } from "./components/SummaryCardItem";

export default function Home() {
  const [productsInCart, setProductInCart] = useState<{
    [key: string]: number;
  }>({});
  const [isProductSelected, setIsProductSelected] = useState();

  const handleProductsInCart = (productName: string, option: string) => {
    if (option === "add") {
      setProductInCart((prevCart) => ({
        ...prevCart,
        [productName]: (prevCart[productName] ?? 0) + 1,
      }));
    } else if (option === "remove" && productsInCart[productName]) {
      setProductInCart((prevCart) => ({
        ...prevCart,
        [productName]: prevCart[productName] - 1,
      }));
    }
    console.log({ productsInCart });
  };

  const handleSelectedProduct = (productName: string) => {
    productName ? true : false;
  };
  return (
    <div className="text-black p-4">
      <header className="text-black text-4xl font-extrabold mb-10">
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
            productQuantityInCart={productsInCart[product.name] || 0}
            handleCartQuantity={(option: string) =>
              handleProductsInCart(product.name, option)
            }
            isSelectedProduct={() => handleSelectedProduct(product.name)}
          />
        ))}
      </div>
      <SummaryCardItem />
    </div>
  );
}
