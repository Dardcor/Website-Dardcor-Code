import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Bug, Lightbulb, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

type FeedbackType = 'bug' | 'feature';

interface FormData {
  type: FeedbackType;
  title: string;
  description: string;
  email: string;
}

const initialForm: FormData = {
  type: 'bug',
  title: '',
  description: '',
  email: '',
};

export default function FeedbackForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validate = (): string | null => {
    if (!form.title.trim()) return 'Enter a title for your feedback.';
    if (!form.description.trim()) return 'Describe your feedback in detail.';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Enter a valid email address.';
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
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSubmitted(true);
    setForm(initialForm);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="feedback" className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="section-eyebrow mb-3">Feedback</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary tracking-tight">
            Found a bug? Have an idea?
          </h2>
          <p className="mt-1 text-text-secondary">
            Your input shapes the roadmap. Tell us what works and what does not.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card-base p-6 sm:p-8 hover:border-dc-300 transition-colors duration-500"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <CheckCircle size={44} className="mx-auto text-dc-500 mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-1 font-display">Thank you</h3>
              <p className="text-sm text-text-secondary">
                Your feedback has been submitted. We review every submission.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => updateField('type', 'bug')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    form.type === 'bug'
                      ? 'bg-dc-50 text-dc-600 border border-dc-200'
                      : 'bg-surface-card text-text-tertiary border border-border-default hover:bg-dc-50/50'
                  }`}
                >
                  <Bug size={15} />
                  Bug Report
                </button>
                <button
                  type="button"
                  onClick={() => updateField('type', 'feature')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    form.type === 'feature'
                      ? 'bg-dc-50 text-dc-600 border border-dc-200'
                      : 'bg-surface-card text-text-tertiary border border-border-default hover:bg-dc-50/50'
                  }`}
                >
                  <Lightbulb size={15} />
                  Feature Request
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Title <span className="text-text-tertiary">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder={form.type === 'bug' ? 'Brief summary of the issue...' : 'Brief summary of your idea...'}
                  className="w-full bg-surface-card border border-border-default text-text-primary placeholder:text-text-tertiary/50 focus:border-dc-400 focus:ring-1 focus:ring-dc-200 rounded-xl px-4 py-2.5 focus:outline-none transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Description <span className="text-text-tertiary">*</span>
                </label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder={
                    form.type === 'bug'
                      ? 'Steps to reproduce, expected behavior, actual behavior...'
                      : 'Describe your idea, the problem it solves, and any implementation thoughts...'
                  }
                  className="w-full bg-surface-card border border-border-default text-text-primary placeholder:text-text-tertiary/50 focus:border-dc-400 focus:ring-1 focus:ring-dc-200 rounded-xl px-4 py-2.5 focus:outline-none transition-all text-sm resize-y"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Email <span className="text-text-tertiary">(optional)</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-surface-card border border-border-default text-text-primary placeholder:text-text-tertiary/50 focus:border-dc-400 focus:ring-1 focus:ring-dc-200 rounded-xl px-4 py-2.5 focus:outline-none transition-all text-sm"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-dc-600 bg-dc-50 px-4 py-2.5 rounded-xl border border-dc-200"
                >
                  <AlertCircle size={15} />
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={sending}
                className="group relative w-full flex items-center justify-center gap-2 bg-dc-600 hover:bg-dc-500 disabled:bg-dc-400/50 text-white rounded-xl px-6 py-3 text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-dc-600/20 active:scale-[0.99] overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {sending ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Submit Feedback
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
