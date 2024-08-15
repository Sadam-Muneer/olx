import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FOOTER_LINK, FOOTER_CONTACT_INFO, SOCIALS } from "../constants/data";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import mainlogo from "../assets/olxlogo.png";

const Footer = () => {
  return (
    <footer className="max-padd-container mb-4">
      <div className="max-padd-container bg-primary rounded-tr-3xl pt-12 xl:pt-20 pb-8">
        <h3 className="h3">Explore a World of Listings with OLX!</h3>
        <p className="">Find the best deals and items on OLX</p>
        <hr className="my-8 bg-slate-900/30 h-[2px]" />
        <div className="flex justify-between flex-wrap gap-x-4 gap-y-8">
          <div className="max-w-sm">
            <Link to="/">
              <span className="w-2">
                <img src={mainlogo} width={"50px"} />
              </span>
            </Link>
            <p className="py-4">
              Discover a wide range of products and services with OLX. From cars
              to electronics, find what you need today.
            </p>
          </div>
          <div className="flex justify-between flex-wrap gap-8">
            {FOOTER_LINK.map((col) => (
              <FooterColumn key={col.title} title={col.title}>
                <ul className="flex flex-col gap-4 regular-14 text-gray-20">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link to="/">{link}</Link>
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            ))}
            <div className="flex flex-col gap-5">
              <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                {FOOTER_CONTACT_INFO.links.map((link) => (
                  <Link
                    to={"/"}
                    key={link.label}
                    className="flex gap-4 md:flex-col lg:flex-row"
                  >
                    <p>
                      {link.label}: {link.value}
                    </p>
                  </Link>
                ))}
              </FooterColumn>
            </div>
            <div className="flex">
              <FooterColumn title={SOCIALS.title}>
                <ul className="flex gap-3 cursor-pointer">
                  {SOCIALS.links.map((social) => (
                    <li className="text-xl" key={social.id}>
                      <Link
                        to={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {social.id === 1 && <FaFacebook />}
                        {social.id === 2 && <FaInstagram />}
                        {social.id === 3 && <FaTwitter />}
                        {social.id === 4 && <FaLinkedin />}
                        {social.id === 5 && <FaYoutube />}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  className="text-white hover:text-white border border-white hover:bg-black focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:border-black dark:text-black dark:hover:text-white dark:hover:bg-black mt-2.5"
                  to="mailto:sadammuneer390@gmail.com"
                >
                  Contact via Email
                </Link>
              </FooterColumn>
            </div>
          </div>
        </div>
      </div>
      <p className="text-white bg-tertiary medium-14 py-2 px-8 rounded-b-3xl flexBetween">
        <span>2024 OLX</span>
        All rights reserved
      </p>
    </footer>
  );
};

export default Footer;

const FooterColumn = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="bold-18 whitespace-nowrap">{title}</h4>
      {children}
    </div>
  );
};

FooterColumn.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
