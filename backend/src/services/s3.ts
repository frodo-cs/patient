import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-providers";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import config from "../config/config.ts";

const isLocal = config.nodeEnv === 'development';

const s3 = new S3Client({
    region: config.aws.region,
    credentials: isLocal ? fromIni({ profile: 'dev' }) : undefined
});

export async function uploadFile(key, body, contentType) {
    const command = new PutObjectCommand({
        Bucket: config.aws.bucketName,
        Key: key,
        Body: body,
        ContentType: contentType,
    });
    await s3.send(command);
}

export async function getFileUrl(key, expiresIn = 3600) {
    const command = new GetObjectCommand({
        Bucket: config.aws.bucketName,
        Key: key,
    });
    return await getSignedUrl(s3, command, { expiresIn });
}
