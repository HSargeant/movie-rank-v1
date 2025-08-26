const express = require('express')
const router = express.Router()
const rankController = require('../controllers/rank')
const { ensureAuth, ensureGuest } = require('../middleware/authMiddleware')


router.get('/', rankController.getMoviesForComparison)
router.post('/submit', ensureAuth, rankController.submitComparisonResult)

module.exports = router