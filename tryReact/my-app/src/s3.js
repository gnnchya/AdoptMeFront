import aws from 'aws-sdk'
import crypto from 'crypto'
import promisify from 'util'

const randomBytes = promisify(crypto.randomBytes)



const region = "us-east-1"
const bucketName = ""
const accessKeyId = ""
const secretAccessKey = ""

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion : 'v4'

})

export async function generateUploadURL(){
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
