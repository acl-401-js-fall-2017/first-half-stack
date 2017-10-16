# Protein Database
- a RESTful API for proteins and their weights

## Requests

### GET
- get requests to `host:port/proteins` will return an array of all objects in the database
- get requests including a valid id (12 bytes in hex) will return an array holding the requested object
```
    // example url
    localhost:8080/proteins/:"59e4e8825b8fa5110892e7ec"

// returns:  
//           [ {
//              "_id" : "59e4e8825b8fa5110892e7ec",
//              "name" : "kinesin",
//              "molecular_weight" : "380000 Da"
//           } ]
```
- invalid get requests (invalid or nonexistant id) will return a 404

### POST
- post requests to `host:port/proteins` will insert the body of the post request as a new document into the collection.
- response will contain the item posted updated with its database id
```
// example with superagent
    const newItem = {
        "name" : "kinesin",
        "molecular_weight" : "380000 Da"
    }

    request.post('/proteins')
        .set('Accept', 'application/json')
        .send(JSON.stringify(newItem))
        .then(response => console.log(JSON.parse(response.text)));

//  logs
//           {
//              "_id" : "59e4e8825b8fa5110892e7ec",
//              "name" : "kinesin",
//              "molecular_weight" : "380000 Da"
//           ]  
```

### DELETE
- delete requests must include an id, and will remove that object
```
// example with superagent
    request.del('/proteins/:59e4e8825b8fa5110892e7ec');
```

### PUT
- put requests must include an id and an object holding all fields for update. 
```
    request.put('./proteins/:59e4e8825b8fa5110892e7ec')
        .set('Accept', 'application/json')
        .send({'name': 'updatedName'});
```










