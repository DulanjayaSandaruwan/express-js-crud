const express = require('express')
const router = express.Router()
const app = express()

const port = 4000

app.use(express.json())

router.get('/', (req, res) => {
  res.send('customer get');
})

router.get('/customer-name', (req, res) => {
  res.send('customer-name request name');
})

router.post('/', (req, res) => {
  res.send('customer post');
})

module.exports = router