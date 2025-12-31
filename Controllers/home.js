const Product = require("../Database/Models/Products");

const getHome = async (req, res) => {
  try {
    const HomeResult = await Product.aggregate([
      // {
      //   $setWindowFields: {
      //     partitionBy: "$subcategory",
      //     sortBy: { release: -1 },
      //     output: {
      //       rank: { $rank: {} },
      //     },
      //   },
      // },
      // {
      //   $match: {
      //     rank: { $lte: 2 },
      //   },
      // },
      {
        $setWindowFields: {
          partitionBy: "$subcategory",
          sortBy: { release: -1 },
          output: {
            rank: { $rank: {} },
          },
        },
      },
      {
        $match: { rank: { $lte: 2 } },
      },
    ]);
    res.send(HomeResult);
  } catch (error) {
    res.send(`Error In Get Home : ${error}`);
  }
};

module.exports = getHome;
