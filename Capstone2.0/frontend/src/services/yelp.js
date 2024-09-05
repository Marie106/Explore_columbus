// api/yelp.js
const YELP_API_KEY = 'AViArluk34Siaa7c_oKBAWBSaHa9vR3u5UOqj-OO7swwjdL4FmZ3OSQtButJnhrIuikqsCNeOCNZIkPortCr-EgmTYaFh-y9Xd-NuAZ9yoQLHBwtF9VlOP1gRRvYZnYx'; 
const API_URL = 'https://api.yelp.com/v3/businesses/search';

export const fetchYelpData = async (location, limit = 5) => {
    try {
        const response = await fetch(`${API_URL}?&location=${location}limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${YELP_API_KEY}`
            }
        });
        const data = await response.json();
        return data.businesses;
    } catch (error) {
        console.error('Error fetching Yelp data:', error);
        return [];
    }
};

export const fetchYelpReviews = async (businessId) => {
    try {
        const response = await fetch(`https://api.yelp.com/v3/businesses/${businessId}/reviews`, {
            headers: {
                Authorization: `Bearer ${YELP_API_KEY}`
            }
        });
        const data = await response.json();
        return { id: businessId, reviews: data.reviews || [] };
    } catch (error) {
        console.error(`Error fetching reviews for business ID ${businessId}:`, error);
        return { id: businessId, reviews: [] };
    }
};

