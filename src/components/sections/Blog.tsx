import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const posts = [
  {
    title: 'Building a Multi-Agent System with Dardcor Manager',
    excerpt: 'Learn how to orchestrate multiple agents across distributed workspaces — parallel execution, task delegation, and real-time coordination.',
    date: 'July 8, 2026',
    category: 'Engineering',
    readTime: '12 min read',
    href: '#',
  },
  {
    title: 'Dardcor Code 1.0: Architecture and Design Decisions',
    excerpt: 'A deep dive into the agent execution engine, the verification pipeline, and how we keep agent actions safe and deterministic.',
    date: 'June 28, 2026',
    category: 'Engineering',
    readTime: '8 min read',
    href: '#',
  },
  {
    title: 'From Issue to PR: A Complete Workflow Walkthrough',
    excerpt: 'Follow along as Dardcor Code takes a GitHub issue through planning, implementation, testing, and pull request — autonomously.',
    date: 'June 20, 2026',
    category: 'Tutorial',
    readTime: '6 min read',
    href: '#',
  },
  {
    title: 'Enterprise Deployment Guide: On-Premise and Air-Gapped',
    excerpt: 'A technical guide to deploying Dardcor agents in enterprise environments with strict security and compliance requirements.',
    date: 'June 12, 2026',
    category: 'Guides',
    readTime: '15 min read',
    href: '#',
  },
];

function BlogCard({ post, index, featured }: { post: typeof posts[0]; index: number; featured: boolean }) {
  return (
    <motion.a
      href={post.href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: featured ? 0 : 0.08 * index }}
      className={`card-base group block relative overflow-hidden ${
        featured ? 'p-6 sm:p-10 hover:-translate-y-1' : 'p-6 hover:-translate-y-0.5'
      }`}
    >
      {featured && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-dc-500 via-dc-400 to-transparent" />
      )}

      <div className="relative z-10">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-dc-600 mb-3">
          {post.category}
          <span className="w-px h-2.5 bg-dc-300" />
          <span className="font-normal normal-case tracking-normal text-text-tertiary">
            {post.readTime}
          </span>
        </span>

        <div className="flex items-start justify-between gap-3">
          <h3 className={`font-bold text-text-primary font-display group-hover:text-dc-600 transition-colors leading-tight ${
            featured ? 'text-2xl sm:text-3xl lg:text-4xl mb-3' : 'text-base mb-2 line-clamp-2'
          }`}>
            {post.title}
          </h3>
          <ArrowUpRight
            size={featured ? 22 : 16}
            className="text-dc-500 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 shrink-0 hidden sm:block"
          />
        </div>

        <p className={`text-text-secondary leading-relaxed mb-4 ${
          featured ? 'text-base sm:text-lg max-w-2xl' : 'text-sm line-clamp-2'
        }`}>
          {post.excerpt}
        </p>

        {featured && (
          <span className="text-xs text-text-tertiary font-medium">{post.date}</span>
        )}
      </div>

      {!featured && (
        <div className="mt-4 pt-4 border-t border-border-default">
          <span className="text-xs text-text-tertiary">{post.date}</span>
        </div>
      )}
    </motion.a>
  );
}

export default function Blog() {
  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <section id="blog" className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="section-eyebrow mb-3">Blog</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary tracking-tight">
            Engineering insights
          </h2>
          <p className="mt-1 text-text-secondary">
            Technical guides, tutorials, and deep dives from the team.
          </p>
        </motion.div>

        <div className="flex flex-col gap-5">
          <BlogCard post={featuredPost} index={0} featured={true} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {gridPosts.map((post, i) => (
              <BlogCard key={post.title} post={post} index={i + 1} featured={false} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <a
            href="https://github.com/Dardcor/Dardcor-Code"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border-default text-sm font-medium text-text-secondary hover:text-text-primary hover:border-dc-300 transition-all"
          >
            Read all articles
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
