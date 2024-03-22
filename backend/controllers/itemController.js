const db = require('../models/index')
const Item  = db.item

const addItems = async (req,res) => {
    console.log(req.body)
    const item = await Item.create(req.body);
    res.json({message:'Item add Successful',status:true,data:item})
}

const getItems = async (req,res) => {
    const item = await Item.findAll({});
    res.json(item)
}

const deleteItem = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const deleteData = await Item.destroy({
      where: {
        item_id: id,
      },
    });
    res.json({ message: "Success", status: true, });
  };


  const patchItem = async (req, res) => {
    const id = req.params.id;
    console.log("req.body",req.body)
    console.log("first,",id)
    const editData = await Item.update(req.body, {
      where: {
        item_id: id,
      },
    });
    // console.log("editData:",editData)
    res.json({ message: "Edit Data Successfully", status: true, data: editData });
  };
module.exports = {addItems,getItems,deleteItem,patchItem}