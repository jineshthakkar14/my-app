const express = require("express")
const { solar, solar1, getAll } = require("../controllers/solar")
const router = express.Router()

router.get("/solar",solar)
router.post("/solar/update",solar1)
router.get("/solar/get",getAll)



module.exports = router