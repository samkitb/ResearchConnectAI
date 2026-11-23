import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, Send, ShieldCheck, ArrowRight } from 'lucide-react';
import ImpactStats from './ImpactStats';

const words = ['Assistant.', 'Helper.', 'Partner.', 'Companion.', 'Navigator.', 'Ally.'];

const steps = [
  { icon: Search, title: 'Search', text: 'Pick a university and a field of study.' },
  { icon: Sparkles, title: 'Discover', text: 'We surface professors and enrich them with real publications from OpenAlex.' },
  { icon: Send, title: 'Reach out', text: 'Generate a personalized email grounded in their actual research.' },
];

const features = [
  { icon: '🎯', title: 'Smart Matching', text: 'AI matches you with faculty based on your field and research interests.' },
  { icon: '✅', title: 'Verified Contacts', text: 'Up-to-date faculty contact info gathered from university sites.' },
  { icon: '📧', title: 'Easy Outreach', text: 'Personalized email drafts and tips to start meaningful conversations.' },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayedText(currentWord.substring(0, charIndex - 1));
        setCharIndex((p) => p - 1);
      } else {
        setDisplayedText(currentWord.substring(0, charIndex + 1));
        setCharIndex((p) => p + 1);
      }
      if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      }
      if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setWordIndex((p) => (p + 1) % words.length);
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <div className="min-h-screen page-bg overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl animate-float" />
        <div className="pointer-events-none absolute top-20 -right-24 h-80 w-80 rounded-full bg-fuchsia-300/25 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow animate-slide-up"><Sparkles className="h-3.5 w-3.5" /> AI-powered research mentor discovery</span>
          <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 animate-slide-up">
            Research <span className="gradient-text italic">{displayedText}</span>
            <span className="animate-pulse text-brand-500">|</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto animate-slide-up">
            Find professors at top universities, see what they actually publish, and send an outreach email that gets read.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <button onClick={() => navigate('/finder')} className="btn-primary text-lg px-8 py-4">
              Find Faculty <ArrowRight className="h-5 w-5" />
            </button>
            <button onClick={() => navigate('/about')} className="btn-secondary text-lg px-8 py-4">
              Learn More
            </button>
          </div>
          <p className="mt-5 text-sm text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-500" /> Free to use · Real publication data from OpenAlex
          </p>
        </div>
      </section>

      {/* Live impact */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ImpactStats />
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white/60 border-y border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">How it works</h2>
            <p className="mt-3 text-slate-600">From idea to inbox in three steps.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="glass card-hover rounded-2xl p-8 relative">
                <span className="absolute top-5 right-6 text-5xl font-black text-brand-100 select-none">{i + 1}</span>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-white flex items-center justify-center shadow-soft">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Why choose ResearchConnect?</h2>
            <p className="mt-3 text-slate-600">Everything you need to start a research conversation.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="glass card-hover rounded-2xl p-8 text-center">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-600">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-brand-600 via-violet-600 to-fuchsia-600 p-10 md:p-14 text-center text-white shadow-lift">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Ready to find your research mentor?</h2>
            <p className="mt-3 text-white/85 max-w-xl mx-auto">Search any university and field, and send your first email today.</p>
            <button onClick={() => navigate('/finder')} className="mt-8 inline-flex items-center gap-2 bg-white text-brand-700 font-semibold px-8 py-4 rounded-xl hover:bg-brand-50 active:scale-[0.98] transition">
              Get started <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
