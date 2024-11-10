import { useDispatch, useSelector } from "react-redux";
import {
  fetchMountain,
  setIsMountainUpdating,
} from "../../redux/feature/mountainSlice";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Pagination,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { setMountainIdForSelectingHikingPoint } from "../../redux/feature/tourGuideSlice";
const MountainListForSelectingHikingPoint = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [mountainsPerPage] = useState(4);
  const mountains = useSelector((state) => state.mountain.mountains || []);
  const status = useSelector((state) => state.mountain.status);
  const paging = useSelector((state) => state.mountain.paging);
  const handleSelectMountainIdForSelectingHikingPoint = (mountain) => {
    if (!mountain?.id) {
      alert("Id is required for update");
      return;
    }
    try {
      dispatch(setMountainIdForSelectingHikingPoint(mountain.id));
      setIsMountainUpdating(true);
    } catch (error) {
      alert(error?.message);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    try {
      dispatch(fetchMountain({ page: currentPage, size: mountainsPerPage }));
    } catch (error) {
      alert(error?.message);
    }
  }, [dispatch, currentPage, mountainsPerPage]);

  return (
    <section className="flex flex-col gap-5">
      <section className="flex flex-wrap gap-5 justify-center">
        {status === "loading" ? (
          <div>Loading...</div>
        ) : (
          <>
            {mountains?.map((mountain) => {
              if (!mountain || !mountain?.id) {
                console.error("Invalid mountain data:", mountain);
                return null;
              }
              return (
                <section
                  key={mountain?.id}
                  className="flex gap-4 justify-between mb-5">
                  <section className="flex flex-1">
                    <Card
                      shadow="sm"
                      key={mountain?.id}
                      isPressable
                      className="w-[200px]">
                      <CardBody className="overflow-visible p-0">
                        <Image
                          shadow="sm"
                          radius="lg"
                          width="100%"
                          alt={mountain?.name || "Mountain Image"}
                          className="w-full object-cover h-[140px]"
                          src={mountain?.image}
                        />
                      </CardBody>
                      <CardFooter className="text-small justify-between gap-5">
                        <b>{mountain?.name}</b>
                        <section className="buttonGroup flex gap-5">
                          <Button
                            className="text-neutral-50 bg-successful hover:bg-successfulHover font-bold"
                            onClick={() => {
                              console.log("mountain", mountain);
                              handleSelectMountainIdForSelectingHikingPoint(
                                mountain
                              );
                            }}>
                            Select
                          </Button>
                        </section>
                      </CardFooter>
                    </Card>
                  </section>
                </section>
              );
            })}
          </>
        )}
      </section>
      <Pagination
        total={paging?.totalPages}
        initialPage={paging?.page}
        onChange={(page) => {
          paginate(page);
        }}
      />
    </section>
  );
};

export default MountainListForSelectingHikingPoint;
