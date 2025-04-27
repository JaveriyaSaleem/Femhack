import express from "express"
import cors from "cors"
import SignupRouter from "./Router/SignupRouter.js"
import connectToDb from "./db/db.js"
const app = express()
const port = 5000
app.use(cors())
app.use(express.json())
app.use('/signup', SignupRouter)
app.get('/', (req, res) => {
  res.send('Hello World!')
})
connectToDb();
console.log(connectToDb())
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})