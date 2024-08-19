import CarImage from "../assets/about.webp";
import { RiDoubleQuotesL } from "react-icons/ri";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

const About = () => {
  const statistics = [
    { label: "Items Sold", value: 1200 },
    { label: "Satisfied Users", value: 950 },
    { label: "Years of Service", value: 15 },
  ];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        const top = aboutSection.getBoundingClientRect().top;
        const visible = top < window.innerHeight - 100;
        setIsVisible(visible);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="about" className="max-padd-container py-16 xl:py-28">
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 relative mb-6 lg:mb-0 lg:mr-6">
          <img
            src={CarImage}
            alt="DealX Marketplace"
            className="rounded-xl wow fadeInUp w-full h-auto"
          />
          <div
            className={`bg-white absolute bottom-0 left-3 sm:left-16 max-w-xs p-4 rounded-lg flexCenter flex-col ${
              isVisible ? "block" : "hidden"
            }`}
          >
            <span className="relative bottom-8 p-3 shadow-md bg-white h-12 w-12 items-center rounded-full hidden lg:block">
              <RiDoubleQuotesL className="font-2xl" />
            </span>
            <p className="text-center relative bottom-3 hidden lg:block">
              Explore the world of buying and selling with DealX, where your
              next great find is just a click away.
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <span className="medium-18">Our Journey with DealX</span>
          <h2 className="h2">Connecting Buyers and Sellers Across the Globe</h2>
          <p className="py-5">
            At DealX, we are dedicated to providing a platform that brings
            buyers and sellers together, creating opportunities for everyone.
            Whether you're looking to sell an item or find a great deal, our
            commitment to simplicity and efficiency ensures a seamless
            experience every time.
          </p>
          <div className="flex flex-wrap gap-4">
            {statistics.map((statistic, index) => (
              <div
                key={index}
                className="bg-primary p-4 rounded-lg flex items-center"
              >
                <div className="flex items-center gap-1">
                  <CountUp
                    start={isVisible ? 0 : null}
                    end={statistic.value}
                    duration={5}
                    delay={0}
                  >
                    {({ countUpRef }) => (
                      <h3
                        ref={countUpRef}
                        className="text-2xl font-semibold"
                      ></h3>
                    )}
                  </CountUp>
                  <h4 className="bold-22">+</h4>
                </div>
                <p>{statistic.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
