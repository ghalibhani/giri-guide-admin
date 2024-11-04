import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import axiosInstance from "../../api/axiosInstance";

const TourGuideList = () => {
  const handleDelete = (id) => {
    if (!id) {
      console.error("No id provided");
      return;
    }
    axiosInstance
      .delete(`/tour-guides/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleUpdate = (tourGuide) => {
    if (!tourGuide || !tourGuide?.id) {
      console.error("No tour guide provided");
      return;
    }
    console.log("Update Tour Guide");

    console.log(tourGuide);
  };
  return (
    <section className="mt-5 flex flex-wrap gap-5">
      {prototypeTourGuides?.map((tourGuide) => {
        if (!tourGuide || !tourGuide?.id) {
          return null;
        }
        return (
          <section
            key={tourGuide?.id}
            className="flex gap-4 justify-between mb-5">
            <section className="flex flex-1 justify-between">
              <Card
                shadow="sm"
                key={tourGuide?.id}
                isPressable
                onPress={() => console.log("item pressed")}>
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={tourGuide?.name}
                    className="w-full object-cover h-[140px]"
                    src={tourGuide?.image ? tourGuide?.image : img}
                  />
                </CardBody>
                <CardFooter className="text-small justify-between gap-5">
                  <b>{tourGuide?.name}</b>
                  <section className="buttonGroup flex gap-5">
                    <Button
                      onClick={() => handleDelete(tourGuide?.id)}
                      className="text-neutral-50 bg-error hover:bg-errorHover font-bold">
                      Delete
                    </Button>
                    <Button
                      className="text-neutral-50 bg-successful hover:bg-successfulHover font-bold"
                      onClick={() => handleUpdate(tourGuide)}>
                      Update
                    </Button>
                  </section>
                </CardFooter>
              </Card>
            </section>
          </section>
        );
      })}
    </section>
  );
};

const prototypeTourGuides = [
  {
    id: 1,
    name: "John",
    location: "New York",
    description: "This is a test tour guide",
    image: "../../assets/tim-stief-YFFGkE3y4F8-unsplash.jpg",
    isConservation: true,
    pointsOfInterest: "New York, USA",
  },
  {
    id: 2,
    name: "Jane",
    location: "London",
    description: "This is a test tour guide",
    image: "/assets/tim-stief-YFFGkE3y4F8-unsplash.jpg",
    isConservation: true,
    pointsOfInterest: "London, UK",
  },
  {
    id: 3,
    name: "John",
    location: "New York",
    description: "This is a test tour guide",
    image: "/assets/tim-stief-YFFGkE3y4F8-unsplash.jpg",
    isConservation: true,
    pointsOfInterest: "New York, USA",
  },
  {
    id: 4,
    name: "Jane",
    location: "London",
    description: "This is a test tour guide",
    image: "/assets/tim-stief-YFFGkE3y4F8-unsplash.jpg",
    isConservation: true,
    pointsOfInterest: "London, UK",
  },
  {
    id: 5,
    name: "John",
    location: "New York",
    description: "This is a test tour guide",
    image: "/assets/tim-stief-YFFGkE3y4F8-unsplash.jpg",
    isConservation: true,
    pointsOfInterest: "New York, USA",
  },
  {
    id: 6,
    name: "Jane",
    location: "London",
    description: "This is a test tour guide",
    image: "/assets/tim-stief-YFFGkE3y4F8-unsplash.jpg",
    isConservation: true,
  },
];

export default TourGuideList;
