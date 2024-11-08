import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransaction } from "../../redux/feature/transactionSlice";

import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Select,
  SelectItem,
} from "@nextui-org/react";
import CustomButton from "../CustomButton";

const TransactionList = () => {
  const { transactions } = useSelector((state) => state.transaction);
  const [transactionStatus, setTransactionStatus] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchTransaction({ page: 1, size: 20, status: transactionStatus })
    );
  }, []);

  useEffect(() => {
    dispatch(
      fetchTransaction({ page: 1, size: 20, status: transactionStatus })
    );
  }, [transactionStatus]);

  const statusOptions = [
    { value: "", label: "All" },
    {
      value: "WAITING_APPROVE",
      label: "WAITING_APPROVE",
    },
    { value: "UPCOMING", label: "UPCOMING" },
    { value: "WAITING_PAY", label: "WAITING_PAY" },
    { value: "DONE", label: "DONE" },
    { value: "REJECTED", label: "REJECTED" },
  ];

  return (
    <section className="flex flex-col gap-5 px-6">
      <h1 className="text-xl font-bold">Daftar Transaksi</h1>
      <Select
        value={transactionStatus}
        onChange={(e) => setTransactionStatus(e.target.value)}
        variant="bordered"
        bordered
        label="Status">
        {statusOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
      {transactions.map((transaction) => (
        <Card key={transaction.id} className="mb-4">
          <CardHeader className="font-bold">
            {transaction.tourGuideName}
          </CardHeader>
          <Divider />
          <CardBody>
            <section className="flex justify-between gap-4 px-6">
              <p className="w-[100px]">{transaction.customerName}</p>
              <p
                className={
                  {
                    WAITING_APPROVE:
                      "bg-warning text-white font-bold px-6 py-2 rounded-lg",
                    DONE: "bg-successful text-white font-bold px-6 py-2 rounded-lg",
                    REJECTED:
                      "bg-error text-white font-bold px-6 py-2 rounded-lg",
                    WAITING_PAY:
                      "bg-purple-600 text-white font-bold px-6 py-2 rounded-lg",
                    UPCOMING:
                      "bg-blue-600 text-white font-bold px-6 py-2 rounded-lg",
                  }[transaction.transactionStatus]
                }>
                {transaction.transactionStatus}
              </p>
              <p>{transaction.mountainName}</p>
              <CustomButton
                onClick={() => {
                  dispatch(
                    fetchTransaction({
                      page: 1,
                      size: 20,
                      status: transactionStatus,
                      tourGuideId: transaction.tourGuideId,
                    })
                  );
                }}
                autoFocus
                className="text-neutral-50 bg-successful">
                Detail
              </CustomButton>
            </section>
          </CardBody>
        </Card>
      ))}
    </section>
  );
};

export default TransactionList;
