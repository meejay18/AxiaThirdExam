import express from 'express'
const app = express()
import env from 'dotenv'
import userRoute from './route/user.route.js'
import postRoute from './route/post.route.js'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import kycRoute from './route/kyc.route.js'
import uploadRoute from './route/uploads.route.js'
env.config()
app.use(express.json())

app.use(
  express.text({
    type: ['text/plain', 'application/javascript', 'text/html', 'application/xml'],
  })
)
app.use(cookieParser())

const port = process.env.PORT || 7000

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Database connected')
  })
  .catch(() => {
    console.log('error connecting with database')
  })

app.use(userRoute)
app.use(postRoute)
app.use(kycRoute)
app.use(uploadRoute)

app.use((error, req, res, next) => {
  return res.status(error.status || 500).json({ message: error.message || 'Something went wrong' })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
