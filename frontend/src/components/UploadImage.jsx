import PropTypes from "prop-types";
import { Button, Group } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { toast } from "react-toastify";

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
          toast.success("Image uploaded successfully!");
        } else if (error) {
          console.error("Image upload error:", error);
          toast.error("Image upload failed. Please try again.");
        }
      }
    );
  }, [setCarDetails]);

  const handleUploadClick = () => {
    widgetRef.current.open();
  };
  const handleSubmit = async () => {
    if (!imageURL) {
      toast.error("No image URL available for submission");
      console.error("No image URL available for submission");
      return;
    }

    const userEmail = "user@example.com";
    const submissionDetails = {
      ...carDetails,
      image: imageURL,
      userEmail: userEmail,
    };

    console.log("Submission Details:", submissionDetails);

    try {
      const response = await fetch("https://olx-sap.vercel.app/api/product/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submissionDetails),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response Data:", data);
        toast.success("Submission successful!");
        setOpened(false);
      } else {
        const errorText = await response.text();
        toast.error(
          `Submission failed: ${errorText || "Unknown error occurred"}`
        );
        console.error(`Error: ${errorText || "Unknown error occurred"}`);
      }
    } catch (error) {
      toast.error(
        `An error occurred while submitting the form: ${error.message}`
      );
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
