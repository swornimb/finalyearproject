import pinataSdk from "@pinata/sdk";
import { resolve, basename } from "path";
import { createReadStream } from "fs";
require("dotenv").config();

const pinataApiKey = process.env.PINATA_API_KEY;
const pinataApiSecret = process.env.PINATA_API_SECRET;
const pinata = new pinataSdk(pinataApiKey, pinataApiSecret);

async function storeImage(imagesFilePath) {
  const fullImagesPath = resolve(imagesFilePath);
  console.log("Uploading to IPFS");

  const readableStreamForFile = createReadStream(fullImagesPath);
  const options = {
    pinataMetadata: {
      name: basename(readableStreamForFile.path.toString()),
    },
  };
  const response = await pinata.pinFileToIPFS(readableStreamForFile, options);
  console.log(response);
  return { response, readableStreamForFile };
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

export default { storeImage, storeTokenUriMetadata };
