import { Button, Input, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../CustomButton";
import {
  addFragmentRoute,
  clearFragmentRoute,
  createRoute,
  setIsRouteUpdating,
  updateFragmentRoute,
  updateRoute,
} from "../../redux/feature/routeSlice";
import CustomModal from "../CustomModal";
import { IoArrowBackCircle } from "react-icons/io5";
import { IoArrowForwardCircle } from "react-icons/io5";

const RouteForm = () => {
  const dispatch = useDispatch();
  const { fragmentRoute, isRouteUpdating, routesDetail, idRouteForUpdate } =
    useSelector((state) => state.route);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [transportation, setTransportation] = useState("");
  const [estimate, setEstimate] = useState("");
  const [distance, setDistance] = useState("");
  const [indexEditStep, setIndexEditStep] = useState(
    fragmentRoute?.length || 0
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddRoute = (e) => {
    e.preventDefault();

    if (
      (!from && indexEditStep === 0) ||
      !to ||
      !transportation ||
      !estimate ||
      !distance
    ) {
      alert("Isi semua data");
      return;
    }

    if (confirm("Are you sure you want to add this route?")) {
      try {
        const previousTo =
          fragmentRoute?.[fragmentRoute.length - 1]?.to || from;

        dispatch(
          addFragmentRoute({
            from: previousTo,
            to,
            transportation,
            estimate,
            distance,
          })
        );
        clearForm();
        setFrom(to);
        setIndexEditStep(fragmentRoute.length + 1);
      } catch (error) {
        console.error(error);
        alert("Error when adding route");
      }
    }
  };

  const handleEditRoute = (index) => {
    if (!from || !to || !transportation || !estimate || !distance) {
      alert("Isi semua data");
      return;
    }
    if (confirm("Are you sure you want to edit this route?")) {
      try {
        dispatch(
          updateFragmentRoute({
            index,
            data: { from, to, transportation, estimate, distance },
          })
        );
        clearForm();
        setIndexEditStep(fragmentRoute.length);
      } catch (error) {
        console.error(error);
        alert("Error when editing route");
      }
    }
  };

  const handleBack = () => {
    setIndexEditStep((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setIndexEditStep((prev) => {
      const nextStep =
        prev < (fragmentRoute?.length || 1) - 1
          ? prev + 1
          : fragmentRoute?.length;
      if (nextStep > prev && prev < fragmentRoute.length) {
        setFrom(fragmentRoute[nextStep]?.to || "");
      }

      return nextStep;
    });
  };

  const clearForm = () => {
    setFrom("");
    setTo("");
    setTransportation("");
    setEstimate("");
    setDistance("");
  };

  const handleSubmit = () => {
    if (isRouteUpdating) {
      const data = {
        title,
        description,
        routes: fragmentRoute,
      };
      dispatch(
        updateRoute({
          id: idRouteForUpdate,
          data,
        })
      );
      dispatch(setIsRouteUpdating(false));
      dispatch(clearFragmentRoute());
      setIndexEditStep(0);
      return;
    }
    dispatch(
      createRoute({
        title,
        description,
        routes: fragmentRoute,
      })
    );
    setTitle("");
    setDescription("");
    dispatch(clearFragmentRoute());
    setIndexEditStep(0);
    onClose();
  };

  const handleConfirmSubmit = () => {
    onOpen();
  };
  useEffect(() => {
    if (isRouteUpdating) {
      dispatch(clearFragmentRoute());
      routesDetail.routes.forEach((route) => {
        dispatch(
          addFragmentRoute({
            from: route.from,
            to: route.to,
            transportation: route.transportation,
            estimate: route.estimate,
            distance: route.distance,
          })
        );
      });
      setTitle(routesDetail.title);
      setDescription(routesDetail.description);
    }
  }, [isRouteUpdating, routesDetail]);
  useEffect(() => {
    console.log(fragmentRoute);
    if (indexEditStep < (fragmentRoute?.length || 0)) {
      const step = fragmentRoute[indexEditStep];
      setFrom(step.from);
      setTo(step.to);
      setTransportation(step.transportation);
      setEstimate(step.estimate);
      setDistance(step.distance);
    } else {
      clearForm();
    }
  }, [indexEditStep, fragmentRoute]);

  return (
    <section className="flex flex-col gap-4">
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        content={
          <>
            <h1>Create Route</h1>
            <Input
              placeholder="Masukkan judul rute"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <Input
              placeholder="Masukkan deskripsi rute"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </>
        }
        primaryActionText={"Submit"}
        onPrimaryAction={handleSubmit}
      />

      <section className="flex gap-4 items-center">
        <p>Tahapan</p>
        {Array.from({ length: fragmentRoute?.length + 1 || 1 }).map(
          (item, index) => (
            <Button
              key={index}
              onPress={() => setIndexEditStep(index)}
              className={`${
                indexEditStep === index ||
                (index === 0 && fragmentRoute.length === 0)
                  ? "bg-mainSoil"
                  : "bg-successful"
              } text-white font-bold`}>
              {index + 1}
            </Button>
          )
        )}
      </section>
      <h1>Form pembutan rute</h1>
      <section className="flex gap-4 w-full">
        {indexEditStep === 0 && (
          <Input
            label="Dari rute"
            placeholder="Masukkan dari rute"
            value={from}
            type="text"
            onChange={(e) => setFrom(e.target.value)}
            clearable
          />
        )}
        <Input
          label="Tujuan rute"
          placeholder="Masukkan tujuan rute"
          value={to}
          type="text"
          onChange={(e) => setTo(e.target.value)}
          clearable
        />
        <Input
          label="Menggunakan transportasi"
          placeholder="Masukan nama transportasi"
          value={transportation}
          type="text"
          onChange={(e) => setTransportation(e.target.value)}
          clearable
        />
      </section>
      <section className="flex gap-4 w-full">
        <Input
          label="Estimasi waktu"
          placeholder="Masukkan berapa lama waktu"
          value={estimate}
          type="text"
          onChange={(e) => setEstimate(e.target.value)}
          clearable
        />
        <Input
          label="Jarak"
          placeholder="Masukan Jarak"
          value={distance}
          type="text"
          onChange={(e) => setDistance(e.target.value)}
          clearable
        />
      </section>
      <section className="flex gap-4 justify-center items-center">
        {indexEditStep > 0 && (
          <IoArrowBackCircle
            className="text-5xl rounded-full text-errorHover"
            onClick={handleBack}
          />
        )}
        {indexEditStep < (fragmentRoute?.length || 0) && (
          <IoArrowForwardCircle
            className="text-5xl rounded-full text-successful"
            onClick={handleNext}
          />
        )}
        <CustomButton
          onClick={
            fragmentRoute?.length <= indexEditStep
              ? handleAddRoute
              : () => handleEditRoute(indexEditStep)
          }
          customStyles="bg-successfulHover">
          {fragmentRoute?.length <= indexEditStep ? "Simpan" : "Edit"}
        </CustomButton>
        {fragmentRoute?.length > 0 && (
          <CustomButton
            customStyles="bg-error"
            onClick={() => dispatch(clearFragmentRoute())}>
            Clear
          </CustomButton>
        )}
        {indexEditStep === fragmentRoute?.length && (
          <CustomButton
            customStyles="bg-mainSoil"
            onClick={handleConfirmSubmit}>
            {isRouteUpdating ? "Submit updated data" : "Submit"}
          </CustomButton>
        )}
      </section>
    </section>
  );
};

export default RouteForm;
