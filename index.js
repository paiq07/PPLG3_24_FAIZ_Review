const express = require('express')
const app = express()
const userreviews = require('./Router/review')
const cateegoriesRoutes = require('./Router/catagories')

const port = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(userreviews)
app.use(cateegoriesRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})