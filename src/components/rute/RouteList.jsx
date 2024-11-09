import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRoute,
  fetchRouteDetailById,
  setIdRouteForUpdate,
  setIsRouteUpdating,
} from "../../redux/feature/routeSlice";
import { Card, CardBody, useDisclosure } from "@nextui-org/react";
import CustomButton from "../CustomButton";
import CustomModal from "../CustomModal";

const RouteList = () => {
  const dispatch = useDispatch();
  const { routes, isRouteUpdating } = useSelector((state) => state.route);
  const routesDetail = useSelector((state) => state.route.routesDetail);
  const { isOpen, onOpen, onClose } = useDisclosure(false);

  const handleDetails = (id) => {
    dispatch(fetchRouteDetailById(id));
    onOpen();
  };

  useEffect(() => {
    dispatch(fetchRoute());
  }, []);

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
            <section>
              <CustomButton
                customStyles={"bg-success"}
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
    </section>
  );
};

export default RouteList;
