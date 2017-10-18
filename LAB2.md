First Express Half Stack App with ExpressJS
======

## Directions

Convert your vanilla NodeJS http server from previous lab into an ExpressJS app:
  * Create a router with `router.<method>` handlers and implement your route logic (NOTE: `GET` should be split
  into two route handlers: get all and get by id.
  * Use `:id` to handle params
  * Export that router and require into app.js and mount using app.use
  * Use `body-parser` for request body
  * Use `res.send` or `res.json` for `application/json` responses (remove vanilla content type setting)
  
## Bonus Requirements

* Add the ability to submit a `query` as part of `GET` all. Choose 2 properties that you allow to be queried, 
e.g. `?type=cat`. Query can be 1, both, or none of those properties

## Testing

* Use your existing tests to guide you in your transition
* Add tests for new requirements

## Rubric

* Express style Server, App, Project Organization Conversion: *4pt*
* Query feature and tests *3pts*
* Child route feature and tests *3pts*