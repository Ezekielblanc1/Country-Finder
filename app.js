const express = require('express');
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  const country = 'http://restcountries.eu/rest/v2/all'
  request(country, (err, response, body) => {
    if(!err && response.statusCode == 200){
      const data = JSON.parse(body)
      res.render('main', {data})
    }
  })
})

//Route to Get info about a particular country

app.get('/:name', (req, res) => {
  const names = req.params.name
  const country = `http://restcountries.eu/rest/v2/name/${names}`
  request(country, (err, response, body) => {
    if(!err && response.statusCode == 200){
      const singleData = JSON.parse(body)
      res.render('show', {singleData })
    }
  })
  
})




app.listen(5001, () => console.log('App connected successfully'))