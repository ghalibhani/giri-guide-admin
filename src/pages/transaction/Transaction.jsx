import { useSelector } from "react-redux";
import HamsterLoading from "../../components/HamsterLoading";
import TransactionList from "../../components/transaction/TransactionList";

import { Pagination } from "@nextui-org/react";

const Transaction = () => {
  const loading = useSelector((state) => state.transaction.loading);
  const { transactions, totalPage } = useSelector((state) => state.transaction);
  return (
    <section className="flex flex-col gap-5 px-6">
      {loading && <HamsterLoading />}
      <TransactionList transactions={transactions} />
      <Pagination
        total={totalPage}
        initialPage={1}
        onChange={(page) => console.log(page)}
      />
    </section>
  );
};

export default Transaction;
