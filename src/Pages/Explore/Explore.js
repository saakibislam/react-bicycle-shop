import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert, Col, Container, Form, Pagination, Row } from "react-bootstrap";
import Footer from "../../components/Shared/Footer/Footer";
import SkeletonCard from "../../components/Shared/Loading/SkeletonCard";
import Navigation from "../../components/Shared/Navigation/Navigation";
import { useApi } from "../../hooks/api";
import usePagination from "../../hooks/usePagination";
import ProductCard from "./ProductCard";

const PAGE_SIZE = 6;

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "name-asc", label: "Name: A → Z" },
];

const Explore = () => {
  const { data: products, loading, error } = useApi("/products");

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const debounceTimer = useRef(null);

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchQuery(value);
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => setDebouncedQuery(value), 300);
  }, []);

  useEffect(() => {
    return () => clearTimeout(debounceTimer.current);
  }, []);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let result = [...products];

    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    if (!isNaN(min)) result = result.filter((p) => p.price >= min);
    if (!isNaN(max)) result = result.filter((p) => p.price <= max);

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "name-asc")
      result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [products, debouncedQuery, minPrice, maxPrice, sortBy]);

  const { page, setPage, totalPages, pageItems, start } = usePagination(
    filteredProducts,
    PAGE_SIZE
  );

  const renderGrid = () => {
    if (loading) {
      return (
        <Row xs={1} sm={1} md={2} lg={3} className="gy-3 pb-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Col key={i}>
              <SkeletonCard />
            </Col>
          ))}
        </Row>
      );
    }
    if (error) return <Alert variant="danger">{error.message}</Alert>;
    if (filteredProducts.length === 0) {
      return (
        <div className="text-center py-5">
          <p className="fs-5 text-muted">No bikes match your search.</p>
          <small className="text-muted">Try adjusting your filters.</small>
        </div>
      );
    }
    return (
      <>
        <p className="text-muted small mb-2">
          Showing {start + 1}–{Math.min(start + PAGE_SIZE, filteredProducts.length)} of{" "}
          {filteredProducts.length} bikes
        </p>
        <Row xs={1} sm={1} md={2} lg={3} className="gy-3 pb-4">
          {pageItems.map((product) => (
            <Col key={product._id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
        {totalPages > 1 && (
          <Pagination className="justify-content-center mt-3 pb-2">
            <Pagination.Prev
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
            />
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={page === i + 1}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
            />
          </Pagination>
        )}
      </>
    );
  };

  return (
    <div>
      <Navigation />
      <Container>
        <h1 className="my-3 display-6">Top bikes of the world</h1>

        <Row className="g-2 mb-3 align-items-end">
          <Col xs={12} md={5}>
            <Form.Control
              type="text"
              placeholder="Search by name or description..."
              value={searchQuery}
              onChange={handleSearchChange}
              disabled={loading}
            />
          </Col>
          <Col xs={6} md={2}>
            <Form.Control
              type="number"
              placeholder="Min $"
              min={0}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              disabled={loading}
            />
          </Col>
          <Col xs={6} md={2}>
            <Form.Control
              type="number"
              placeholder="Max $"
              min={0}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              disabled={loading}
            />
          </Col>
          <Col xs={12} md={3}>
            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              disabled={loading}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        {renderGrid()}
      </Container>
      <Footer />
    </div>
  );
};

export default Explore;
