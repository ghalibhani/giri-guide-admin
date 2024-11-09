import { useSelector } from "react-redux";
import { Card, CardBody, Image, Divider, Spacer } from "@nextui-org/react";

const TransactionDetails = () => {
  const transaction = useSelector(
    (state) => state.transaction.transactionDetails
  );

  if (!transaction) {
    return null;
  }

  return (
    <Card css={{ maxWidth: "400px", padding: "20px" }}>
      <CardBody css={{ padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Image
            src={transaction.tourGuideImage}
            alt={transaction.tourGuideName}
            width={80}
            height={80}
            css={{ borderRadius: "50%" }}
          />
          <div>
            <h3 style={{ margin: 0 }}>{transaction.tourGuideName}</h3>
            <p style={{ color: "#6B7280" }}>
              Status: {transaction.transactionStatus}
            </p>
          </div>
        </div>

        <Spacer y={1} />
        <Divider />
        <Spacer y={1} />

        <section>
          <p style={{ color: "#6B7280", marginBottom: "0.25rem" }}>Mountain</p>
          <h4 style={{ margin: 0 }}>{transaction.mountainName}</h4>
        </section>

        <Spacer y={0.5} />
        <Divider />
        <Spacer y={0.5} />

        <section>
          <p style={{ color: "#6B7280", marginBottom: "0.25rem" }}>
            Hiking Point
          </p>
          <h4 style={{ margin: 0 }}>{transaction.hikingPointName}</h4>
        </section>

        <Spacer y={0.5} />
        <Divider />
        <Spacer y={0.5} />

        <section>
          <p style={{ color: "#6B7280", marginBottom: "0.25rem" }}>
            Start Date
          </p>
          <p>{new Date(transaction.startDate).toLocaleString()}</p>
        </section>

        <Spacer y={0.5} />
        <Divider />
        <Spacer y={0.5} />

        <section>
          <p style={{ color: "#6B7280", marginBottom: "0.25rem" }}>End Date</p>
          <p>{new Date(transaction.endDate).toLocaleString()}</p>
        </section>

        <Spacer y={0.5} />
        <Divider />
        <Spacer y={0.5} />

        <section>
          <p style={{ color: "#6B7280", marginBottom: "0.25rem" }}>Days</p>
          <p>{transaction.days}</p>
        </section>

        <Spacer y={0.5} />
        <Divider />
        <Spacer y={0.5} />

        <section>
          <p style={{ color: "#6B7280", marginBottom: "0.25rem" }}>Customer</p>
          <p>{transaction.customerName}</p>
        </section>

        <Spacer y={0.5} />
        <Divider />
        <Spacer y={0.5} />

        <section>
          <p style={{ color: "#6B7280", marginBottom: "0.25rem" }}>Porter</p>
          <p>{transaction.porter}</p>
        </section>

        <Spacer y={0.5} />
        <Divider />
        <Spacer y={0.5} />

        <section>
          <p style={{ color: "#6B7280", marginBottom: "0.25rem" }}>
            Total Price
          </p>
          <p style={{ fontWeight: "bold", color: "#0070f3" }}>
            {transaction.totalPrice}
          </p>
        </section>

        <Spacer y={0.5} />
        <Divider />
        <Spacer y={0.5} />

        <section>
          <p style={{ color: "#6B7280", marginBottom: "0.25rem" }}>
            Customer Note
          </p>
          <p>{transaction.customerNote || "No notes"}</p>
        </section>
      </CardBody>
    </Card>
  );
};

export default TransactionDetails;
