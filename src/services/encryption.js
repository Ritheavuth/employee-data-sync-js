// Encrypt a data key
//
// Replace the following example key ARN with any valid key identfier
const AWS = require("@aws-sdk/client-kms");
// aws.config = new aws.Config();
// aws.config.accessKeyId = "AKIAVHJJAOQ6OSEZY7KF";
// aws.config.secretAccessKey = "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";
// aws.config.region = "us-east-1a";
const kmsClient = new AWS.KMS({ region: "us-east-1", credentials: {
    accessKeyId: "AKIAVHJJAOQ6OSEZY7KF",
    secretAccessKey: "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"
} });
const KeyId = 'arn:aws:kms:us-east-1:359252653116:key/5cfe6878-722b-4b91-840c-5fa712448000';
const Plaintext = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
const cipherText = kmsClient.encrypt({ KeyId, Plaintext }, (err, data) => {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    const { CiphertextBlob } = data;
    // console.log(data)
    return CiphertextBlob
  }
});
cipherText.then((data) => {console.log(data) })
kmsClient.decrypt({ cipherText, KeyId }, (err, data) => {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      const { Plaintext } = data;
      console.log(Plaintext);
    }
  });