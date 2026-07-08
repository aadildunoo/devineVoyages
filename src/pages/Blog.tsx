import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { blogPosts, getFeaturedPosts } from '@/data/blogs';
import './Blog.css';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Blog() {
  const featured = getFeaturedPosts();
  const regular = blogPosts.filter(p => !p.featured);

  return (
    <>
      <SEOHead
        title="Spiritual Travel Blog — Guides, Tips & Stories"
        description="Read our travel blog for pilgrimage guides, spiritual insights, packing tips, and stories from India's sacred sites."
        canonical="/blog"
      />

      <section className="blog-hero">
        <div className="container">
          <h1>Travel Blog</h1>
          <p>Guides, stories, and spiritual insights from India's sacred sites</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Featured Posts */}
          {featured.length > 0 && (
            <div className="blog-featured">
              {featured.map(post => (
                <motion.div key={post.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                  <Link to={`/blog/${post.slug}`} className="blog-featured-card">
                    <div className="blog-featured-image">
                      {post.image ? (
                        <img src={post.image} alt={post.title} style={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                      ) : (
                        <div style={{ background: `linear-gradient(135deg, var(--maroon) 0%, var(--saffron-dark) 100%)`, width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                      )}
                      <span className="blog-featured-badge" style={{ zIndex: 1 }}>Featured</span>
                    </div>
                    <div className="blog-featured-content">
                      <span className="blog-card-category">{post.category}</span>
                      <h2>{post.title}</h2>
                      <p>{post.excerpt}</p>
                      <div className="blog-card-meta">
                        <span><Calendar size={14} /> {new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        <span><Clock size={14} /> {post.readTime} min read</span>
                      </div>
                      <span className="blog-card-cta">Read More <ArrowRight size={16} /></span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* All Posts */}
          <h2 className="blog-section-title">Latest Articles</h2>
          <div className="blog-grid">
            {regular.map(post => (
              <motion.div key={post.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <Link to={`/blog/${post.slug}`} className="blog-card">
                  <div className="blog-card-image">
                    {post.image ? (
                      <img src={post.image} alt={post.title} style={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                    ) : (
                      <div style={{ background: `linear-gradient(135deg, var(--slate-700) 0%, var(--slate-900) 100%)`, width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                    )}
                    <span className="blog-card-cat-badge">{post.category}</span>
                  </div>
                  <div className="blog-card-body">
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <div className="blog-card-meta">
                      <span><Calendar size={14} /> {new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <span><Clock size={14} /> {post.readTime} min</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
