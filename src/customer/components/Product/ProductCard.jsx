import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import { Rating } from "@mui/material";
export default function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="productCard relative w-[15rem] m-3 transition-all cursor-pointer shadow-xl rounded-3xl overflow-hidden"
    >
      <span className="wdp-ribbon wdp-ribbon-two ">
        <div className="font-semibold text-white">
          {product.discountPercent}%off
        </div>
      </span>
      <div className="h-[16rem]">
        <img
          className="h-full w-full  object-contain"
          src={`${product.imageUrl}`}
          alt=""
        />
      </div>

      <div className="textPart bg-white p-3 border-t-2">
        <div>
          <Rating value={4.6} precision={0.5} readOnly></Rating>

          <p className="font-bold opacity-60"> {product.title}</p>
          <p>{product.description}</p>
        </div>

        <div className="flex items-center space-x-2">
          <p className="font-semibold">{product.discountedPrice}$</p>
          <p className="opacity-50 line-through">{product.price}$</p>
          <p className="text-green-600 font-semibold">
            {product.discountPercent}% off
          </p>
        </div>
      </div>
    </div>
  );
}
