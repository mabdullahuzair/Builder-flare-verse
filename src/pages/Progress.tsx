import { TrendingUp, Award, Brain } from "lucide-react";
import { motion } from "framer-motion";

export default function Progress() {
  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-neutral-100"
      >
        <div className="px-4 py-4 max-w-lg mx-auto">
          <h1 className="text-xl font-bold text-text-primary">
            Progress & Insights
          </h1>
          <p className="text-sm text-neutral-600 mt-1">
            Track your health journey
          </p>
        </div>
      </motion.header>

      {/* Placeholder Content */}
      <main className="px-4 py-8 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-warning to-brand-secondary flex items-center justify-center">
            <TrendingUp size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-3">
            Progress Analytics
          </h2>
          <p className="text-neutral-600 mb-8 max-w-sm mx-auto">
            Coming soon! Comprehensive charts, achievements, and AI-powered
            insights to track your health progress.
          </p>

          <div className="grid grid-cols-1 gap-4 max-w-xs mx-auto">
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-neutral-100">
              <TrendingUp size={20} className="text-warning" />
              <span className="text-sm font-medium text-text-primary">
                Metrics & Charts
              </span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-neutral-100">
              <Award size={20} className="text-warning" />
              <span className="text-sm font-medium text-text-primary">
                Achievements
              </span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-neutral-100">
              <Brain size={20} className="text-warning" />
              <span className="text-sm font-medium text-text-primary">
                AI Commentary
              </span>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
