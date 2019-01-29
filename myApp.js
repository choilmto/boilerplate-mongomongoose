/**********************************************
* 3. FCC Mongo & Mongoose Challenges
* ==================================
***********************************************/

var mongoose = require("mongoose");
mongoose.connect("mongodb://fcc:cleanscratchywindows@univox.petsovits.com:27017/fccex");

var personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

var Person = mongoose.model('Person', personSchema);

var createAndSavePerson = function(done) {
  var temp = new Person({name: "Cindy", age: 33, favoriteFoods:["apple", "ham"]});
  temp.save(function(err, data){
    if (err) return done(err);
    done(null, data);
  });
};

createAndSavePerson((err, data) => {
  if (err) return console.log(err);
  //console.log("ex3: done");
})

var createManyPeople = function(arrayOfPeople, done) {
    Person.create(arrayOfPeople, (err, data) => {
      if (err) return done (err);
      done(null, data);
    });
};

createManyPeople([
  {name: "Cindy", age: 33, favoriteFoods:["apple", "ham"]},
  {name: "Mindy", age: 33, favoriteFoods:["apple", "ham"]},
  {name: "Lindy", age: 33, favoriteFoods:["apple", "ham"]}
], (err, data) => {
  if (err) return console.log(err);
  //console.log("ex4: ok");
});

var findPeopleByName = function(personName, done) {
 Person.find({name: personName}, (err, data) => {
   if (err) return done(err);
   done(null, data);
 }); 
};

findPeopleByName("Cindy", (err, data) => {
  if (err) return console.log(err);
  //console.log("ex5:", data);
});

var findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

findOneByFood("apple", (err, data) => {
  if (err) return console.log(err);
  //console.log("ex6:", data);
});

var findPersonById = function(personId, done) {
  Person.findById(personId, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

findPersonById("5c4f3453009f5c475584fdb0", (err, data) => {
  if (err) return console.log(err);
  //console.log("ex7:", data);
});

var findEditThenSave = function(personId, done) {
  var foodToAdd = 'hamburger';
  Person.findById(personId, (err, data) => {
    if (err) return done(err);
    data.favoriteFoods.push(foodToAdd);
    data.save((err, data) => {
      if (err) return done(err);
      //data.favoriteFoods.push(foodToAdd);
      done(null, data);
    });
  });
};

var idid = " 5c4f6dea72191339e8236e70";

/*Person.find({name: "Cindy"}, (err, data) => {
  idid = data._id;
});*/

findEditThenSave(idid, (err, data) => {
  if (err) return console.log(err);
  //console.log("ex8(find):", data);
});

var findAndUpdate = function(personName, done) {
  var ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, data) => {
    if(err) return done(err);
    done(null, data);
  });
};

findAndUpdate("Cindy", (err, data) => {
  if(err) return console.log(err);
  //console.log("ex9:", data);
});

var createAndSavePerson = function(done) {
  var temp = new Person({name: "Sydney", age: 33, favoriteFoods:["apple", "ham"]});
  temp.save(function(err, data){
    if (err) return done(err);
    done(null, data);
  });
};

createAndSavePerson((err, data) => {
  if (err) return console.log(err);
  //console.log("ex3: done");
})

var removeById = function(personId, done) {
  Person.findByIdAndRemove(personId, (err, data) => {
    if(err) return done(err);
    done(null, data);
  });
}

removeById(idid,(err, data) => {
  if(err) return console.log(err);
  //console.log("ex10:", data);
});

var removeManyPeople = function(done) {
  var nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data) => {
    if(err) return done(err);
    done(null, data);
  });
};

removeManyPeople((err, data) => {
  if(err) return console.log(err);
  //console.log("ex11:", data);
});

var queryChain = function(done) {
  var foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name: "asc"}).limit(2).select("-age").exec((err, data) => {
    if(err) return done(err);
    done(null, data);
  });
};

queryChain((err, data) => {
  if(err) return console.log(err);
  console.log("ex12:", data);
});

/** **Well Done !!*
/* You completed these challenges, let's go celebrate !
 */

/** # Further Readings... #
/*  ======================= */
// If you are eager to learn and want to go deeper, You may look at :
// * Indexes ( very important for query efficiency ),
// * Pre/Post hooks,
// * Validation,
// * Schema Virtuals and  Model, Static, and Instance methods,
// * and much more in the [mongoose docs](http://mongoosejs.com/docs/)


//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
