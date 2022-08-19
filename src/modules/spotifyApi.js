const axios = require("axios").default;
const ApiError = require("../errors/ApiError");

const spotifyApi = axios.create();

let spotifyToken = null;

async function updateToken() {
  spotifyToken = await axios.post(`https://accounts.spotify.com/api/token`, "grant_type=client_credentials", { headers: { "Content-Type": "application/x-www-form-urlencoded" }, auth: { username: process.env.SPOTIFY_API_ID, password: process.env.SPOTIFY_API_SECRET } }).then((response) => {
    return response.data.access_token;
  }).catch(err => {
    console.log(err.message);
    throw new ApiError('Something went wrong');
  })
}

spotifyApi.interceptors.request.use(async (config) => {
  if (!spotifyToken) {
    await updateToken();
  }

  config.headers.Authorization = `Bearer ${spotifyToken}`;
  return config;
})

spotifyApi.interceptors.response.use(null, async err => {
  if (err.config && err.response && err.response.status === 401) {
    return updateToken().then(() => {
      err.config.headers.Authorization = "Bearer " + spotifyToken
      return axios.request(config);
    });
  }

  return Promise.reject(error);
})

module.exports = spotifyApi;
