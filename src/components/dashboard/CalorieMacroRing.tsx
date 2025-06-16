import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

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
  calories = 2310, // Updated to show overage
  targetCalories = 2100,
  protein = 95,
  targetProtein = 150,
  carbs = 140,
  targetCarbs = 200,
  fats = 45,
  targetFats = 80,
}: CalorieMacroRingProps) {
  const navigate = useNavigate();
  const caloriePercentage = Math.min((calories / targetCalories) * 100, 150); // Allow up to 150% for visualization
  const proteinPercentage = Math.min((protein / targetProtein) * 100, 100);
  const carbsPercentage = Math.min((carbs / targetCarbs) * 100, 100);
  const fatsPercentage = Math.min((fats / targetFats) * 100, 100);

  const isOverTarget = calories > targetCalories;
  const isCheatMealThreshold = calories > targetCalories * 1.1; // 110% threshold

  const circumference = 2 * Math.PI * 45; // radius = 45
  const offset =
    circumference - (Math.min(caloriePercentage, 100) / 100) * circumference;

  const handleRingClick = () => {
    if (isCheatMealThreshold) {
      navigate("/cheat-meal-balance");
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">
          Today's Goal
        </h3>
        <div className="flex items-center gap-2">
          {isCheatMealThreshold && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1"
            >
              <AlertTriangle size={16} className="text-warning" />
              <span className="text-xs text-warning font-medium">
                Cheat Meal
              </span>
            </motion.div>
          )}
          <span
            className={`text-sm ${isOverTarget ? "text-warning" : "text-neutral-500"}`}
          >
            {Math.round(caloriePercentage)}%
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center relative">
        {/* Main Calorie Ring */}
        <div
          className={`relative w-32 h-32 ${isCheatMealThreshold ? "cursor-pointer" : ""}`}
          onClick={handleRingClick}
        >
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

            {/* Progress circle with gradient or warning color */}
            <defs>
              <linearGradient
                id={isOverTarget ? "warningGradient" : "calorieGradient"}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                {isOverTarget ? (
                  <>
                    <stop offset="0%" stopColor="#FFB259" />
                    <stop offset="100%" stopColor="#FF8A65" />
                  </>
                ) : (
                  <>
                    <stop offset="0%" stopColor="#2FA4FF" />
                    <stop offset="100%" stopColor="#36C9B0" />
                  </>
                )}
              </linearGradient>
            </defs>

            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke={`url(#${isOverTarget ? "warningGradient" : "calorieGradient"})`}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: "easeOut" }}
            />

            {/* Overage indicator */}
            {isOverTarget && (
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke="#FF6B6B"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${((caloriePercentage - 100) / 100) * circumference} ${circumference}`}
                strokeDashoffset={-offset}
                initial={{ strokeDasharray: `0 ${circumference}` }}
                animate={{
                  strokeDasharray: `${(Math.max(0, caloriePercentage - 100) / 100) * circumference} ${circumference}`,
                }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                opacity={0.7}
              />
            )}
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className={`text-2xl font-bold ${isOverTarget ? "text-warning" : "text-text-primary"}`}
            >
              {calories.toLocaleString()}
            </span>
            <span className="text-xs text-neutral-500">
              of {targetCalories.toLocaleString()}
            </span>
            <span className="text-xs font-medium text-neutral-600 mt-1">
              calories
            </span>
          </div>

          {/* Cheat meal indicator */}
          {isCheatMealThreshold && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="absolute -bottom-2 -right-2 w-6 h-6 bg-warning rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
            >
              <AlertTriangle size={12} className="text-white" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Overage warning */}
      {isCheatMealThreshold && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg cursor-pointer hover:bg-warning/15 transition-colors"
          onClick={handleRingClick}
        >
          <div className="flex items-center gap-2 text-warning">
            <AlertTriangle size={16} />
            <span className="text-sm font-medium">
              Tap to balance tomorrow's calories
            </span>
          </div>
        </motion.div>
      )}

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
