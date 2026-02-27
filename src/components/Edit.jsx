import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const [products, setProducts] = useContext(ProductContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setproduct] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });

  const changeHandler = (e) => {
    setproduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const existingProduct = products?.find((p) => p.id == id);
    if (existingProduct) setproduct({ ...existingProduct });
  }, [id]);

  const addProductHandler = (e) => {
    e.preventDefault();
    if (
      product.title.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.category.trim().length < 5 ||
      product.price.toString().length < 1 ||
      product.description.trim().length < 5
    ) {
      alert("Please fill all fields correctly (Min 5 chars)");
      return;
    }

    const pi = products.findIndex((p) => p.id == id);
    const copyData = [...products];
    copyData[pi] = { ...product };

    setProducts(copyData);
    localStorage.setItem("products", JSON.stringify(copyData));
    navigate("/");
  };

  return (
    <div style={{ backgroundColor: "#FAF5EF" }} className="w-full min-h-screen flex flex-col items-center p-5 md:p-10 pt-20">
      <form
        onSubmit={addProductHandler}
        style={{ backgroundColor: "#FDFFF5" }}
        className="w-full max-w-2xl p-6 md:p-10 rounded-3xl shadow-xl border border-[#E6E1DC]"
      >
        <h1 className="text-3xl font-black mb-10 text-zinc-900 tracking-tight">Edit Product</h1>
        
        <input
          type="url"
          style={{ backgroundColor: "#FAF5EF" }}
          placeholder="Image URL"
          className="w-full border border-zinc-200 rounded-xl p-4 text-lg mb-4 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
          name="image"
          onChange={changeHandler}
          value={product.image}
        />
        
        <input
          type="text"
          style={{ backgroundColor: "#FAF5EF" }}
          placeholder="Title"
          className="w-full border border-zinc-200 rounded-xl p-4 text-lg mb-4 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
          name="title"
          onChange={changeHandler}
          value={product.title}
        />

        <div className="w-full flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            style={{ backgroundColor: "#FAF5EF" }}
            placeholder="Category"
            className="w-full md:w-1/2 border border-zinc-200 rounded-xl p-4 text-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
            name="category"
            onChange={changeHandler}
            value={product.category}
          />
          <input
            type="number"
            style={{ backgroundColor: "#FAF5EF" }}
            placeholder="Price"
            className="w-full md:w-1/2 border border-zinc-200 rounded-xl p-4 text-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
            name="price"
            onChange={changeHandler}
            value={product.price}
          />
        </div>

        <textarea
          style={{ backgroundColor: "#FAF5EF" }}
          className="w-full border border-zinc-200 rounded-xl p-4 text-lg mb-8 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all h-44 resize-none"
          placeholder="Enter product description..."
          name="description"
          onChange={changeHandler}
          value={product.description}
        ></textarea>

        {/* Buttons: Fixed for mobile */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <button className="w-full sm:w-auto px-10 py-4 bg-blue-500 text-white font-black rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-100 active:scale-95">
            Save Changes
          </button>
          <button 
            type="button" 
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-10 py-4 border-2 border-zinc-200 text-zinc-500 font-bold rounded-xl hover:bg-zinc-100 transition-all active:scale-95"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;