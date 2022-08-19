const ValidatorError = require('../errors/ValidatorError')

/**
 * Validates and sanitizes user inputs.
 *
 * @param {{city: string, lat: number, lon: number}} options
 * @returns {{city: string, lat: number, lon: number}} validated and sanitized options
 * @throws if options are invalid
 */
function validator(options) {
  const { city, lat, lon } = options;

  if (!city && (!lat || !lon)) {
    throw new ValidatorError("Bad request");
  }
  if ((lat && lon)) {
    if ((isNaN(lat) || isNaN(lon)) || (lat < -90 || lat > 90) || (lon < -180 || lon > 180)) {
      throw new ValidatorError("Bad request");
    }
  }

  return { city: city ? encodeURIComponent(city) : undefined, lat: lat ? parseFloat(lat) : undefined, lon: lon ? parseFloat(lon) : undefined };
}

module.exports = validator;
