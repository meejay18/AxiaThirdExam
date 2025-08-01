import cloudinary from '../utils/cloudinary.js'
import fs from 'fs/promises'

export const singleFileUpload = async (req, res, next) => {
  const file = req.file
  console.log(file.path)

  try {
    const resource = await cloudinary.uploader.upload(file.path)
    // console.log(resource)
    await fs.unlink(file.path)

    return res.status(200).json({
      message: 'Single file uploaded successfully',
      data: resource,
    })
  } catch (error) {
    await fs.unlink(file.path)
    next(error)
  }
}
// export const multipleFiles = async (req, res, next) => {
//   try {
//     const files = req.files
//     console.log(files)

//     const updatedArray = []

//     for (const file of files) {
//       const result = await cloudinary.uploader.upload(file.path)
//       await fs.unlink(file.path)
//       updatedArray.push(result)
//     }

//     console.log(updatedArray)

//     return res.status(200).json({
//       message: 'multiple files uploaded successfully',
//       data: resource,
//     })
//   } catch (error) {
//     await fs.unlink(file.path)
//     next(error)
//   }
// }

export const multipleFiles = async (req, res, next) => {
  try {
    console.log(req.files)
    console.log(req.body)

    return res.send('multiple files uploaded successfully')
  } catch (error) {
    await fs.unlink(file.path)
    next(error)
  }
}

export const multipleFields = async (req, res, next) => {
  const file = req.files
  const body = req.body
  try {
    const firstField = await cloudinary.uploader.upload(file['previewPic'][0].path)
    const secondField = await cloudinary.uploader.upload(file['detailedPix'][0].path)
    body['previewPic'] = firstField.secure_url
    body['detailedPix'] = secondField.secure_url

    console.log(body)

    await fs.unlink(file['previewPic'][0].path)
    await fs.unlink(file['detailedPix'][0].path)
    return res.status(200).json({
      message: 'multiple fields uploaded successfully',
      data: body,
    })
  } catch (error) {
    await fs.unlink(file['previewPic'][0].path)
    await fs.unlink(file['detailedPix'][0].path)

    next(error)
  }
}
