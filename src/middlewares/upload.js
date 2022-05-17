const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
  }
})
// const fileFilter = function (req, file, cb) {
//   const allowedMimes = ['img/jpeg', 'img/png']
//   if (allowedMimes.includes(file.mimetype)) {
//     cb(null, true)
//   } else {
//     // eslint-disable-next-line n/no-callback-literal
//     cb({
//       success: false,
//       message: 'Invalid file type. Only jpg, png image files are allowed.'
//     }, false)
//   }
// }
// const obj = {
//   storage,
//   limits: {
//     fileSize: 200 * 1024 * 1024
//   },
//   fileFilter
// }
// const uploadImage = multer(obj).single('file') // upload.single('file')
// exports.fileUpload = (req, res) => {
//   uploadImage(req, res, function (error) {
//     if (error) { // instanceof multer.MulterError
//       res.status(500)
//       if (error.code === 'LIMIT_FILE_SIZE') {
//         error.message = 'File Size is too large. Allowed file size is 200KB'
//         error.success = false
//       }
//       return res.json(error)
//     } else {
//       if (!req.file) {
//         res.status(500)
//         res.json('file not found')
//       }
//       res.status(200)
//       res.json({
//         success: true,
//         message: 'File uploaded successfully!'
//       })
//     }
//   })
// }

const upload = multer({ storage })
module.exports = upload
