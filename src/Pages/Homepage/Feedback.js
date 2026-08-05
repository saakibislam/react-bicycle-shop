import { Alert, Carousel, Container } from "react-bootstrap";
import StarRating from "../../components/Shared/StarRating/StarRating";
import Loading from "../../components/Shared/Loading/Loading";
import { useApi } from "../../hooks/api";

const Feedback = () => {
  const { data: reviews, loading, error } = useApi("/reviews");

  if (loading) return <Loading />;
  if (error) return <Alert variant="danger">{error.message}</Alert>;

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
                className="mb-3 rounded-circle"
                src={review.image}
                alt="User Avatar Cannot Load"
              />
              <h5>{review.name}</h5>
              {review.rating > 0 && (
                <div className="mb-2">
                  <StarRating value={review.rating} readOnly size="1.2rem" />
                </div>
              )}
              <p className="w-75 mx-auto">{review.comment}</p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default Feedback;
