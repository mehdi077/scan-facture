"use client"

import { Download, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

// Mock data for recent conversions
const recentConversions = [
  {
    id: "conv_123",
    fileName: "invoice_0042.jpg",
    convertedName: "invoice_0042.xlsx",
    date: "Today, 12:34 PM",
    status: "completed",
    size: "1.2 MB",
  },
  {
    id: "conv_122",
    fileName: "receipt_march.jpg",
    convertedName: "receipt_march.xlsx",
    date: "Today, 10:15 AM",
    status: "completed",
    size: "0.8 MB",
  },
  {
    id: "conv_121",
    fileName: "invoice_0041.jpg",
    convertedName: "invoice_0041.xlsx",
    date: "Yesterday, 3:22 PM",
    status: "completed",
    size: "1.5 MB",
  },
  {
    id: "conv_120",
    fileName: "utility_bill.jpg",
    convertedName: "utility_bill.xlsx",
    date: "Yesterday, 11:05 AM",
    status: "completed",
    size: "0.9 MB",
  },
]

export function RecentConversions() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Conversions</CardTitle>
          <CardDescription>Your recently converted invoice files</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentConversions.map((conversion) => (
            <div key={conversion.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
              <div className="flex items-center gap-3">
                <Image src="/xcel-icon.png" alt="Excel Icon" width={40} height={40} className="h-10 w-10" />
                <div>
                  <p className="font-medium">{conversion.convertedName}</p>
                  <p className="text-xs text-muted-foreground">
                    From {conversion.fileName} • {conversion.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="hidden md:inline-flex">
                  {conversion.size}
                </Badge>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
