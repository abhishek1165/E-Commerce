import axios from "axios";
import React from "react";
import { motion } from "framer-motion";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";

const Posts = ({ user }) => {
  const [posts, setPosts] = React.useState([]);

  console.table("user", user);

  React.useEffect(() => {
    async function fetchPosts() {
      try {
        const fetchPosts = await axios.get("http://localhost:5000/getPosts");
        if (fetchPosts.data.ok) {
          setPosts(fetchPosts.data.everyPost);
          console.table("PPosta", fetchPosts.data.everyPost);
        } else {
          console.error("Failed to fetch posts.");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchPosts();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  return (
    <main className="min-h-screen bg-gray-900 text-gray-200 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-400 mb-6 text-center">
          Recent Posts
        </h1>

        {/* Posts Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {posts.map((post, index) => (
            <PostItem
              user={user}
              post={post}
              cardVariants={cardVariants}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </main>
  );
};

const PostItem = ({ cardVariants, user, post, index }) => {
  const [isClicked, setClicked] = React.useState(false);
  return (
    <motion.div
      key={index}
      className="bg-gray-800 relative rounded-lg shadow p-4 flex flex-col gap-3"
      variants={cardVariants}
    >
      <div onClick={() => {
        setClicked(prevState => !prevState);
      }} className="absolute right-5 top-5">
        {!isClicked ? <IoIosHeartEmpty size={20} /> : <IoMdHeart size={20} />}
      </div>
      {/* Username */}
      <div className="text-sm font-medium text-emerald-400">
        Posted by: {user.userName}
      </div>

      {/* Title */}
      <div className="text-xl font-bold text-white">{post.title}</div>

      {/* Product Name */}
      <div className="text-sm text-gray-400">Product: {post.name}</div>

      {/* Description */}
      <p className="text-gray-300 text-sm">{post.description}</p>
    </motion.div>
  );
};

export default Posts;
