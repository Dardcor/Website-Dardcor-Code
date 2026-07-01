import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';

const posts = [
  {
    title: 'Introducing Dardcor Code 1.0',
    excerpt: 'The first agent-first IDE is now available. Meet the next generation of autonomous development.',
    date: 'June 15, 2026',
    category: 'Product',
    href: '#',
  },
  {
    title: 'Building a REST API with Dardcor Code',
    excerpt: 'Watch an agent autonomously plan, build, and deploy a complete REST API with authentication in minutes.',
    date: 'June 10, 2026',
    category: 'Tutorial',
    href: '#',
  },
  {
    title: 'Dardcor Code Is Now Open Source',
    excerpt: 'We are open-sourcing the core platform. Join the community and help shape the future of agentic development.',
    date: 'June 5, 2026',
    category: 'Announcement',
    href: '#',
  },
  {
    title: 'How We Built Dardcor Code',
    excerpt: 'Behind the scenes: architecture decisions, challenges, and lessons learned building an agent-first platform.',
    date: 'May 28, 2026',
    category: 'Engineering',
    href: '#',
  },
];

export default function Blog() {
  return (
    <section id="blog" className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dc-500/[0.01] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary tracking-tight">
              Latest <span className="text-gradient">updates</span>
            </h2>
            <p className="mt-2 text-text-secondary">News, tutorials, and insights from the Dardcor team.</p>
          </div>
          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-dc-400 hover:text-dc-300 transition-colors"
          >
            View all posts <ArrowRight size={14} />
          </a>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {posts.map((post, i) => (
            <motion.a
              key={post.title}
              href={post.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="blog-card group p-5 block"
            >
              {/* Category Tag */}
              <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-dc-400 mb-3">
                {post.category}
              </span>

              {/* Title */}
              <h3 className="text-base font-semibold text-text-primary mb-2 group-hover:text-dc-300 transition-colors line-clamp-2">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
                {post.excerpt}
              </p>

              {/* Date */}
              <div className="flex items-center gap-1.5 text-xs text-text-tertiary">
                <Calendar size={12} />
                {post.date}
              </div>
            </motion.a>
          ))}
        </div>

        {/* Mobile View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="sm:hidden mt-8 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm text-dc-400 hover:text-dc-300 transition-colors"
          >
            View all posts <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
