import "./SkeletonCard.css";

const block = (height, width = "100%", mb = 10) => ({
  height,
  width,
  marginBottom: mb,
});

const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-block" style={block(180, "100%", 14)} />
    <div className="skeleton-block" style={block(20, "65%", 8)} />
    <div className="skeleton-block" style={block(14, "100%", 6)} />
    <div className="skeleton-block" style={block(14, "80%", 14)} />
    <div className="skeleton-block" style={block(16, "35%", 12)} />
    <div className="skeleton-block" style={block(38)} />
  </div>
);

export default SkeletonCard;
