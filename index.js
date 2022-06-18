
const express = require('express')
const app = express()
const port = process.env.PORT || 4000 // this line determines the port the server runs on. ex: localhost:4000

const { users } = require('./state') // directs to state.js file
app.use(express.json())
/* BEGIN - create routes here */

//******************************************************** */
app.get("/",(req,res)=>{  //"/" ==> default route aka route definition, call back (request, response) //ex: localhost:4000/ 

  
  res.status(200).send("Welcome to my server.") // clean version landing page
 // res.json("Welcome to lala land") // this line will display json data 
 // status(200) means the status and website is working properly, ex: 404 or 408 will show that it NOT wokring proper 
 //https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

})
// * GET /users
//     * Give your server the ability to respond to a GET request with a path "/users" and return the users array from state.js
//     * Ex. `res.json(users)`
app.get("/users/",(req,res) => {
  res.status(200).send(users) //refer to line 6

})



//   * GET /users/1
//     * Give your server the ability to respond to a GET request with a path "/users/1" and return the first user object from the users array from state.js

app.get("/users/:id",(req,res) => {
  let id = req.params.id
  console.log(id)
  let foundPerson = users.find((element)=>{
    // console.log(element)
    return id == element._id // we are comparing id to element ._id in the json file
  })
  res.status(200).send(foundPerson) //refer to line 6

})
//******************************************************** */

// * POST /users
// * Give your server the ability to respond to a POST request with a path "/users" and add a hard coded user object to the users array from state.js. Use `res.json()` to send the last user in the array (should be the new one) back to the client.
// * If you do another GET request you should see this added
// * You will need to create the hard coded user mentioned above

app.post("/users/",(req,res) => {
console.log(req.body)
req.body._id = users.length+1
let newArray = [
  ...users, // shallow copy of the users array
  req.body // adding the new object inside of the array
]
res.status(200).json(newArray) 

}) 

// end of adding a new object inside of the array






//******************************************************** */

// * PUT /users/1
// * Give your server the ability to respond to a PUT request with a path "/users/1" and just change any key value (ex. name, occupation) on the first user object in the users array in state.js. Use `res.json()` to send this user back to the client.

app.put("/users/:id",(req,res) => {
  let id = req.params.id
  let foundIndex = users.findIndex((element)=>{
    
    
    return id == element._id // we are comparing id to element ._id in the json file
  })

  users[foundIndex].name = req.body.name
  users[foundIndex].occupation = req.body.occupation
  users[foundIndex].avatar = req.body.avatar

  console.log(users)
  res.status(200).json(users) 

})


//******************************************************** */


// * DELETE /users/1
// * Give your server the ability to respond to a DELETE request with a path "/users/1" and remove the first item from the users array. Use `res.send()` to send back a messsage, "deleted"

app.delete("/users/:id",(req,res) => {
  let id = req.params.id
  let foundIndex = users.findIndex((element)=>{
        
    return id == element._id // we are comparing id to element ._id in the json file
  })
  users.splice(foundIndex,1)

  // console.log(users)
  res.status(200).json(users) 

})



// ## Part 2. Body-parser module

// * Require the `body-parser` module on the line below `require('express')`. (it has already been npm installed)

// * Give your server the ability to handle a POST request with a path "/users" and add the data from the client to the users array

// * This means you will be adding `req.body`. Console log this to see what you get and don't forget to send an actual body with the request in Postman

// * Assign an _id property to the user object that is a number that increments by 1 each time.
// * To do this, set a variable called counter near the `{ users }` variable. Start it at the length of the users array

// * Use `res.json()` to send the user object back to the client. (if you do another GET request you should see this added)

// ## Part 3. Use path variables

// * Alter the following routes:

// * GET /users/1 => GET /users/:userId
// * Give your server the ability to respond to a GET request with a path `/users/:userId` and return the user object from the users array that has the _id == userId

// * PUT /users/1 => PUT /users/:userId
// * Give your server the ability to respond to a PUT request with a path `/users/:userId` and just change any key value on the user object with this _id 

// * DELETE /users/1 => DELETE /users/:userId
// * Give your server the ability to respond to a DELETE request with a path `/users/:userId` and find the user with this id from the array. Give this user object a new key value `isActive: false`. Use `res.send()` to send back a messsage, "deleted"









/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))