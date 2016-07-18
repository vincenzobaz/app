
db = db.getSiblingDB('reminisceme');

db.getCollection('geolocations').drop();
db.getCollection('geonames').aggregate( 
[
{ 
  $match: {
    feature_class: "P"
  }
},
{
  $project: { 
      _id: 1,
      geonameid: 1,
      name: 1,
      loc: {
          type: {$literal: "Point" },
          coordinates: [ "$longitude", "$latitude" ] 
      },
      asciiname: 1,
      alternatenames: 1,
      feature_class: 1,
      feature_code: 1,
      country_code: 1,
      cc2: 1,
      admin1_code: 1,
      admin2_code: 1,
      admin3_code: 1,
      admin4_code: 1,
      population: 1,
      elevation: 1,
      dem: 1,
      timezone: 1,
      modification_date: 1
  }
  },
  { $out: "geolocations"}
  ] 
);

db.geolocations.ensureIndex({loc: "2dsphere"});

db.getCollection('geolocations').remove({
$or: [
{ alternatenames: { $not: { $type : 2 } } },
{ name: { $not: { $type: 2} } }
]});


db.getCollection('geolocations').find({}).snapshot().forEach(function(el) {
    if (el.alternatenames.length == 0) {
        var can = [el.name.toLowerCase()];
    } else {
        var can = el.alternatenames.toLowerCase().split(',');
    }
    el.canonical = can;
    db.geolocations.save(el);
});

db.geolocations.createIndex({"canonical": 1, "population": -1})
db.geolocations.createIndex({"loc" : "2dsphere" })
db.getCollection('geolocations').createIndex({"feature_class": 1})
db.admin1Codes.createIndex({"area_code": 1})

