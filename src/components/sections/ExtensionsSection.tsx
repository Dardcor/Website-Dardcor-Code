import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Blocks,
  ArrowUpRight,
  Download,
  Star,
  Search,
  CheckCircle2,
  Terminal,
  Database,
  Cloud,
  Cpu,
  GitBranch,
  CreditCard,
  Layers,
  Sparkles,
} from 'lucide-react';

interface ExtensionItem {
  id: string;
  name: string;
  publisher: string;
  description: string;
  category: 'Languages' | 'Cloud' | 'Tools' | 'Data';
  downloads: string;
  rating: string;
  icon: typeof Terminal;
  verified: boolean;
}

const extensionsList: ExtensionItem[] = [
  {
    id: 'python',
    name: 'Python',
    publisher: 'Microsoft',
    description: 'Rich support for the Python language including linting, debugging, code navigation, and IntelliSense.',
    category: 'Languages',
    downloads: '105M',
    rating: '4.8',
    icon: Terminal,
    verified: true,
  },
  {
    id: 'stripe',
    name: 'Stripe',
    publisher: 'Stripe',
    description: 'Generate code, manage webhook events, and test your Stripe payment integration directly from Dardcor Code.',
    category: 'Tools',
    downloads: '850K',
    rating: '4.9',
    icon: CreditCard,
    verified: true,
  },
  {
    id: 'cpp',
    name: 'C/C++',
    publisher: 'Microsoft',
    description: 'C/C++ IntelliSense, debugging, and code browsing for GCC, Clang, and MSVC toolchains.',
    category: 'Languages',
    downloads: '68M',
    rating: '4.6',
    icon: Cpu,
    verified: true,
  },
  {
    id: 'jupyter',
    name: 'Jupyter',
    publisher: 'Microsoft',
    description: 'Jupyter notebook support, interactive computing, and data visualization natively inside the editor.',
    category: 'Data',
    downloads: '74M',
    rating: '4.7',
    icon: Layers,
    verified: true,
  },
  {
    id: 'gitlens',
    name: 'GitLens',
    publisher: 'GitKraken',
    description: 'Supercharge Git with inline blame annotations, repository heatmaps, and rich visual history tracking.',
    category: 'Tools',
    downloads: '38M',
    rating: '4.8',
    icon: GitBranch,
    verified: true,
  },
  {
    id: 'csharp',
    name: 'C# Dev Kit',
    publisher: 'Microsoft',
    description: 'Official C# language support, solution explorer, and testing tools for modern .NET cross-platform developers.',
    category: 'Languages',
    downloads: '18M',
    rating: '4.7',
    icon: Terminal,
    verified: true,
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    publisher: 'MongoDB Inc.',
    description: 'Connect to MongoDB databases, navigate collections, prototype aggregation queries, and view documents.',
    category: 'Data',
    downloads: '2.5M',
    rating: '4.8',
    icon: Database,
    verified: true,
  },
  {
    id: 'azure-copilot',
    name: 'GitHub Copilot for Azure',
    publisher: 'Microsoft',
    description: 'Deploy, troubleshoot, and manage Azure cloud resources and container workloads with AI agent assistance.',
    category: 'Cloud',
    downloads: '4.2M',
    rating: '4.8',
    icon: Cloud,
    verified: true,
  },
  {
    id: 'remote-dev',
    name: 'Remote Development',
    publisher: 'Microsoft',
    description: 'Open any folder in a container, on a remote SSH server, or in WSL with full editor capabilities.',
    category: 'Tools',
    downloads: '26M',
    rating: '4.9',
    icon: Sparkles,
    verified: true,
  },
];

const containerAnim: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const itemAnim: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ExtensionsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Languages', 'Cloud', 'Tools', 'Data'];

  const filteredExtensions = extensionsList.filter((ext) => {
    const matchesCategory = selectedCategory === 'All' || ext.category === selectedCategory;
    const matchesSearch =
      ext.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ext.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="extensions"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden"
    >
      <motion.div
        variants={containerAnim}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="flex flex-col gap-10"
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <motion.div variants={itemAnim} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dc-500/10 border border-dc-500/20 text-dc-600 text-xs font-medium mb-4">
              <Blocks className="w-3.5 h-3.5" />
              <span>Ecosystem</span>
            </motion.div>
            <motion.h2
              variants={itemAnim}
              className="text-3xl sm:text-4xl font-display font-bold text-text-primary tracking-tight"
            >
              Code with extensions
            </motion.h2>
            <motion.p
              variants={itemAnim}
              className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed"
            >
              Customize and enhance your editing experience with over 80k+ extensions created by the vibrant open source community.
            </motion.p>
          </div>

          {/* Search & Filter Controls */}
          <motion.div variants={itemAnim} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search extensions..."
                className="w-full sm:w-56 pl-9 pr-3 py-1.5 rounded-lg bg-surface-card border border-border-default text-text-primary text-xs focus:outline-none focus:border-dc-600 focus:ring-1 focus:ring-dc-600"
              />
            </div>
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-dc-600 text-white'
                      : 'bg-surface-card text-text-secondary hover:text-text-primary hover:bg-surface-base border border-border-default'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Extensions Grid */}
        <motion.div
          variants={containerAnim}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredExtensions.map((ext) => {
            const Icon = ext.icon;
            return (
              <motion.div
                key={ext.id}
                variants={itemAnim}
                className="group p-5 rounded-xl border border-border-default bg-surface-card hover:border-border-hover hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-base border border-border-default flex items-center justify-center text-dc-600 group-hover:scale-105 transition-transform flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary text-sm flex items-center gap-1.5">
                          <span>{ext.name}</span>
                          {ext.verified && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-dc-500 fill-dc-500/20" />
                          )}
                        </h3>
                        <p className="text-xs text-text-muted">{ext.publisher}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-surface-base text-text-muted border border-border-default">
                      {ext.category}
                    </span>
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-2 sm:line-clamp-3 mb-4">
                    {ext.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border-default text-xs text-text-muted">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" />
                      <span>{ext.downloads}</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{ext.rating}</span>
                    </span>
                  </div>
                  <span className="text-[11px] text-dc-600 font-medium group-hover:underline">Install</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Marketplace Footer Link */}
        <motion.div variants={itemAnim} className="text-center pt-4">
          <a
            href="https://marketplace.visualstudio.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-dc-600 hover:text-dc-500 font-medium transition-colors group"
          >
            <span>View 80k+ extensions in the Extension Marketplace</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
