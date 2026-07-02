import { motion } from 'framer-motion';
import { ArrowRight, Calendar, ArrowUpRight } from 'lucide-react';

const posts = [
  {
    title: 'Introducing Dardcor Code 1.0',
    excerpt: 'The first agent-first IDE is now available. Meet the next generation of autonomous development.',
    date: 'June 15, 2026',
    category: 'Product',
    href: 'https://github.com/Dardcor/Dardcor-Code/releases',
  },
  {
    title: 'Building a REST API with Dardcor Code',
    excerpt: 'Watch an agent autonomously plan, build, and deploy a complete REST API with authentication in minutes.',
    date: 'June 10, 2026',
    category: 'Tutorial',
    href: 'https://github.com/Dardcor/Dardcor-Code',
  },
  {
    title: 'Dardcor Code Is Now Open Source',
    excerpt: 'We are open-sourcing the core platform. Join the community and help shape the future of agentic development.',
    date: 'June 5, 2026',
    category: 'Announcement',
    href: 'https://github.com/Dardcor/Dardcor-Code',
  },
  {
    title: 'How We Built Dardcor Code',
    excerpt: 'Behind the scenes: architecture decisions, challenges, and lessons learned building an agent-first platform.',
    date: 'May 28, 2026',
    category: 'Engineering',
    href: 'https://github.com/Dardcor/Dardcor-Code',
  },
];

export default function Blog() {
  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

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
          className="flex items-end justify-between mb-12 sm:mb-16"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-text-primary tracking-tight">
              Latest <span className="text-gradient">updates</span>
            </h2>
            <p className="mt-2 text-text-secondary text-base sm:text-lg">
              News, tutorials, and insights from the Dardcor team.
            </p>
          </div>
          <a
            href="https://github.com/Dardcor/Dardcor-Code/releases"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-dc-400 hover:text-dc-300 transition-colors group"
          >
            View all posts 
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        <div className="flex flex-col gap-6 sm:gap-8">
          {/* Featured Post */}
          <motion.a
            href={featuredPost.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="blog-card group relative block overflow-hidden p-6 sm:p-10 lg:p-12 transition-all hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-dc-500/10"
          >
            {/* Visual gradient bar on top for featured post */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-dc-500 via-dc-400 to-transparent opacity-70" />
            
            {/* Glass gradient overlay background */}
            <div className="absolute inset-0 bg-gradient-to-br from-dc-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 max-w-3xl">
              <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-dc-400 mb-4 sm:mb-5">
                {featuredPost.category}
              </span>
              
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-text-primary mb-4 font-serif group-hover:text-dc-300 transition-colors leading-tight">
                  {featuredPost.title}
                </h3>
                <ArrowUpRight 
                  size={24} 
                  className="text-dc-400 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 shrink-0 hidden sm:block" 
                />
              </div>

              <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-6 sm:mb-8 line-clamp-2 sm:line-clamp-none max-w-2xl">
                {featuredPost.excerpt}
              </p>

              <div className="flex items-center gap-2 text-sm text-text-tertiary font-medium">
                <Calendar size={14} className="text-dc-400" />
                <time dateTime={featuredPost.date}>{featuredPost.date}</time>
              </div>
            </div>
          </motion.a>

          {/* Grid Posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {gridPosts.map((post, i) => (
              <motion.a
                key={post.title}
                href={post.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                className="blog-card group block p-6 transition-all hover:-translate-y-1.5 hover:shadow-xl hover:shadow-dc-500/5"
              >
                <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-dc-400 mb-4">
                  {post.category}
                </span>

                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-lg font-semibold text-text-primary font-serif group-hover:text-dc-300 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <ArrowUpRight 
                    size={18} 
                    className="text-dc-400 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 shrink-0" 
                  />
                </div>

                <p className="text-sm text-text-secondary leading-relaxed mb-6 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-text-tertiary mt-auto">
                  <Calendar size={12} className="text-dc-400" />
                  <time dateTime={post.date}>{post.date}</time>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Mobile View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="sm:hidden mt-10 text-center"
        >
          <a
            href="https://github.com/Dardcor/Dardcor-Code/releases"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center w-full gap-2 py-3 px-4 rounded-lg bg-surface border border-border text-sm font-medium text-text-primary hover:border-dc-500/50 hover:text-dc-300 transition-all active:scale-[0.98]"
          >
            View all posts <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}