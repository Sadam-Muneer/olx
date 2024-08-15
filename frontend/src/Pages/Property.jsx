import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Map from "../components/Map";
import "leaflet/dist/leaflet.css";

const Property = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/product/${id}`
        );
        console.log(response.data); // Log the data to verify structure
        setCar(response.data);
      } catch (err) {
        console.error("Error fetching product data:", err);
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) return <div className="text-center p-4 text-lg">Loading...</div>;
  if (error)
    return <div className="text-center p-4 text-red-500 text-lg">{error}</div>;
  if (!car)
    return <div className="text-center p-4 text-lg">No Product found</div>;

  const {
    title,
    description,
    price,
    image,
    listType,
    country,
    city,
    area,
    brand,
    model,
    features,
    category,
    additionalInfo,
  } = car;
  const fullAddress = `${area || ""}, ${city || ""}, ${country || ""}`;

  return (
    <div className="mt-32 mb-12 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg md:shadow-2xl font-poppins">
      <div className="w-full md:w-5/12 flex justify-center items-center mb-6">
        <img
          src={image}
          alt={title}
          className="w-full h-auto rounded-lg object-cover shadow-md"
        />
      </div>

      <div className="mt-6">
        <div className="w-full border-b border-gray-300 pb-4 pt-5">
          <h1 className="text-3xl md:text-4xl text-black font-semibold mb-4">
            {title}
          </h1>
          <p className="text-2xl md:text-3xl text-black mb-4 font-bold">
            ${price}
          </p>
        </div>
        <div className="w-full border-b border-gray-300 pb-4 pt-5">
          <p className="text-gray-800 text-base md:text-lg mb-4">
            {description}
          </p>
        </div>
        <h2 className="pt-3 text-xl font-semibold text-gray-800">
          Key Features
        </h2>
        <div className="mb-4 flex flex-wrap gap-6 md:gap-8 justify-between">
          <div className="flex-1">
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-gray-800 mb-1">Brand</p>
              <p className="text-base text-gray-600">{brand}</p>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-gray-800 mb-1">Model</p>
              <p className="text-base text-gray-600">{model}</p>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-gray-800 mb-1">
                Category
              </p>
              <p className="text-base text-gray-600">{category}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-8 justify-between">
          <div className="flex flex-col">
            <p className="text-lg font-semibold text-gray-800 mb-1">
              Listing Type
            </p>
            <p className="text-base text-gray-600">{listType}</p>
          </div>

          <div className="flex flex-col">
            <p className="text-lg font-semibold text-gray-800 mb-1">
              Additional Details
            </p>
            <p className="text-base text-gray-600">{additionalInfo}</p>
          </div>

          <div className="flex flex-col">
            <p className="text-lg font-semibold text-gray-800 mb-1">Location</p>
            <p className="text-base text-gray-600">{fullAddress}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 h-64 md:h-72 mb-32">
        <Map address={fullAddress} />
      </div>
    </div>
  );
};

export default Property;
