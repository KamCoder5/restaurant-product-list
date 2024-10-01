import Image from "next/image";
import iconAddToCard from "../../../public/images/icon-add-to-cart.svg";
export const ProductCard = ({
  image,
  name,
  category,
  handleAddToCart,
  price,
}: any) => {
  return (
    <div className=" md:p-5">
      <div className="text-black relative mb-5 border rounded-lg">
        <Image
          className="w-full md:aspect-square sm:aspect-[3/2] rounded-lg"
          src={image}
          width={500}
          height={500}
          alt="Picture of Food"
        />
        <button
          className="flex items-center justify-center border border-slate-400 bg-white h-10 w-40 rounded-3xl absolute m-auto left-0 right-0  -bottom-5"
          onClick={handleAddToCart}
        >
          <Image
            className="h-4 w-4 mr-2"
            src={iconAddToCard}
            alt=" Add To Cart Icon"
          />
          Add To Cart
        </button>
      </div>

      <div className="flex flex-col justify-center items-start mt-10 max-sm:mb-10">
        <p className="text-slate-500">{category}</p>
        <p className="font-extrabold">{name}</p>
        <p className="font-extrabold text-red-700">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};
