My First Half Stack App
======

## Directions

* Combine a vanilla NodeJS http server with the mongodb drivers to create your first REST API
* Pick a "resource" - the entity (or collection in mongo speak) you're saving and getting, like `unicorns`
* Use the strategy pattern (an object dictionary that has router functions as values) to choose the "router" to use.
* Use the strategy pattern _within_ the router implementation to choose the "method" router to use.
* Implement:
    * `GET /<resource>` - returns array of all of the resources
    * `POST /<resource>` - inserts the supplied request body as a document into the resource collection
    * `GET /<resource>/:id` -
      * returns the single object specified by the id
      * returns 404 not found if no resource found with that id    
    * `DELETE /<resource>/:id` - removes the resource with that id. not an error if doesn't exist. 
    (OPTIONAL: return `{ removed: true }` or `{ removed: false }`)
    * `PUT /<resource>/:id` - updates the resource with supplied request body
* Use plural name in your url path (`/unicorns`, **not** `/unicorn`)

### Architecture and Design

* Use modules and project organization (files). There is now enough complexity that large, overly complicated modules 
will significantly impact your ability to focus on the task at hand. Use the structure we used
in class.

* You are free to refer to example code from in-class. But you **must**:
  * Implement things in based on the logical order of your project, incrementally growing your "known good system". 
  Do not fall into "transcribing", meaning copying code without regard to what it actual does or how it might help) 
  and then trying to make it all work. We will not help you clean up messes that you create in this manner. 
  Best bet is delete code and start over.
  * *re-type* any code, **never** cut and paste. Reason is so you have a kinnesthetic/total physical response (TPR) 
  learning experience.

## Testing

* Basic E2E with setup to manage db

## Bonus Ideas

* Implement handling the query part of the url in `GET` all as a mongo find query
* Add another resource type
  * SUPER BONUS: Generisize your first route handler into a general purpose
  handler by wrapping in a higher order function that takes a collection name

## Rubric

* Server, App, Project Organization: *2pt*
* Data
  * `GET` all: *2pt*
  * `POST`: *2pt*
  * `GET` by id: *2pt*
  * `PUT` by id: *2pt*
  * `DELETE` by id: *2pt*
* Tests
  * setup (with db drop) *3pts*
  * Each method *1pt* x 5 = *5pts*
