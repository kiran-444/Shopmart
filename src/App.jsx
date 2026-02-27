import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Details from "./components/Details";
import { Link } from "react-router-dom";
import Create from "./components/Create";
import Edit from "./components/Edit";

function App() {
  const { search, pathname } = useLocation();
  console.log(search, pathname);
  return (
    <div className="h-screen w-screen flex">
      {(pathname != "/" || search.length > 0) && (
        <Link to="/" className="text-red-300 absolute left-[17%] top-[3%]">
          Home
        </Link>
      )}

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/details/:id" element={<Details />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
      </Routes>
    </div>
  );
}

export default App;
