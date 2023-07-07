const connectToMongo = require ('./db');

const express = require('express')
connectToMongo();
const app = express()
const port = 5000

app.use(express.json())

//Availble Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

// app.get('/', (req, res) => {
//   res.send('Hello Ain')
// })

app.listen(port, () => {
  console.log(`myNotes app listening on port ${port}`)
})