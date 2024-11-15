import { Link } from "react-router-dom";
import box from "../../../assets/box.png";

const EtaModal = ({ id, eta }: { id: string; eta: number }) => {
  return (
    <>
      <section className="fixed top-0 left-0  z-50 bg-[#605858] w-[432px] min-h-[942px] h-auto  font-fira-sans pb-4">
        <div className="pt-[97px]">
          <img src={box} alt="loggo" />
        </div>
        <div className="px-4">
          <div className="flex flex-col text-center w-[326px] gap-4 mx-auto uppercase">
            <h2 className="font-bold text-[32px] leading-[38.4px] text-[#F4F3F1F0]">
              Dina Wontons tillagas!
            </h2>
            <p className="font-medium text-[26px] leading-[31.2px] text-[#F4F3F1F0]">
              ETA {eta} min
            </p>
            <span className="text-[#FFFFFF80]">{id}</span>
          </div>
          <footer className="flex flex-col gap-4 pt-[46px]">
            <button className="rounded-[4px] text-[#F4F3F1F0] border-2 text-[24px] border-[#F4F3F1F0] uppercase h-[77px] w-full trackijng-wider font-bold opacity-80 ">
              Se kvitto
            </button>
            <Link
              to={"/"}
              className="rounded-[4px] mb-4 items-center flex justify-center text-center text-[24px] tracking-wider font-bold h-[77px] w-full bg-[#353131] text-[#F4F3F1F0] uppercase"
            >
              Gör en ny beställning
            </Link>
          </footer>
        </div>
      </section>
    </>
  );
};
export default EtaModal;
