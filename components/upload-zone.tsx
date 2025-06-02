"use client"

import type React from "react"

import { useState } from "react"
import { FileSpreadsheet, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function UploadZone({ expanded = false }: { expanded?: boolean }) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    // Mock file upload
    const files = e.dataTransfer.files
    if (files.length) {
      simulateUpload(files[0].name)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      simulateUpload(files[0].name)
    }
  }

  const simulateUpload = (fileName: string) => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadedFile(fileName)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const cancelUpload = () => {
    setIsUploading(false)
    setUploadProgress(0)
  }

  const removeFile = () => {
    setUploadedFile(null)
  }

  if (!expanded) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Upload</CardTitle>
          <CardDescription>Drag and drop an invoice image or click to browse</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-border"}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <input type="file" id="file-upload" className="hidden" accept="image/*" onChange={handleFileChange} />
            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground text-center">Drop your invoice image here or click to browse</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Invoice</CardTitle>
        <CardDescription>Upload an invoice image to convert it to an Excel file</CardDescription>
      </CardHeader>
      <CardContent>
        {!isUploading && !uploadedFile ? (
          <div
            className={`border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-border"}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-upload-expanded")?.click()}
          >
            <input
              type="file"
              id="file-upload-expanded"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <Upload className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">Drop your invoice here</p>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Supports JPG, PNG, and PDF files up to 10MB
            </p>
            <Button>Browse Files</Button>
          </div>
        ) : isUploading ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-medium">Uploading...</p>
              <Button variant="ghost" size="sm" onClick={cancelUpload}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Progress value={uploadProgress} className="h-2" />
            <p className="text-sm text-muted-foreground">{uploadProgress}% complete</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">{uploadedFile}</p>
                  <p className="text-sm text-muted-foreground">Ready for conversion</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={removeFile}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      {uploadedFile && (
        <CardFooter>
          <Button className="w-full">Convert to Excel</Button>
        </CardFooter>
      )}
    </Card>
  )
}
