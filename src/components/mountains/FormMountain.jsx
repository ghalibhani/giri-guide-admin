import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import CustomButton from "../CustomButton";
import { createMountain } from "../../redux/feature/mountainSlice";
import { useDispatch } from "react-redux";

const FormMountain = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isConservation, setIsConservation] = useState(false);
  const [pointsOfInterest, setPointsOfInterest] = useState("");
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  const [isImageValid, setIsImageValid] = useState(true);

  useEffect(() => {
    if (description == null || description.length > 900) {
      setIsDescriptionValid(false);
    } else {
      setIsDescriptionValid(true);
    }
  }, [description]);

  useEffect(() => {
    if (image && image.type !== "image/jpeg" && image.type !== "image/png") {
      setIsImageValid(false);
    } else {
      setIsImageValid(true);
    }
  }, [image]);

  const handleAddMountain = () => {
    if (
      !name ||
      !location ||
      !description ||
      !image ||
      isConservation == null
    ) {
      return;
    }
    const newMountain = {
      name,
      location,
      description,
      image,
      isConservation,
      pointsOfInterest: pointsOfInterest.split(",").map((poi) => poi.trim()),
    };
    dispatch(createMountain(newMountain));
    setName("");
    setLocation("");
    setDescription("");
    setImage(null);
    setIsConservation(false);
    setPointsOfInterest("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <form className="flex flex-col gap-4 justify-center items-center">
      <h3 className="text-3xl text-successfulHover">Add New Mountain</h3>
      <Input
        type="text"
        label="Name"
        color="successSecondary"
        variant="bordered"
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="text"
        label="Location"
        color="successSecondary"
        variant="bordered"
        onChange={(e) => setLocation(e.target.value)}
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
      />
      {!isImageValid && (
        <p className="text-error">Image must be in JPEG or PNG format</p>
      )}
      <Textarea
        type="text"
        label="Points of Interest"
        color="successSecondary"
        variant="bordered"
        onChange={(e) => setPointsOfInterest(e.target.value)}
      />
      <Select
        label="is conservation area"
        className="w-full"
        onChange={(e) => setIsConservation(e.target.value === "true")}>
        <SelectItem key={"yes"} value={true}>
          yes
        </SelectItem>
        <SelectItem key={"no"} value={false}>
          no
        </SelectItem>
      </Select>
      <CustomButton
        onClick={handleAddMountain}
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
