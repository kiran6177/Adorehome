const sharp = require("sharp");

async function cropAndSave( x, y, width, height,imageBuffer) {
    return new Promise((resolve,reject)=>{
      try {
        sharp(imageBuffer)
        .extract({ left: Math.round(x), top: Math.round(y), width: Math.round(width), height: Math.round(height) })
        .toBuffer()
        .then(croppedImageBuffer => {
          console.log(croppedImageBuffer);
          resolve(croppedImageBuffer)
        })
        .catch(err => {
          console.error('Error cropping image:', err);
          reject(err)
        });
      } catch (error) {
        console.error("Error:", error);
        reject(error)
      }
    })
  }

module.exports = {
    cropAndSave
}