import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight } from 'lucide-react';
import { blogPosts as localPosts } from '@/data/blogData';

const BlogPage = () => {
  const [posts, setPosts] = useState(localPosts);

  return (
    <>
      <Helmet>
        <title>Blog - Gizem Hoca Pilates</title>
        <meta name="description" content="Pilates, sağlık ve iyi yaşam üzerine yazılar." />
      </Helmet>

      <div className="border-b-2 border-brand-black p-8 lg:p-12">
        <p className="text-[10px] font-black tracking-widest text-brand-black/40 mb-3">GİZEM HOCA PİLATES</p>
        <h1 className="text-5xl md:text-7xl font-black text-brand-black leading-none tracking-tighter">BLOG</h1>
      </div>

      <div className="divide-y-2 divide-black/10">
        {posts.map((post, i) => (
          <motion.div key={post.id}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.07 }}
            className="group">
            <Link to={`/blog/${post.id}`} className="grid grid-cols-1 md:grid-cols-4 p-8 lg:p-12 hover:bg-brand-black/[0.02] transition-colors gap-6">
              <div className="md:col-span-1">
                <p className="text-[10px] font-black tracking-widest text-brand-black/40">{post.date}</p>
                <p className="text-[10px] font-black tracking-widest text-brand-black/30 mt-1">{post.category?.toUpperCase()}</p>
              </div>
              <div className="md:col-span-3">
                <h2 className="text-2xl font-black text-brand-black group-hover:text-brand-black/50 transition-colors tracking-tight mb-3">{post.title}</h2>
                <p className="text-sm text-brand-black/55 leading-relaxed mb-4">{post.summary}</p>
                <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-brand-black border-b-2 border-brand-black pb-0.5 group-hover:text-brand-black/40 transition-colors">
                  DEVAMINI OKU <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default BlogPage;
