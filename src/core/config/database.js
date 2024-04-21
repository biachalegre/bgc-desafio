const AWS = require("aws-sdk");
AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
});

module.exports = AWS;
