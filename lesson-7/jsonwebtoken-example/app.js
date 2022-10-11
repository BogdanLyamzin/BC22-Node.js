const jwt = require("jsonwebtoken");
require("dotenv").config()

const payload = {
    id: "63458ca5c5b346196f324fc3"
}

const {SECRET_KEY} = process.env;

const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"})
// console.log(token);
const decodeToken = jwt.decode(token);
// console.log(decodeToken);

try {
    const wrongToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDU4Y2E1YzViMzQ2MTk2ZjMyNGZjMyIsImlhdCI6MTY2NTUwMzkyNSwiZXhwIjoxNjY1NTA3NTI1fQ.Wo6ZKr8ruu_JJ7KGZEjD8VS7kx7amh3WyxrhsM1bYiy"
    const result = jwt.verify(token, SECRET_KEY);
    console.log(result);
    const result2 = jwt.verify(wrongToken, SECRET_KEY)
} catch (error) {
    console.log(error.message);
}