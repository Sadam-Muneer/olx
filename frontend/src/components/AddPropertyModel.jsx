import { useState, useEffect } from "react";
import { Modal, Container, Stepper } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import AddLocation from "./AddLocation";
import UploadImage from "./UploadImage";
import BasicDetails from "./BasicDetails";

const AddPropertyModel = ({ opened, setOpened }) => {
  const [activeStep, setActiveStep] = useState(0);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState("");

  // Updated productDetails state
  const [productDetails, setProductDetails] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
    model: "",
    image: "",
    category: "",
    additionalInfo: "",
    userId: "",
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        userId: user.sub || "",
      }));
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        setToken(token);
      }
    };
    getToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  const nextStep = () => setActiveStep((current) => current + 1);
  const prevStep = () => setActiveStep((current) => current - 1);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      size="70rem"
      centered
      radius="lg"
      styles={{
        modal: {
          borderRadius: "1rem",
          border: "2px solid #ccc",
        },
      }}
    >
      {opened && (
        <Container h="35rem" w="100%">
          <Stepper
            active={activeStep}
            onStepClick={setActiveStep}
            allowNextStepsSelect={false}
          >
            <Stepper.Step
              label="Basic Details"
              description="Enter basic details"
            >
              <BasicDetails
                carDetails={productDetails}
                setCarDetails={setProductDetails}
                nextStep={nextStep}
                token={token}
              />
            </Stepper.Step>
            <Stepper.Step label="Location" description="Address">
              <AddLocation
                carDetails={productDetails}
                setCarDetails={setProductDetails}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            </Stepper.Step>
            <Stepper.Step label="Upload Image" description="Verify Image">
              <UploadImage
                carDetails={productDetails}
                setCarDetails={setProductDetails}
                prevStep={prevStep}
                nextStep={nextStep}
                token={token}
                setOpened={setOpened}
              />
            </Stepper.Step>
          </Stepper>
        </Container>
      )}
    </Modal>
  );
};

export default AddPropertyModel;
