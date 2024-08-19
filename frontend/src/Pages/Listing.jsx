import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Item from "../components/Item";

// Define categories for filtering
const categories = ["Mobile", "Laptop", "Car", "Others"];

const Listing = () => {
  const location = useLocation();
  const initialFilter = location.state?.filter || {
    category: "All",
    title: "",
    description: "",
  };

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filter, setFilter] = useState(initialFilter);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "https://olx-sap.vercel.app/api/product/allproducts"
        );
        if (Array.isArray(response.data)) {
          setItems(response.data);
          applyFilters(response.data, filter);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    applyFilters(items, filter);
  }, [filter, items]);

  const applyFilters = (itemList, filter) => {
    const { category, title, description } = filter;

    const filtered = itemList.filter((item) => {
      const itemCategory = item.category.toLowerCase();

      return (
        (category === "All" ||
          (category === "Others" &&
            !["car", "mobile", "laptop"].includes(itemCategory)) ||
          itemCategory === category.toLowerCase()) &&
        (title === "" ||
          item.title.toLowerCase().includes(title.toLowerCase())) &&
        (description === "" ||
          item.description.toLowerCase().includes(description.toLowerCase()))
      );
    });

    setFilteredItems(filtered);
  };

  return (
    <section className="py-16 xl:py-28 px-4 mx-auto max-w-7xl">
      <h2 className="text-4xl font-semibold text-center mb-12 text-gray-800 pt-5">
        Find Your Dream Product
      </h2>

      <div className="bg-black shadow-lg rounded-lg p-6 mb-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
          <input
            type="text"
            placeholder="Search by title"
            value={filter.title}
            onChange={(e) => setFilter({ ...filter, title: e.target.value })}
            className="w-full lg:w-1/3 px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Search by description"
            value={filter.description}
            onChange={(e) =>
              setFilter({ ...filter, description: e.target.value })
            }
            className="w-full lg:w-1/3 px-4 py-2 border border-gray-300 rounded-lg"
          />
          <select
            value={filter.category}
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            className="w-full lg:w-1/3 px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="All">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-10">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-lg border-b border-gray-300 lg:border-0 transition-transform transform hover:scale-105 hover:shadow-xl ease-in-out duration-300"
              >
                <Item item={item} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-10 text-lg font-semibold">
            No items found matching the filters.
          </p>
        )}
      </div>
    </section>
  );
};

export default Listing;
