import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Bug, Lightbulb, Send, CheckCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react';

type FeedbackType = 'bug' | 'feature';

interface FormData {
  type: FeedbackType;
  title: string;
  description: string;
  email: string;
  os: string;
  version: string;
}

const initialForm: FormData = {
  type: 'bug',
  title: '',
  description: '',
  email: '',
  os: '',
  version: '',
};

export default function FeedbackForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validate = (): string | null => {
    if (!form.title.trim()) return 'Please enter a title.';
    if (!form.description.trim()) return 'Please describe your feedback.';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email.';
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setSending(true);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));

    // In production, send to your backend:
    // await fetch('/api/feedback', { method: 'POST', body: JSON.stringify(form) })

    setSending(false);
    setSubmitted(true);
    setForm(initialForm);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="feedback" className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-dc-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-text-primary tracking-tight">
            Help us{' '}
            <span className="text-gradient">improve</span>
          </h2>
          <p className="mt-3 text-text-secondary max-w-lg mx-auto font-sans">
            Found a bug or have an idea? We would love to hear from you.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative glass-strong rounded-2xl border border-border-default p-6 sm:p-8 overflow-hidden"
        >
          {/* Decorative floating element */}
          <Sparkles className="absolute -top-6 -right-6 w-32 h-32 text-dc-500 opacity-10 animate-float-slow pointer-events-none" />
          
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 relative z-10"
            >
              <CheckCircle size={48} className="mx-auto text-green-400 mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-2 font-serif">Thank you!</h3>
              <p className="text-text-secondary text-sm font-sans">
                Your feedback has been submitted successfully. We will review it shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10 font-sans">
              {/* Feedback Type Toggle */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => updateField('type', 'bug')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    form.type === 'bug'
                      ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                      : 'bg-white/5 text-text-tertiary border border-border-subtle hover:bg-white/10'
                  }`}
                >
                  <Bug size={16} />
                  Bug Report
                </button>
                <button
                  type="button"
                  onClick={() => updateField('type', 'feature')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    form.type === 'feature'
                      ? 'bg-dc-500/15 text-dc-400 border border-dc-500/30'
                      : 'bg-white/5 text-text-tertiary border border-border-subtle hover:bg-white/10'
                  }`}
                >
                  <Lightbulb size={16} />
                  Feature Suggestion
                </button>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder={form.type === 'bug' ? 'Brief description of the bug...' : 'Brief description of your idea...'}
                  className="w-full bg-white/5 border border-border-subtle text-text-primary placeholder:text-text-tertiary/50 focus:border-dc-500/50 focus:ring-1 focus:ring-dc-500/20 rounded-xl px-4 py-2.5 focus:outline-none transition-all text-sm"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder={
                    form.type === 'bug'
                      ? 'Steps to reproduce, expected behavior, actual behavior...'
                      : 'Describe your feature idea in detail...'
                  }
                  className="w-full bg-white/5 border border-border-subtle text-text-primary placeholder:text-text-tertiary/50 focus:border-dc-500/50 focus:ring-1 focus:ring-dc-500/20 rounded-xl px-4 py-2.5 focus:outline-none transition-all text-sm resize-y"
                />
              </div>

              {/* Row: Email + OS + Version */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Email (optional)</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-white/5 border border-border-subtle text-text-primary placeholder:text-text-tertiary/50 focus:border-dc-500/50 focus:ring-1 focus:ring-dc-500/20 rounded-xl px-4 py-2.5 focus:outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">OS</label>
                  <select
                    value={form.os}
                    onChange={(e) => updateField('os', e.target.value)}
                    className="w-full bg-white/5 border border-border-subtle text-text-primary focus:border-dc-500/50 focus:ring-1 focus:ring-dc-500/20 rounded-xl px-4 py-2.5 focus:outline-none transition-all text-sm appearance-none"
                  >
                    <option value="" className="bg-surface-card">Select OS</option>
                    <option value="macOS" className="bg-surface-card">macOS</option>
                    <option value="Windows" className="bg-surface-card">Windows</option>
                    <option value="Linux" className="bg-surface-card">Linux</option>
                    <option value="Other" className="bg-surface-card">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Version</label>
                  <input
                    type="text"
                    value={form.version}
                    onChange={(e) => updateField('version', e.target.value)}
                    placeholder="e.g. 1.0.0"
                    className="w-full bg-white/5 border border-border-subtle text-text-primary placeholder:text-text-tertiary/50 focus:border-dc-500/50 focus:ring-1 focus:ring-dc-500/20 rounded-xl px-4 py-2.5 focus:outline-none transition-all text-sm"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 px-4 py-2.5 rounded-xl"
                >
                  <AlertCircle size={15} />
                  {error}
                </motion.div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 bg-dc-600 hover:bg-dc-500 disabled:bg-dc-600/50 text-white rounded-xl px-6 py-3 text-sm font-medium transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-dc-600/20"
              >
                {sending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Submit Feedback
                  </>
                )}
              </button>

              <p className="text-xs text-text-tertiary text-center">
                Your feedback helps us build a better Dardcor Code for everyone.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
