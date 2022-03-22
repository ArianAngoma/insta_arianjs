import AWS from 'aws-sdk';
import {PutObjectRequest} from 'aws-sdk/clients/s3';
import dotenv from 'dotenv';
dotenv.config();

const ID = process.env.AWS_ID!;
const SECRET = process.env.AWS_SECRET!;
const BUCKET_NAME = process.env.AWS_BUCKET_NAME!;

const s3: AWS.S3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});

export const awsUploadImage = async (
    file: any,
    filePath: string,
): Promise<string> => {
  const params: PutObjectRequest = {
    Bucket: BUCKET_NAME,
    Key: `${filePath}`,
    Body: file,
  };

  try {
    const response = await s3.upload(params).promise();
    return response.Location;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const awsRemoveImage = async (filePath: string): Promise<void> => {
  const params: PutObjectRequest = {
    Bucket: BUCKET_NAME,
    Key: `${filePath}`,
  };

  try {
    await s3.deleteObject(params).promise();
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
