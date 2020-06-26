const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true
    }
  });

const app = express()

//important
// app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.send("it's wroking"))

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

app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`)
})

