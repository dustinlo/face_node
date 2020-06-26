const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'Dustinlo',
      password : '',
      database : 'smart-brain'
    }
  });

const app = express()

//important
// app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.send(database.users))

//signin
// this automatically gets response so I dont have to specify, go with signin.js 
app.post('/signin', signin.handleSignin(db, bcrypt))

//register
app.post('/register', register.handleRegister(db, bcrypt))

//get profile
app.get('/profile/:id', profile.handleProfileGet(db))

//image count
// equal to ones at top
app.put('/image', (req, res) => {image.handleImageCount(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleAPICall(req, res)})

app.listen(3000, ()=> {
    console.log('app is running on port 3000')
})

