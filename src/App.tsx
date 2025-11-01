import { useState } from 'react'
import { FaBottleWater } from 'react-icons/fa6'
import { IoMdWarning } from 'react-icons/io'

type Gender = 'male' | 'female'
type ActivityLevel =
  | 'sedentary'
  | 'light'
  | 'moderate'
  | 'active'
  | 'very_active'

interface WaterIntakeParams {
  weight: number
  height: number
  age: number
  gender: Gender
  activityLevel: ActivityLevel
}

interface WaterIntakeResult {
  litersRecommended: number
  litersBaseline: number
  tdee: number
}

function calculateWaterIntake(params: WaterIntakeParams): WaterIntakeResult {
  const { weight, height, age, gender, activityLevel } = params

  // Calculate BMR using Mifflin-St Jeor Equation
  let bmr: number
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161
  }

  // Activity multipliers
  const activityMultipliers: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  }

  const tdee = Math.round(bmr * activityMultipliers[activityLevel])

  // Base water intake: 30-35ml per kg of body weight
  const litersBaseline = Math.round(weight * 0.033 * 10) / 10

  // Add extra water based on activity (500ml per 1000 kcal above baseline)
  const extraWater = Math.round(((tdee - bmr) / 1000) * 0.5 * 10) / 10
  const litersRecommended = Math.round((litersBaseline + extraWater) * 10) / 10

  return {
    litersRecommended,
    litersBaseline,
    tdee,
  }
}

function App() {
  const [weight, setWeight] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const [age, setAge] = useState<number>(0)
  const [error, setError] = useState<string>('')
  const [touched, setTouched] = useState({
    weight: false,
    height: false,
    age: false,
  })
  const [gender, setGender] = useState<Gender>('male')
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('sedentary')
  const [result, setResult] = useState<WaterIntakeResult | null>(null)

  const handleCalculate = () => {
    // Mark all fields as touched
    setTouched({ weight: true, height: true, age: true })

    if (weight > 0 && height > 0 && age > 0) {
      setError('')
      setResult(
        calculateWaterIntake({ weight, height, age, gender, activityLevel })
      )
    } else {
      setError('All fields must be filled with valid values')
    }
  }

  const isWeightInvalid = touched.weight && weight <= 0
  const isHeightInvalid = touched.height && height <= 0
  const isAgeInvalid = touched.age && age <= 0

  return (
    <main className="container mx-auto max-w-4xl flex flex-col items-center justify-center min-h-screen gap-20 px-4 py-8">
      <span>
        <img src="logo.png" className="flex items-center" alt="Logo" />
      </span>
      <div className="flex flex-col items-center text-center gap-5 w-full max-w-2xl">
        <h2 className="text-xl">Enter your details</h2>
        {error !== '' && (
          <p className="flex items-center gap-2 error">
            <IoMdWarning size={24} className="error" />
            {error}
          </p>
        )}
        <div className="grid gap-4 grid-cols-2 w-full">
          <div className="flex flex-col gap-2 text-left">
            <label htmlFor="weight" className="text-sm font-medium">
              Weight (kg)
            </label>
            <input
              id="weight"
              placeholder="70"
              type="number"
              min="0"
              value={weight || ''}
              onChange={(e) => setWeight(Number(e.target.value))}
              onBlur={() => setTouched((prev) => ({ ...prev, weight: true }))}
              className={`bg-white/10 border px-4 py-3 w-full rounded ${
                isWeightInvalid ? 'border-red-500 border-2' : 'border-gray-300'
              }`}
            />
          </div>

          <div className="flex flex-col gap-2 text-left">
            <label htmlFor="height" className="text-sm font-medium">
              Height (cm)
            </label>
            <input
              id="height"
              placeholder="175"
              type="number"
              min="0"
              value={height || ''}
              onChange={(e) => setHeight(Number(e.target.value))}
              onBlur={() => setTouched((prev) => ({ ...prev, height: true }))}
              className={`bg-white/10 border px-4 py-3 w-full rounded ${
                isHeightInvalid ? 'border-red-500 border-2' : 'border-gray-300'
              }`}
            />
          </div>

          <div className="flex flex-col gap-2 text-left">
            <label htmlFor="age" className="text-sm font-medium">
              Age (years)
            </label>
            <input
              id="age"
              placeholder="30"
              type="number"
              min="0"
              value={age || ''}
              onChange={(e) => setAge(Number(e.target.value))}
              onBlur={() => setTouched((prev) => ({ ...prev, age: true }))}
              className={`bg-white/10 border px-4 py-3 w-full rounded ${
                isAgeInvalid ? 'border-red-500 border-2' : 'border-gray-300'
              }`}
            />
          </div>

          <div className="flex flex-col gap-2 text-left">
            <label htmlFor="gender" className="text-sm font-medium">
              Gender
            </label>
            <select
              id="gender"
              className="bg-white/10 border border-gray-300 px-4 py-3 w-full rounded appearance-none"
              value={gender}
              onChange={(e) => setGender(e.target.value as Gender)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 text-left col-span-2">
            <label htmlFor="activity" className="text-sm font-medium">
              Activity Level
            </label>
            <select
              id="activity"
              className="bg-white/10 appearance-none border border-gray-300 px-4 py-3 w-full rounded"
              value={activityLevel}
              onChange={(e) =>
                setActivityLevel(e.target.value as ActivityLevel)
              }
            >
              <option value="sedentary">
                Sedentary (little or no exercise)
              </option>
              <option value="light">Light (exercise 1-3 days/week)</option>
              <option value="moderate">
                Moderate (exercise 3-5 days/week)
              </option>
              <option value="active">Active (exercise 6-7 days/week)</option>
              <option value="very_active">
                Very Active (intense exercise daily)
              </option>
            </select>
          </div>
        </div>

        <button
          className="bg-accent p-4 tracking-wide text-white flex items-center justify-center gap-2 w-full hover:cursor-pointer hover:bg-accent/70 duration-200 transition-all rounded mt-4"
          onClick={handleCalculate}
        >
          Calculate Water Intake <FaBottleWater />
        </button>

        {result && (
          <div className="mt-6 p-6 bg-white/10 border border-gray-300 w-full rounded">
            <p className="text-2xl font-bold mb-2">
              {result.litersRecommended}L per day
            </p>
            <p className="text-sm opacity-70">Recommended daily water intake</p>
            <div className="mt-4 text-left text-sm space-y-1 opacity-60">
              <p>Baseline: {result.litersBaseline}L</p>
              <p>Your TDEE: {result.tdee} kcal/day</p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default App
