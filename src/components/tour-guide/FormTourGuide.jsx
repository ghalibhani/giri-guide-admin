import { Input, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import CustomButton from "../CustomButton";
import { createTourGuide } from "../../redux/feature/tourGuideSlice";
import { useDispatch } from "react-redux";
import axiosInstance from "../../api/axiosInstance";

const FormTourGuide = ({ isEdit = false, id }) => {
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const [NIK, setNIK] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [masteredClimbingPoint, setMasteredClimbingPoint] = useState("");
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  const [isImageValid, setIsImageValid] = useState(true);
  const [
    isIntructionForMasteredClimbingPointValid,
    setIsIntructionForMasteredClimbingPointValid,
  ] = useState(true);
  const [isValidNIK, setIsValidNIK] = useState(true);

  useEffect(() => {
    if (isEdit) {
      const fetchTourGuide = async () => {
        try {
          const response = await axiosInstance.get(`/tour-guides/${id}`);
          const tourGuide = response.data;
          if (!tourGuide) {
            console.error("No tour guide found");
            return;
          }
          setFullName(tourGuide.fullName);
          setNIK(tourGuide.NIK);
          setAddress(tourGuide.address);
          setDescription(tourGuide.description);
          setImage(tourGuide.image);
          setMasteredClimbingPoint(tourGuide.masteredClimbingPoint);
        } catch (e) {
          console.log(e);
        }
      };
      fetchTourGuide();
    }
  }, [isEdit, id]);

  useEffect(() => {
    if ((NIK.length === 16 && NIK.match(/^[0-9]+$/)) || NIK.length === 0) {
      setIsValidNIK(true);
    } else {
      setIsValidNIK(false);
    }
  }, [NIK]);

  useEffect(() => {
    if (
      masteredClimbingPoint.length > 1 ||
      masteredClimbingPoint.length === 0
    ) {
      setIsIntructionForMasteredClimbingPointValid(true);
    } else {
      setIsIntructionForMasteredClimbingPointValid(false);
    }
  }, [masteredClimbingPoint]);

  useEffect(() => {
    setIsDescriptionValid(description.length <= 900);
  }, [description]);

  useEffect(() => {
    if (image && image.type !== "image/jpeg" && image.type !== "image/png") {
      setIsImageValid(false);
    } else {
      setIsImageValid(true);
    }
  }, [image]);

  const handleAddTourGuide = () => {
    if (!fullName || !NIK || !description || !image) {
      return;
    }
    const newTourGuide = {
      fullName,
      NIK,
      address,
      description,
      image,
      masteredClimbingPoint: masteredClimbingPoint
        .split(",")
        .map((poi) => poi.trim()),
    };
    console.log(newTourGuide);
    dispatch(createTourGuide(newTourGuide));
    setFullName("");
    setNIK("");
    setAddress("");
    setDescription("");
    setImage(null);
    setMasteredClimbingPoint("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <form className="flex flex-col gap-4 justify-center items-center">
      <h3 className="text-3xl text-successfulHover">Add New TourGuide</h3>
      <Input
        type="text"
        label="Full Name"
        color="successSecondary"
        variant="bordered"
        onChange={(e) => setFullName(e.target.value)}
        value={fullName}
      />
      <Input
        type="number"
        label="NIK"
        color="successSecondary"
        variant="bordered"
        onChange={(e) => setNIK(e.target.value)}
        value={NIK}
      />
      {!isValidNIK && (
        <p className="text-error">
          NIK harus lebih panjang dari 16 digit dan hanya angka
        </p>
      )}
      <Input
        type="text"
        label="Address"
        color="successSecondary"
        variant="bordered"
        onChange={(e) => setAddress(e.target.value)}
        value={address}
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
      />
      {!isImageValid && (
        <p className="text-error">Image must be in JPEG or PNG format</p>
      )}
      <Textarea
        type="text"
        label="Mastered Climbing Point"
        color="successSecondary"
        variant="bordered"
        onChange={(e) =>
          setMasteredClimbingPoint(
            e.target.value.split(",").map((e) => e.trim())
          )
        }
      />
      {!isIntructionForMasteredClimbingPointValid && (
        <p className="text-error">
          pisahkan dengan tanda "," untuk setiap titik pendakian yang di kuasai
        </p>
      )}
      <CustomButton
        onClick={handleAddTourGuide}
        customStyles={
          isDescriptionValid && isImageValid
            ? ""
            : "bg-successfulSecondary text-zinc-900"
        }>
        Add TourGuide
      </CustomButton>
    </form>
  );
};

export default FormTourGuide;
