import { Input } from "@nextui-org/react";
import { useState } from "react";
import CustomButton from "../CustomButton";
import { createHikingPoint } from "../../redux/feature/hikingPointSlice";
import { useDispatch, useSelector } from "react-redux";

const FormHikingPoint = ({ isEdit = false, id = null }) => {
  const [name, setName] = useState("");
  const [coordinate, setCoordinate] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const { mountainId } = useSelector((state) => state.hikingPoint);

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
    if (!validateInput()) {
      return;
    }
    try {
      console.log(id);
      console.log(name, coordinate, price);
      dispatch(
        createHikingPoint({
          data: { name, coordinate, price },
          id: mountainId,
        })
      );
      clearForm();
    } catch (error) {
      setError(error.message);
    }
  };

  const clearForm = () => {
    setName("");
    setCoordinate("");
    setPrice("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      <Input
        placeholder="Name"
        value={name}
        disabled={isEdit}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Coordinate"
        value={coordinate}
        disabled={isEdit}
        onChange={(e) => setCoordinate(e.target.value)}
      />
      <Input
        placeholder="Price"
        value={price}
        disabled={isEdit}
        onChange={(e) => setPrice(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <CustomButton type="submit" customStyles>
        {isEdit ? "Update" : "Add"} Hiking Point
      </CustomButton>
    </form>
  );
};

export default FormHikingPoint;
