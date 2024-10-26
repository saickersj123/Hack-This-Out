import dotenv from 'dotenv';

dotenv.config();

export default {
  mongoURI: process.env.MONGO_URI,
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    securityGroupId: process.env.AWS_SECURITY_GROUP_ID,
    s3BucketName: process.env.AWS_S3_BUCKET_NAME,
    keyName: process.env.AWS_KEY_NAME,
  },
};