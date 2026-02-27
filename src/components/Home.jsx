import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/axios";

function Home() {
  const [products] = useContext(ProductContext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);

  const [filteredProducts, setfilteredProducts] = useState(null);

  const getproductscategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setfilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!filteredProducts || category == "undefined") setfilteredProducts(products);
    if (category != "undefined") {
      setfilteredProducts(products.filter((p) => p.category == category));
    }
  }, [category, products]);

  return products ? (
    <div style={{ backgroundColor: "#FAF5EF" }} className="w-full min-h-screen flex flex-col md:flex-row">
      <Nav />
      <div className="flex-1 p-5 md:p-10 overflow-x-hidden overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts &&
            filteredProducts.map((p, i) => (
              <Link
                key={i}
                to={`/details/${p.id}`}
                style={{ backgroundColor: "#FDFFF5" }}
                className="card p-5 border border-[#E6E1DC] shadow-sm hover:shadow-xl hover:scale-[1.02] rounded-xl flex flex-col items-center transition-all duration-300"
              >
                <div
                  className="mb-5 w-full h-[180px] bg-contain bg-no-repeat bg-center"
                  style={{ backgroundImage: `url(${p.image})` }}
                ></div>
                <h1 className="text-sm font-bold text-zinc-800 text-center line-clamp-2 hover:text-blue-600">
                  {p.title}
                </h1>
              </Link>
            ))}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Home;