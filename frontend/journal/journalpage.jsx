"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  CalendarIcon,
  Pencil,
  Trash2,
  Plus,
  Briefcase,
  Building2,
  Star,
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Lightbulb,
  Sparkles,
} from "lucide-react"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function JournalPage() {
  const [entries, setEntries] = useState([])
  const [isAddingEntry, setIsAddingEntry] = useState(false)
  const [isEditingEntry, setIsEditingEntry] = useState(null)
  const [formData, setFormData] = useState({
    id: null,
    date: new Date(),
    company: "",
    position: "",
    status: "Applied",
    notes: "",
    mood: "neutral", // New field for mood tracking
    confidence: 3, // New field for confidence level (1-5)
  })
  const [showTip, setShowTip] = useState(true)

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem("journalEntries")
    if (savedEntries) {
      try {
        const parsedEntries = JSON.parse(savedEntries)
        // Convert string dates back to Date objects
        parsedEntries.forEach((entry) => {
          entry.date = new Date(entry.date)
          // Add default values for new fields if they don't exist
          if (!entry.mood) entry.mood = "neutral"
          if (!entry.confidence) entry.confidence = 3
        })
        setEntries(parsedEntries)
      } catch (error) {
        console.error("Error parsing journal entries:", error)
      }
    }
  }, [])

  // Save entries to localStorage whenever they change
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem("journalEntries", JSON.stringify(entries))
    }
  }, [entries])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleDateSelect = (date) => {
    setFormData({ ...formData, date })
  }

  const handleMoodSelect = (mood) => {
    setFormData({ ...formData, mood })
  }

  const handleConfidenceSelect = (confidence) => {
    setFormData({ ...formData, confidence: Number.parseInt(confidence) })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isEditingEntry !== null) {
      // Update existing entry
      const updatedEntries = entries.map((entry) => (entry.id === formData.id ? { ...formData } : entry))
      setEntries(updatedEntries)
      setIsEditingEntry(null)
    } else {
      // Add new entry
      const newEntry = {
        ...formData,
        id: Date.now(), // Use timestamp as unique ID
      }
      setEntries([...entries, newEntry])
    }

    // Reset form
    setFormData({
      id: null,
      date: new Date(),
      company: "",
      position: "",
      status: "Applied",
      notes: "",
      mood: "neutral",
      confidence: 3,
    })
    setIsAddingEntry(false)
  }

  const handleEdit = (entry) => {
    setFormData({
      id: entry.id,
      date: new Date(entry.date),
      company: entry.company,
      position: entry.position,
      status: entry.status,
      notes: entry.notes,
      mood: entry.mood || "neutral",
      confidence: entry.confidence || 3,
    })
    setIsEditingEntry(entry.id)
    setIsAddingEntry(true)
  }

  const handleDelete = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id))
  }

  const cancelForm = () => {
    setIsAddingEntry(false)
    setIsEditingEntry(null)
    setFormData({
      id: null,
      date: new Date(),
      company: "",
      position: "",
      status: "Applied",
      notes: "",
      mood: "neutral",
      confidence: 3,
    })
  }

  // Sort entries by date (newest first)
  const sortedEntries = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date))

  // Group entries by month for the timeline
  const groupedEntries = sortedEntries.reduce((groups, entry) => {
    const month = format(new Date(entry.date), "MMMM yyyy")
    if (!groups[month]) {
      groups[month] = []
    }
    groups[month].push(entry)
    return groups
  }, {})

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Interview":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Offer":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Applied":
        return <Clock className="h-4 w-4" />
      case "Interview":
        return <Calendar className="h-4 w-4" />
      case "Offer":
        return <CheckCircle2 className="h-4 w-4" />
      case "Rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getMoodEmoji = (mood) => {
    switch (mood) {
      case "excited":
        return "😄"
      case "happy":
        return "🙂"
      case "neutral":
        return "😐"
      case "anxious":
        return "😟"
      case "disappointed":
        return "😔"
      default:
        return "😐"
    }
  }

  const getConfidenceStars = (level) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < level ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
      ))
  }

  // Get a random tip
  const getTip = () => {
    const tips = [
      "Studies show that women often apply only when they meet 100% of qualifications, while men apply at 60%. Apply anyway!",
      "Rejection is normal and doesn't reflect your worth. Each application is a learning opportunity.",
      "Tracking your job search journey helps you see patterns and progress over time.",
      "Celebrate small wins along the way - each application is a step forward!",
      "Feeling nervous about an interview? Remember it's a two-way conversation to see if there's a mutual fit.",
    ]
    return tips[Math.floor(Math.random() * tips.length)]
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight">Application Journal</h1>
          <p className="text-muted-foreground">
            Track your journey, celebrate progress, and reflect on your experiences.
          </p>
        </div>
        {!isAddingEntry && (
          <Button
            onClick={() => setIsAddingEntry(true)}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            <Plus className="mr-2 h-4 w-4" /> New Entry
          </Button>
        )}
      </div>

      {showTip && (
        <div className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100">
          <div className="flex items-start gap-3">
            <div className="bg-indigo-100 rounded-full p-2 mt-1">
              <Lightbulb className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-indigo-800 mb-1">Quick Tip</h3>
              <p className="text-indigo-700 text-sm">{getTip()}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTip(false)}
              className="text-indigo-500 hover:text-indigo-700 hover:bg-indigo-100"
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}

      {isAddingEntry && (
        <Card className="mb-8 border-2 border-pink-200 overflow-hidden">
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-2">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-pink-500" />
                <CardTitle className="font-serif">
                  {isEditingEntry !== null ? "Edit Entry" : "New Journal Entry"}
                </CardTitle>
              </div>
              <CardDescription>Reflect on your application experience and track your progress</CardDescription>
            </CardHeader>
          </div>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="font-medium">
                    Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-pink-100",
                          !formData.date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-pink-500" />
                        {formData.date ? format(formData.date, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={formData.date}
                        onSelect={handleDateSelect}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status" className="font-medium">
                    Application Status
                  </Label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-pink-100 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Withdrawn">Withdrawn</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="font-medium">
                  Company
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Where did you apply?"
                  className="border-pink-100 focus-visible:ring-pink-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position" className="font-medium">
                  Position
                </Label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="What role did you apply for?"
                  className="border-pink-100 focus-visible:ring-pink-300"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-medium">How are you feeling?</Label>
                  <div className="flex justify-between bg-white rounded-md border border-pink-100 p-2">
                    {["excited", "happy", "neutral", "anxious", "disappointed"].map((mood) => (
                      <button
                        key={mood}
                        type="button"
                        onClick={() => handleMoodSelect(mood)}
                        className={`flex flex-col items-center p-2 rounded-md transition-colors ${
                          formData.mood === mood ? "bg-pink-100 text-pink-800" : "hover:bg-pink-50"
                        }`}
                      >
                        <span className="text-2xl">{getMoodEmoji(mood)}</span>
                        <span className="text-xs mt-1 capitalize">{mood}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-medium">Confidence Level</Label>
                  <div className="flex justify-between bg-white rounded-md border border-pink-100 p-2">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => handleConfidenceSelect(level)}
                        className={`flex flex-col items-center p-2 rounded-md transition-colors ${
                          formData.confidence === level ? "bg-pink-100 text-pink-800" : "hover:bg-pink-50"
                        }`}
                      >
                        <span className="text-xl">{level}</span>
                        <div className="flex mt-1">
                          <Star
                            className={`h-3 w-3 ${level >= 1 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="font-medium">
                  Journal Notes
                </Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="How did you feel about this application? What went well? What could have gone better? Any lessons learned?"
                  className="min-h-[120px] border-pink-100 focus-visible:ring-pink-300"
                />
              </div>

              <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 rounded-full p-1.5">
                    <Sparkles className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-purple-800 text-sm">Reflection Prompts</h3>
                    <ul className="text-xs text-purple-700 mt-1 space-y-1">
                      <li>• What made you apply for this position?</li>
                      <li>• Did you feel 100% qualified? Why or why not?</li>
                      <li>• What did you learn from this experience?</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-pink-100 bg-gradient-to-r from-pink-50 to-purple-50 p-4">
              <Button type="button" variant="outline" onClick={cancelForm} className="border-pink-200">
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              >
                {isEditingEntry !== null ? "Update Entry" : "Save Entry"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}

      {entries.length === 0 && !isAddingEntry ? (
        <Card className="text-center p-8 border-2 border-dashed border-pink-200">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              <div className="bg-pink-100 rounded-full p-4">
                <Briefcase className="h-8 w-8 text-pink-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium font-serif">Your Journal is Empty</h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  Start tracking your job applications and reflections to see your progress over time
                </p>
              </div>
              <Button
                onClick={() => setIsAddingEntry(true)}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              >
                <Plus className="mr-2 h-4 w-4" /> Create Your First Entry
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {Object.keys(groupedEntries).map((month) => (
            <div key={month} className="space-y-4">
              <div className="sticky top-16 z-10 bg-background py-2">
                <h2 className="text-xl font-serif font-semibold">{month}</h2>
                <Separator className="mt-2 bg-pink-200" />
              </div>
              <div className="space-y-6">
                {groupedEntries[month].map((entry) => (
                  <Card
                    key={entry.id}
                    className="overflow-hidden border-l-4 hover:shadow-md transition-shadow"
                    style={{
                      borderLeftColor:
                        entry.status === "Offer" ? "#10b981" : entry.status === "Rejected" ? "#ef4444" : "#6366f1",
                    }}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="p-4 md:w-32 text-center md:border-r border-b md:border-b-0 bg-gradient-to-b from-pink-50 to-purple-50">
                        <div className="font-serif font-medium text-2xl">{format(new Date(entry.date), "d")}</div>
                        <div className="text-sm text-muted-foreground">{format(new Date(entry.date), "EEE")}</div>
                        <div className="mt-2 text-2xl">{getMoodEmoji(entry.mood || "neutral")}</div>
                      </div>
                      <CardContent className="flex-1 p-4">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-4">
                          <div>
                            <h3 className="font-serif font-semibold text-lg">{entry.position}</h3>
                            <div className="flex items-center text-muted-foreground">
                              <Building2 className="h-3 w-3 mr-1" />
                              <span className="text-sm">{entry.company}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(entry.status)}>
                              {getStatusIcon(entry.status)}
                              <span className="ml-1">{entry.status}</span>
                            </Badge>
                            <div className="flex ml-2" title="Confidence Level">
                              {getConfidenceStars(entry.confidence || 3)}
                            </div>
                          </div>
                        </div>
                        {entry.notes && (
                          <div className="mt-4 bg-white p-4 rounded-lg border border-pink-100">
                            <p className="whitespace-pre-line text-sm">{entry.notes}</p>
                          </div>
                        )}
                        <div className="flex justify-end gap-2 mt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(entry)}
                            className="border-purple-200 text-purple-700 hover:bg-purple-50"
                          >
                            <Pencil className="h-4 w-4 mr-1" /> Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-200 text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(entry.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Delete
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
