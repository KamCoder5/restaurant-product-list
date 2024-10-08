"use client";
import { useState, useEffect } from "react";
import data from "../api/data.json";
import { ProductCard } from "./components/ProductCard";
import { SummaryCard } from "./components/SummaryCard";
import { OrderConfirmedModal } from "./components/OrderConfirmedModal";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function Home() {
  const [productsInCart, setProductsInCart] = useState<CartItem[]>([]);
  const [isOrderConfirmedOpen, setIsOrderConfirmedOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("unconfirmedCart");
    if (savedCart) {
      setProductsInCart(JSON.parse(savedCart));
    }
  }, []);

  const saveToLocalStorage = (cart: CartItem[]) => {
    localStorage.setItem("unconfirmedCart", JSON.stringify(cart));
  };

  const addToCart = (productName: string, price: number, image: string) => {
    setProductsInCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === productName);
      let newCart;
      if (existingItem) {
        newCart = prevCart.map((item) =>
          item.name === productName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [
          ...prevCart,
          { name: productName, price, quantity: 1, image },
        ];
      }
      saveToLocalStorage(newCart);
      return newCart;
    });
  };

  const showOrderConfirmed = () => {
    setIsOrderConfirmedOpen(true);
    console.log("Order confirmed!", { isOrderConfirmedOpen });
    localStorage.removeItem("unconfirmedCart");
  };

  const removeFromCart = (productName: string) => {
    setProductsInCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.name === productName
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
      saveToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const deleteFromCart = (productName: string) => {
    setProductsInCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.name !== productName);
      saveToLocalStorage(updatedCart);
      return updatedCart;
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

  const productQuantityInCart = (
    productsInCart: CartItem[],
    productName: string
  ) => {
    return (
      productsInCart.find((item) => item.name === productName)?.quantity || 0
    );
  };

  return (
    <div className="text-black flex flex-col lg:flex-row min-h-screen pt-5">
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
              productQuantityInCart={productQuantityInCart(
                productsInCart,
                product.name
              )}
              handleAddToCart={() =>
                addToCart(product.name, product.price, product.image.desktop)
              }
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
        deleteFromCart={deleteFromCart}
        isOrderConfirmedOpen={showOrderConfirmed}
      />
      {isOrderConfirmedOpen && (
        <OrderConfirmedModal
          isOrderConfirmedOpen={isOrderConfirmedOpen}
          productsInCart={productsInCart}
          getTotalCartCost={getTotalCartCost}
          onClose={() => setIsOrderConfirmedOpen(false)}
          onStartNewOrder={() => {
            setProductsInCart([]);
            setIsOrderConfirmedOpen(false);
            localStorage.removeItem("unconfirmedCart");
          }}
        />
      )}
    </div>
  );
}
