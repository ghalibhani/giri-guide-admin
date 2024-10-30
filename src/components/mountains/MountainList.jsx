import { useDispatch } from "react-redux";
import {
  deleteMountain,
  updateMountain,
} from "../../redux/feature/mountainSlice";

const MountainList = () => {
  //   const mountains = useSelector((state) => state.mountain.mountains);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteMountain(id));
  };
  const handleUpdate = (newMountain) => {
    dispatch(updateMountain(newMountain));
  };

  const prototypeMountains = [
    {
      id: 1,
      name: "Mount Fuji",
      location: "Japan",
      description: "The highest mountain in Japan",
      image: "https://source.unsplash.com/random",
      isConservation: true,
      pointsOfInterest: "Mount Fuji, Fuji, Japan",
    },
    {
      id: 2,
      name: "Mount Everest",
      location: "Nepal",
      description: "The highest mountain in Nepal",
      image: "https://source.unsplash.com/random",
      isConservation: true,
      pointsOfInterest: "Mount Everest, Everest, Nepal",
    },
    {
      id: 3,
      name: "Mount everest",
      location: "Nepal",
      description: "The highest mountain in Nepal",
      image: "https://source.unsplash.com/random",
      isConservation: true,
      pointsOfInterest: "Mount everest, everest, Nepal",
    },
    {
      id: 4,
      name: "Mount EVEREST",
      location: "Nepal",
      description: "The highest mountain in Nepal",
      image: "https://source.unsplash.com/random",
      isConservation: true,
      pointsOfInterest: "Mount everest, everest, Nepal",
    },
    {
      id: 5,
      name: "Mount everest",
      location: "Nepal",
      description: "The highest mountain in Nepal",
      image: "https://source.unsplash.com/random",
      isConservation: true,
      pointsOfInterest: "Mount everest, everest, Nepal",
    },
    {
      id: 6,
      name: "Mount everest",
      location: "Nepal",
      description: "The highest mountain in Nepal",
      image: "https://source.unsplash.com/random",
      isConservation: true,
      pointsOfInterest: "Mount everest, everest, Nepal",
    },
  ];
  return (
    <section>
      {prototypeMountains.map((mountain) => (
        <section key={mountain.id} className="flex gap-4 justify-between">
          <section className="flex justify-between">
            <p>{mountain.name}</p>
            <p>{mountain.location}</p>
          </section>
          <section className="buttonGroup">
            <button
              onClick={() => handleDelete(mountain.id)}
              className="text-neutral-50  bg-successful hover:bg-successfulHover font-bold">
              Delete
            </button>
            <button
              className="text-neutral-50  bg-successful hover:bg-successfulHover font-bold"
              onClick={() => handleUpdate(mountain)}>
              Update
            </button>
          </section>
        </section>
      ))}
    </section>
  );
};

export default MountainList;
