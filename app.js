const express = require( 'express' )
const customer = require('./routes/Customer')
const item = require('./routes/Item')
const user = require('./routes/User')
const app = express()

const port = 4000

app.use(express.json())
app.use('/customer', customer)
app.use('/item', item)
app.use('/user', user)

// app.get('/', (req, res) => {
//   console.log('Get request has come');
//   res.send('Hello world!')
// })

app.listen(port, () => {
  console.log(`Express app is listening on port ${port}`);
})