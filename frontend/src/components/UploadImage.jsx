import PropTypes from "prop-types";
import { Button, Group } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";

const UploadImage = ({
  carDetails,
  setCarDetails,
  prevStep,
  token,
  setOpened,
}) => {
  const [imageURL, setImageURL] = useState(carDetails.image);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dg4hrwtjo",
        uploadPreset: "hxvnpeux",
        maxFiles: 1,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImageURL(result.info.secure_url);
          setCarDetails((prevDetails) => ({
            ...prevDetails,
            image: result.info.secure_url,
          }));
        } else if (error) {
          console.error("Image upload error:", error);
        }
      }
    );
  }, [setCarDetails]);

  const handleUploadClick = () => {
    widgetRef.current.open();
  };
  const handleSubmit = async () => {
    if (!imageURL) {
      console.error("No image URL available for submission");
      return;
    }

    // Ensure userEmail is included in carDetails
    const userEmail = "user@example.com"; // Replace with actual user email
    const submissionDetails = {
      ...carDetails,
      image: imageURL,
      userEmail: userEmail,
    };

    try {
      const response = await fetch("http://localhost:4000/api/product/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submissionDetails),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Submission successful:", data);
        setOpened(false); // Close the modal on successful submission
      } else {
        const errorText = await response.text();
        console.error(`Error: ${errorText || "Unknown error occurred"}`);
      }
    } catch (error) {
      console.error(
        `An error occurred while submitting the form: ${error.message}`
      );
    }
  };

  return (
    <div>
      <Group position="center" mt="md">
        <Button leftIcon={<MdOutlineCloudUpload />} onClick={handleUploadClick}>
          Upload Image
        </Button>
        {imageURL && (
          <img
            src={imageURL}
            alt="Uploaded"
            style={{ width: "100px", height: "100px" }}
          />
        )}
      </Group>
      <Group position="right" mt="md">
        <Button type="button" onClick={prevStep}>
          Back
        </Button>
        <Button type="button" onClick={handleSubmit}>
          Submit
        </Button>
      </Group>
    </div>
  );
};

UploadImage.propTypes = {
  carDetails: PropTypes.shape({
    image: PropTypes.string,
  }).isRequired,
  setCarDetails: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  setOpened: PropTypes.func.isRequired,
};

export default UploadImage;
