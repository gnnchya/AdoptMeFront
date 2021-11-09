import aws from 'aws-sdk'
import crypto from 'crypto'
import {promisify} from 'util'

const randomBytes = promisify(crypto.randomBytes)



const region = "us-east-1"
const bucketName = "pic-storage"
const accessKeyId = "ASIAWHA6UUIZ56TJUQFK"
const secretAccessKey = "xswre40kzHjQpwcKIz5QP4NwQxjjrcnxiKcyCYYX"

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion : 'v4'

})

export const generateUploadURL = async() =>{
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
