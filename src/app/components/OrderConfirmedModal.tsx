import React from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { CartItem } from "./SummaryCard";

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
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <Dialog.Title as="h3" className="text-4xl font-bold text-red-700">
            Order Confirmed!
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              We hope you enjoy your food!
            </p>
          </div>

          <div className="mt-4 space-y-4">
            {productsInCart.map((item) => (
              <div key={item.name} className="flex items-center space-x-4">
                {item.image && (
                  <Image
                    src={item.image}
                    width={64}
                    height={64}
                    alt={item.name}
                    className="object-cover rounded-md"
                  />
                )}
                <div>
                  <p className="font-semibold text-black">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                  <p className="font-semibold text-black">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-4 text-2xl font-bold text-slate-700">
              <span>Order Total: ${getTotalCartCost().toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="button"
              className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-3xl w-full"
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
