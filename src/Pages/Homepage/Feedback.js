import { useEffect, useState } from "react";
import { Carousel, Container } from "react-bootstrap";
import Loading from "../Shared/Loading/Loading";

const Feedback = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/v2/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 4) {
          setReviews(data.slice(0, 4));
        } else {
          setReviews(data);
        }
      })
      .catch((error) => console.log(error));
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
                src={review.image}
                alt="User Avatar Cannot Load"
              />
              <h5>{review.name}</h5>
              <p className="w-75 mx-auto">{review.comment}</p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default Feedback;
