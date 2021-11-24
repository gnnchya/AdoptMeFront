import aws from 'aws-sdk'
import crypto from 'crypto'
import { get } from 'http'
import {promisify} from 'util'

const randomBytes = promisify(crypto.randomBytes)

const region = String(process.env.REACT_APP_AWS_REGION)
const bucketName = "adoptme-pic-storage"
const accessKeyId = String(process.env.REACT_APP_AWS_ACCESS_KEY)
const secretAccessKey = String(process.env.REACT_APP_AWS_SECRET_ACCESS_KEY)

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion : 'v4'

})

export const generateUploadURL = async() =>{
    console.log(region,accessKeyId,secretAccessKey)
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
