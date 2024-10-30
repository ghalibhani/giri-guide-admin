import { Button } from "@nextui-org/react";

const CustomButton = ({ children, customStyles, ...props }) => {
  return (
    <Button
      className={`px-8 py-4 bg-successful hover:bg-successfulHover text-neutral-50 font-bold ${
        customStyles ? customStyles : "w-full"
      }`}
      {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;
