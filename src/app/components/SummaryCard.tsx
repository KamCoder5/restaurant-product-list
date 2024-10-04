import Image from "next/image";
import { SummaryCardItem } from "./SummaryCardItem";
import carbonNeutral from "../../../public/images/icon-carbon-neutral.svg";
import EmptyCart from "./EmptyCart";

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface SummaryCardProps {
  productsInCart: CartItem[];
  totalItemsInCart: number;
  getTotalCartCost: () => number;
  deleteFromCart: (productName: string) => void;
  isOrderConfirmedOpen: () => void;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  productsInCart,
  totalItemsInCart,
  getTotalCartCost,
  deleteFromCart,
  isOrderConfirmedOpen,
}) => {
  return (
    <div className="justify-center items-center lg:h-1/4 lg:p-6 bg-white max-sm:p-10 md:p-10 rounded-lg md:w-1/2 lg:w-1/4 0">
      <div className="text-red-700 text-xl font-extrabold">
        Your Cart ({totalItemsInCart})
      </div>
      {productsInCart.length == 0 && <EmptyCart />}
      {productsInCart.length > 0 && (
        <div className="bg-white p-4 rounded-lg mt-8 lg:mt-0 lg:sticky lg:top-4">
          {productsInCart.map(({ name, price, quantity }) => (
            <SummaryCardItem
              key={name}
              name={name}
              price={price}
              quantity={quantity}
              deleteFromCart={deleteFromCart}
            />
          ))}
          <div className="flex flex-row text-lg mt-4 justify-between items-center">
            <span>Order Total </span>
            <span className="font-extrabold text-3xl">
              ${getTotalCartCost().toFixed(2)}
            </span>
          </div>
          <div
            className={
              "flex flex-row bg-orange-50 rounded-lg items-center p-5 mt-5 "
            }
          >
            <Image
              className="justify-center items-center"
              src={carbonNeutral}
              width={25}
              height={25}
              alt="Carbon Neutral"
            />
            <p className="ml-2 ">
              This is <b className="text-grey-700"> carbon-neutral</b> delivery
            </p>
          </div>
          <div className="flex items-center justify-center w-full mt-4">
            <button
              type="button"
              className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg min-w-1/2 mt-5 mb-5"
              onClick={isOrderConfirmedOpen}
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
