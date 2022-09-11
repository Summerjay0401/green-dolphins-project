const {
    Block
} = require('../models');

const getBlock = async (req, res) => {
    // find all categories
    // be sure to include its associated Products
    try {
      const categories = await Block.findAll({
        //Add Product as a second model to JOIN with
        include: [{ model: Product }],
      });
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json(err);
    }
};

module.exports = {
    getBlock
};