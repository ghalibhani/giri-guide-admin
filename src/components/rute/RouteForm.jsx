import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../CustomButton";
import {
  addFragmentRoute,
  updateFragmentRoute,
} from "../../redux/feature/routeSlice";

const RouteForm = () => {
  const dispatch = useDispatch();
  const fragmentRoute = useSelector((state) => state.route.fragmentRoute);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [transportation, setTransportation] = useState("");
  const [estimate, setEstimate] = useState("");
  const [distance, setDistance] = useState("");
  const [indexEditStep, setIndexEditStep] = useState(
    fragmentRoute?.length || 0
  );

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
        setIndexEditStep(fragmentRoute.length + 1);
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
      <Input
        label="Estimasi waktu"
        placeholder="Masukkan berapa lama waktu"
        value={estimate}
        type="number"
        onChange={(e) => setEstimate(Number(e.target.value))}
        clearable
      />
      <Input
        label="Jarak"
        placeholder="Masukan Jarak"
        value={distance}
        type="number"
        onChange={(e) => setDistance(Number(e.target.value))}
        clearable
      />
      <section className="flex gap-4">
        <CustomButton customStyles="bg-error" onClick={handleBack}>
          Back
        </CustomButton>
        <CustomButton customStyles="bg-successful" onClick={handleNext}>
          Next
        </CustomButton>
        <CustomButton
          onClick={
            fragmentRoute?.length <= indexEditStep
              ? handleAddRoute
              : () => handleEditRoute(indexEditStep)
          }
          customStyles="bg-successfulHover">
          {fragmentRoute?.length <= indexEditStep ? "Simpan" : "Edit"}
        </CustomButton>
      </section>
    </section>
  );
};

export default RouteForm;
