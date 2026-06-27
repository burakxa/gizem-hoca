import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from '@/data/blogData';

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } }
};

const BlogPostPage = () => {
  const { postId } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(postId));

  if (!post) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-brand-lime text-brand-black">
        <h1 className="text-3xl font-bold">Yazı bulunamadı.</h1>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - Gizem Hoca Pilates</title>
        <meta name="description" content={post.summary} />
      </Helmet>
      <motion.div
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full p-8 lg:p-16 flex flex-col justify-start min-h-screen overflow-y-auto bg-brand-lime"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Link to="/blog" className="flex items-center text-brand-black font-bold hover:text-white transition-colors">
            <ArrowLeft size={18} className="mr-2" />
            Tüm Yazılara Geri Dön
          </Link>
        </motion.div>
        
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-sm font-bold text-brand-black">{post.date} / {post.category}</p>
          <h1 className="text-4xl md:text-5xl font-black text-brand-black leading-none tracking-tighter mt-2 mb-8">{post.title}</h1>
          <div 
            className="prose prose-lg max-w-none text-brand-black font-medium"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.article>
      </motion.div>
    </>
  );
};

export default BlogPostPage;