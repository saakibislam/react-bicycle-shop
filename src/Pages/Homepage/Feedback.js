import { Carousel, Container } from "react-bootstrap";
import Loading from "../Shared/Loading/Loading";
import { useApi } from "../api";

const Feedback = () => {
  const { data: reviews, loading, error } = useApi("/reviews");

  if (loading) return <Loading></Loading>;
  if (error) return <p>Error: {error.message}</p>;

  const slicedReviews = reviews?.length > 4 ? reviews.slice(0, 4) : reviews;

  return (
    <Container className="py-5">
      <h1 className="display-6">What the buyers have to say ...</h1>
      <Carousel variant="dark" fade className="p-5">
        {slicedReviews?.map((review) => (
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
