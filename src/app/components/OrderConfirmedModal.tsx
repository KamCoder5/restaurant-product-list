import React from "react";
import { Dialog } from "@headlessui/react";
import { CartItem } from "./SummaryCard";
import { SummaryCardItem } from "./SummaryCardItem";

interface OrderConfirmedModalProps {
  isOrderConfirmedOpen: boolean;
  productsInCart: CartItem[];
  getTotalCartCost: () => number;
  onClose: () => void;
  onStartNewOrder: () => void;
}

export function OrderConfirmedModal({
  isOrderConfirmedOpen,
  productsInCart,
  getTotalCartCost,
  onClose,
  onStartNewOrder,
}: OrderConfirmedModalProps) {
  return (
    <Dialog
      open={isOrderConfirmedOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center max-sm:mt-40 ">
        <Dialog.Panel className="w-full h-full transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <Dialog.Title as="h3" className="text-4xl font-bold  text-slate-900">
            Order Confirmed
          </Dialog.Title>
          <div className="mt-2 ">
            <p className="text-sm text-gray-500">
              We hope you enjoy your food!
            </p>
          </div>

          <div className="mt-4 p-5">
            {productsInCart.map((item) => (
              <SummaryCardItem
                key={item.name}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
              />
            ))}

            <div className="mt-4 font-bold text-slate-700">
              <span className="">
                Order Total ${getTotalCartCost().toFixed(2)}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-3xl min-w-1/2 mt-5 mb-5 w-full"
              onClick={() => {
                onStartNewOrder();
                onClose();
              }}
            >
              Start New Order
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
