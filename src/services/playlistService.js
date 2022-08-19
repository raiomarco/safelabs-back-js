const axios = require("axios").default;
const ApiError = require("../errors/ApiError");

const spotifyApi = require("../modules/spotifyApi.js");
const validator = require("../scripts/validator.js");

/**
 * Get temperature from location (city or latitude and longitude).
 *
 * @param {{city: string, lat: number, lon: number}} options
 * @returns {Promise<number>} temperature
 * @throws if options are invalid or api is down
 */
function getTemperature(options) {
  const { city, lat, lon } = options;

  return axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&${city ? 'q=' + city : ''}&lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`).then((response) => {
    return response.data.main.temp;
  }).catch(err => {
    console.log(err.message);
    if (err.response.status === 400) {
      throw new ApiError('Bad request');
    } else if (err.response.status === 404) {
      throw new ApiError('City not found');
    } else {
      throw new ApiError('Something went wrong');
    }
  });
}

/**
 * Get song list by genre.
 *
 * @param {string} genre
 * @returns {string[]} songs list
 * @throws if genre not informed or api is down
 */
function getSongs(genre) {
  if (!genre) {
    throw new ApiError("Something went wrong");
  }

  return spotifyApi.get(`https://api.spotify.com/v1/search?q=genre:"${genre}"&type=track`).then((response) => {
    return response.data.tracks.items.map((track) => {
      return track.name;
    }).filter((x, i, arr) => i === arr.indexOf(x))
  }).catch(err => {
    console.log(err.message);
    throw new ApiError('Something went wrong');
  })
}

const playlistService = {
  /**
 * From location city or latitude and longitude)
 * checks temperature and returns a playlist of songs
 * based on the temperature.
 *
 * temperature > 30 => playlist of party songs
 * temperature >= 15 => playlist of pop songs
 * temperature >= 10 => playlist of rock songs
 * temperature < 10 => playlist of classic songs
 *
 * @param {{city: string, lat: number, lon: number}} options
 * @returns {Promise<{temperature: number, genre: string, songs: string[]}>} data
 * @throws if options are invalid or api is down
 */
  async getPlaylist(options) {
    const { city, lat, lon } = validator(options);

    const temperature = await getTemperature({ city, lat, lon })

    let genre = "classical";
    if (temperature > 30) {
      genre = "party";
    } else if (temperature >= 15) {
      genre = "pop";
    } else if (temperature >= 10) {
      genre = "rock";
    }

    const songs = await getSongs(genre);

    return { temperature: Math.round(temperature), genre, songs };
  }
}

module.exports = playlistService;
