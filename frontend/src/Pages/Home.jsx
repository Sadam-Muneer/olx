import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import About from "../components/About";
import Properties from "../components/Properties";
import Blogs from "../components/Blogs";
import bannerImg from "../assets/Frame.png";
const Home = () => {
  return (
    <main>
      <Hero />
      <About />
      <Properties />
      <Blogs />
      <div className="max-padd-container py-16 overflow-x-hidden">
        <Link to="/listing">
          <img src={bannerImg} alt="Banner Image" />
        </Link>
      </div>
    </main>
  );
};
export default Home;
