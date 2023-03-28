const express = require('express')
const router = express.Router()
const app = express()

const port = 4000

app.use(express.json())

router.get('/', (req, res) => {
  res.send('item get');
})

router.get('/item-name', (req, res) => {
  res.send('item-name request name');
})
 
router.post('/', (req, res) => {
  console.log(req.body)
  res.send(req.body);
})

module.exports = router