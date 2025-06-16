import { motion } from "framer-motion";

interface CalorieMacroRingProps {
  calories: number;
  targetCalories: number;
  protein: number;
  targetProtein: number;
  carbs: number;
  targetCarbs: number;
  fats: number;
  targetFats: number;
}

export function CalorieMacroRing({
  calories = 1250,
  targetCalories = 2100,
  protein = 95,
  targetProtein = 150,
  carbs = 140,
  targetCarbs = 200,
  fats = 45,
  targetFats = 80,
}: CalorieMacroRingProps) {
  const caloriePercentage = Math.min((calories / targetCalories) * 100, 100);
  const proteinPercentage = Math.min((protein / targetProtein) * 100, 100);
  const carbsPercentage = Math.min((carbs / targetCarbs) * 100, 100);
  const fatsPercentage = Math.min((fats / targetFats) * 100, 100);

  const circumference = 2 * Math.PI * 45; // radius = 45
  const offset = circumference - (caloriePercentage / 100) * circumference;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">
          Today's Goal
        </h3>
        <span className="text-sm text-neutral-500">
          {Math.round(caloriePercentage)}%
        </span>
      </div>

      <div className="flex items-center justify-center relative">
        {/* Main Calorie Ring */}
        <div className="relative w-32 h-32">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#F1F5F9"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle with gradient */}
            <defs>
              <linearGradient
                id="calorieGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#2FA4FF" />
                <stop offset="100%" stopColor="#36C9B0" />
              </linearGradient>
            </defs>
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#calorieGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-text-primary">
              {calories.toLocaleString()}
            </span>
            <span className="text-xs text-neutral-500">
              of {targetCalories.toLocaleString()}
            </span>
            <span className="text-xs font-medium text-neutral-600 mt-1">
              calories
            </span>
          </div>
        </div>
      </div>

      {/* Macro breakdown */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <div className="w-full bg-neutral-100 rounded-full h-2 mb-2">
            <motion.div
              className="bg-success h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${proteinPercentage}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          <div className="text-sm font-medium text-text-primary">
            {protein}g
          </div>
          <div className="text-xs text-neutral-500">Protein</div>
        </div>

        <div className="text-center">
          <div className="w-full bg-neutral-100 rounded-full h-2 mb-2">
            <motion.div
              className="bg-warning h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${carbsPercentage}%` }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
          <div className="text-sm font-medium text-text-primary">{carbs}g</div>
          <div className="text-xs text-neutral-500">Carbs</div>
        </div>

        <div className="text-center">
          <div className="w-full bg-neutral-100 rounded-full h-2 mb-2">
            <motion.div
              className="bg-brand-primary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${fatsPercentage}%` }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </div>
          <div className="text-sm font-medium text-text-primary">{fats}g</div>
          <div className="text-xs text-neutral-500">Fats</div>
        </div>
      </div>
    </div>
  );
}
