import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="max-padd-container pt-[120px]">
      <div className="max-padd-container bg-hero bg-center bg-cover bg-no-repeat h-[655px] w-full rounded-3xl">
        <div className="relative top-32 xs:top-20">
          <span className="medium-18">Welcome to olx </span>
          <h1 className="h1 font-20 capitalize max-w-[30rem] text-white">
            Buy, Sell, and Discover Locally
          </h1>
          <p className="regular-24 pt-10 text-white">
            Find great deals on everything from electronics
          </p>
          <p className="regular-24 text-white">
            to vehicles, all in your community.
          </p>
          <div className="inline-flex items-center justify-center gap-4 p-2 bg-white rounded-xl mt-20">
            <div className="text-center regular-14 leading-tight pl-5">
              <h5 className="uppercase font-bold">5% Off</h5>
              <p className="regular-14">On All products</p>
            </div>
            <Link
              to={"/listing"}
              className="btn-secondary rounded-xl flexCenter !py-4"
            >
              Visit Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
