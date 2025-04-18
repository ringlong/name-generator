"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Calendar, ChevronDown, ChevronUp, RefreshCw } from "lucide-react"
import { NameCard } from "@/components/name-card"
import { PaymentModal } from "@/components/payment-modal"
import { HistorySection } from "@/components/history-section"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { useMobile } from "@/hooks/use-mobile"

// Mock data for Chinese name suggestions with bilingual notes
const mockNames = [
  {
    id: 1,
    name: "爱可",
    pinyin: "Ai Ke",
    origin: "Chinese-Japanese",
    meaning: "Beloved and capable",
    chineseMeaning: "爱：爱，喜爱；可：可以，能够",
    similarity: 85,
  },
  {
    id: 2,
    name: "智慧",
    pinyin: "Zhi Hui",
    origin: "Chinese",
    meaning: "Wisdom and intelligence",
    chineseMeaning: "智：聪明，智慧；慧：聪慧，有智慧",
    similarity: 78,
  },
  {
    id: 3,
    name: "天赐",
    pinyin: "Tian Ci",
    origin: "Chinese",
    meaning: "Gift from heaven",
    chineseMeaning: "天：天空，上天；赐：赠予，给予",
    similarity: 72,
  },
  {
    id: 4,
    name: "雅然",
    pinyin: "Ya Ran",
    origin: "Chinese",
    meaning: "Elegant and natural",
    chineseMeaning: "雅：高雅，文雅；然：如此，这样",
    similarity: 68,
  },
  {
    id: 5,
    name: "力量",
    pinyin: "Li Liang",
    origin: "Chinese",
    meaning: "Strong and powerful",
    chineseMeaning: "力：力气，力量；量：数量，力量",
    similarity: 65,
  },
]

export function NameGenerator() {
  const isMobile = useMobile()
  const [givenName, setGivenName] = useState("")
  const [familyName, setFamilyName] = useState("")
  const [gender, setGender] = useState("any")
  const [date, setDate] = useState<Date>()
  const [showResults, setShowResults] = useState(false)
  const [generatedNames, setGeneratedNames] = useState<typeof mockNames>([])
  const [savedNames, setSavedNames] = useState<typeof mockNames>([])
  const [history, setHistory] = useState<Array<{ query: any; results: typeof mockNames }>>([])
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [hasUsedService, setHasUsedService] = useState(false)
  const [similarityThreshold, setSimilarityThreshold] = useState([60])
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState({
    origins: [] as string[],
    nameLength: "any",
  })

  // Generate names function
  const generateNames = () => {
    // In a real app, this would call an API with the user's input
    // For this demo, we'll use mock data

    // Check if this is a subsequent use
    if (hasUsedService) {
      setShowPaymentModal(true)
      return
    }

    // Filter names based on similarity threshold
    const filteredNames = mockNames.filter((name) => name.similarity >= similarityThreshold[0])

    setGeneratedNames(filteredNames)
    setShowResults(true)

    // Add to history
    const queryData = {
      givenName,
      familyName,
      gender,
      date: date ? format(date, "PPP") : undefined,
      preferences,
    }

    setHistory((prev) => [{ query: queryData, results: filteredNames }, ...prev])

    // Mark as having used the service
    setHasUsedService(true)
  }

  // Toggle save name
  const toggleSaveName = (nameItem: (typeof mockNames)[0]) => {
    const isSaved = savedNames.some((item) => item.id === nameItem.id)

    if (isSaved) {
      setSavedNames(savedNames.filter((item) => item.id !== nameItem.id))
    } else {
      setSavedNames([...savedNames, nameItem])
    }
  }

  // Share name
  const shareName = (nameItem: (typeof mockNames)[0]) => {
    // In a real app, this would open a share dialog
    alert(`Sharing ${nameItem.name} (${nameItem.pinyin}): ${nameItem.meaning}`)
  }

  // Handle payment completion
  const handlePaymentComplete = () => {
    setShowPaymentModal(false)
    // In a real app, this would validate payment and then continue
    generateNames()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-4 px-3 sm:px-6">
          <div className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="givenName">Given Name</Label>
                <Input
                  id="givenName"
                  placeholder="Enter your given name"
                  value={givenName}
                  onChange={(e) => setGivenName(e.target.value)}
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="familyName">Family Name</Label>
                <Input
                  id="familyName"
                  placeholder="Enter your family name"
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                  className="h-10"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="text-sm">
                      Male
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="text-sm">
                      Female
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="any" id="any" />
                    <Label htmlFor="any" className="text-sm">
                      Any
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal h-10">
                      {date ? format(date, "PPP") : "Select date"}
                      <Calendar className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Name Similarity (Minimum: {similarityThreshold[0]}%)</Label>
              </div>
              <Slider value={similarityThreshold} onValueChange={setSimilarityThreshold} max={100} min={0} step={1} />
            </div>

            <div>
              <Button
                type="button"
                onClick={() => setShowPreferences(!showPreferences)}
                variant="outline"
                className="w-full flex items-center justify-between h-10 text-sm"
              >
                <span>Personal Preferences</span>
                {showPreferences ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>

              {showPreferences && (
                <div className="mt-4 p-3 border rounded-md space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Preferred Origins</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Northern", "Southern", "Classical", "Modern", "Traditional", "Creative"].map((origin) => (
                        <div key={origin} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={origin}
                            checked={preferences.origins.includes(origin)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setPreferences({
                                  ...preferences,
                                  origins: [...preferences.origins, origin],
                                })
                              } else {
                                setPreferences({
                                  ...preferences,
                                  origins: preferences.origins.filter((o) => o !== origin),
                                })
                              }
                            }}
                            className="rounded"
                          />
                          <Label htmlFor={origin} className="text-sm">
                            {origin}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Name Length</Label>
                    <RadioGroup
                      value={preferences.nameLength}
                      onValueChange={(value) => setPreferences({ ...preferences, nameLength: value })}
                      className="grid grid-cols-2 gap-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="short" id="short" />
                        <Label htmlFor="short" className="text-sm">
                          Short
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium" className="text-sm">
                          Medium
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="long" id="long" />
                        <Label htmlFor="long" className="text-sm">
                          Long
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="any" id="any-length" />
                        <Label htmlFor="any-length" className="text-sm">
                          Any
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}
            </div>

            <Button onClick={generateNames} className="w-full h-12 text-base">
              Generate Name Suggestions
              <RefreshCw className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {showResults && (
        <div className="space-y-4">
          <Tabs defaultValue="suggestions">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="suggestions" className="text-sm">
                Suggestions ({generatedNames.length})
              </TabsTrigger>
              <TabsTrigger value="saved" className="text-sm">
                Saved ({savedNames.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="suggestions" className="space-y-3 mt-3">
              {generatedNames.length > 0 ? (
                generatedNames.map((nameItem) => (
                  <NameCard
                    key={nameItem.id}
                    nameItem={nameItem}
                    isSaved={savedNames.some((item) => item.id === nameItem.id)}
                    onSave={() => toggleSaveName(nameItem)}
                    onShare={() => shareName(nameItem)}
                    isMobile={isMobile}
                  />
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-slate-500 text-sm">
                    No names match your criteria. Try adjusting your preferences.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="saved" className="space-y-3 mt-3">
              {savedNames.length > 0 ? (
                savedNames.map((nameItem) => (
                  <NameCard
                    key={nameItem.id}
                    nameItem={nameItem}
                    isSaved={true}
                    onSave={() => toggleSaveName(nameItem)}
                    onShare={() => shareName(nameItem)}
                    isMobile={isMobile}
                  />
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-slate-500 text-sm">You haven't saved any names yet.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}

      <HistorySection history={history} />

      {showPaymentModal && (
        <PaymentModal onClose={() => setShowPaymentModal(false)} onPaymentComplete={handlePaymentComplete} />
      )}
    </div>
  )
}
