import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

// Reusing landing page css for grid
import "./LandingPage.css";
import "./CategoriesPage.css";
import { fetchServices } from "../../services/publicServices";

// const allCategories = [
//   {
//     id: 1,
//     name: "Home Cleaning",
//     image: "/images/HouseCleaning.jpg",
//     desc: "Deep cleaning, regular cleaning",
//     category: "home-cleaning",
//   },
//   {
//     id: 2,
//     name: "Electrician",
//     image: "/images/Electrician.jpg",
//     desc: "Wiring, repairs, installations",
//     category: "electrician",
//   },
//   {
//     id: 3,
//     name: "Plumbing",
//     image: "/images/Plumber.jpg",
//     desc: "Leaks, pipes, fixtures",
//     category: "plumbing",
//   },
//   {
//     id: 4,
//     name: "AC Repair",
//     image: "/images/AcRepair.jpg",
//     desc: "Servicing, gas refill",
//     category: "ac-repair",
//   },
//   {
//     id: 5,
//     name: "Carpentry",
//     image: "/images/Carpanter.jpg",
//     desc: "Furniture, repairs",
//     category: "carpentry",
//   },
//   {
//     id: 6,
//     name: "Painting",
//     image: "/images/Painter.jpg",
//     desc: "Interior, exterior",
//     category: "painting",
//   },
//   {
//     id: 7,
//     name: "Pest Control",
//     image: "/images/PestControl.jpg",
//     desc: "Insects, rodents",
//     category: "pest-control",
//   },
//   {
//     id: 8,
//     name: "Appliance Repair",
//     image: "/images/Appliance Repair.jpg",
//     desc: "Washing machines, TVs",
//     category: "appliance-repair",
//   },
// ];

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const observerRef = useRef();
  const cursorRef = useRef();
  const hasMoreRef = useRef(true);
  const fetchingRef = useRef(false);
  const getServices = useCallback(async () => {
    try {
      fetchingRef.current = true;
      if (!hasMoreRef.current) return;
      const data = await fetchServices(cursorRef.current);
      setServices((prev) => {
        const map = new Map();
        [...prev, ...data.services].forEach((s) => {
          map.set(s._id, s);
        });
        return Array.from(map.values());
      });
      hasMoreRef.current = data.hasMore;
      cursorRef.current = data.newCursor;
    } catch (err) {
      console.error(err.message);
    } finally {
      fetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    getServices();
  }, [getServices]);

  useEffect(() => {
    console.log(observerRef.current);
    const observer = new IntersectionObserver(
      (entires) => {
        if (entires[0].isIntersecting && !fetchingRef.current) {
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
  return (
    <div className="categories-page">
      <div
        className="container"
        style={{ paddingTop: "40px", paddingBottom: "80px" }}
      >
        <div className="categories-header">
          <h1 className="heading-1">All Services</h1>
          <p className="body-large body-muted">Find exactly what you need.</p>

          <div className="filters-bar">
            <Input
              placeholder="Search categories..."
              className="search-input-cat"
            />
            <Button variant="secondary">Popular</Button>
            <Button variant="secondary">Highest Rated</Button>
          </div>
        </div>

        <div className="categories-grid" style={{ marginTop: "40px" }}>
          {services.length > 0 &&
            services.map((service) => (
              <Card
                key={service._id}
                className="category-card detailed-cat-card"
                style={{ cursor: "default", display: "flex", flexDirection: "column" }}
              >
                <div className="category-image-wrapper">
                  <img
                    src={service.providerId?.portfolio?.[0]?.url}
                    alt={service.name}
                    className="category-cover-img detailed-cover-img"
                  />
                </div>
                <div className="category-content" style={{ display: "flex", flexDirection: "column", flex: 1, padding: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <h3 className="heading-5">{service.name}</h3>
                    <div style={{ fontWeight: "600", color: "var(--color-primary)", whiteSpace: "nowrap", fontSize: "18px" }}>
                      ₹{service.basePrice}{service.pricingType === "hourly" ? "/hr" : ""}
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: "12px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {service.category && (
                      <span style={{ fontSize: "12px", background: "var(--color-shade-20)", padding: "4px 8px", borderRadius: "16px", textTransform: "capitalize", color: "var(--color-shade-80)" }}>
                        {service.category.replace("-", " ")}
                      </span>
                    )}
                    {service.pricingType === "fixed" && service.estimatedDuration && (
                      <span style={{ fontSize: "12px", background: "var(--color-shade-20)", padding: "4px 8px", borderRadius: "16px", color: "var(--color-shade-80)" }}>
                        ~{service.estimatedDuration} hrs
                      </span>
                    )}
                  </div>
                  
                  <p
                    className="body-medium body-muted"
                    style={{ flex: 1, marginBottom: "16px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                  >
                    {service.description || service.desc || "No description available."}
                  </p>
                  
                  <Button 
                    variant="primary" 
                    style={{ width: "100%", marginTop: "auto" }}
                    onClick={() => {
                      const providerId = typeof service.providerId === 'object' ? service.providerId._id : service.providerId;
                      navigate(`/consumer/book?serviceId=${service._id}&providerId=${providerId}`);
                    }}
                  >
                    Book Now
                  </Button>
                </div>
              </Card>
            ))}
          <div ref={observerRef} style={{ height: "20px" }} />
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
