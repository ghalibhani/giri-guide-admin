import { useSelector } from "react-redux";
import HamsterLoading from "../../components/HamsterLoading";
import TransactionList from "../../components/transaction/TransactionList";

const Transaction = () => {
  const loading = useSelector((state) => state.transaction.loading);
  const { transactions } = useSelector((state) => state.transaction);
  return (
    <section className="flex flex-col gap-5">
      {loading && <HamsterLoading />}
      <TransactionList transactions={transactions} />
    </section>
  );
};

export default Transaction;
