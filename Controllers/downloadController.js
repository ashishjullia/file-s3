const { validationResult } = require('express-validator');
const downloadFile = require('download');
const AWS = require('aws-sdk');
const fs = require('fs');
require('dotenv/config');

const AWS_ID = process.env.AWS_ID
const AWS_SECRET = process.env.AWS_SECRET

const BUCKET_NAME = 'downloadlinksfast';

const s3 = new AWS.S3({
    accessKeyId: AWS_ID,
    secretAccessKey: AWS_SECRET
});

var fileNameOnDisk = ""

exports.home = async (req, res, next) => {
    res.send('Hello World!')
}

exports.download = async (req, res, next) => {
    fileNameOnDisk = req.body.url.split("/").slice(-1)[0] 
    console.log(fileNameOnDisk)
    // Validating the data before adding it
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs, please provide correct data!', 422)
        );
    }

    const filePath = `${__dirname}/files`;
    
    downloadFile(req.body.url, filePath)
    .then(() => {
        console.log('Download Completed');
    })

};

exports.upload = async (req, res, next) => {
    fileName = `${__dirname}/files/${fileNameOnDisk}`
    const fileContent = fs.readFileSync(fileName);
        // Setting up S3 upload parameters
        const params = {
            Bucket: BUCKET_NAME,
            Key: fileNameOnDisk, // File name you want to save as in S3
            Body: fileContent,
            ACL:'public-read'
        };
    
        // Uploading files to the bucket
        s3.upload(params, function(err, data) {
            if (err) {
                throw err;
            }
            console.log(`File uploaded successfully. ${data.Location}`);
        });

        try {
            fs.unlinkSync(fileName)
            //file removed
          } catch(err) {
            console.error(err)
        }
}
