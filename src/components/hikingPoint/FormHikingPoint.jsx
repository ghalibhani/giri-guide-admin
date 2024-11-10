import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import CustomButton from "../CustomButton";
import {
  clearSeletedHikingPoint,
  createHikingPoint,
  setIsUpdate,
  updateHikingPoint,
} from "../../redux/feature/hikingPointSlice";
import { useDispatch, useSelector } from "react-redux";

const FormHikingPoint = () => {
  const [name, setName] = useState("");
  const [coordinate, setCoordinate] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { mountainId } = useSelector((state) => state.hikingPoint);
  const { selectedHikingPoint, isUpdate } = useSelector(
    (state) => state.hikingPoint
  );
  useEffect(() => {
    if (isUpdate && selectedHikingPoint) {
      setName(selectedHikingPoint?.name ?? "");
      setCoordinate(selectedHikingPoint?.coordinate ?? "");
      setPrice(selectedHikingPoint?.price ?? "");
    } else {
      clearForm();
    }
  }, [isUpdate, selectedHikingPoint]);
  const validateInput = () => {
    if (!name || !coordinate || !price) {
      setError("Isi semua data");
      return false;
    }
    if (isNaN(price)) {
      setError("Harga harus berupa angka");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateInput()) {
        return;
      }
      if (isUpdate && selectedHikingPoint) {
        dispatch(
          updateHikingPoint({
            idHikingPoint: selectedHikingPoint.id,
            data: { name, coordinate, price },
          })
        );
        dispatch(setIsUpdate(false));
        dispatch(clearSeletedHikingPoint());
      } else if (mountainId) {
        dispatch(
          createHikingPoint({
            data: { name, coordinate, price },
            id: mountainId,
          })
        );
      }
      clearForm();
    } catch (error) {
      setError(error?.message ?? "Terjadi kesalahan");
    }
  };

  const clearForm = () => {
    setName("");
    setCoordinate("");
    setPrice("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <h1 className="text-3xl text-successfulHover">
        {isUpdate && selectedHikingPoint ? "Update" : "Add"} Hiking Point
      </h1>
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Coordinate"
        value={coordinate}
        onChange={(e) => setCoordinate(e.target.value)}
      />
      <Input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <CustomButton type="submit" customStyles>
        {isUpdate && selectedHikingPoint ? "Update" : "Add"} Hiking Point
      </CustomButton>
    </form>
  );
};

export default FormHikingPoint;
