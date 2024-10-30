import { useSelector } from "react-redux";
import FormMountain from "../../components/mountains/FormMountain";

const Mountain = () => {
  const mountains = useSelector((state) => state.mountain.mountains);
  return (
    <section className="w-96 font-inter">
      <h1>Mountain Management</h1>
      <FormMountain />
    </section>
  );
};

export default Mountain;
