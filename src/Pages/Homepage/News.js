import React from "react";
import { Container, Row } from "react-bootstrap";
import NewsCard from "./NewsCard";

const News = () => {
  return (
    <Container className="py-5">
      <h2 className="mb-3">News</h2>
      <Row className="p-5">
        <NewsCard
          imgUri="https://cdn.mos.cms.futurecdn.net/yWKxdTPDvtuk835owRewdf.jpg.webp"
          title="Cyclingnews.com"
          content="Geraint Thomas reunited with stolen bike..."
        ></NewsCard>
        <NewsCard
          imgUri="https://cdn.mos.cms.futurecdn.net/XvK4zg4mpi9rGQsJpJtHXn.jpg.webp"
          title="Simone Giuliani"
          content="The 5 top sprinters in the women's..."
        ></NewsCard>
        <NewsCard
          imgUri="https://cdn.mos.cms.futurecdn.net/HAgvc6Fsj63HfSQRJyZqw4.jpg.webp"
          title="Daniel Ostanek"
          content="Fuglsang aims for Tour de France..."
        ></NewsCard>
        <NewsCard
          imgUri="https://cdn.mos.cms.futurecdn.net/wBpaTPtKSVaRaaafTfTRC7.jpg.webp"
          title="Stephen Farrand"
          content="Filippo Ganna tempted by 2022..."
        ></NewsCard>
        <NewsCard
          imgUri="https://cdn.mos.cms.futurecdn.net/pmV7CpuX437K7DguajjmbW.jpg.webp"
          title="Alasdair Fotheringham"
          content="Vaughters: The Tour de France..."
        ></NewsCard>
        <NewsCard
          imgUri="https://cdn.mos.cms.futurecdn.net/4cMuHLWWJzisTK6BTLgJT.jpg.webp"
          title="Lance Branquinho"
          content="Orbea launches 'All-terrain' Terra..."
        ></NewsCard>
      </Row>
    </Container>
  );
};

export default News;
