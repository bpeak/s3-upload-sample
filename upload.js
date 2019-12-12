const fs = require("fs");
const json = fs.readFileSync("./secret.json").toString();
const secret = JSON.parse(json);

var AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: secret.accessKey,
  secretAccessKey: secret.secretKey
});

const file = fs.readFileSync("./test.jpg");

s3.upload(
  {
    Bucket: "kihyun", // bucket name
    Key: "myFileName3.jpg", // file name
    ContentType: "image/jpeg",
    ACL: "public-read", // access control list
    Body: file
  },
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("success!", data);
    }
  }
);
