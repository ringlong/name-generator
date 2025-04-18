"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, ChevronDown, ChevronUp } from "lucide-react"

export interface QueryProps {
  givenName?: string
  familyName?: string
  gender?: string
  date?: string
}

interface HistorySectionProps {
  history: Array<{
    query: QueryProps
    results: Array<{
      id: number
      name: string
      pinyin: string
      origin: string
      meaning: string
      chineseMeaning: string
      similarity: number
    }>
  }>
}

export function HistorySection({ history }: HistorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (history.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            History
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="h-8 px-2">
            {isExpanded ? (
              <>
                <span className="mr-1 text-xs">Show Less</span>
                <ChevronUp className="h-3 w-3" />
              </>
            ) : (
              <>
                <span className="mr-1 text-xs">Show More</span>
                <ChevronDown className="h-3 w-3" />
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="space-y-3">
          {(isExpanded ? history : history.slice(0, 2)).map((item, index) => (
            <div key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
              <div className="grid grid-cols-2 gap-1 text-xs text-slate-600">
                <span>
                  <strong>Given Name:</strong> {item.query.givenName || "Not specified"}
                </span>
                <span>
                  <strong>Family Name:</strong> {item.query.familyName || "Not specified"}
                </span>
                <span>
                  <strong>Gender:</strong> {item.query.gender || "Any"}
                </span>
                <span>
                  <strong>Date:</strong> {item.query.date || "Not specified"}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {item.results.map((result) => (
                  <span
                    key={result.id}
                    className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-800"
                  >
                    {result.name}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {!isExpanded && history.length > 2 && (
            <div className="text-center text-xs text-slate-500">{history.length - 2} more entries not shown</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
