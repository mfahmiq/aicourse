"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Briefcase, FileEdit, Code, BookOpen } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const studyOptions = [
  {
    id: "exam",
    title: "Exam",
    icon: GraduationCap,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: "job-interview",
    title: "Job Interview",
    icon: Briefcase,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    id: "practice",
    title: "Practice",
    icon: FileEdit,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: "coding-prep",
    title: "Coding Prep",
    icon: Code,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    id: "other",
    title: "Other",
    icon: BookOpen,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
]

export default function CreatePage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [topic, setTopic] = useState("")
  const [difficulty, setDifficulty] = useState("")

  const handleOptionClick = (optionId: string) => {
    setSelectedOption(optionId)
  }

  const handleNext = () => {
    setStep(2)
  }

  const handlePrevious = () => {
    setStep(1)
    setSelectedOption(null)
  }

  const handleGenerate = () => {
    // Handle generation logic here
    console.log({
      type: selectedOption,
      topic,
      difficulty,
    })
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-blue-600">
              Start Building Your Personal Study Material
            </h1>
            <p className="text-lg text-gray-600">
              Fill All details in order to generate study material for your next project
            </p>
          </div>

          {/* Study Type Selection */}
          <div className="mb-8">
            <h2 className="mb-6 text-center text-xl font-semibold text-gray-900">
              For Which you want to create your personal study material?
            </h2>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
              {studyOptions.map((option) => (
                <Card
                  key={option.id}
                  className={`group cursor-pointer border transition-all hover:border-blue-600 hover:shadow-md ${
                    selectedOption === option.id ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white"
                  }`}
                  onClick={() => handleOptionClick(option.id)}
                >
                  <CardContent className="flex flex-col items-center p-6">
                    <div className={`mb-4 rounded-full ${option.bgColor} p-3`}>
                      <option.icon className={`h-8 w-8 ${option.color}`} />
                    </div>
                    <span className="text-center text-sm font-medium text-gray-900">{option.title}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button variant="outline" asChild className="border-gray-200 hover:bg-gray-100 hover:text-gray-900">
              <Link href="/dashboard">Cancel</Link>
            </Button>
            {selectedOption && (
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-blue-600">
            Start Building Your Personal Study Material
          </h1>
          <p className="text-lg text-gray-600">
            Fill All details in order to generate study material for your next project
          </p>
        </div>

        {/* Content Form */}
        <div className="mb-8 space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Enter topic or paster the content for which you want to generate study material
            </h2>
            <Textarea
              placeholder="Start writing here"
              className="min-h-[150px] bg-white border-gray-200 focus:border-blue-600 focus:ring-blue-600"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Select the difficulty Level</h2>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="bg-white border-gray-200 focus:border-blue-600 focus:ring-blue-600">
                <SelectValue placeholder="Difficulty Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            className="border-gray-200 hover:bg-gray-100 hover:text-gray-900"
            onClick={handlePrevious}
          >
            Previous
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleGenerate}>
            Generate
          </Button>
        </div>
      </div>
    </div>
  )
}

