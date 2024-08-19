import PropTypes from "prop-types";
import { Box, Button, Group, TextInput, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BasicDetails = ({
  prevStep,
  carDetails,
  setCarDetails,
  token,
  nextStep,
}) => {
  const navigate = useNavigate();

  const categoryOptions = [
    { value: "CAR", label: "Car" },
    { value: "MOBILE", label: "Mobile" },
    { value: "LAPTOP", label: "Laptop" },
    { value: "OTHER", label: "Other" },
  ];

  const modelOptions = Array.from({ length: 2025 - 1900 }, (_, i) => 1900 + i);

  const form = useForm({
    initialValues: {
      title: carDetails.title || "",
      description: carDetails.description || "",
      price: carDetails.price,
      brand: carDetails.brand || "",
      model: carDetails.model || "",
      category: carDetails.category || "",
      additionalInfo: carDetails.additionalInfo || "",
      contactNumber: carDetails.contactNumber || "",
    },
    validate: {
      title: (value) => (value ? null : "Title is required"),
      description: (value) => (value ? null : "Description is required"),
      price: (value) =>
        value > 0 ? null : "Price is required and must be a positive number",
      brand: (value) => (value ? null : "Brand is required"),
      model: (value) => (value ? null : "Model is required"),
      category: (value) => (value ? null : "Category is required"),
      additionalInfo: (value) =>
        value.trim().length > 0 ? null : "Additional Info is required",
      contactNumber: (value) =>
        /^[0-9]{11}$/.test(value)
          ? null
          : "Contact Number is required and must be a 11-digit number",
    },
  });

  const handleSubmit = async (values) => {
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      ...values,
    }));
    nextStep();
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box className="w-full flex flex-col lg:flex-row gap-4">
          <Box className="w-full lg:w-1/2">
            <TextInput
              withAsterisk
              className="w-full mb-4"
              label="Title"
              placeholder="Title"
              {...form.getInputProps("title")}
            />
          </Box>
          <Box className="w-full lg:w-1/2">
            <TextInput
              withAsterisk
              className="w-full mb-4"
              label="Description"
              placeholder="Description"
              {...form.getInputProps("description")}
            />
          </Box>
        </Box>

        <Box className="w-full flex flex-col lg:flex-row gap-4">
          <Box className="w-full lg:w-1/2">
            <TextInput
              withAsterisk
              className="w-full mb-4"
              label="Price"
              placeholder="Price"
              type="number"
              {...form.getInputProps("price")}
            />
          </Box>
          <Box className="w-full lg:w-1/2">
            <TextInput
              withAsterisk
              className="w-full mb-4"
              label="Brand"
              placeholder="Brand"
              {...form.getInputProps("brand")}
            />
          </Box>
        </Box>

        <Box className="w-full flex flex-col lg:flex-row gap-4">
          <Box className="w-full lg:w-1/2">
            <Select
              withAsterisk
              className="w-full mb-4"
              label="Model"
              placeholder="Select model"
              data={modelOptions.map((year) => ({
                value: year.toString(),
                label: year.toString(),
              }))}
              {...form.getInputProps("model")}
            />
          </Box>
          <Box className="w-full lg:w-1/2">
            <Select
              withAsterisk
              className="w-full mb-4"
              label="Category"
              placeholder="Select category"
              data={categoryOptions}
              {...form.getInputProps("category")}
            />
          </Box>
        </Box>

        <Box className="w-full flex flex-col lg:flex-row gap-4">
          <Box className="w-full lg:w-1/2">
            <TextInput
              withAsterisk
              className="w-full mb-4"
              label="Additional Details"
              placeholder="Additional Details"
              {...form.getInputProps("additionalInfo")}
            />
          </Box>
          <Box className="w-full lg:w-1/2">
            <TextInput
              withAsterisk
              className="w-full mb-4"
              label="Contact Number"
              placeholder="Contact Number"
              type="text"
              {...form.getInputProps("contactNumber")}
            />
          </Box>
        </Box>

        <Group position="right" mt="md" className="w-full">
          <Button
            type="button"
            onClick={prevStep}
            className="bg-black text-white"
          >
            Back
          </Button>
          <Button type="submit" className="bg-black text-white">
            Next
          </Button>
        </Group>
      </form>
      <ToastContainer />
    </>
  );
};

BasicDetails.propTypes = {
  prevStep: PropTypes.func.isRequired,
  carDetails: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    brand: PropTypes.string,
    model: PropTypes.string,
    category: PropTypes.string,
    additionalInfo: PropTypes.string,
    contactNumber: PropTypes.string,
  }).isRequired,
  setCarDetails: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  nextStep: PropTypes.func.isRequired,
};

export default BasicDetails;
