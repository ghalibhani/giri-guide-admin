import { useSelector } from "react-redux";

const TransactionDetails = () => {
  const transaction = useSelector(
    (state) => state.transaction.transactionDetails
  );

  if (!transaction) {
    return null;
  }

  return (
    <section>
      <h2>Transaction Details</h2>
      <p>ID: {transaction.id}</p>
      <p>Amount: {transaction.amount}</p>
      <p>Status: {transaction.status}</p>
      <p>Timestamp: {new Date(transaction.timestamp).toLocaleString()}</p>
    </section>
  );
};

export default TransactionDetails;
