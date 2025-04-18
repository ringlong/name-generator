"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface PaymentModalProps {
  onClose: () => void
  onPaymentComplete: () => void
}

export function PaymentModal({ onClose, onPaymentComplete }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState("credit")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      onPaymentComplete()
    }, 1500)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-[350px] p-4">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-center">Continue with Premium Access</DialogTitle>
          <DialogDescription className="text-center text-sm">
            Your free trial has ended. Subscribe to continue generating name suggestions.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-2">
            <div className="space-y-2">
              <Label className="text-sm">Select a payment plan</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-1 gap-3">
                <div className="flex items-center justify-between space-x-2 rounded-md border p-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly" className="font-normal text-sm">
                      Monthly
                    </Label>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">$4.99/month</div>
                    <div className="text-xs text-slate-500">Billed monthly</div>
                  </div>
                </div>

                <div className="flex items-center justify-between space-x-2 rounded-md border p-3 border-blue-200 bg-blue-50">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yearly" id="yearly" />
                    <Label htmlFor="yearly" className="font-normal text-sm">
                      Yearly
                    </Label>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">$39.99/year</div>
                    <div className="text-xs text-slate-500">Save 33%</div>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="card-number" className="text-sm">
                Card Number
              </Label>
              <Input id="card-number" placeholder="1234 5678 9012 3456" className="h-9" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="expiry" className="text-sm">
                  Expiry Date
                </Label>
                <Input id="expiry" placeholder="MM/YY" className="h-9" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc" className="text-sm">
                  CVC
                </Label>
                <Input id="cvc" placeholder="123" className="h-9" />
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4 flex-col space-y-2 sm:space-y-0">
            <Button type="submit" disabled={isProcessing} className="w-full">
              {isProcessing ? "Processing..." : "Subscribe & Continue"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="w-full">
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
