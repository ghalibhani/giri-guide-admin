import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMountain } from "../../redux/feature/mountainSlice";
import { Button, Input } from "@nextui-org/react";
import MountainListForSelectingHikingPoint from "./MountainListForSelectingHikingPoint";
import CustomButton from "../CustomButton";
import HikingPointListForAddingMasteredHikingPoint from "./HikingPointListForAddingMasteredHikingPoint";
import {
  clearHikingPointIdSelected,
  createMasteredHikingPoint,
} from "../../redux/feature/tourGuideSlice";

const AddMasteredHikingPoint = () => {
  const dispatch = useDispatch();
  const [isAddingHikingPoint, setIsAddingHikingPoint] = useState(false);
  const {
    mountainIdForSelectingHikingPoint,
    hikingPointIdSelected,
    tourGuideId,
  } = useSelector((state) => state.tourGuide);
  const handleAddHikingPoint = () => {
    hikingPointIdSelected.map((hikingPointId) => {
      dispatch(
        createMasteredHikingPoint({
          id: tourGuideId,
          data: { hikingPointId },
        })
      );
    });
    dispatch(clearHikingPointIdSelected());
  };
  return (
    <section className="flex flex-col gap-4">
      {!isAddingHikingPoint && !mountainIdForSelectingHikingPoint && (
        <CustomButton
          onClick={() => {
            setIsAddingHikingPoint(true);
          }}
          className="bg-successful text-white mb-6">
          Add Hiking Point Mastered
        </CustomButton>
      )}
      {isAddingHikingPoint && !mountainIdForSelectingHikingPoint && (
        <>
          <h1>Select Mountain for add Hiking Point Mastered</h1>
          <Input
            type="text"
            label="Search"
            placeholder="Search"
            onChange={(e) =>
              dispatch(
                fetchMountain({ page: 1, size: 4, search: e.target.value })
              )
            }
          />
          <MountainListForSelectingHikingPoint />
          {hikingPointIdSelected.length > 0 ? (
            <Button
              onPress={handleAddHikingPoint}
              className="bg-successful text-white mb-6">
              Add Mastered Hiking Point
            </Button>
          ) : (
            <Button className="mb-6">Add Mastered Hiking Point</Button>
          )}
        </>
      )}
      {isAddingHikingPoint && mountainIdForSelectingHikingPoint && (
        <HikingPointListForAddingMasteredHikingPoint />
      )}
    </section>
  );
};

export default AddMasteredHikingPoint;
