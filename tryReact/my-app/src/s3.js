import aws from 'aws-sdk'
import crypto from 'crypto'
import { get } from 'http'
import {promisify} from 'util'

const randomBytes = promisify(crypto.randomBytes)

const region = String(process.env.AWS_REGION)
const bucketName = "pic-storage"
const accessKeyId = `env:"aws_access_key_id" envDefault:""`
const secretAccessKey = `env:"aws_secret_access_key_id" envDefault:""`

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion : 'v4'

})

export const generateUploadURL = async() =>{
    console.log(region)
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')

    const params = ({

        Bucket : bucketName,
        Key : imageName,
        Expires: 120

    })



    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL

}
