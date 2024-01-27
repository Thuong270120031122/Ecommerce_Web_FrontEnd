import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./HomeSectionCard.css";
export default function HomeSectionCard({ product }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="relative group cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 border  "
    >
      <div class="z-50 ribbon ribbon-top-right">
        <span className="font-semibold">SALE</span>
      </div>
      <div className="h-[12rem] w-[10rem] mt-5 group-hover:scale-125 transition-transform duration-300 transform">
        <div className="relative inline-block">
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 z-10"></div>
          <img className="object-cover" src={product.imageUrl} alt="" />
        </div>
      </div>

      <div className="p-4">
        <Rating name="read-only" precision={0.5} value={4.5} readOnly></Rating>

        <h2 className="text-orange-400">{product.brand}</h2>
        <h3 className="text-lg font-bold text-gray-900">{product.title}</h3>
        <div className="flex justify-between">
          <p className="text-sm mt-2 text-green-500 font-bold">
            {product.discountedPrice}$
          </p>
          <p className="text-sm mt-2 text-gray-400 line-through">
            {product.price}$
          </p>
        </div>
      </div>
    </div>
  );
}
