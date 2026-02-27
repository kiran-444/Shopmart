import React, { useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { ProductContext } from "../utils/Context";

function Details() {
  const navigate = useNavigate();
  const [products, setProducts] = useContext(ProductContext);
  const { id } = useParams();

  const product = products?.find((p) => p.id == id);

  if (!product) return <Loading />;

  const productDeleteHandler = (id) => {
    const filteredProducts = products.filter((p) => p.id !== id);
    setProducts(filteredProducts);
    localStorage.setItem("products", JSON.stringify(filteredProducts));
    navigate("/");
  };

  return (
    <div style={{ backgroundColor: "#FAF5EF" }} className="w-full min-h-screen flex items-start justify-center py-24 px-6 md:px-20 relative">
      
      <button 
        onClick={() => navigate("/")}
        className="absolute top-10 left-6 md:left-20 text-zinc-400 hover:text-blue-500 flex items-center gap-1 transition-all font-medium"
      >
        <span className="text-xl">←</span> Back to Home
      </button>

      <div className="w-full max-w-6xl flex flex-col md:flex-row items-start gap-12 lg:gap-16">
        
        <div className="w-full md:w-[35%] flex-shrink-0">
          <div style={{ backgroundColor: "#FDFFF5" }} className="p-8 rounded-2xl shadow-xl shadow-zinc-200/50 border border-[#E6E1DC]">
            <img
              className="object-contain max-h-[350px] md:max-h-[400px] w-full"
              src={product.image}
              alt={product.title}
            />
          </div>
        </div>

        <div className="w-full md:w-[65%] flex flex-col">
          <h1 className="text-2xl md:text-4xl font-black text-zinc-900 leading-tight">
            {product.title}
          </h1>

          <div className="mt-4">
            <span style={{ backgroundColor: "#EBE6E0" }} className="px-3 py-1 text-zinc-600 rounded-md text-[10px] font-bold uppercase tracking-widest">
              {product.category}
            </span>
          </div>

          <h2 className="text-3xl font-bold text-blue-600 mt-6 mb-4">
            $ {product.price}
          </h2>

          <div className="border-l-4 border-[#E6E1DC] pl-6 my-6 max-h-[250px] overflow-y-auto">
            <p className="text-zinc-500 leading-relaxed text-base italic">
              {product.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <Link 
              to={`/edit/${product.id}`} 
              className="px-8 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 shadow-lg shadow-blue-100 transition-all active:scale-95"
            >
              Edit Product
            </Link>
            
            <button 
              onClick={() => productDeleteHandler(product.id)} 
              className="px-8 py-3 border-2 border-red-300 text-red-500 font-bold rounded-lg hover:bg-red-50 transition-all active:scale-95"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;