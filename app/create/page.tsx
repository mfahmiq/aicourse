"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GraduationCap, Briefcase, FileEdit, Code, BookOpen, Upload, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@clerk/nextjs"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { saveToLocalStorage } from "@/lib/localStorage"

const initialStudyOptions = [
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

const secondStepOptions = [
  {
    id: "gemini",
    title: "Gemini",
    icon: GraduationCap,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: "pdf",
    title: "PDF",
    icon: Briefcase,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    id: "web-link",
    title: "Web",
    icon: FileEdit,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
]

export default function CreatePage() {
  const { userId } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [topic, setTopic] = useState("")
  const [title, setTitle] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [secondStepSelected, setSecondStepSelected] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Dialog states
  const [isPdfDialogOpen, setIsPdfDialogOpen] = useState(false)
  const [isWebDialogOpen, setIsWebDialogOpen] = useState(false)
  const [documentName, setDocumentName] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [webUrl, setWebUrl] = useState("")

  const handleOptionClick = (optionId: string) => {
    if (step === 1) {
      setSelectedOption(optionId)
    } else if (step === 2) {
      if (optionId === "pdf") {
        setIsPdfDialogOpen(true)
      } else if (optionId === "web-link") {
        setIsWebDialogOpen(true)
      } else {
        setSecondStepSelected(optionId)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handlePdfSubmit = () => {
    if (documentName && selectedFile) {
      setSecondStepSelected("pdf")
      setIsPdfDialogOpen(false)
      // Handle PDF upload logic here
      console.log("PDF Upload:", { documentName, file: selectedFile })
    }
  }

  const handleWebSubmit = () => {
    if (webUrl) {
      setSecondStepSelected("web-link")
      setIsWebDialogOpen(false)
      // Handle web URL logic here
      console.log("Web URL:", { url: webUrl })
    }
  }

  const handleNext = () => {
    if (step === 1 && selectedOption) {
      setStep(2)
    } else if (step === 2 && secondStepSelected) {
      setStep(3)
    }
  }

  const handlePrevious = () => {
    if (step === 3) {
      setStep(2)
    } else if (step === 2) {
      setSecondStepSelected(null)
      setStep(1)
    }
  }

  const handleGenerate = async () => {
    if (!userId || !selectedOption || !secondStepSelected || !topic || !difficulty || !title) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          topic,
          type: selectedOption,
          difficulty
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate content');
      }

      // Save to localStorage di client-side
      const savedMaterial = saveToLocalStorage({
        userId,
        title,
        topic,
        type: selectedOption,
        difficulty,
        content: data.content
      });

      if (savedMaterial) {
        setIsGenerating(false);
        router.push('/dashboard');
      }
      
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to generate study material",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

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
              {initialStudyOptions.map((option) => (
                <Card
                  key={option.id}
                  className={`group cursor-pointer border transition-all hover:border-blue-600 hover:shadow-md ${
                    selectedOption === option.id ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white"
                  }`}
                  onClick={() => handleOptionClick(option.id)}
                >
                  <div className="flex flex-col items-center p-6">
                    <div className={`mb-4 rounded-full ${option.bgColor} p-3`}>
                      <option.icon className={`h-8 w-8 ${option.color}`} />
                    </div>
                    <span className="text-center text-sm font-medium text-gray-900">{option.title}</span>
                  </div>
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

  if (step === 2) {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-blue-600">
              Choose Your Study Method
            </h1>
            <p className="text-lg text-gray-600">
              Select how you want to generate your study material
            </p>
          </div>

          {/* Study Method Selection */}
          <div className="mb-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {secondStepOptions.map((option) => (
                <Card
                  key={option.id}
                  className={`group cursor-pointer border transition-all hover:border-blue-600 hover:shadow-md ${
                    secondStepSelected === option.id ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white"
                  }`}
                  onClick={() => handleOptionClick(option.id)}
                >
                  <div className="flex flex-col items-center p-6">
                    <div className={`mb-4 rounded-full ${option.bgColor} p-3`}>
                      <option.icon className={`h-8 w-8 ${option.color}`} />
                    </div>
                    <span className="text-center text-sm font-medium text-gray-900">{option.title}</span>
                    {option.id === "gemini" && (
                      <p className="mt-2 text-xs text-gray-500 text-center">AI-powered content generation</p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* PDF Upload Dialog */}
          <Dialog open={isPdfDialogOpen} onOpenChange={setIsPdfDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload PDF Document</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="documentName">Document Name</Label>
                  <Input
                    id="documentName"
                    value={documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                    placeholder="Enter document name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="pdfFile">PDF File</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="pdfFile"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="file:bg-blue-50 file:text-blue-600 file:border-0 file:rounded-md file:px-2 file:py-1 file:mr-2 hover:file:bg-blue-100"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  onClick={handlePdfSubmit}
                  disabled={!documentName || !selectedFile}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Upload
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Web Link Dialog */}
          <Dialog open={isWebDialogOpen} onOpenChange={setIsWebDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enter Website URL</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="webUrl">Website URL</Label>
                  <Input
                    id="webUrl"
                    type="url"
                    value={webUrl}
                    onChange={(e) => setWebUrl(e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  onClick={handleWebSubmit}
                  disabled={!webUrl}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Submit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              className="border-gray-200 hover:bg-gray-100 hover:text-gray-900"
              onClick={handlePrevious}
            >
              Previous
            </Button>
            {secondStepSelected && (
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
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-blue-600">
            Enter Study Details
          </h1>
          <p className="text-lg text-gray-600">
            Provide the topic and difficulty level for your study material
          </p>
        </div>

        <div className="mb-8 space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Enter a title for your study material
            </h2>
            <Input
              placeholder="Enter a title"
              className="bg-white text-gray-900 border-blue-200 focus:border-blue-600 focus:ring-blue-600 placeholder:text-gray-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {secondStepSelected === "gemini" 
                ? "Enter topic or describe what you want to learn about" 
                : "Enter topic or paste the content for which you want to generate study material"}
            </h2>
            <Textarea
              placeholder={secondStepSelected === "gemini" 
                ? "E.g., Machine Learning fundamentals, JavaScript promises, Quantum physics basics..." 
                : "Start writing here"}
              className="min-h-[150px] bg-white text-gray-900 border-blue-200 focus:border-blue-600 focus:ring-blue-600 placeholder:text-gray-500"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            {secondStepSelected === "gemini" && (
              <p className="text-sm text-gray-500">
                Gemini AI will generate comprehensive study material based on your topic. Be specific for better results.
              </p>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Select the difficulty Level</h2>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="bg-white text-gray-900 border-blue-200 focus:border-blue-600 focus:ring-blue-600">
                <SelectValue placeholder="Difficulty Level" className="text-gray-500" />
              </SelectTrigger>
              <SelectContent className="bg-white border-blue-200">
                <SelectItem value="beginner" className="text-gray-900 hover:bg-blue-50">
                  Beginner
                </SelectItem>
                <SelectItem value="intermediate" className="text-gray-900 hover:bg-blue-50">
                  Intermediate
                </SelectItem>
                <SelectItem value="advanced" className="text-gray-900 hover:bg-blue-50">
                  Advanced
                </SelectItem>
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
          {topic && difficulty && title && (
            <Button 
              className="bg-blue-600 hover:bg-blue-700" 
              onClick={handleGenerate}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isGenerating ? "Generating..." : "Creating..."}
                </>
              ) : (
                secondStepSelected === "gemini" ? "Generate with AI" : "Create"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}