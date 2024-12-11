const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const CreatePostModel = require("./models/CreatePost.js");
const commonFeatureRouter = require("./routes/common/feature-routes");

//create a database connection -> u can also
//create a separate file for this and then import/use that file here

mongoose
  .connect("mongodb+srv://abhishekkachhap9471:ZqYGRuIOzmkMNE9l@cluster0.rodfq.mongodb.net/mern_db?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);


app.post("/postProduct", async (req, res) => {
  const { name, title, description, username } = req.body;

  try {
    await CreatePostModel.create({
      name,
      title,
      description,
      username,
      
    });

	res.json({
		ok: true,
		message: "Product created successfully",
	});
  } catch (error) {
	res.json({
		ok: false,
		message: "Error creating product",
	})
  }
});

app.get("/getPosts", async (req, res) => {
	try {
		const everyPost = await CreatePostModel.find({});
		console.log(everyPost);
		res.json({
			ok: true,
			everyPost
		})
	} catch (error) {
		res.json({
			ok: false,
			message: "Error getting posts",
		})
	}
})

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
