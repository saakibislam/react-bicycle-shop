import React from "react";
import { Col } from "react-bootstrap";

const NewsCard = ({ imgUri, title, content }) => {
  return (
    <Col sm={12} md={6} lg={6}>
      <div className="card mb-3" style={{ maxWidth: "540px" }}>
        <div className="row g-0">
          <div className="col-md-6">
            <img src={imgUri} className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-6">
            <div>
              <h6 className="card-title">{title}</h6>
              <p className="card-text">
                <small>{content}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default NewsCard;
