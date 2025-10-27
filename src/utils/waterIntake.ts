export type Gender = 'male' | 'female'
export type ActivityLevel =
  | 'sedentary'
  | 'light'
  | 'moderate'
  | 'active'
  | 'very_active'

export interface WaterIntakeInput {
  weight: number
  height: number
  age: number
  gender: Gender
  activityLevel: ActivityLevel
}

export interface WaterIntakeResult {
  baselineWaterIntake: number // in ml (1.0 ml/kcal)
  recommendedWaterIntake: number // in ml (1.5 ml/kcal)
  bmr: number // Basal Metabolic Rate in kcal
  tdee: number // Total Daily Energy Expenditure in kcal
  litersBaseline: number
  litersRecommended: number
}

export function calculateWaterIntake(
  input: WaterIntakeInput
): WaterIntakeResult {
  const { weight, height, age, gender, activityLevel } = input

  // Step 1: Calculate BMR using Mifflin-St Jeor Equation (most accurate for modern populations)
  let bmr: number
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161
  }

  // Step 2: Apply Physical Activity Level (PAL) multiplier
  const palMultipliers: Record<ActivityLevel, number> = {
    sedentary: 1.2, // Little or no exercise
    light: 1.375, // Light exercise 1-3 days/week
    moderate: 1.55, // Moderate exercise 3-5 days/week
    active: 1.725, // Hard exercise 6-7 days/week
    very_active: 1.9, // Very hard exercise, physical job, or training twice per day
  }

  const tdee = bmr * palMultipliers[activityLevel]

  // Step 3: Calculate water intake based on TDEE
  // 1.0 ml/kcal for baseline
  // 1.5 ml/kcal for recommended (accounts for variations)
  const baselineWaterIntake = tdee * 1.0
  const recommendedWaterIntake = tdee * 1.5

  return {
    baselineWaterIntake: Math.round(baselineWaterIntake),
    recommendedWaterIntake: Math.round(recommendedWaterIntake),
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    litersBaseline: Math.round((baselineWaterIntake / 1000) * 10) / 10,
    litersRecommended: Math.round((recommendedWaterIntake / 1000) * 10) / 10,
  }
}
