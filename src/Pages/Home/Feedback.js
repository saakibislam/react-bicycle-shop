import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel, Container } from "react-bootstrap";
import Loading from "../Shared/Loading/Loading";

const Feedback = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios
      .get("https://bike-mania.onrender.com/reviews")
      .then((res) => setReviews(res.data));
    return () => setReviews([]);
  }, []);

  if (!reviews) return <Loading></Loading>;

  return (
    <Container className="py-5">
      <h1 className="display-6">What the buyers have to say ...</h1>
      <Carousel variant="dark" fade className="p-5">
        {reviews?.map((review) => (
          <Carousel.Item key={review._id}>
            <div style={{ height: "300px" }}>
              <img
                style={{ width: "100px" }}
                className="mb-5 rounded-circle"
                src={review.img}
                alt="User Avatar Cannot Load"
              />
              <h5>{review.name}</h5>
              <p className="w-75 mx-auto">{review.description}</p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default Feedback;
