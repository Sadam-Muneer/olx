import { MapContainer, TileLayer } from "react-leaflet";
import GeoCoderMarker from "./GeoCoderMarker";
import PropTypes from "prop-types";
import "leaflet/dist/leaflet.css";

const Map = ({ address, city, country }) => {
  // Ensure address parts are properly defined
  const fullAddress = [address, city, country].filter(Boolean).join(", ");

  return (
    <div>
      <MapContainer
        center={[0, 0]}
        zoom={2}
        scrollWheelZoom={false}
        className="h-[24rem] w-full mt-5 z-0"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoCoderMarker address={fullAddress} />
      </MapContainer>
    </div>
  );
};

Map.propTypes = {
  address: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
};

Map.defaultProps = {
  address: "",
  city: "",
  country: "",
};

export default Map;
