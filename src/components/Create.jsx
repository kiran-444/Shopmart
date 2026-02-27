import React, { useContext, useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();
  const [products, setProducts] = useContext(ProductContext);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const addProductHandler = (e) => {
    e.preventDefault();

    if (
      title.trim().length < 5 ||
      image.trim().length < 5 ||
      category.trim().length < 5 ||
      price.trim().length < 1 ||
      description.trim().length < 5
    ) {
      alert("All fields must be filled correctly");
      return;
    }

    const product = {
      id: nanoid(),
      title,
      image,
      category,
      price,
      description,
    };
    setProducts([...products, product]);
    localStorage.setItem("products", JSON.stringify([...products, product]));
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen bg-zinc-50 flex flex-col items-center p-10 pt-20">
      <form
        onSubmit={addProductHandler}
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg border border-zinc-100"
      >
        <h1 className="text-3xl font-bold mb-8 text-zinc-800">Add New Product</h1>
        
        <input
          type="url"
          placeholder="Image URL"
          className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-3 text-lg mb-4 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
          onChange={(e) => setImage(e.target.value)}
          value={image}
        />
        
        <input
          type="text"
          placeholder="Product Title"
          className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-3 text-lg mb-4 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <div className="w-full flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Category"
            className="w-full md:w-1/2 bg-zinc-50 border border-zinc-200 rounded-lg p-3 text-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
          <input
            type="number"
            placeholder="Price"
            className="w-full md:w-1/2 bg-zinc-50 border border-zinc-200 rounded-lg p-3 text-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>

        <textarea
          className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-3 text-lg mb-6 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all h-40 resize-none"
          placeholder="Enter product description..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>

        <div className="flex gap-4">
          <button className="px-10 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-100">
            Add Product
          </button>
          <button 
            type="button" 
            onClick={() => navigate("/")}
            className="px-10 py-3 border border-zinc-300 text-zinc-500 font-bold rounded-lg hover:bg-zinc-50 transition-all"
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;