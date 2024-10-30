import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { useNavigate } from "react-router";
import mountainImage from "../assets/tim-stief-YFFGkE3y4F8-unsplash.jpg";
import tourGuideImage from "../assets/chastagner-thierry-1zFlrpWTs3Y-unsplash.jpg";
import { logout } from "../redux/feature/authSlice";
import { useDispatch } from "react-redux";
import { Button } from "@nextui-org/button";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <section className="flex flex-col w-screen min-h-screen justify-center items-center">
      <section className="flex gap-4 flex-col bg-mainSoil px-16 py-8 rounded-2xl">
        <section className="flex justify-between">
          <h1 className="text-3xl font-bold text-neutral-50">
            Dashboard for admin
          </h1>
          <Button
            onClick={handleLogout}
            className="text-neutral-50  bg-successful hover:bg-successfulHover font-bold">
            Logout
          </Button>
        </section>
        <section className="flex gap-8 bg-mainSoil justify-center items-center">
          <Card
            isFooterBlurred
            radius="lg"
            className="border-none bg-transparent">
            <Image
              alt="Woman listing to music"
              className="object-cover"
              height={200}
              src={mountainImage}
              width={200}
            />
            <CardFooter className="flex justify-center cursor-pointer before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 h-10">
              <p
                className="text-white font-bold text-2xl text-center  hover:text-3xl duration-250"
                onClick={() => {
                  navigate("/mountain");
                }}>
                Mountain
              </p>
            </CardFooter>
          </Card>
          <Card
            isFooterBlurred
            radius="lg"
            className="border-none bg-transparent">
            <Image
              alt="Woman listing to music"
              className="object-cover"
              height={200}
              src={tourGuideImage}
              width={200}
            />
            <CardFooter className="flex justify-center cursor-pointer before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 h-10">
              <p
                className="text-white font-bold text-2xl text-center  hover:text-3xl duration-250"
                onClick={() => {
                  navigate("/tour-guide");
                }}>
                Tour Guide
              </p>
            </CardFooter>
          </Card>
        </section>
      </section>
    </section>
  );
};

export default Dashboard;
