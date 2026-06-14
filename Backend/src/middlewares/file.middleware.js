const multer = require("multer")

const upload = multer({
    storage: multer.memoryStorage(), // for temporary storage we use memoryStorage // becuase we will convert it to text
    limits: {
        fileSize: 3 * 1024 * 1024 // 3MB max size of pdf
    }
})


module.exports = upload