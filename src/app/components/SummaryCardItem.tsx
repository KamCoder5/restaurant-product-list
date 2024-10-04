import React from "react";
import Image from "next/image";
import removeItemIcon from "../../../public/images/icon-remove-item.svg";

interface SummaryCardItemProps {
  name: string;
  price: number;
  quantity: number;
  deleteFromCart: (name: string) => void;
}

export const SummaryCardItem: React.FC<SummaryCardItemProps> = ({
  name,
  price,
  quantity,
  deleteFromCart,
}) => {
  const totalPriceForIndividualProduct = (price * quantity).toFixed(2);

  return (
    <div className="w-full mb-4">
      <div className="flex justify-between items-center">
        <p className="text-slate-700 text-lg font-bold">{name}</p>
        <button onClick={() => deleteFromCart(name)}>
          <Image
            className="border-2 border-stone-200 rounded-full mt-4"
            src={removeItemIcon}
            width={20}
            height={20}
            alt="remove item from cart"
          />
        </button>
      </div>
      <div className="flex items-center text-m text-slate-500">
        <p className="mr-2 font-bold text-red-700">{quantity}x</p>
        <p className="mr-2">@ ${price.toFixed(2)}</p>
        <p className="text-slate-600 text-lg font-bold">
          ${totalPriceForIndividualProduct}
        </p>
      </div>
      <hr className="h-px my-2 bg-gray-200 border-0" />
    </div>
  );
};
