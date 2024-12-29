import React, { useState, useRef } from "react";
import './Loader.css';

const API_URL = import.meta.env.VITE_API_URL;

const MedicalShop = () => {

  const [search, setSearch] = useState("");
  const [healthProblem, sethealthProblem] = useState("");
  const [cart, setCart] = useState([]);
  const [searchedmedicines, setSearchedmedicines] = useState([]);
  const loadRef = useRef();


  const products = [
    { id: 1, medicine: "Paracetamol", price: 20 },
    { id: 2, medicine: "Ibuprofen", price: 30 },
    { id: 3, medicine: "Cough Syrup", price: 50 },
    { id: 4, medicine: "Antiseptic Cream", price: 40 },
    { id: 5, medicine: "Vitamin C Tablets", price: 25 },
  ];

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const filteredProducts = products.filter((product) =>
    product.medicine.toLowerCase().includes(search.toLowerCase())
  );

  const getMedicines = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "healthProblem": healthProblem
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    loadRef.current.style.display = "inline-block";

    fetch(`${API_URL}/getmedicines`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const medicines = JSON.parse(result.medicines);
        setSearchedmedicines(medicines);
        setTimeout(() => {
          loadRef.current.style.display = "none";
        }, 1000);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen text-lg">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Medical Shop</h1>

      {/* Search Bar */}
      <div className="searchfields flex gap-10 justify-center items-center">
        <input
          type="text"
          onChange={(e) => sethealthProblem(e.target.value)}
          value={healthProblem}
          placeholder="Tell your health problem..."
          className="w-[80vw] max-w-md p-2 border rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 transition hover:scale-110"
        />
        <input
          type="text"
          placeholder="Search for medicines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[80vw] max-w-md p-2 border rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 transition hover:scale-110"
        />
      </div>
      <button onClick={() => getMedicines()} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 my-4">Search Medicines</button>

      <div className="flex flex-wrap justify-between w-full max-w-5xl">
        {/* Product List */}
        <div className="w-full md:w-2/3 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Products</h2>
          <span ref={loadRef} className="loader"></span>
          {searchedmedicines.length === 0 ?
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-4 border rounded-md shadow-sm flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-medium">{product.medicine}</h3>
                    <p className="text-sm text-gray-600">₹{product.price}</p>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
            :
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchedmedicines.map((product) => (
                <div
                  key={product.id}
                  className="p-4 border rounded-md shadow-sm flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-medium">{product.medicine}</h3>
                    <p className="text-sm text-gray-600">₹{product.price}</p>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          }

        </div>

        {/* Shopping Cart */}
        <div className="w-full md:w-1/3 p-4 bg-white rounded-lg shadow-md mt-6 md:mt-0">
          <h2 className="text-2xl font-semibold mb-4">Cart</h2>
          {cart.length > 0 ? (
            <ul>
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-2 border-b pb-2"
                >
                  <span>{item.medicine}</span>
                  <div className="flex items-center">
                    <span className="text-gray-600">₹{item.price}</span>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="ml-4 text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Cart is empty.</p>
          )}
          {cart.length > 0 && (
            <div className="mt-4 flex flex-col justify-between items-center">
              <h3 className="text-lg font-medium">
                Total: ₹
                {cart.reduce((total, item) => total + item.price, 0)}
              </h3>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full text-lg font-bold transition">
                Pay
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalShop;