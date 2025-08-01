import express from 'express'
const route = express.Router()
import multer from 'multer'
import { multipleFields, multipleFiles, singleFileUpload } from '../controller/fileUploads.js'

const upload = multer({ dest: './uploads' })

const uploadMultipleFields = upload.fields([
  { name: 'previewPic', maxCount: 3 },
  { name: 'detailedPix', maxCount: 3 },
])

route.post('/singleFile', upload.single('dp'), singleFileUpload)
route.post('/multipleFiles', upload.array('dp', 3), multipleFiles)
route.post('/multipleFields', uploadMultipleFields, multipleFields)

export default route
