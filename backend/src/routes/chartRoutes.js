const express = require("express");
const chartsController = require("../controllers/chartsController");

const router = express.Router();

router.get("/countByYear", chartsController.getAlbumsCountByYear);
router.get("/countByGenre", chartsController.getAlbumsCountByGenre);

module.exports = router;
