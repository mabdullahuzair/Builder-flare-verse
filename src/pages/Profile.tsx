import { User, Settings, Shield, CreditCard, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function Profile() {
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
            Profile & Settings
          </h1>
          <p className="text-sm text-neutral-600 mt-1">
            Manage your account and preferences
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-brand-secondary to-brand-primary flex items-center justify-center">
            <User size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-3">
            Profile & Settings
          </h2>
          <p className="text-neutral-600 mb-8 max-w-sm mx-auto">
            Coming soon! Manage your profile, preferences, security settings,
            and subscription options.
          </p>

          <div className="grid grid-cols-1 gap-4 max-w-xs mx-auto">
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-neutral-100">
              <User size={20} className="text-brand-primary" />
              <span className="text-sm font-medium text-text-primary">
                Profile Overview
              </span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-neutral-100">
              <Settings size={20} className="text-brand-primary" />
              <span className="text-sm font-medium text-text-primary">
                Preferences
              </span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-neutral-100">
              <Shield size={20} className="text-brand-primary" />
              <span className="text-sm font-medium text-text-primary">
                Security & Privacy
              </span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-neutral-100">
              <CreditCard size={20} className="text-brand-primary" />
              <span className="text-sm font-medium text-text-primary">
                Subscription
              </span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-neutral-100">
              <Info size={20} className="text-brand-primary" />
              <span className="text-sm font-medium text-text-primary">
                About & Legal
              </span>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
