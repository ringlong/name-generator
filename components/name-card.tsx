"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share, Bookmark, BookmarkCheck, ChevronDown, ChevronUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface NameCardProps {
  nameItem: {
    id: number
    name: string
    pinyin: string
    origin: string
    meaning: string
    chineseMeaning: string
    similarity: number
  }
  isSaved: boolean
  onSave: () => void
  onShare: () => void
  isMobile?: boolean
}

export function NameCard({ nameItem, isSaved, onSave, onShare, isMobile = false }: NameCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Card className="overflow-hidden">
      <CardContent className={`${isMobile ? "p-3" : "p-6"}`}>
        <div className="flex flex-col space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-bold text-slate-800">{nameItem.name}</h3>
                <span className="text-sm text-slate-500">({nameItem.pinyin})</span>
              </div>
              <div className="flex items-center mt-1 space-x-2">
                <Badge variant="outline" className="text-xs">
                  {nameItem.origin}
                </Badge>
                <Badge
                  variant="secondary"
                  className={`text-xs ${
                    nameItem.similarity >= 80
                      ? "bg-green-100 text-green-800"
                      : nameItem.similarity >= 60
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {nameItem.similarity}% match
                </Badge>
              </div>
            </div>

            <div className="flex space-x-1">
              <Button
                variant="outline"
                size="icon"
                onClick={onSave}
                className={`h-8 w-8 ${isSaved ? "text-blue-600" : ""}`}
              >
                {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="icon" onClick={onShare} className="h-8 w-8">
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <p className="text-slate-600 text-sm">{nameItem.meaning}</p>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="mt-1 h-6 px-2 text-xs text-slate-500"
            >
              {showDetails ? (
                <>
                  Hide Chinese meaning
                  <ChevronUp className="ml-1 h-3 w-3" />
                </>
              ) : (
                <>
                  Show Chinese meaning
                  <ChevronDown className="ml-1 h-3 w-3" />
                </>
              )}
            </Button>

            {showDetails && (
              <div className="mt-2 p-2 bg-slate-50 rounded-md text-xs text-slate-700">
                <p>{nameItem.chineseMeaning}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
