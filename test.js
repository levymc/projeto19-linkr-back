import jwt from 'jsonwebtoken'

var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

console.log(token)