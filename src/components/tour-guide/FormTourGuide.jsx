import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import CustomButton from "../CustomButton";
import {
  createTourGuide,
  setIsTourGuideUpdating,
  updateTourGuide,
  updateTourGuideImage,
} from "../../redux/feature/tourGuideSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  isPositiveNumber,
  isStrongPassword,
  isEmailValid,
} from "../../validation/validate";

const FormTourGuide = ({ formInput = false }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [nik, setNIK] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [maxHiker, setMaxHiker] = useState("");
  const [price, setPrice] = useState("");
  const [additionalPrice, setAdditionalPrice] = useState("");
  const [totalPorter, setTotalPorter] = useState("");
  const [pricePorter, setPricePorter] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [bankAccount, setBankAccount] = useState("");

  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  const [isImageValid, setIsImageValid] = useState(true);
  const [isValidNIK, setIsValidNIK] = useState(true);

  const { selectedTourGuide, isTourGuideUpdating, tourGuideId } = useSelector(
    (state) => state.tourGuide
  );

  useEffect(() => {
    if (selectedTourGuide) {
      setName(selectedTourGuide.name);
      setNIK(selectedTourGuide.nik);
      setAddress(selectedTourGuide.address);
      setDescription(selectedTourGuide.description);
      setImage(selectedTourGuide.image);
      setEmail(selectedTourGuide.email);
      setPassword(selectedTourGuide.password);
      setMaxHiker(selectedTourGuide.maxHiker);
      setPrice(selectedTourGuide.price);
      setAdditionalPrice(selectedTourGuide.additionalPrice);
      setTotalPorter(selectedTourGuide.totalPorter);
      setPricePorter(selectedTourGuide.pricePorter);
      setBirthDate(selectedTourGuide.birthDate);
      setGender(selectedTourGuide.gender);
      setBankAccount(selectedTourGuide.bankAccount);
    }
  }, [selectedTourGuide]);

  useEffect(() => {
    if ((nik?.length === 16 && nik.match(/^[0-9]+$/)) || nik?.length === 0) {
      setIsValidNIK(true);
    } else {
      setIsValidNIK(false);
    }
  }, [nik]);

  useEffect(() => {
    setIsDescriptionValid(description?.length <= 900);
  }, [description]);

  useEffect(() => {
    if (!isTourGuideUpdating) {
      if (image && image.type !== "image/jpeg" && image.type !== "image/png") {
        setIsImageValid(false);
      } else {
        setIsImageValid(true);
      }
    }
  }, [image]);

  const handleAddTourGuide = (e) => {
    e.preventDefault();
    if (isTourGuideUpdating && selectedTourGuide) {
      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        dispatch(updateTourGuideImage({ id: tourGuideId, data: formData }));
      }

      const tourGuideUpdate = {};
      if (selectedTourGuide.name != name) {
        tourGuideUpdate.name = name;
      }
      if (selectedTourGuide.nik != nik) {
        tourGuideUpdate.nik = nik;
      }
      if (selectedTourGuide.address != address) {
        tourGuideUpdate.address = address;
      }
      if (selectedTourGuide.description != description) {
        tourGuideUpdate.description = description;
      }
      if (selectedTourGuide.email != email) {
        tourGuideUpdate.email = email;
      }
      if (selectedTourGuide.password != password) {
        tourGuideUpdate.password = password;
      }
      if (selectedTourGuide.maxHiker != maxHiker) {
        tourGuideUpdate.maxHiker = maxHiker;
      }
      if (selectedTourGuide.price != price) {
        tourGuideUpdate.price = price;
      }
      if (selectedTourGuide.additionalPrice != additionalPrice) {
        tourGuideUpdate.additionalPrice = additionalPrice;
      }
      if (selectedTourGuide.totalPorter != totalPorter) {
        tourGuideUpdate.totalPorter = totalPorter;
      }
      if (selectedTourGuide.pricePorter != pricePorter) {
        tourGuideUpdate.pricePorter = pricePorter;
      }
      if (selectedTourGuide.birthDate != birthDate) {
        tourGuideUpdate.birthDate = birthDate;
      }
      if (selectedTourGuide.gender != gender) {
        tourGuideUpdate.gender = gender;
      }
      if (selectedTourGuide.bankAccount != bankAccount) {
        tourGuideUpdate.bankAccount = bankAccount;
      }
      dispatch(updateTourGuide({ id: tourGuideId, data: tourGuideUpdate }));
      return;
    }

    if (
      !name ||
      !nik ||
      !description ||
      !image ||
      !isValidNIK ||
      !isImageValid ||
      !email ||
      !password ||
      !maxHiker ||
      !price ||
      !additionalPrice ||
      !totalPorter ||
      !pricePorter ||
      !birthDate ||
      !gender ||
      !address ||
      !bankAccount
    ) {
      alert("Please fill in all the required fields.");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("nik", nik);
    formData.append("address", address);
    formData.append("description", description);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("maxHiker", maxHiker);
    formData.append("price", price);
    formData.append("additionalPrice", additionalPrice);
    formData.append("totalPorter", totalPorter);
    formData.append("pricePorter", pricePorter);
    formData.append("birthDate", birthDate);
    formData.append("gender", gender);
    formData.append("bankAccount", bankAccount);

    dispatch(createTourGuide(formData));
    setName("");
    setNIK("");
    setAddress("");
    setDescription("");
    setImage(null);
    setEmail("");
    setPassword("");
    setMaxHiker("");
    setPrice("");
    setAdditionalPrice("");
    setTotalPorter("");
    setPricePorter("");
    setBirthDate("");
    setGender("");
    setBankAccount("");

    setIsDescriptionValid(true);
    setIsImageValid(true);
    setIsValidNIK(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 justify-center"
      onSubmit={handleAddTourGuide}>
      <h3 className="text-3xl text-successfulHover">
        {!formInput
          ? isTourGuideUpdating
            ? "Update Tour Guide"
            : "Tour Guide Details"
          : "Add Tour Guide"}
      </h3>
      <section className="flex gap-4 w-full">
        <Input
          type="text"
          label="Full Name"
          color="successSecondary"
          variant="bordered"
          isRequired
          isDisabled={isTourGuideUpdating == false && formInput == false}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <section className="w-full flex flex-col gap-4">
          <Input
            isDisabled={isTourGuideUpdating == false && formInput == false}
            type="text"
            label="NIK"
            color="successSecondary"
            isRequired
            isInvalid={!isPositiveNumber(nik) || !isValidNIK}
            errorMessage="NIK harus lebih panjang dari 16 digit dan hanya angka"
            variant="bordered"
            onChange={(e) => setNIK(e.target.value)}
            value={nik}
          />
          {!isValidNIK && (
            <p className="text-error">
              NIK harus lebih panjang dari 16 digit dan hanya angka
            </p>
          )}
        </section>
      </section>
      <Input
        isDisabled={isTourGuideUpdating == false && formInput == false}
        type="text"
        label="Address"
        color="successSecondary"
        isRequired
        variant="bordered"
        onChange={(e) => setAddress(e.target.value)}
        value={address}
      />
      <Textarea
        isDisabled={isTourGuideUpdating == false && formInput == false}
        type="text"
        label="Description"
        color="successSecondary"
        isRequired
        variant="bordered"
        isInvalid={!isDescriptionValid}
        errorMessage="Description is too long, please use 900 characters or less"
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
        isDisabled={isTourGuideUpdating == false && formInput == false}
        type="file"
        label="Image"
        color="successSecondary"
        isRequired
        isInvalid={!isImageValid}
        errorMessage="Image must be in JPEG or PNG format and less than 1MB"
        variant="bordered"
        onChange={handleImageChange}
      />
      <section className="flex gap-4 w-full">
        <Input
          isDisabled={isTourGuideUpdating == false && formInput == false}
          type="email"
          label="Email"
          color="successSecondary"
          isRequired
          isInvalid={!isEmailValid(email)}
          errorMessage="Please enter a valid email"
          variant="bordered"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          isDisabled={isTourGuideUpdating == false && formInput == false}
          type="password"
          label="Password"
          color="successSecondary"
          variant="bordered"
          isRequired
          isInvalid={!isStrongPassword(password)}
          errorMessage="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </section>
      <section className="flex gap-4 w-full">
        <Input
          isDisabled={isTourGuideUpdating == false && formInput == false}
          type="number"
          label="Max Hiker"
          color="successSecondary"
          isRequired
          isInvalid={!isPositiveNumber(maxHiker) && maxHiker >= 5}
          errorMessage="Please use a positive number"
          variant="bordered"
          onChange={(e) => setMaxHiker(e.target.value)}
          value={maxHiker}
        />
        <Input
          isDisabled={isTourGuideUpdating == false && formInput == false}
          type="number"
          label="Price"
          color="successSecondary"
          isRequired
          isInvalid={!isPositiveNumber(price)}
          errorMessage="Please use a positive number"
          variant="bordered"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
        <Input
          isDisabled={isTourGuideUpdating == false && formInput == false}
          type="number"
          label="Additional Price"
          color="successSecondary"
          isRequired
          isInvalid={!isPositiveNumber(additionalPrice)}
          errorMessage="Please use a positive number"
          variant="bordered"
          onChange={(e) => setAdditionalPrice(e.target.value)}
          value={additionalPrice}
        />
      </section>

      <section className="flex gap-4 w-full">
        <Input
          isDisabled={isTourGuideUpdating == false && formInput == false}
          type="number"
          label="Total Porter"
          color="successSecondary"
          isRequired
          isInvalid={!isPositiveNumber(totalPorter)}
          errorMessage="Please use a positive number"
          variant="bordered"
          onChange={(e) => setTotalPorter(e.target.value)}
          value={totalPorter}
        />
        <Input
          isDisabled={isTourGuideUpdating == false && formInput == false}
          type="number"
          label="Price Porter"
          color="successSecondary"
          isRequired
          isInvalid={!isPositiveNumber(pricePorter)}
          errorMessage="Please use a positive number"
          variant="bordered"
          onChange={(e) => setPricePorter(e.target.value)}
          value={pricePorter}
        />
      </section>
      <section className="flex gap-4 w-full">
        <Input
          isDisabled={isTourGuideUpdating == false && formInput == false}
          type="date"
          label="Birth Date"
          color="successSecondary"
          isRequired
          variant="bordered"
          onChange={(e) => setBirthDate(e.target.value)}
          value={birthDate}
        />
        <Select
          isDisabled={isTourGuideUpdating == false && formInput == false}
          label="Gender"
          color="successSecondary"
          isRequired
          variant="bordered"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          defaultSelectedKeys={[gender]}>
          <SelectItem value="MALE" key={"MALE"}>
            MALE
          </SelectItem>
          <SelectItem value="FEMALE" key={"FEMALE"}>
            FEMALE
          </SelectItem>
        </Select>
      </section>
      <Input
        isDisabled={isTourGuideUpdating == false && formInput == false}
        type="number"
        label="Bank Account"
        color="successSecondary"
        isRequired
        isInvalid={!isPositiveNumber(bankAccount)}
        errorMessage="Please enter a valid bank account"
        variant="bordered"
        onChange={(e) => setBankAccount(e.target.value)}
        value={bankAccount}
      />
      {!isTourGuideUpdating && selectedTourGuide && (
        <CustomButton
          type="button"
          onPress={() => dispatch(setIsTourGuideUpdating(true))}>
          Update Tour Guide
        </CustomButton>
      )}
      {isTourGuideUpdating && (
        <section className="flex w-full gap-4">
          <CustomButton
            type="submit"
            customStyles={
              isDescriptionValid && (isImageValid || isTourGuideUpdating)
                ? "w-full"
                : "bg-successfulSecondary text-zinc-900"
            }>
            Submit Updating Tour Guide
          </CustomButton>
        </section>
      )}
      {formInput && (
        <CustomButton
          type="submit"
          customStyles={
            isDescriptionValid && (isImageValid || isTourGuideUpdating)
              ? "w-full"
              : "bg-successfulSecondary text-zinc-900"
          }>
          Add Tour Guide
        </CustomButton>
      )}
    </form>
  );
};

export default FormTourGuide;
