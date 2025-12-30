const subcategory = require("../Database/Models/Subcategory.js");
const Product = require("../Database/Models/Products.js");
const Mongoose = require("mongoose");
const category = require("../Database/Models/Category.js");
const Comments = require("../Database/Models/Comments.js");

const getAllProducts = async (req, res) => {
  try {
    const result = await Product.find({});
    res.send(result);
  } catch (error) {
    res.send(`Error in Get ${error}`);
  }
};

const getSubcategories = async (req, res) => {
  try {
    console.log("getSub HIT");
    const { sub_id } = req.params;
    console.log(sub_id);
    const sub = await subcategory.aggregate([
      {
        $match: { _id: new Mongoose.Types.ObjectId(sub_id) },
      },
      {
        $lookup: {
          from: "products",
          localField: "products",
          foreignField: "_id",
          as: "items",
        },
      },
    ]);
    res.send(sub[0].items);
  } catch (error) {
    res.send(`Error In Get Sub : ${error}`);
  }
};

const getcategories = async (req, res) => {
  try {
    const { cat_id } = req.params;
    console.log(cat_id);
    const cat = await category.aggregate([
      {
        $match: { _id: new Mongoose.Types.ObjectId(cat_id) },
      },
      {
        $lookup: {
          from: "e-subcategories",
          localField: "subcategory",
          foreignField: "_id",
          as: "sub",
        },
      },
    ]);
    res.send(cat[0].sub);
  } catch (error) {
    res.send(`Error In get Cate: ${error}`);
  }
};

const addcomments = async (req, res) => {
  try {
    const { parent_id } = req.params;
    let rating = req.body.ratings ? req.body.ratings : 0;
    const oldcomments = await Comments.findById(parent_id);
    const Comment = {
      parentId: parent_id,
      user_id: req.userMail,
      description: req.body.message,
      like: 0,
      dislike: 0,
    };
    await Comments.create(Comment);
    res.send("Commented");
  } catch (error) {
    res.send(`Error In Commenting ${error}`);
  }
};
const showcommentsforid = async (req, res) => {
  try {
    const { parent_id } = req.params;
    const comments = await Comments.aggregate([
      {
        $match: { parentId: new Mongoose.Types.ObjectId(parent_id) },
      },
    ]);
    res.send(comments);
  } catch (error) {
    res.send(`Error In Show Comments : ${error}`);
  }
};

const showallcomments = async (req, res) => {
  try {
    const { parent_id } = req.params;
    const comments = await Comments.aggregate([
      {
        $match: { parentId: new Mongoose.Types.ObjectId(parent_id) },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "parentId",
          as: "childComments",
        },
      },
    ]);
    res.send(comments);
  } catch (error) {
    res.send(`Error In Show All Comments ${error}`);
  }
};

const addreviews = async (req, res) => {
  try {
    const { parent_id } = req.params;
    const product = await Product.findById(parent_id);
    const rating = req.body.rating;
    const oldrating = product.ratings;
    const newrate = oldrating != 0 ? (rating + oldrating) / 2 : rating;
    product.ratings = newrate;
    product.save();
    addcomments(req, res);
  } catch (error) {
    res.send(`Error In Adding Review ${error}`);
  }
};

const addlike = async (req, res) => {
  try {
    const { parent_id } = req.params;
    const comment = await Comments.updateOne(
      {
        _id: new Mongoose.Types.ObjectId(parent_id),
      },
      { $inc: { like: 1 } }
    );
    res.send("Liked The Comment");
  } catch (error) {
    res.send(`Error In Liking A Comment : ${error}`);
  }
};

const adddislike = async (req, res) => {
  try {
    const { parent_id } = req.params;
    const comment = await Comments.updateOne(
      {
        _id: new Mongoose.Types.ObjectId(parent_id),
      },
      { $inc: { disLike: 1 } }
    );
    res.send(`Comment Disliked`);
  } catch (error) {
    res.send(`Error In DisLiking A Comment : ${error}`);
  }
};

const filterSub = async (req, res) => {
  try {
    const brand = req.params.brand.toLowerCase();
    const sub_id = req.params.sub_id;

    const ltprice = Number(req.params.ltprice);
    const gtprice = Number(req.params.gtprice);

    const filtered = await subcategory.aggregate([
      {
        $match: {
          _id: new Mongoose.Types.ObjectId(sub_id),
        },
      },
      {
        $lookup: {
          from: "products",
          let: {
            ids: "$products",
            brand: brand,
            minPrice: gtprice,
            maxPrice: ltprice,
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $in: ["$_id", "$$ids"] },
                    { $eq: [{ $toLower: "$brand" }, "$$brand"] },
                    { $gte: ["$price", "$$minPrice"] },
                    { $lte: ["$price", "$$maxPrice"] },
                  ],
                },
              },
            },
          ],
          as: "items",
        },
      },
    ]);

    return res.json(filtered[0].items);
  } catch (err) {
    console.error("Error In Filtering Sub :", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllProducts,
  getSubcategories,
  getcategories,
  addcomments,
  showcommentsforid,
  showallcomments,
  addreviews,
  addlike,
  adddislike,
  filterSub,
};
