interface PersonalInfo {
  age: number;
  weight: number;
  height: string;
  gender: string;
  weightUnit: string;
  heightUnit: string;
}

interface GoalData {
  primaryGoal: string;
  calorieAdjustment?: number;
  weightChangeRate?: string;
}

interface ActivityData {
  activityMultiplier: number;
}

/**
 * Calculate BMR using Mifflin-St Jeor equation
 * More accurate than Harris-Benedict for modern populations
 */
export function calculateBMR(personalInfo: PersonalInfo): number {
  if (!personalInfo.age || !personalInfo.weight || !personalInfo.height) {
    return 0;
  }

  let weightInKg = parseFloat(personalInfo.weight.toString());
  let heightInCm = 0;
  const age = parseInt(personalInfo.age.toString());
  const isMale = personalInfo.gender === "male";

  // Convert weight to kg if needed
  if (personalInfo.weightUnit === "lbs") {
    weightInKg = weightInKg / 2.205;
  }

  // Convert height to cm
  if (personalInfo.heightUnit === "ft-in") {
    if (personalInfo.height.includes("'")) {
      const parts = personalInfo.height.split("'");
      const feet = parseFloat(parts[0]);
      const inches = parseFloat(parts[1].replace('"', "")) || 0;
      heightInCm = (feet * 12 + inches) * 2.54;
    } else {
      heightInCm = parseFloat(personalInfo.height) * 30.48;
    }
  } else {
    heightInCm = parseFloat(personalInfo.height);
  }

  // Mifflin-St Jeor BMR calculation
  let bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age;

  if (isMale) {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  return Math.round(bmr);
}

/**
 * Calculate TDEE (Total Daily Energy Expenditure)
 * BMR * activity multiplier
 */
export function calculateTDEE(
  personalInfo: PersonalInfo,
  activityData: ActivityData,
): number {
  const bmr = calculateBMR(personalInfo);
  const activityMultiplier = activityData.activityMultiplier || 1.2;
  return Math.round(bmr * activityMultiplier);
}

/**
 * Calculate daily calorie goal based on goals
 * Applies deficit/surplus based on weight change goals
 */
export function calculateDailyCalories(
  personalInfo: PersonalInfo,
  goalData: GoalData,
  activityData: ActivityData,
): number {
  let tdee = calculateTDEE(personalInfo, activityData);

  // Apply goal-based calorie adjustment
  if (goalData.calorieAdjustment) {
    if (goalData.primaryGoal === "lose") {
      tdee -= goalData.calorieAdjustment;
    } else if (goalData.primaryGoal === "gain") {
      tdee += goalData.calorieAdjustment;
    }
  } else {
    // Fallback for legacy data
    if (goalData.primaryGoal === "lose") {
      tdee -= 500; // Default 1 lb/week deficit
    } else if (goalData.primaryGoal === "gain") {
      tdee += 500; // Default 1 lb/week surplus
    }
  }

  return Math.round(Math.max(tdee, 1200)); // Minimum 1200 calories for safety
}

/**
 * Calculate BMI
 */
export function calculateBMI(personalInfo: PersonalInfo): number {
  if (!personalInfo.weight || !personalInfo.height) return 0;

  let weightInKg = parseFloat(personalInfo.weight.toString());
  let heightInM = 0;

  // Convert weight to kg if needed
  if (personalInfo.weightUnit === "lbs") {
    weightInKg = weightInKg / 2.205;
  }

  // Convert height to meters
  if (personalInfo.heightUnit === "ft-in") {
    if (personalInfo.height.includes("'")) {
      const parts = personalInfo.height.split("'");
      const feet = parseFloat(parts[0]);
      const inches = parseFloat(parts[1].replace('"', "")) || 0;
      heightInM = (feet * 12 + inches) * 0.0254;
    } else {
      heightInM = parseFloat(personalInfo.height) * 0.3048;
    }
  } else {
    heightInM = parseFloat(personalInfo.height) / 100;
  }

  if (heightInM === 0) return 0;
  return weightInKg / (heightInM * heightInM);
}

/**
 * Get BMI category
 */
export function getBMICategory(bmi: number) {
  if (bmi < 18.5) return { label: "Underweight", color: "text-blue-600" };
  if (bmi < 25) return { label: "Normal", color: "text-green-600" };
  if (bmi < 30) return { label: "Overweight", color: "text-orange-600" };
  return { label: "Obese", color: "text-red-600" };
}

/**
 * Calculate macros in grams based on calories and percentages
 */
export function calculateMacroGrams(
  calories: number,
  proteinPercent: number,
  carbsPercent: number,
  fatPercent: number,
) {
  const proteinGrams = Math.round((calories * (proteinPercent / 100)) / 4);
  const carbGrams = Math.round((calories * (carbsPercent / 100)) / 4);
  const fatGrams = Math.round((calories * (fatPercent / 100)) / 9);

  return { proteinGrams, carbGrams, fatGrams };
}
