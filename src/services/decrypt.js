// Decrypt a data key
//

const { cipherText } = require("./encryption");

// Replace the following example key ARN with any valid key identfier
const AWS = require("@aws-sdk/client-kms");
const kmsClient = new AWS.KMS({ region: "us-east-1", credentials: {
    accessKeyId: "AKIAVHJJAOQ6OSEZY7KF",
    secretAccessKey: "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"
} });
const KeyId = 'arn:aws:kms:us-east-1:359252653116:key/5cfe6878-722b-4b91-840c-5fa712448000';

kmsClient.decrypt({ cipherText, KeyId }, (err, data) => {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    const { Plaintext } = data;
    console.log(Plaintext);
  }
});