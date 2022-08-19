const router = require("express").Router();
const playlistService = require("../services/playlistService.js");

router.get("/", async (req, res) => {
  const { city, lat, lon } = req.query;

  const data = await playlistService.getPlaylist({ city, lat, lon })

  res.send(data);

  // Documentation Data

  // #swagger.tags = ['Playlist']
  /*
    #swagger.parameters['city'] = {
      in: "query",
      description: "City",
      type: "string"
    }
  */
  /*
    #swagger.parameters['lat'] = {
      in: "query",
      description: "Latitude",
      type: "number"
    }
  */
  /*
    #swagger.parameters['lon'] = {
      in: "query",
      description: "Longitude",
      type: "number"
    }
  */
  /*
    #swagger.responses[200] = {
      description: 'User successfully obtained.',
      schema: {
        temperature: 25,
        genre: "pop",
        songs: [
          "Running Up That Hill (A Deal With God) - 2018 Remaster",
          "Glimpse of Us",
          "As It Was",
          "Vegas (From the Original Motion Picture Soundtrack ELVIS)",
          "Late Night Talking",
          "I Ain't Worried",
          "Jimmy Cooks (feat. 21 Savage)",
          "About Damn Time",
          "Sweater Weather",
          "Left and Right (Feat. Jung Kook of BTS)",
          "Woman",
          "BREAK MY SOUL",
          "good 4 u",
          "Music For a Sushi Restaurant",
          "traitor",
          "Everybody Wants To Rule The World",
          "Wait a Minute!",
          "Blinding Lights",
          "Cash In Cash Out"
        ]
      }
    }
  */
  /*
    #swagger.responses[400] = {
    description: 'User successfully obtained.',
    schema: { status: "error", message: "Bad request" }
    }
  */
  /*
    #swagger.responses[500] = {
    description: 'User successfully obtained.',
    schema: { status: "error", message: "Internal Server Error" }
    }
  */
});

module.exports = router
