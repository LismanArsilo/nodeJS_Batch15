import formidable from "formidable";
import fs from "fs";

const uploadDir = process.cwd() + "/storages/";

const uploadFiles = async (req, res, next) => {
  const options = {
    keepExtensions: true,
    uploadDir: uploadDir,
    maxFileSize: 5 * 1024 * 1024,
  };
  const form = formidable(options);
  let files = [];
  let fields = [];

  form.onPart = function (part) {
    if (
      !part.originalFilename ||
      part.originalFilename.match(/\.(jpg|jpeg|png)$/i)
    ) {
      this._handlePart(part);
    } else {
      return res.status(404).send("File type is not supported");
    }
  };

  form
    .parse(req)
    .on("field", (fieldname, value) => {
      fields.push({ fieldname, value });
    })
    .on("file", (filename, file) => {
      files.push({ filename, file });
    })
    .once("end", () => {
      console.info("upload done");
      req.fileAttrb = {
        files: files,
        fields: fields,
      };
      next();
    });
};
export default {
  uploadFiles,
};
