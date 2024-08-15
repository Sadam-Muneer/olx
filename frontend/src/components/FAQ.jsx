import { useState } from "react";

const AgentsFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    {
      question: "How do I list an item for sale?",
      answer:
        "To list an item for sale, click on the 'Sell' button on the homepage, fill out the required details, and upload images of your item. Once submitted, your listing will be reviewed and published.",
    },
    {
      question: "How can I find items for sale near me?",
      answer:
        "You can find items for sale near you by using the search bar and applying location filters. Enter your city or region to see relevant listings in your area.",
    },
    {
      question:
        "What should I do if I encounter a problem with a seller or buyer?",
      answer:
        "If you encounter any issues with a seller or buyer, you can report the issue through the platform's 'Report' feature. Our support team will review the report and take appropriate action.",
    },
    {
      question: "How can I update or delete my listing?",
      answer:
        "To update or delete your listing, go to your account dashboard, find the listing you want to modify, and select the appropriate option to edit or delete it.",
    },
  ];

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <section className="py-5 bg-white-50 sm:py-5 lg:py-12 border-xl">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer"
              >
                <button
                  type="button"
                  className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                  onClick={() => toggleAnswer(index)}
                >
                  <span className="flex text-lg font-semibold text-black">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgentsFAQ;
