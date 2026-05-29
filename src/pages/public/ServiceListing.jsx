import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import "./ServiceListing.css";
import { fetchServices } from "../../services/publicServices";

const formatCategoryHeading = (cat) => {
  if (!cat) return "Services";
  return (
    cat
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") + " Services"
  );
};

const ServiceListing = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // const { categoryId } = useParams();
  const cursorRef = useRef();
  const [loading, setLoading] = useState(false);
  const hasMoreRef = useRef(true);
  const fetchingRef = useRef(false);
  const intialFetchRef = useRef(true);
  const observerRef = useRef();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const getServices = useCallback(async () => {
    if (!hasMoreRef.current) return;
    try {
      fetchingRef.current = true;
      setLoading(true);
      const data = await fetchServices(cursorRef.current, category);

      setServices((prev) => {
        const map = new Map();
        [...prev, ...data.services].forEach((p) => {
          map.set(p._id, p);
        });
        return Array.from(map.values());
      });
      cursorRef.current = data.newCursor;
      hasMoreRef.current = data.hasMore;
    } catch (err) {
      console.log(err);
    } finally {
      fetchingRef.current = false;
      intialFetchRef.current = false;
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !fetchingRef.current &&
          !intialFetchRef.current
        ) {
          getServices();
        }
      },
      {
        threshold: 1,
      },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [getServices]);

  useEffect(() => {
    getServices();
  }, [getServices]);

  return (
    <div className="service-listing-page">
      <div className="container listing-layout">
        {/* Filters Sidebar */}
        <aside className={`filters-sidebar ${isFilterOpen ? "open" : ""}`}>
          <Card elevation="subtle" className="filters-card">
            <h3 className="heading-5" style={{ marginBottom: "16px" }}>
              Filters
            </h3>

            <div className="filter-group">
              <h4 className="heading-6 body-muted">Experience</h4>
              <label>
                <input type="checkbox" /> 1-3 Years
              </label>
              <label>
                <input type="checkbox" /> 3-5 Years
              </label>
              <label>
                <input type="checkbox" /> 5+ Years
              </label>
            </div>

            <div className="filter-group">
              <h4 className="heading-6 body-muted">Rating</h4>
              <label>
                <input type="checkbox" /> 4.5 & Above
              </label>
              <label>
                <input type="checkbox" /> 4.0 & Above
              </label>
            </div>

            <div className="filter-group">
              <h4 className="heading-6 body-muted">Sort By</h4>
              <select className="filter-select focus-ring">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Rating: High to Low</option>
              </select>
            </div>

            <Button
              variant="secondary"
              style={{ width: "100%", marginTop: "24px" }}
              onClick={() => setIsFilterOpen(false)}
            >
              Apply Filters
            </Button>
          </Card>
        </aside>

        {/* Listings */}
        <main className="listings-main">
          <div className="sort-filter-container">
            <h1 className="heading-2" style={{ marginBottom: "8px" }}>
              {formatCategoryHeading(category)}
            </h1>
            <Button
              variant="outline"
              className="mobile-filter-toggle"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              {isFilterOpen
                ? "Hide Filters & Sorting"
                : "Show Filters & Sorting"}
            </Button>
          </div>

          <div className="services-list" style={{ marginTop: "16px" }}>
            {loading && <div>Loading...</div>}
            {services.map((service) => (
              <Card
                key={service._id}
                className="listing-card"
                onClick={() => {
                  const providerIdStr =
                    typeof service.providerId === "object"
                      ? service.providerId._id
                      : service.providerId;
                  navigate(
                    `/consumer/book?serviceId=${service._id}&providerId=${providerIdStr}`,
                  );
                }}
              >
                <div className="listing-card-left">
                  <div className="listing-avatar">
                    {service.image ? (
                      <img
                        src={service.image}
                        alt={service.name}
                        className="listing-avatar"
                        style={{ objectFit: "cover" }}
                      />
                    ) : service.providerId?.profileImage?.url ? (
                      <img
                        src={service.providerId.profileImage.url}
                        alt="profile-image"
                        className="listing-avatar"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      service.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="listing-info">
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "center",
                      }}
                    >
                      <h3 className="heading-4">{service.name}</h3>
                    </div>
                    <p className="body-muted" style={{ marginTop: "4px" }}>
                      {service.pricingType === "hourly"
                        ? `₹${service.basePrice}/hr`
                        : `₹${service.basePrice} (Fixed, ~${service.estimatedDuration} hrs)`}
                    </p>
                    {service.description && (
                      <p
                        className="body-muted"
                        style={{
                          marginTop: "8px",
                          fontSize: "14px",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {service.description}
                      </p>
                    )}
                    <div
                      className="listing-rating"
                      style={{ marginTop: "8px" }}
                    >
                      <span style={{ color: "var(--color-neon-green)" }}>
                        ★{" "}
                        {service.rating || service.providerId?.rating || "New"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="listing-card-right">
                  <Button
                    variant="primary"
                    // onClick={() => {
                    //   const providerIdStr =
                    //     typeof service.providerId === "object"
                    //       ? service.providerId._id
                    //       : service.providerId;
                    //   navigate(
                    //     `/consumer/book?serviceId=${service._id}&providerId=${providerIdStr}`,
                    //   );
                    // }}
                  >
                    Book Now
                  </Button>
                </div>
              </Card>
            ))}
            <div ref={observerRef} style={{ height: "20px" }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ServiceListing;
