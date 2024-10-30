import { useSelector } from "react-redux";

const Mountain = () => {
  const mountains = useSelector((state) => state.mountain.mountains);
  return (
    <section className="w-screen min-h-screen flex justify-center items-center">
      <h1>Mountain</h1>
    </section>
  );
};

export default Mountain;
