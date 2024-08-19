import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Item = ({ item }) => {
  const navigate = useNavigate();

  if (!item) {
    return <div className="max-padd-container">Loading...</div>;
  }

  const { title, description, price, image, id } = item;

  return (
    <div className="rounded-2xl p-2 bg-white">
      <div className="pb-2 relative">
        <img
          src={image}
          alt={title}
          className="w-full h-60 object-cover rounded-xl"
        />
      </div>
      <div className="flex justify-between items-center">
        <h4 className="medium-18 line-clamp-1">{title}</h4>
      </div>
      <p className="pt-2 mb-4 line-clamp-2">{description}</p>
      <div className="flex justify-between items-center">
        <div className="bold-16">${price}</div>
        <button
          onClick={() => navigate(`/listing/${id}`)}
          className=" text-white hover:text-white border border-white hover:bg-black focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-black dark:text-black dark:hover:text-white dark:hover:bg-black mt-6"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default Item;
