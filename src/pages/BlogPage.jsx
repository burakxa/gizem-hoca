import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { blogPosts } from '@/data/blogData';

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } }
};

const BlogPage = () => {
  return (
    <>
      <Helmet>
        <title>Blog - Gizem Hoca Pilates</title>
        <meta name="description" content="Pilates, sağlık ve iyi yaşam üzerine en güncel yazılar, ipuçları ve motivasyon kaynakları." />
      </Helmet>
      <motion.div
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full p-8 lg:p-16 flex flex-col justify-center min-h-screen overflow-y-auto bg-brand-lime"
      >
        <motion.h1 
          className="text-5xl md:text-6xl font-black text-brand-black leading-none tracking-tighter mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Blog
        </motion.h1>
        
        <div className="space-y-10">
          {blogPosts.map((post, index) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
            >
              <Link to={`/blog/${post.id}`} className="block group">
                <p className="text-sm font-bold text-brand-black">{post.date} / {post.category}</p>
                <h2 className="text-3xl font-black tracking-tight mt-1 group-hover:text-white transition-colors">{post.title}</h2>
                <p className="text-base font-medium mt-2">{post.summary}</p>
                <span className="font-bold mt-3 inline-block group-hover:text-white transition-colors">Devamını Oku →</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default BlogPage;