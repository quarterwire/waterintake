import { useState } from 'react'
import { FaBottleWater } from 'react-icons/fa6'
import {
  type ActivityLevel,
  calculateWaterIntake,
  type Gender,
  type WaterIntakeResult,
} from './utils/waterIntake'

function App() {
  const [weight, setWeight] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const [age, setAge] = useState<number>(0)
  const [gender, setGender] = useState<Gender>('male')
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('sedentary')
  const [result, setResult] = useState<WaterIntakeResult | null>(null)

  const handleCalculate = () => {
    if (weight > 0 && height > 0 && age > 0) {
      setResult(
        calculateWaterIntake({ weight, height, age, gender, activityLevel })
      )
    }
  }

  return (
    <main className="container mx-auto max-w-4xl flex flex-col items-center justify-center h-screen gap-20 px-4">
      <span>
        <img src="logo.png" className="flex items-center" />
      </span>
      <div className="flex flex-col items-center text-center gap-5 w-full max-w-2xl">
        <h2 className="text-xl">Enter your details</h2>
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
              className="bg-secondary/30 border-foreground border px-4 py-3 w-full rounded"
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
              className="bg-secondary/30 border-foreground border px-4 py-3 w-full rounded"
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
              className="bg-secondary/30 border-foreground border px-4 py-3 w-full rounded"
            />
          </div>

          <div className="flex flex-col gap-2 text-left">
            <label htmlFor="gender" className="text-sm font-medium">
              Gender
            </label>
            <select
              id="gender"
              className="bg-secondary/30 border-foreground border px-4 py-3 w-full rounded appearance-none"
              value={gender}
              onChange={(e) => setGender(e.target.value as Gender)}
            >
              <option value="male" className="text-background!">
                Male
              </option>
              <option value="female" className="text-background!">
                Female
              </option>
            </select>
          </div>

          <div className="flex flex-col gap-2 text-left col-span-2">
            <label htmlFor="activity" className="text-sm font-medium">
              Activity Level
            </label>
            <select
              id="activity"
              className="bg-secondary/30 appearance-none border-foreground border px-4 py-3 w-full rounded"
              value={activityLevel}
              onChange={(e) =>
                setActivityLevel(e.target.value as ActivityLevel)
              }
            >
              <option value="sedentary" className="text-background!">
                Sedentary (little or no exercise)
              </option>
              <option value="light" className="text-background!">
                Light (exercise 1-3 days/week)
              </option>
              <option value="moderate" className="text-background!">
                Moderate (exercise 3-5 days/week)
              </option>
              <option value="active" className="text-background!">
                Active (exercise 6-7 days/week)
              </option>
              <option value="very_active" className="text-background!">
                Very Active (intense exercise daily)
              </option>
            </select>
          </div>
        </div>

        <button
          className="bg-accent p-4 tracking-wide text-white flex items-center justify-center gap-2 w-full hover:cursor-pointer hover:bg-accent/90 duration-200 transition-all rounded mt-4"
          onClick={handleCalculate}
        >
          Calculate Water Intake <FaBottleWater />
        </button>

        {result && (
          <div className="mt-6 p-6 bg-secondary/20 border border-foreground/20 w-full">
            <p className="text-2xl font-bold mb-2">
              {result.litersRecommended}L per day
            </p>
            <p className="text-sm text-foreground/70">
              Recommended daily water intake
            </p>
            <div className="mt-4 text-left text-sm space-y-1 text-foreground/60">
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
