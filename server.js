const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.get('/detect', (req, res) => {
    res.send('Hello World!')
})

app.get('/process-image', async (req, res) => {
    try {
      const { uri } = req.body; // Assume that the URI is passed in the request body
      const options = {
        method: 'POST',
        url: 'https://api.edenai.run/v2/image/object_detection',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzQxMTY5YTQtNjZkNC00YzI0LThkNTUtMzY1OTg5YjliY2YxIiwidHlwZSI6ImFwaV90b2tlbiJ9.TDvT6bvbDQURRaaAhZy2fQctG6cN1tTEanR9e6sm0w8',
        },
        data: {
          providers: 'amazon, google',
          file_url: uri,
        },
      };
      const response = await axios.request(options);
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

// // Endpoint to process image using the API
// app.post('/process-image', async (req, res) => {
//   try {
//     const { uri } = req.body;

//     // Make a POST request to the API endpoint with the image data
//     const response = await axios.post('https://localhost:3000/process-image', {
//       image: uri,
//       // add other required parameters as needed
//     });

//     // Send the API response back to the client as a JSON object
//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'An error occurred' });
//   }
// });

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});