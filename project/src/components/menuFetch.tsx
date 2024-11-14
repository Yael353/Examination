import React, { useEffect, useState } from "react";
import { fetchMenu } from "../services/fetchMenu";
import { MenuItem } from "../types/types";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const MenuFetch: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const { cartItems, addToCart } = useCart();
  useEffect(() => {
    const getMenu = async () => {
      const result = await fetchMenu();
      if (result.error) {
        setError(result.error);
      } else {
        setMenuItems(result); // Sätt menyn till state
      }
    };

    getMenu();
  }, []);

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    addToCart(item); // Lägg bara till artikeln här, inte i både onClick och här
    console.log("Item", item);
  };

  const ItemsCount = () => {
    return cartItems.reduce(
      (quantity, item) => quantity + (item.quantity || 1),
      0
    );
  };

  return (
    <div className="bg-[#489078] min-h-[932px] h-auto w-[430px] pb-4">
      <div className="flex items-end justify-end p-4 relative">
        <Link
          to={"/cart"}
          className="bg-[#F4F3F1F0] w-16 h-16 rounded-[4px] flex items-center justify-center relative"
        >
          <img className="text-clay" src="/cart.svg" alt="Cart icon" />
          <p className="absolute top-[-5px] right-[-5px] w-6 h-6 rounded-full flex items-center justify-center bg-[#EB5757] text-[#F4F3F1F0] text-[12px]">
            {ItemsCount()}
          </p>
        </Link>
      </div>
      <h1 className="font-bold font-sans text-[#F4F3F1F0] m-4 text-[32px] ">
        MENY
      </h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      {menuItems.length > 0 ? (
        <div className="space-y-8 m-[16px]">
          {/* Wonton Section */}
          <div className="bg-[#1E4F40] rounded-[8px]">
            <ul className="w-full bg-[#1E4F40] rounded-[8px]">
              {menuItems
                .filter((item) => item.type === "wonton")
                .map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      handleItemClick(item);
                    }}
                    className={`border-b-2 border-[#F1F0EC3D]  border-dotted cursor-pointer p-3 
          ${selectedItem?.id === item.id ? "bg-[#353131]" : "bg-[#605858]"} 
          ${index === 0 ? "rounded-t-[8px]" : ""}
          ${
            index === menuItems.filter((i) => i.type === "wonton").length - 1
              ? "rounded-b-[8px] border-none"
              : ""
          }
        `}
                  >
                    <section className="flex font-bold text-[#F4F3F1F0] text-[22px]">
                      <p>{item.name}</p>
                      <span className="flex-grow mb-[6px] border-dotted border-b-2 border-gray-400 mx-2"></span>
                      <span>{item.price} SEK</span>
                    </section>
                    <p className="text-[14px] text-[#F4F3F1F0] font-medium text-start">
                      {item.ingredients &&
                        item.ingredients.length > 0 &&
                        item.ingredients.join(", ")}
                    </p>
                  </li>
                ))}
            </ul>
          </div>

          {/* Dip Section */}
          <div className="bg-[#605858] rounded-lg p-4 text-[#F4F3F1F0] ">
            <div className="flex items-baseline text-[#F4F3F1F0] font-bold mb-4">
              <h2 className="text-lg">DIPSÅS</h2>
              <span className="flex-grow border-b-2 border-dotted mx-2 border-[#F4F3F1F0] mb-1"></span>
              <p className="text-[22px] text-[#FFFFFF]">
                {menuItems[5]?.price} SEK
              </p>
            </div>
            <ul className="flex flex-wrap gap-4">
              {menuItems
                .filter((item) => item.type === "dip")
                .map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleItemClick(item)}
                      className={`py-2 px-[10px] rounded-md ${
                        selectedItem?.id === item.id
                          ? "bg-[#353131]"
                          : "bg-[rgba(241,240,236,0.24)]"
                      }`}
                    >
                      <div className="flex justify-between items-center text-[#F4F3F1F0]">
                        <p className="font-semibold text-[13px]">{item.name}</p>
                      </div>
                    </button>
                  </li>
                ))}
            </ul>
          </div>

          {/* Drink Section */}
          <div className="bg-[#605858] rounded-lg p-4 text-[#F4F3F1F0]">
            <div className="flex items-baseline text-[#F4F3F1F0] font-bold mb-4">
              <h2 className="text-lg">DRICKA</h2>
              <span className="flex-grow border-b-2 border-dotted mx-2 border-[#F4F3F1F0] mb-1"></span>
              <p className="text-[22px] text-[#FFFFFF]">
                {menuItems[12]?.price} SEK
              </p>
            </div>
            <ul className="flex flex-wrap gap-4">
              {menuItems
                .filter((item) => item.type === "drink")
                .map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleItemClick(item)}
                      className={`py-2 px-[10px] rounded-md ${
                        selectedItem?.id === item.id
                          ? "bg-[#353131]"
                          : "bg-[rgba(241,240,236,0.24)]"
                      }`}
                    >
                      <div className="flex justify-between items-center text-[#F4F3F1F0]">
                        <p className="font-semibold text-[13px]">{item.name}</p>
                      </div>
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-white">Loading...</p>
      )}
    </div>
  );
};

export default MenuFetch;
