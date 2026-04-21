const dataPortRouter = require("express").Router();
const multer = require("multer");
const dataPortController = require("../controllers/dataPortController");
const { authenticateToken, requireRole } = require("../utils/middleware");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
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

dataPortRouter.post("/import", authenticateToken, requireRole("admin"), upload.single("file"), dataPortController.importFromExcel);
dataPortRouter.get("/export", authenticateToken, requireRole("admin"), dataPortController.exportToExcel);

module.exports = dataPortRouter;
