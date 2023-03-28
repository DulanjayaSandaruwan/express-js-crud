const express = require('express')
const mysql = require('mysql')
const db = require('../configs/db.configs')

const router = express.Router()

const connection = mysql.createConnection(db.database)

connection.connect(function(err){
  if(err){
    console.log(err)
  }
  else{
    console.log('connected to the mysql server')
    var userTableQuery = "create table if not exists user (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255))"
    connection.query(userTableQuery, function(err, request){
      if(err) throw err;
      // console.log(request)
      if(request.warningCount === 0){
        console.log("create user table")  
      }
    })
  }
})

router.get('/', (req, res) => {
    var query = "select * from user"
    connection.query(query, (err, rows) => {
      if (err) throw err
      res.send(rows)
  })
})

router.post('/', (req, res) => {
  console.log(req.body)
  const id = req.body.id
  const name = req.body.name
  var query = "insert into user (id, name) values (?, ?)"
  connection.query(query, [id, name], (err) => {
    if(err) {
      res.send({"message" : "duplicate entry"})
    }
    else{
      res.send({"message" : "user created"})
    }
  })
})

router.put('/', (req, res) => {
  const id = req.body.id
  const name = req.body.name
   
  var query = "update user set name =? where id=?"

    connection.query(query, [name, id], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({'message': 'User Updated'})
        } else {
            res.send({'message': 'User not found'})
        }
    })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id

  var query = "delete from user where id=?"

  connection.query(query, [id], (err, rows) => {
    if (err) console.log(err);

    if (rows.affectedRows > 0) {
        res.send({'message': 'user deleted'})
    } else {
        res.send({'message': 'user not found'})
    }
  })
})



router.get('/:id', (req, res) => {
  const id = req.params.id

  var query = "select * from user where id=?"

  connection.query(query, [id], (err, rows) => {
    if (err) console.log(err);

    res.send(rows)
  })
})

module.exports = router