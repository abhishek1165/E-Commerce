import axios from "axios";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePost = ({ user }) => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    title: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/postProduct", {
        name: productDetails.name,
        title: productDetails.title,
        description: productDetails.description,
        username: user.name,
      });
      console.log(response);
      toast.success("Product posted successfully!");

      // Reset the form to its initial state
      setProductDetails({ name: "", title: "", description: "" });
    } catch (error) {
      console.error("Error posting product:", error);
      toast.error("Failed to post the product.");
    }
  };

  // Framer Motion variants for the container and form elements
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: "easeOut" } 
    },
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200 px-4">
      <ToastContainer />
      <motion.div
        className="max-w-lg w-full bg-gray-800 rounded-lg shadow-lg p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-2xl font-bold text-emerald-400 mb-6 text-center"
          variants={itemVariants}
        >
          Create a New Post
        </motion.h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <motion.div variants={itemVariants}>
            <label htmlFor="productName" className="block text-sm font-medium">
              Product Name
            </label>
            <input
              id="productName"
              type="text"
              placeholder="Enter product name"
              value={productDetails.name}
              onChange={(e) =>
                setProductDetails({ ...productDetails, name: e.target.value })
              }
              className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 placeholder-gray-400"
            />
          </motion.div>

          {/* Product Title */}
          <motion.div variants={itemVariants}>
            <label htmlFor="productTitle" className="block text-sm font-medium">
              Product Title
            </label>
            <input
              id="productTitle"
              type="text"
              placeholder="Enter product title"
              value={productDetails.title}
              onChange={(e) =>
                setProductDetails({ ...productDetails, title: e.target.value })
              }
              className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 placeholder-gray-400"
            />
          </motion.div>

          {/* Product Description */}
          <motion.div variants={itemVariants}>
            <label
              htmlFor="productDescription"
              className="block text-sm font-medium"
            >
              Product Description
            </label>
            <textarea
              id="productDescription"
              placeholder="Enter product description"
              value={productDetails.description}
              onChange={(e) =>
                setProductDetails({
                  ...productDetails,
                  description: e.target.value,
                })
              }
              rows="4"
              className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 placeholder-gray-400 resize-none"
            ></textarea>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full py-2 px-4 bg-emerald-600 text-white font-medium rounded-md shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150"
            variants={itemVariants}
          >
            Post Product
          </motion.button>
        </form>
      </motion.div>
    </main>
  );
};

export default CreatePost;
