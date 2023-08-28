const { mediaService } = require("@services");
const { miscService } = require("@services");
const { awsConfig } = require("@config");

const { health } = miscService;
const upload = async (req, res) => {
  try {
    const bucketName = awsConfig.BUCKET_NAME;
    const {
      destination,
      sourcefile: { filename, content, contentType },
    } = req.body;

    const extension = mediaService.getFileExtension(filename);
    const str = filename.split(`.${extension}`);
    const uploadedFile = `${str[0]}.${extension}`;
    const fullPath = `${destination}/${uploadedFile}`;
    const buffer = Buffer.from(content, "base64");

    await mediaService.uploadToS3(bucketName, fullPath, buffer, contentType);

    const baseUrl = `https://${bucketName}.s3.amazonaws.com`;
    const fileUrl = `${baseUrl}/${fullPath}`;

    res.status(200).send({
      success: true,
      message: "Upload Successful",
      data: {
        uploadedFile,
        fileUrl,
      },
    });
  } catch (e) {
    console.error(e, "error from media upload");
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  health,
  upload,
};
