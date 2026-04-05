import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Loading from "../Shared/Loading/Loading";
import BestSellCard from "./BestSellCard";

const BestSell = () => {
  const [bicycles, setBicycles] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/api/v2/explore")
      .then((res) => res.json())
      .then((data) => setBicycles(data.slice(0, 4)));

    return () => setBicycles([]);
  }, []);

  if (!bicycles) return <Loading></Loading>;

  return (
    <Container className="py-5">
      <h1 className="display-6">Best sell</h1>
      <Row xs={1} sm={1} md={2} lg={4} className="g-4 py-5">
        {bicycles?.map((bicycle) => (
          <BestSellCard key={bicycle._id} bicycle={bicycle}></BestSellCard>
        ))}
      </Row>
    </Container>
  );
};

export default BestSell;
