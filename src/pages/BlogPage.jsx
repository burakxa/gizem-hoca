import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { supabase } from '@/lib/supabase';
import { blogPosts as localPosts } from '@/data/blogData';

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } }
};

const BlogPage = () => {
  const [posts, setPosts] = useState(localPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('blog_posts').select('*').eq('published', true).order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (data && data.length > 0) setPosts(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog - Gizem Hoca Pilates</title>
        <meta name="description" content="Pilates, sağlık ve iyi yaşam üzerine en güncel yazılar." />
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

        {loading ? (
          <div className="space-y-8">
            {[1,2,3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-3 w-32 bg-brand-black/10 rounded mb-3" />
                <div className="h-7 w-3/4 bg-brand-black/10 rounded mb-2" />
                <div className="h-4 w-1/2 bg-brand-black/10 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-10">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <Link to={`/blog/${post.id}`} className="block group">
                  <p className="text-sm font-bold text-brand-black/50">{post.date} · {post.category}</p>
                  <h2 className="text-3xl font-black tracking-tight mt-1 group-hover:text-white transition-colors">{post.title}</h2>
                  <p className="text-base font-medium mt-2 text-brand-black/70">{post.summary}</p>
                  <span className="font-bold mt-3 inline-block group-hover:text-white transition-colors">Devamını Oku →</span>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </>
  );
};

export default BlogPage;
