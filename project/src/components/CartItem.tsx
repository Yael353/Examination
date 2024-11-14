import React from "react";

interface CartItemProps {
  id: number;
  name: string;
  total: number;
  quantity: number;
  price: number;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  total,
  quantity,
  price,
  increaseQuantity,
  decreaseQuantity,
}) => {
  return (
    <li
      key={id}
      className="border-b-2 border-dotted border-[#3531313D] last:border-none bg-[#EEEEEE]"
    >
      <section className="flex flex-row">
        <h3 className="text-[22px] font-bold text-black">{name}</h3>{" "}
        <span className="flex-grow border-b-2 border-dotted mx-2 border-[#353131] mb-1"></span>
        <p className="text-[22px] font-bold text-black">{price} SEK</p>{" "}
      </section>
      <section className="flex justify-start items-start py-2">
        <button
          onClick={() => increaseQuantity(id)}
          className="text-black pr-2 rounded"
        >
          <img src="plus.png" alt="pluspic" />
        </button>
        <p className=" items-center justify-center text-[14px] font-bold text-[#353131]">
          {quantity} stycken
        </p>{" "}
        <button
          onClick={() => decreaseQuantity(id)}
          className="text-black pl-2 rounded"
        >
          <img src="minus.png" alt="minuspic" />
        </button>
      </section>
    </li>
  );
};

export default CartItem;
