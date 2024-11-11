import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRoute,
  fetchRoute,
  fetchRouteDetailById,
  setIdRouteForUpdate,
  setIsRouteUpdating,
} from "../../redux/feature/routeSlice";
import { Card, CardBody, Pagination, useDisclosure } from "@nextui-org/react";
import CustomButton from "../CustomButton";
import CustomModal from "../CustomModal";
import { MdDelete } from "react-icons/md";

const RouteList = () => {
  const dispatch = useDispatch();
  const { routes, isRouteUpdating, paging } = useSelector(
    (state) => state.route
  );
  const routesDetail = useSelector((state) => state.route.routesDetail);
  const { isOpen, onOpen, onClose } = useDisclosure(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  const handleChangePagination = (page) => {
    setPage(page);
  };
  const handleDetails = (id) => {
    dispatch(fetchRouteDetailById(id));
    onOpen();
  };
  const handleDelete = (id) => {
    if (!id) {
      alert("Id is required for delete");
      return;
    }
    if (confirm("Are you sure you want to delete this route?")) {
      dispatch(deleteRoute(id));
    }
  };

  useEffect(() => {
    dispatch(fetchRoute({ page, size }));
  }, [page, size]);

  useEffect(() => {
    console.log(routes);
  }, [routes]);
  useEffect(() => {
    console.log(routesDetail);
  }, [routesDetail]);

  return (
    <section className="flex flex-col">
      <CustomModal
        isOpen={isOpen}
        onOpenChange={onOpen}
        onClose={onClose}
        content={
          <>
            <p>{routesDetail?.title}</p>
            <p>{routesDetail?.description}</p>
            {routesDetail?.routes.map((route, index) => (
              <p key={route?.from + route?.to + Math.random() * 100}>
                {index + 1}. Dari {route?.from} ke {route?.to} dengan{" "}
                {route?.transportation} dengan estimasi waktu {route?.estimate}{" "}
                dan jarak {route?.distance}
              </p>
            ))}
          </>
        }
        title="Details"
        primaryActionText={"Update"}
        secondaryActionText={"Close"}
        onPrimaryAction={() => {
          dispatch(setIdRouteForUpdate(routesDetail?.id));
          dispatch(fetchRouteDetailById(routesDetail?.id));
          dispatch(setIsRouteUpdating(true));
          onClose();
        }}
        onSecondaryAction={onClose}
      />
      <Card className="mb-3">
        <CardBody className="flex bg-mainSoil text-white flex-row justify-between">
          <section className="flex gap-4 px-6">
            <p className="w-[150px] font-bold text-md">Judul</p>
            <p className="w-[200px] font-bold text-md">Deskripsi</p>
          </section>
          <p className="w-[150px] font-bold text-md">Action</p>
        </CardBody>
      </Card>
      {routes.map((route) => (
        <Card key={route.id} className="mb-3">
          <CardBody className="flex flex-row justify-between items-center text-mainSoil">
            <section className="flex gap-4 px-6">
              <p className="w-[200px] font-bold text-md">{route.title}</p>
              <p className="w-auto">{route.description}</p>
            </section>
            <section className="flex gap-3 items-center">
              <MdDelete
                className="text-error text-3xl"
                onClick={() => handleDelete(route.id)}
              />
              <CustomButton
                customStyles={"bg-successful"}
                onPress={() => {
                  handleDetails(route.id);
                }}
                text="Approve">
                Details
              </CustomButton>
            </section>
          </CardBody>
        </Card>
      ))}
      <Pagination
        total={paging?.totalPages}
        page={page}
        onChange={handleChangePagination}
        classNames={{
          wrapper: "gap-0 overflow-visible h-8 rounded border border-divider",
          item: "w-8 h-8 text-small rounded-none bg-transparent",
          cursor:
            "bg-gradient-to-b shadow-lg from-mainSoil to-default-800 text-white font-bold",
        }}
        rowsPerPage={size}
        rounded
      />
    </section>
  );
};

export default RouteList;
