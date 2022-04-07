require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true }).then(() => console.log('connected')).catch((e) => console.log('ERROR:', e))

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
})

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const doc = new Person()
  doc.name = 'shaker'
  doc.age = 50
  doc.favoriteFoods = ['beans']
  doc.save(function(error, data) {
    if (error) return done(error)
    return done(null, data)
  })
};

const createManyPeople = async (arrayOfPeople, done) => {
  const doc = await Person.create(arrayOfPeople, function(error, data) {
    if (error) return done(error)
    return done(null, data)
  })
};

const findPeopleByName = async (personName, done) => {
  const doc = await Person.find({name: personName}, function(error, data) {
    if (error) return done(error)
    return done(null, data)
  })
};

const findOneByFood = async (food, done) => {
  const doc = await Person.findOne({favoriteFoods: food}, function(error, data) {
    if (error) return done(error)
    return done(null, data)
  })
};

const findPersonById = async (personId, done) => {
  const doc = await Person.findById(personId, function(error, data) {
    if (error) return done(error)
    return done(null, data)
  })
};

const findEditThenSave = async (personId, done) => {
  const foodToAdd = "hamburger";
  const doc = await Person.findById(personId)
  doc.favoriteFoods.push(foodToAdd)
  doc.save(function(error, data) {
    if (error) return done(error)
    return done(null, data)
  })
};

const findAndUpdate = async (personName, done) => {
  const ageToSet = 20;
  const doc = await Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(error, data) {
    if (error) return done(error)
    return done(null, data)
  })
};

const removeById = async (personId, done) => {
  const doc = await Person.findByIdAndRemove(personId, function(error, data) {
    if (error) return done(error)
    return done(null, data)
  })
};

const removeManyPeople = async (done) => {
  const nameToRemove = "Mary";
  const doc = await Person.remove({name: nameToRemove}, function(error, data) {
    if (error) return done(error)
    return done(null, data)
  })
};

const queryChain = async (done) => {
  const foodToSearch = "burrito";
  const doc = await Person.find({favoriteFoods: {$in: foodToSearch}}).limit(2).select({age: 0}).sort({name: 1}).exec(function(error, data) {
    if (error) return done(error)
    return done(null, data)
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

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
