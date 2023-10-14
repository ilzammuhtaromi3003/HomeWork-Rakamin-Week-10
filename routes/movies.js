const express = require('express')
const router = express.Router()
const moviesController = require("../controller/moviesController")

router.get("/", moviesController.index)
router.get("/:id", moviesController.show)
router.post("/", moviesController.create)
router.put("/:id", moviesController.update)
router.delete("/:id", moviesController.delete)

module.exports = router;