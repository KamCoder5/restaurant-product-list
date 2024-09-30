import Image from "next/image";
import imageBaklavaMobile from "../../../public/images/image-baklava-mobile.jpg";
import iconAddToCard from "../../../public/images/icon-add-to-cart.svg";
export const ProductCard = ({
  image,
  name,
  category,
  handleAddToCart,
  price,
}: any) => {
  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };
  return (
    <div className="">
      <div className="text-black w-full relative">
        <Image
          className=" md:aspect-square sm:aspect-ratio: 3 / 2 rounded-lg z"
          src={image}
          width={500}
          height={500}
          alt="Picture of Food"
        />
        <button
          className="flex items-center justify-center border border-slate-400 bg-white h-10 w-40 rounded-3xl left-1/3 absolute -bottom-5" // button keeps sliding when resizing browser
          onClick={handleAddToCart}
        >
          <Image
            className="h-4 w-4 mr-2"
            src={iconAddToCard}
            width={500}
            height={500}
            alt=" Add To Cart Icon"
          />
          Add To Cart
        </button>
      </div>

      <div className="flex flex-col justify-center items-start">
        <p className="text-slate-500">{category}</p>
        <p className="font-extrabold">{name}</p>
        <p className="font-extrabold text-red-700">${formatPrice(price)}</p>
      </div>
    </div>
  );
};
