module.exports= {};


let db = null
return mongodb.connect(mongoUrl)
  .then ( _db =>  {
    return _db.collection('mountains')
        .find().toArray();
  );