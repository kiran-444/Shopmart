import React, { useContext } from "react";
import { ProductContext } from "../utils/Context";
import { Link } from "react-router-dom";

function Nav() {
  const [products] = useContext(ProductContext);

  let distinct_category =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distinct_category = [...new Set(distinct_category)];

  const color = () => {
    return `rgba(${(Math.random() * 255).toFixed()},${(
      Math.random() * 255
    ).toFixed()},${(Math.random() * 255).toFixed()},0.4)`;
  };

  return (
    <nav 
      style={{ backgroundColor: "#FDFFF5" }} 
      className="w-full md:w-[20%] lg:w-[15%] h-screen flex flex-col items-center pt-5 border-r border-[#E6E1DC]"
    >
      <Link
        className="py-2 px-5 border border-blue-400 text-blue-500 rounded font-semibold hover:bg-blue-50 transition-all"
        to="/create"
      >
        Add a product
      </Link>
      <hr className="my-3 w-[80%] border-[#E6E1DC]" />
      <h1 className="text-2xl font-semibold mb-3 w-[80%] text-zinc-800">Category Filter</h1>
      <div className="w-[80%]">
        {distinct_category.map((c, i) => (
          <Link
            key={i}
            to={`/?category=${c}`}
            className="flex items-center mb-3 text-zinc-600 hover:text-zinc-900 transition-colors capitalize"
          >
            <span
              style={{ backgroundColor: color() }}
              className="rounded-full mr-2 w-[15px] h-[15px]"
            ></span>
            {c}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Nav;