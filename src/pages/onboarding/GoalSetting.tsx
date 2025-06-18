import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Target,
  TrendingDown,
  TrendingUp,
  Minus,
  Dumbbell,
  Apple,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PrimaryGoal =
  | "lose"
  | "maintain"
  | "gain"
  | "fitness"
  | "healthy"
  | "muscle";
type WeightChangeRate = "slow" | "moderate" | "aggressive" | "custom";

interface GoalOption {
  id: PrimaryGoal;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
}

const goalOptions: GoalOption[] = [
  {
    id: "lose",
    title: "Lose Weight",
    description: "Create a calorie deficit to shed pounds safely",
    icon: TrendingDown,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    id: "maintain",
    title: "Maintain Weight",
    description: "Keep your current weight with balanced nutrition",
    icon: Minus,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    id: "gain",
    title: "Gain Weight",
    description: "Build muscle and increase weight in a healthy way",
    icon: TrendingUp,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    id: "fitness",
    title: "Improve Fitness",
    description: "Focus on strength, endurance, and overall health",
    icon: Dumbbell,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    id: "healthy",
    title: "Eat Healthier",
    description: "Make better food choices and improve nutrition",
    icon: Apple,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    id: "muscle",
    title: "Build Muscle",
    description: "Increase muscle mass and strength",
    icon: Heart,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
  },
];

const weightChangeRates = [
  {
    id: "slow" as WeightChangeRate,
    title: "Slow",
    description: "0.25 kg / 0.5 lbs per week",
    subtitle: "Gentle, sustainable progress",
    lbsPerWeek: 0.5,
    kgPerWeek: 0.25,
  },
  {
    id: "moderate" as WeightChangeRate,
    title: "Moderate",
    description: "0.5 kg / 1 lb per week",
    subtitle: "Balanced approach",
    lbsPerWeek: 1,
    kgPerWeek: 0.5,
  },
  {
    id: "aggressive" as WeightChangeRate,
    title: "Aggressive",
    description: "1 kg / 2 lbs per week",
    subtitle: "Faster results, requires dedication",
    lbsPerWeek: 2,
    kgPerWeek: 1,
  },
  {
    id: "custom" as WeightChangeRate,
    title: "Custom",
    description: "Set your own rate",
    subtitle: "Personalized pace",
    lbsPerWeek: 0,
    kgPerWeek: 0,
  },
];

export default function GoalSetting() {
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState<PrimaryGoal | null>(null);
  const [targetWeight, setTargetWeight] = useState("");
  const [selectedRate, setSelectedRate] = useState<WeightChangeRate | null>(
    null,
  );
  const [customRate, setCustomRate] = useState("");

  // Get basic info from previous step
  const basicInfo = JSON.parse(
    localStorage.getItem("macromate_basic_info") || "{}",
  );

  const handleContinue = () => {
    if (selectedGoal) {
      const goalData = {
        primaryGoal: selectedGoal,
        targetWeight: targetWeight ? parseFloat(targetWeight) : null,
        weightChangeRate: selectedRate,
        customWeightChangeRate: customRate ? parseFloat(customRate) : null,
        currentWeight: parseFloat(basicInfo.weight),
        weightUnit: basicInfo.weightUnit,
      };

      localStorage.setItem("macromate_goal_setting", JSON.stringify(goalData));
      navigate("/onboarding/activity-level");
    }
  };

  const needsTargetWeight = selectedGoal === "lose" || selectedGoal === "gain";
  const needsRate = needsTargetWeight && targetWeight;

  const isFormValid = () => {
    if (!selectedGoal) return false;
    if (needsTargetWeight && !targetWeight) return false;
    if (needsRate && !selectedRate) return false;
    if (selectedRate === "custom" && !customRate) return false;
    return true;
  };

  const getWeightChangeLabel = () => {
    if (selectedGoal === "lose") return "lose";
    if (selectedGoal === "gain") return "gain";
    return "change";
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-neutral-100 safe-area-pt"
      >
        <div className="px-4 py-4 max-w-lg mx-auto">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <ArrowLeft size={20} className="text-neutral-600" />
            </button>
            <div className="text-center">
              <h1 className="text-lg font-semibold text-text-primary">
                Goal Setting
              </h1>
              <Progress value={20} className="w-24 h-1 mt-2" />
            </div>
            <div className="w-8" />
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <main className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Welcome */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
              <Target size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              What's your primary goal?
            </h2>
            <p className="text-neutral-600">
              Choose your main objective to help us personalize your experience.
            </p>
          </div>

          {/* Goal Selection */}
          <div className="space-y-3">
            <h3 className="font-semibold text-text-primary">Primary Goal</h3>
            <div className="grid grid-cols-1 gap-3">
              {goalOptions.map((option, index) => {
                const Icon = option.icon;
                const isSelected = selectedGoal === option.id;

                return (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={`p-4 cursor-pointer transition-all ${
                        isSelected
                          ? `${option.bgColor} ${option.borderColor} border-2`
                          : "hover:border-neutral-200 border"
                      }`}
                      onClick={() => setSelectedGoal(option.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-lg ${option.bgColor} flex items-center justify-center`}
                        >
                          <Icon size={24} className={option.color} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-text-primary">
                            {option.title}
                          </h4>
                          <p className="text-sm text-neutral-600">
                            {option.description}
                          </p>
                        </div>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center"
                          >
                            <div className="w-2 h-2 rounded-full bg-white" />
                          </motion.div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Target Weight */}
          {needsTargetWeight && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <h3 className="font-semibold text-text-primary">
                What is your goal weight?
              </h3>
              <div className="relative">
                <Input
                  type="number"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value)}
                  placeholder={basicInfo.weightUnit === "lbs" ? "150" : "68"}
                  className="h-12 pr-12 text-center font-semibold text-lg"
                  step="0.1"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 text-sm">
                  {basicInfo.weightUnit}
                </span>
              </div>

              {targetWeight && basicInfo.weight && (
                <div className="p-3 bg-neutral-100 rounded-lg text-center">
                  <span className="text-sm text-neutral-600">
                    You want to {getWeightChangeLabel()}{" "}
                    <span className="font-semibold text-text-primary">
                      {Math.abs(
                        parseFloat(targetWeight) - parseFloat(basicInfo.weight),
                      ).toFixed(1)}{" "}
                      {basicInfo.weightUnit}
                    </span>
                  </span>
                </div>
              )}
            </motion.div>
          )}

          {/* Rate Selection */}
          {needsRate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              <h3 className="font-semibold text-text-primary">
                At what rate do you want to {getWeightChangeLabel()} weight?
              </h3>
              <div className="space-y-2">
                {weightChangeRates.map((rate, index) => (
                  <motion.div
                    key={rate.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                  >
                    <Card
                      className={`p-4 cursor-pointer transition-all ${
                        selectedRate === rate.id
                          ? "border-brand-primary bg-brand-primary/5 border-2"
                          : "hover:border-neutral-200 border"
                      }`}
                      onClick={() => setSelectedRate(rate.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-medium text-text-primary">
                              {rate.title}
                            </h5>
                            {rate.id !== "custom" && (
                              <span className="text-sm text-neutral-600">
                                {basicInfo.weightUnit === "lbs"
                                  ? `${rate.lbsPerWeek} lbs/week`
                                  : `${rate.kgPerWeek} kg/week`}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-neutral-600">
                            {rate.subtitle}
                          </p>
                        </div>
                        {selectedRate === rate.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-5 h-5 rounded-full bg-brand-primary flex items-center justify-center"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          </motion.div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Custom Rate Input */}
              {selectedRate === "custom" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3"
                >
                  <Label className="text-sm font-medium text-text-primary">
                    Custom rate ({basicInfo.weightUnit}/week)
                  </Label>
                  <div className="relative mt-2">
                    <Input
                      type="number"
                      value={customRate}
                      onChange={(e) => setCustomRate(e.target.value)}
                      placeholder="0.7"
                      className="h-12 pr-16 text-center"
                      step="0.1"
                      min="0.1"
                      max={basicInfo.weightUnit === "lbs" ? "3" : "1.5"}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 text-sm">
                      {basicInfo.weightUnit}/week
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-1">
                    Recommended: 0.1 to{" "}
                    {basicInfo.weightUnit === "lbs" ? "2" : "1"}{" "}
                    {basicInfo.weightUnit}/week
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="pt-4"
          >
            <Button
              onClick={handleContinue}
              disabled={!isFormValid()}
              className="w-full gradient-bg text-white h-12 font-medium rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
            >
              Continue
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
