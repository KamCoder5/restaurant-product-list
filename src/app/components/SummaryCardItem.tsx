import React from "react";

interface SummaryCardItemProps {
  name: string;
  price: number;
  quantity: number;
}

export const SummaryCardItem: React.FC<SummaryCardItemProps> = ({
  name,
  price,
  quantity,
}) => {
  const totalPriceForIndividualProduct = price * quantity;

  return (
    <div className="w-full bg-white mb-4">
      <div className="flex justify-between items-center">
        <p className="text-slate-700 text-lg font-bold">{name}</p>
        <p className="text-slate-600 text-lg font-bold">
          ${totalPriceForIndividualProduct.toFixed(2)}
        </p>
      </div>
      <div className="flex items-center text-sm text-slate-500">
        <p className="mr-2">
          {quantity} x ${price.toFixed(2)}
        </p>
      </div>
      <hr className="h-px my-2 bg-gray-200 border-0" />
    </div>
  );
};
