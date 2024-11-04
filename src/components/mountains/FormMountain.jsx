import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import CustomButton from "../CustomButton";
import { createMountain } from "../../redux/feature/mountainSlice";
import { useDispatch } from "react-redux";
import axiosInstance from "../../api/axiosInstance";

const FormMountain = ({ isEdit = false, id }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [useSimaksi, setUseSimaksi] = useState(false);
  // const [pointsOfInterest, setPointsOfInterest] = useState("");
  // const [isConservation, setIsConservation] = useState(false);
  // const [priceStartedAt, setPriceStartedAt] = useState("");
  // const [theBestTimeForHiking, setTheBestTimeForHiking] = useState("");
  const [simaksiPrice, setSimaksiPrice] = useState("");
  const [image, setImage] = useState(null);
  const [isImageValid, setIsImageValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);

  useEffect(() => {
    if (isEdit) {
      const fetchMountain = async () => {
        try {
          const response = await axiosInstance.get(`/mountains/${id}`);
          const mountain = response.data;
          if (mountain) {
            setName(mountain.name || "");
            setLocation(mountain.location || "");
            setDescription(mountain.description || "");
            setStatus(mountain.status || "");
            setUseSimaksi(mountain.useSimaksi || false);
            setMessage(mountain.message || "");
            setSimaksiPrice(mountain.simaksiPrice || "");
            setImage(mountain.image || null);
            // setIsConservation(mountain.isConservation || false);
            // setPointsOfInterest(
            //   mountain.pointsOfInterest
            //     ? mountain.pointsOfInterest.join(",")
            //     : ""
            // );
            // setTheBestTimeForHiking(
            //   mountain.theBestTimeForHiking ? mountain.theBestTimeForHiking : ""
            // );
            // setPriceStartedAt(mountain.priceStartedAt || "");
          }
        } catch (e) {
          console.error("Failed to fetch mountain data:", e);
        }
      };
      fetchMountain();
    }
  }, [isEdit, id]);

  useEffect(() => {
    setIsDescriptionValid(description != null && description.length <= 900);
  }, [description]);

  useEffect(() => {
    setIsImageValid(
      image && (image.type === "image/jpeg" || image.type === "image/png")
    );
  }, [image]);

  const handleAddMountain = () => {
    console.log("Add Mountain");
    console.log("name", name);
    console.log("location", location);
    console.log("description", description);
    console.log("image", image);
    console.log("useSimaksi", useSimaksi);
    console.log("message", message);
    console.log("simaksiPrice", simaksiPrice);
    console.log("status", status);
    if (
      !name ||
      !location ||
      !description ||
      !image ||
      !isDescriptionValid ||
      !isImageValid ||
      !message
    ) {
      console.error("Form validation failed.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("location", location);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("useSimaksi", useSimaksi);
      formData.append("message", message);
      formData.append("simaksiPrice", simaksiPrice);
      formData.append("status", status);
      console.log(formData);
      dispatch(createMountain(formData));
      // resetForm();
    } catch (e) {
      console.error("Error when submitting form:", e);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const resetForm = () => {
    setName("");
    setLocation("");
    setDescription("");
    setImage(null);
    setUseSimaksi(true);
    setSimaksiPrice("");
    setMessage("");
    setStatus("");
    setIsDescriptionValid(true);
    setIsImageValid(true);
    // setIsConservation(false);
    // setPointsOfInterest("");
    // setTheBestTimeForHiking("");
    // setPriceStartedAt("");
  };
  useEffect(() => {
    console.log(useSimaksi);
  }, [useSimaksi]);

  return (
    <form
      className="flex flex-col gap-4 justify-center items-center"
      onSubmit={(e) => {
        e.preventDefault();
        handleAddMountain();
      }}>
      <h3 className="text-3xl text-successfulHover">Add New Mountain</h3>
      <Input
        type="text"
        label="Name"
        color="successSecondary"
        variant="bordered"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <Input
        type="text"
        label="Location"
        color="successSecondary"
        variant="bordered"
        onChange={(e) => setLocation(e.target.value)}
        value={location}
      />
      <Textarea
        type="text"
        label="Description"
        color="successSecondary"
        variant="bordered"
        onChange={(e) => {
          setDescription(e.target.value);
          setIsDescriptionValid(e.target.value.length <= 900);
        }}
        value={description}
      />
      {!isDescriptionValid && (
        <p className="text-error">
          Description is too long, please use 900 characters or less
        </p>
      )}
      <Input
        type="file"
        label="Image"
        color="successSecondary"
        variant="bordered"
        onChange={handleImageChange}
        accept="image/jpeg,image/png"
      />
      {!isImageValid && (
        <p className="text-error">Image must be in JPEG or PNG format</p>
      )}
      <Input
        type="text"
        label="Status"
        color="successSecondary"
        variant="bordered"
        onChange={(e) => setStatus(e.target.value)}
        value={status}
      />
      <Input
        type="text"
        label="Message"
        color="successSecondary"
        variant="bordered"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      {/* <Textarea
        type="text"
        label="Points of Interest"
        color="successSecondary"
        variant="bordered"
        onChange={(e) => setPointsOfInterest(e.target.value)}
        value={pointsOfInterest}
      />
      <Input
        type="text"
        label="The best time for hiking"
        color="successSecondary"
        variant="bordered"
        onChange={(e) => setTheBestTimeForHiking(e.target.value)}
        value={theBestTimeForHiking}
      />
      <Input
        type="text"
        label="Price Started At"
        color="successSecondary"
        variant="bordered"
        onChange={(e) => setPriceStartedAt(e.target.value)}
        value={priceStartedAt}
      /> */}
      <Select
        label="use simaksi"
        className="w-full"
        onChange={(e) => setUseSimaksi(e.target.value == "yes")}
        value={useSimaksi}>
        <SelectItem key={"yes"} value={true}>
          Yes
        </SelectItem>
        <SelectItem key={"no"} value={false}>
          No
        </SelectItem>
      </Select>
      {useSimaksi && (
        <Input
          type="number"
          label="Simaksi Price"
          color="successSecondary"
          variant="bordered"
          onChange={(e) => {
            setSimaksiPrice(e.target.value);
          }}
          value={simaksiPrice}
        />
      )}
      <CustomButton
        type="submit"
        customStyles={
          isDescriptionValid && isImageValid
            ? ""
            : "bg-successfulSecondary text-zinc-900"
        }>
        Add Mountain
      </CustomButton>
    </form>
  );
};

export default FormMountain;
