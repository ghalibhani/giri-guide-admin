import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import CustomButton from "../CustomButton";
import {
  createMountain,
  fetchMountain,
  fetchMountainById,
  updateMountain,
} from "../../redux/feature/mountainSlice";
import { useDispatch, useSelector } from "react-redux";

const FormMountain = ({ isEdit = false, id, onClose, disabled, onUpdate }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("NORMAL");
  const [message, setMessage] = useState("");
  const [useSimaksi, setUseSimaksi] = useState(false);
  const [simaksiPrice, setSimaksiPrice] = useState("");
  const [image, setImage] = useState(null);
  const [tips, setTips] = useState("");
  const [bestTime, setBestTime] = useState();
  const [isImageValid, setIsImageValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);

  const selectedMountain = useSelector(
    (state) => state.mountain.selectedMountain
  );

  useEffect(() => {
    if (isEdit && id) {
      const fetchMountain = async () => {
        try {
          dispatch(fetchMountainById(id));
        } catch (e) {
          console.error("Failed to fetch mountain data:", e);
        }
      };
      fetchMountain();
    }
  }, [isEdit, id, dispatch]);

  useEffect(() => {
    if (isEdit && selectedMountain) {
      setName(selectedMountain.name || "");
      setLocation(selectedMountain.city || "");
      setDescription(selectedMountain.description || "");
      setStatus(selectedMountain.status || "NORMAL");
      setMessage(selectedMountain.message || "");
      setUseSimaksi(selectedMountain.useSimaksi || false);
      setSimaksiPrice(selectedMountain.priceSimaksi || "");
      setImage(selectedMountain.image || null);
      setTips(selectedMountain.tips || "");
      setBestTime(selectedMountain.bestTime || "");
    }
  }, [selectedMountain, isEdit]);

  useEffect(() => {
    setIsDescriptionValid(description != null && description.length <= 900);
  }, [description]);

  useEffect(() => {
    setIsImageValid(
      image && (image.type === "image/jpeg" || image.type === "image/png")
    );
  }, [image]);

  const handleAddMountain = async () => {
    const formData = new FormData();
    const editedMountain = {};

    if (isEdit && disabled) {
      if (!selectedMountain) {
        console.error("No selected mountain provided");
        return;
      }

      if (selectedMountain.status !== status) {
        editedMountain.status = status;
      }
      if (selectedMountain.message !== message) {
        editedMountain.message = message;
      }
      if (selectedMountain.priceSimaksi !== simaksiPrice) {
        editedMountain.priceSimaksi = simaksiPrice;
      }
      if (selectedMountain.useSimaksi !== useSimaksi) {
        editedMountain.useSimaksi = useSimaksi;
      }
      if (selectedMountain.name !== name) {
        editedMountain.name = name;
      }
      if (selectedMountain.city !== location) {
        editedMountain.city = location;
      }
      if (selectedMountain.description !== description) {
        editedMountain.description = description;
      }
      if (selectedMountain.tips !== tips) {
        editedMountain.tips = tips;
      }
      if (selectedMountain.bestTime !== bestTime) {
        editedMountain.bestTime = bestTime;
      }

      await dispatch(
        updateMountain({
          id: selectedMountain.id,
          data: editedMountain,
        })
      );
      resetForm();
      onUpdate(false);
      await dispatch(fetchMountain());
      return;
    }

    if (
      !name ||
      !location ||
      !description ||
      !image ||
      !isDescriptionValid ||
      !isImageValid ||
      !tips ||
      !bestTime
    ) {
      console.error("Form validation failed.");
      return;
    }

    formData.append("name", name);
    formData.append("city", location);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("useSimaksi", useSimaksi);
    formData.append("priceSimaksi", simaksiPrice || 0);
    formData.append("status", status);
    formData.append("message", message);
    formData.append("tips", tips);
    formData.append("bestTime", bestTime);

    dispatch(createMountain(formData));
    resetForm();
    dispatch(fetchMountain());
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > 1) {
        setIsImageValid(false);
      } else {
        setImage(file);
        setIsImageValid(true);
      }
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
    setStatus("NORMAL");
    setIsDescriptionValid(true);
    setIsImageValid(true);
    setTips("");
    setBestTime("");
  };

  return (
    <form
      className="flex flex-col gap-4 justify-center items-center w-full"
      onSubmit={(e) => {
        e.preventDefault();
        handleAddMountain();
      }}>
      <h3 className="text-3xl text-successfulHover">
        {isEdit ? "Edit" : "Add New"} Mountain
      </h3>
      <Input
        type="text"
        label="Name"
        color="successSecondary"
        isDisabled={disabled == false}
        variant="bordered"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <Input
        type="text"
        label="Location"
        color="successSecondary"
        isDisabled={disabled == false}
        variant="bordered"
        onChange={(e) => setLocation(e.target.value)}
        value={location}
      />
      <Textarea
        type="text"
        label="Description"
        color="successSecondary"
        isDisabled={disabled == false}
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
        isDisabled={disabled == false}
        variant="bordered"
        onChange={handleImageChange}
        accept="image/jpeg,image/png"
        max-size={1024 * 1024}
      />
      {!isImageValid && (
        <p className="text-error">Image must be in JPEG or PNG format</p>
      )}
      <section className="flex w-full gap-4">
        <Select
          label="Status"
          className="w-full"
          isDisabled={disabled == false}
          onChange={(e) => setStatus(e.target.value)}
          value={status}>
          <SelectItem key="normal" value="NORMAL">
            NORMAL
          </SelectItem>
          <SelectItem key="siaga" value="SIAGA">
            SIAGA
          </SelectItem>
          <SelectItem key="waspada" value="WASPADA">
            WASPADA
          </SelectItem>
          <SelectItem key="awas" value="AWAS">
            AWAS
          </SelectItem>
        </Select>
        <Input
          type="text"
          label="Message"
          color="successSecondary"
          isDisabled={disabled == false}
          variant="bordered"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
      </section>
      <section className="flex w-full gap-4">
        <Select
          label="Use Simaksi"
          className="w-full"
          isDisabled={disabled == false}
          onChange={(e) => setUseSimaksi(e.target.value === "yes")}
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
            isDisabled={disabled == false}
            variant="bordered"
            onChange={(e) => setSimaksiPrice(e.target.value)}
            value={simaksiPrice}
          />
        )}
      </section>
      <Input
        type="text"
        label="Tips"
        color="successSecondary"
        isDisabled={disabled == false}
        variant="bordered"
        onChange={(e) => setTips(e.target.value)}
        value={tips}
      />
      <Input
        type="text"
        label="Best Time"
        color="successSecondary"
        isDisabled={disabled == false}
        variant="bordered"
        onChange={(e) => setBestTime(e.target.value)}
        value={bestTime}
      />
      <CustomButton
        type="submit"
        onPress={() => onUpdate(true)}
        customStyles={
          isDescriptionValid && (isImageValid || isEdit)
            ? "w-full"
            : "bg-successfulSecondary text-zinc-900"
        }>
        {isEdit ? (!disabled ? "Update" : "Submit") : "Add"} Mountain
      </CustomButton>
    </form>
  );
};

export default FormMountain;
