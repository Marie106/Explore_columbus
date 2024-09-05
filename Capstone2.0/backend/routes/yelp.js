// const express = require('express');
// const fetch = require('node-fetch');
// const app = express();
// const port = 5000;

// const SERPAPI_KEY = 'cf4860946ff15f99f1ac3daa3143b1787f728170e033022f37f0433ced4aa08fY';

// app.get('/yelp-reviews/:placeId', async (req, res) => {
//     const { placeId } = req.params;
//     console.log("placeIddd", placeId)
//     try {
//         const response = await fetch(`https://serpapi.com/search.json?engine=yelp_reviews&place_id=${placeId}`, {
//             headers: {
//                 Authorization: `Bearer ${SERPAPI_KEY}`
//             }
//         });
//         console.log("responseee", response)

//         if (!response.ok) {
//             throw new Error(`Error: ${response.statusText}`);
//         }

//         const data = await response.json();
//         res.json(data);
//     } catch (error) {
//         console.error('Error fetching Yelp reviews:', error);
//         res.status(500).json({ error: 'Error fetching Yelp reviews' });
//     }
// });

