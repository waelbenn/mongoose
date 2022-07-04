const mongoose = require('mongoose')
const Schema = mongoose.Schema()

const PersonSchema={
    name: {
        type: String,
        required: true
      },
      age: Number,
      favoriteFoods: [String]
}
const Person = mongoose.model("Person",PersonSchema);


//Create and Save a Record of a Model:

  let wael = new Person({
    name: "wael",
    age: 26,
    favoriteFoods: ["pizza"]
  });

  wael.save((error, data) => {
    if (error) {
      console.log(error);
    } else {
      done(null, data);
    }
  });

//Create Many Records with model.create()
  let arrayOfPeople = [
    {
      name: "Garry",
      age: 35,
      favoriteFoods: ["fried chicken", "chicken wings", "chicken nuggets"]
    },
    { name: "Hannah", age: 24, favoriteFoods: ["watermelon", "mango"] },
    { name: "Igor", age: 52, favoriteFoods: ["vegetable soup"] }
  ];
    Person.create(arrayOfPeople, (error, createdPeople) => {
      if(error){
        console.log(error)
      }else{
        done(null, createdPeople)
      }
    });
  
//Use model.find() to Search Your Database
Person.find({name: personName}, (error, arrayOfResults) => {
  if(error){
    console.log(error)
  }else{
    done(null, arrayOfResults)
  }
});

//Use model.findOne() to Return a Single Matching Document from Your Database
Person.findOne({favoriteFoods : {$all : [food]}}, (error, result) => {
  if(error){
    console.log(error)
  }else{
    done(null, result)
  }
});

//Use model.findById() to Search Your Database By _id
Person.findById(personId, (error, result) => {
  if(error){
    console.log(error)
  }else{
    done(null, result)
  }
});

//Perform Classic Updates by Running Find, Edit, then Save
var foodToAdd = "hamburger";
  
  Person.findById(personId, (error, result) => {
    if(error){
      console.log(error)
    }else{
      result.favoriteFoods.push(foodToAdd)
      result.save((error, updatedResult) => {
        if(error){
          console.log(error)
        }else{
          done(null, updatedResult)
        }
      })
    }
  });

//Perform New Updates on a Document Using model.findOneAndUpdate()
var ageToSet = 20;
  
Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (error, updatedRecord) => {
  if(error){
    console.log(error)
  }else{
    done(null, updatedRecord)
  }
});

//Delete One Document Using model.findByIdAndRemove
Person.findByIdAndRemove(personId, (error, deletedRecord) => {
  if(error){
    console.log(error)
  }else{
    done(null, deletedRecord)
  }
});

// Delete Many Documents with model.remove()
var nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (error, JSONStatus)=> {
    if(error){
      console.log(error)
    }else{
      done(null, JSONStatus)
    }
  });

  //Chain Search Query Helpers to Narrow Search Results
  var foodToSearch = "burrito";
  
  Person.find({favoriteFoods : {$all: [foodToSearch]}})
    .sort({name: 'asc'})
    .limit(2)
    .select('-age')
    .exec((error, filteredResults) => {
    if(error){
      console.log(error)
    }else{
      done(null, filteredResults)
    }
  });
