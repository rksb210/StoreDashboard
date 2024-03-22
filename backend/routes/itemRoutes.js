const express = require('express')
const { addItems, getItems, deleteItem, patchItem } = require('../controllers/itemController')
const router = express()

router.post('/additems',addItems)
router.get('/getallitems',getItems)
router.delete('/deleteitem/:id',deleteItem)
router.patch('/updateitem/:id',patchItem)


module.exports = router