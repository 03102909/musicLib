const dataPortRouter = require("express").Router();
const multer = require("multer");
const dataPortController = require("../controllers/dataPortController");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Дозволені лише файли .xlsx"), false);
    }
  },
});

dataPortRouter.post("/import", upload.single("file"), dataPortController.importFromExcel);
dataPortRouter.get("/export", dataPortController.exportToExcel);

module.exports = dataPortRouter;
