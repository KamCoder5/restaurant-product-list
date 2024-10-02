import Image from "next/image";
import iconAddToCard from "../../../public/images/icon-add-to-cart.svg";
import iconIncrementQuantity from "../../../public/images/icon-increment-quantity.svg";
import iconDecrementQuantity from "../../../public/images/icon-decrement-quantity.svg";

interface ProductCardProps {
  image: string;
  name: string;
  category: string;
  price: number;
  handleCartQuantity: (option: string) => void;
  productQuantityInCart: number;
  handleAddToCartSelected: () => void;
  isSelectedProduct: { [key: string]: number };
}

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  category,
  price,
  handleCartQuantity,
  productQuantityInCart,
  handleAddToCartSelected,
  isSelectedProduct,
}) => {
  const productCardButton = () => {
    if (isSelectedProduct[name]) {
      return (
        <div className="flex items-center justify-center border-2 border-red-700 bg-red-700 text-white h-10 w-40 rounded-3xl absolute m-auto left-0 right-0 -bottom-5">
          <button onClick={() => handleCartQuantity("remove")}>
            <Image
              className="h-4 w-4 m-2 border-2"
              src={iconDecrementQuantity}
              alt="Decrement Quantity Icon"
            />
          </button>
          <span>{productQuantityInCart}</span>
          <button onClick={() => handleCartQuantity("add")}>
            <Image
              className="h-4 w-4 m-2 border-2"
              src={iconIncrementQuantity}
              alt="Increment Quantity Icon"
            />
          </button>
        </div>
      );
    } else {
      return (
        <button
          className="flex items-center justify-center border border-slate-400 bg-white h-10 w-40 rounded-3xl absolute m-auto left-0 right-0 -bottom-5"
          onClick={handleAddToCartSelected}
        >
          <Image
            className="h-4 w-4 mr-2"
            src={iconAddToCard}
            alt="Add To Cart Icon"
          />
          Add To Cart
        </button>
      );
    }
  };
  return (
    <div className="md:p-5">
      <div className="text-black relative mb-5  rounded-lg ">
        <Image
          className={`w-full md:aspect-square sm:aspect-[3/2] rounded-lg ${
            isSelectedProduct[name] ? "border-2  border-red-700" : "border-2"
          }`}
          src={image}
          width={200}
          height={200}
          alt="Picture of Food"
        />
        {productCardButton()}
      </div>
      <div className="flex flex-col justify-center items-start mt-10 max-sm:mb-10 ">
        <p className="text-slate-500">{category}</p>
        <p className="font-extrabold">{name}</p>
        <p className="font-extrabold text-red-700">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};
