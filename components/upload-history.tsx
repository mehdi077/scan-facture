"use client"

import { useState } from "react"
import { Download, FileSpreadsheet, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for upload history
const historyData = [
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
  {
    id: "conv_119",
    fileName: "invoice_0040.jpg",
    convertedName: "invoice_0040.xlsx",
    date: "May 28, 2:15 PM",
    status: "completed",
    size: "1.1 MB",
  },
  {
    id: "conv_118",
    fileName: "receipt_feb.jpg",
    convertedName: "receipt_feb.xlsx",
    date: "May 27, 9:30 AM",
    status: "completed",
    size: "0.7 MB",
  },
  {
    id: "conv_117",
    fileName: "invoice_0039.jpg",
    convertedName: "invoice_0039.xlsx",
    date: "May 26, 4:45 PM",
    status: "completed",
    size: "1.3 MB",
  },
  {
    id: "conv_116",
    fileName: "expense_report.jpg",
    convertedName: "expense_report.xlsx",
    date: "May 25, 1:20 PM",
    status: "completed",
    size: "2.1 MB",
  },
  {
    id: "conv_115",
    fileName: "invoice_0038.jpg",
    convertedName: "invoice_0038.xlsx",
    date: "May 24, 11:10 AM",
    status: "completed",
    size: "0.9 MB",
  },
  {
    id: "conv_114",
    fileName: "receipt_jan.jpg",
    convertedName: "receipt_jan.xlsx",
    date: "May 23, 3:05 PM",
    status: "completed",
    size: "0.8 MB",
  },
]

export function UploadHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")

  const filteredData = historyData.filter(
    (item) =>
      item.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.convertedName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date (Newest)</SelectItem>
            <SelectItem value="name">Name (A-Z)</SelectItem>
            <SelectItem value="size">Size (Largest)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="h-[400px] rounded-md border">
        <div className="p-4 space-y-4">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 border border-border"
              >
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="h-10 w-10 text-primary" />
                  <div>
                    <p className="font-medium">{item.convertedName}</p>
                    <p className="text-xs text-muted-foreground">
                      From {item.fileName} • {item.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{item.size}</Badge>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <FileSpreadsheet className="h-12 w-12 text-muted-foreground mb-2" />
              <h3 className="font-medium">No files found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your search term</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
