import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cartItems, decreaseQuantity, totalAmount, increaseQuantity } =
    useCart();

  console.log(cartItems);

  return (
    <>
      <div className="bg-[#EEEEEE] min-h-screen h-auto w-[430px] px-4 flex flex-col">
        <section className="relative flex justify-end pt-[17px] rounded-[4px]">
          <div className="h-[64px] w-[64px] flex items-center justify-center">
            <img className="text-clay" src="/cart.svg" />
          </div>
        </section>

        <ul className="flex-grow">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              total={item.total}
              quantity={item.quantity}
              price={item.price}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          ))}
        </ul>

        <footer className="space-y-4 w-full font-fira-sans pt-10 mt-auto">
          <section className="rounded-[4px] p-4 w-full flex flex-col bg-[rgba(53,49,49,0.24)] text-coal">
            <div className="justify-between flex w-full">
              <div className="flex flex-col">
                <p className="font-bold uppercase leading-[26.4px] text-[22px]">
                  Totalt
                </p>
                <span className="font-semibold text-[14px]">inkl 20% moms</span>
              </div>
              <p className="font-bold uppercase leading-[38.4px] text-[32px] flex items-center">
                {totalAmount()} SEK
              </p>
            </div>
          </section>
          <button className="rounded-[4px] text-center text-[24px] tracking-wider font-bold py-[24px] w-full bg-[rgba(53,49,49,1)] text-[#F4F3F1] uppercase">
            Take my money!
          </button>
        </footer>
      </div>
    </>
  );
};

export default CartPage;
