import React from "react";
import Image from "next/image";
import emptyCart from "../../../public/images/illustration-empty-cart.svg";

type Props = {};

const EmptyCart = (props: Props) => {
  return (
    <div>
      <Image
        className="m-auto w-full"
        src={emptyCart}
        width={200}
        height={200}
        alt="Picture of Food"
      />
      <p className="text-center font-extrabold text-stone-400">
        Your added items will appear here
      </p>
    </div>
  );
};

export default EmptyCart;
