const pinataSdk = require("@pinata/sdk");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const pinataApiKey = process.env.PINATA_API_KEY;
const pinataApiSecret = process.env.PINATA_API_SECRET;
const pinata = new pinataSdk(pinataApiKey, pinataApiSecret);

async function storeImage(imagesFilePath) {
  const fullImagesPath = path.resolve(imagesFilePath);
  console.log("Uploading to IPFS");

  const readableStreamForFile = fs.createReadStream(fullImagesPath)
  const options = {
        pinataMetadata: {
          name: path.basename(readableStreamForFile.path.toString()),
        },
      }
  const response = await pinata.pinFileToIPFS(readableStreamForFile, options)
  console.log(response)
  return {response, readableStreamForFile};
}

  

async function storeTokenUriMetadata(metadata) {
  const options = {
    pinataMetadata: {
      name: metadata.name,
    },
  };
  try {
    const response = await pinata.pinJSONToIPFS(metadata, options);
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
}

module.exports = { storeImage,  storeTokenUriMetadata};
