# SafeLabs-back-js

## How to run

First of all, we need to set the environment variables.

You can either create a `.env` file based on the `.env.example` file or you can set the environment variables directly in your terminal (great for CI/CD).

Then you can execute the following command to run the application:

```bash
docker-compose -f .\docker-compose.yml up -d -V --remove-orphans --build
```

And now you can visit the application on the setted port.

---

## Report

This project uses a structure based on `services` that controls the flow of the application.

The `index.js` sets the environment and runs the application, also handling caught exceptions.

Then the `apis` handles the endpoints, receiving the data from client and repassing it to the `service`.

Theres a big string of documentation on the route, but it's really useful for the `swagger` to auto generate a documentation.

The swagger documentation is created by the `swagger.js` file, which is the file executed when the application is started, and the documentation is served through the `index.js`.

I also documented everything i thought could be be useful with `jsdoc` strings, whose permit to see typings on IDE and smooths the development experience.

The spotify api was a bit harder because of the way it deals with tokens, so i created a `spotifyApi`, which is a http client that can handle set the token on pre-request, and refresh it whenever it expires.

I also created a validator, to have a better control of the data, and to have a better error handling.

Speaking of erros, i created custom erros, so it's easier to understand what, why, and where it went wrong.

On `index.js` i set the CORS to allow all origins, so the application can be used on any origin, and it can be changed later based on the application scope (because i didn't know if it's supposed to be open to anyone or closed for the corporation).

Some functions were created inside the `Service`, but it's purpose is to create a standard way to get the data, in case an external API needs to be changed, ensuring an easier change.

This project uses a `.env` for secret variables, making it more secure and easier to deploy to different environments (an staging environment and a production environment for example).

If both the city and coordinates are provided, the city has the priority, just because the weather API works the same way, i tested.
