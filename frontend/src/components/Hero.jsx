import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const categories = ["All", "Mobile", "Laptop", "Car", "Others"];

const Hero = () => {
  const [filter, setFilter] = useState({
    category: "All",
    title: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    navigate("/listing", { state: { filter } });
  };

  return (
    <section className="max-padd-container pt-[120px]">
      <div className="max-padd-container bg-hero bg-center bg-cover bg-no-repeat h-[655px] w-full rounded-3xl">
        <div className="relative top-32 xs:top-20">
          <span className="medium-18 text-white">Welcome to OLX</span>
          <h1 className="h1 font-20 capitalize max-w-[30rem] text-white pt-10">
            Buy, Sell, and Discover Locally
          </h1>
          <p className="regular-24 pt-10 text-white hidden md:block">
            Find great deals on everything from electronics
          </p>
          <p className="regular-24 text-white hidden md:block">
            to vehicles, all in your community.
          </p>

          <div className="mt-10 bg-white p-6 rounded-xl">
            <div className="flex flex-col gap-4 md:flex-row md:gap-6">
              <input
                type="text"
                placeholder="Search by title"
                name="title"
                value={filter.title}
                onChange={handleFilterChange}
                className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Search by description"
                name="description"
                value={filter.description}
                onChange={handleFilterChange}
                className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg"
              />
              <select
                name="category"
                value={filter.category}
                onChange={handleFilterChange}
                className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleSearch}
              className="btn-secondary rounded-xl flexCenter !py-4 mt-6 w-full"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
