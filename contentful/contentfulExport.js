// contentfulExport.js
require("dotenv").config();
const { exec } = require("child_process");

const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const spaceId = process.env.CONTENTFUL_SPACE_ID;

const exportCommand = `contentful space export --config contentful/export-config.json --management-token ${managementToken} --space-id ${spaceId}`;

exec(exportCommand, (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }

  if (stdout) {
    console.log(`Number of files ${stdout}`);
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
  }
});
