const Jimp = require("jimp");
const AWS = require("aws-sdk");
const { awsConfig } = require("@config");
module.exports = {
  changeDimension: (width, height, desiredDimension) => {
    const ratio = width >= height ? width / height : height / width;

    if (width >= height) {
      return `${desiredDimension}*${Math.round(desiredDimension / ratio)}`;
    }
    return `${Math.round(desiredDimension / ratio)}*${desiredDimension}`;
  },
  resizeImage: async (buffer, contentType, desiredDimension = 95) => {
    try {
      const image = await Jimp.read(buffer);

      const [imageWidth, imageHeight] = [image.getWidth(), image.getHeight()];
      const [w, h] = this.changeDimension(
        imageWidth,
        imageHeight,
        desiredDimension
      )
        .split("*")
        .map(Number);

      image.resize(w, h);

      return new Promise((resolve, reject) => {
        image.getBase64(contentType, (err, data) => {
          if (err) {
            reject(err);
          } else {
            const base64Data = data.split(`data:${contentType};base64,`)[1];
            resolve(base64Data);
          }
        });
      });
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  uploadToS3: async (bucket, path, buffer, contentType) => {
      const s3 = new AWS.S3({
                  accessKeyId: awsConfig.AWS_ACCESS_KEY,
                  secretAccessKey: awsConfig.AWS_ACCESS_SECRET,
                });
    console.log(s3,"awsConfig.AWS_ACCESS_KEY:",awsConfig.AWS_ACCESS_KEY,"awsConfig.AWS_ACCESS_SECRET",awsConfig.AWS_ACCESS_SECRET);
    const s3bucket = new AWS.S3({ params: { Bucket: bucket } });
    const uploadParams = {
      Bucket: bucket,
      Key: path,
      Body: buffer,
      ContentType: contentType,
    };

    return s3bucket.upload(uploadParams).promise();
  },
  getFileExtension: (filename) =>
    filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2),
};
