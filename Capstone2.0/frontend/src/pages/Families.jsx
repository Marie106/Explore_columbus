// src/pages/Families.jsx

import React, { useState, useEffect } from "react";
import ActivityCard from "../components/ActivityCard";
import Map from "../components/Map";
import "../styles/families.css";
import { fetchYelpData, fetchYelpReviews } from "../services/yelp";

const Families = () => {
  const [activities, setActivities] = useState([]);
  const [mapLocations, setMapLocations] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const token = localStorage.getItem("authToken"); 
  
  const handleDeleteActivity = (id) => {
    setActivities(activities.filter((activity) => activity.id !== id));
  };

  const fetchFilteredActivities = async () => {
    try {
      const queryParams = new URLSearchParams({
        location,
        price,
        type: "family",
      }).toString();

      const response = await fetch(
        `http://localhost:2000/api/activity?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch filtered activities");
      }

      const result = await response.json();
      setActivities(result);
      setFilteredActivities(result);
      setMapLocations(result);

      // Extract unique activity names for location filter
      const uniqueNames = [
        ...new Set(activities.map((activity) => activity.name)),
      ];
      setLocationOptions(uniqueNames);
      console.log("uniqueNames", uniqueNames)
    } catch (error) {
      console.error("Error fetching filtered activities:", error);
    }
  };

  useEffect(() => {
    // Fetch family-friendly activities from the Yelp API
    const fetchActivities = async () => {
      try {
        // Step 1: Fetch activities
        const fetchedActivities = await fetchYelpData(
          "libraries, parks, indoor play areas, kid-friendly restaurants",
          "Columbus, OH"
        );
        // Step 2: Format data for map display
        const formattedLocations = fetchedActivities.map((activity) => ({
          activityId: activity.id,
          name: activity.name,
          description: activity.alias,
          price: activity.price || "",
          type: "family",
          latitude: activity.coordinates.latitude,
          longitude: activity.coordinates.longitude,
          rating: activity.rating || "",
          reviews: [], // Initialize reviews as an empty array
        }));
        // Step 3: Fetch reviews for each activity
        const activitiesWithReviews = await Promise.all(
          formattedLocations.map(async (location) => {
            const { id } = location;
            const { reviews } = await fetchYelpReviews(id);
            return {
              ...location,
              reviews, // Append reviews to each location
            };
          })
        );
        // Step 4: Set map locations and send to API
        setMapLocations(activitiesWithReviews);
        // Call bulk create API with updated activities including reviews
        const response = await fetch(
          "http://localhost:2000/api/activity",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(activitiesWithReviews),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to create activities");
        }
        // Fetch activities with filters
        fetchFilteredActivities();
      } catch (error) {
        console.error("Error fetching or creating activities:", error);
      }
    };
    fetchActivities();
  }, [location, price]);

  useEffect(() => {
    fetchFilteredActivities();
  }, [location, price]);

  useEffect(() => {
    // Filter activities based on search criteria
    setFilteredActivities(
      activities.filter(
        (activity) =>
          (activity.name.toLowerCase().includes(search.toLowerCase()) ||
            search === "") &&
          (activity.price <= price || price === "")
      )
    );
  }, [search, location, price, activities]);

  return (
    <div className="families-page">
      <h1>Family-Friendly Activities</h1>

      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search activities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="filter-options">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            {locationOptions.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
          <input
            type="range"
            min="0"
            max="100"
            step="10"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <span>Max Price: ${price}</span>
        </div>
      </div>

      <div className="activities-list">
        {filteredActivities.map((activity) => (
          <ActivityCard
            key={activity._id}
            activity={activity}
            onDelete={handleDeleteActivity}
            fetchFilteredActivities={fetchFilteredActivities}
          />
        ))}
      </div>

      <div className="activity-map">
        <Map activities={mapLocations} />
      </div>
    </div>
  );
};

export default Families;
