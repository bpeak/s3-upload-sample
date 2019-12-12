const express = require("express");
const app = express();
const fs = require("fs");

const json = fs.readFileSync("./secret.json").toString();
const secret = JSON.parse(json);

const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: secret.accessKey,
  secretAccessKey: secret.secretKey
});

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

app.get("/", (req, res) => {
  res.send(fs.readFileSync("./views/main.html").toString());
});

app.post("/upload", upload.single("myFile"), (req, res) => {
  console.log(req.file);
  s3.upload(
    {
      Bucket: "kihyun", // bucket name
      Key: req.file.originalname, // file name
      ContentType: req.file.mimetype,
      ACL: "public-read", // access control list
      Body: req.file.buffer
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json({
          result: data
        });
      }
    }
  );
});

app.listen(80, () => {
  console.log("ok");
});
