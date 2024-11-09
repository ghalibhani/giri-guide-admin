import { useSelector } from "react-redux";

import { Card, CardBody, Image } from "@nextui-org/react";

const TransactionDetails = () => {
  const transaction = useSelector(
    (state) => state.transaction.transactionDetails
  );

  if (!transaction) {
    return null;
  }

  return (
    <Card>
      <CardBody>
        <h2>Transaction Details</h2>
        <Image
          src={transaction.tourGuideImage}
          alt={transaction.tourGuideName}
          width={50}
          height={50}
        />
        <p>ID: {transaction.id}</p>
        <p>Status: {transaction.transactionStatus}</p>
        <p>Mountain: {transaction.mountainName}</p>
        <p>Hiking Point: {transaction.hikingPointName}</p>
        <p>Start Date: {new Date(transaction.startDate).toLocaleString()}</p>
        <p>End Date: {new Date(transaction.endDate).toLocaleString()}</p>
        <p>Days: {transaction.days}</p>
        <p>Customer: {transaction.customerName}</p>
        <p>Tour Guide: {transaction.tourGuideName}</p>
        <p>Porter: {transaction.porter}</p>
        <p>Total Price: {transaction.totalPrice}</p>
        <p>Customer Note: {transaction.customerNote}</p>
      </CardBody>
    </Card>
  );
};

export default TransactionDetails;
