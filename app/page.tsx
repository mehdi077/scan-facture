"use client"

import { useState } from "react"
import { BarChart3, FileSpreadsheet, HelpCircle, History, Home, Menu, Plus, Settings, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RecentConversions } from "@/components/recent-conversions"
import { UploadZone } from "@/components/upload-zone"
import { UploadHistory } from "@/components/upload-history"
import DarkModeToggle from "@/components/DarkModeToggle"

import { useUser, useClerk } from "@clerk/nextjs"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useUser()
  const { signOut } = useClerk()

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4 md:px-6">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px] bg-background">
              <nav className="flex flex-col gap-4 py-4">
                <Button variant="ghost" className="justify-start gap-2">
                  <Home className="h-5 w-5" />
                  Dashboard
                </Button>
                <Button variant="ghost" className="justify-start gap-2">
                  <Upload className="h-5 w-5" />
                  Upload
                </Button>
                <Button variant="ghost" className="justify-start gap-2">
                  <History className="h-5 w-5" />
                  History
                </Button>
                <Button variant="ghost" className="justify-start gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Analytics
                </Button>
                <Button variant="ghost" className="justify-start gap-2">
                  <Settings className="h-5 w-5" />
                  Settings
                </Button>
                <Button variant="ghost" className="justify-start gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Help
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2 font-semibold text-lg">
            <FileSpreadsheet className="h-6 w-6" />
            <span className="hidden md:inline-block">Scan Facture</span>
          </div>
          

          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex gap-2">
              <Plus className="h-4 w-4" />
              New Upload
            </Button>
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.imageUrl ? `${user.imageUrl}?height=32&width=32&quality=90&fit=crop` : undefined}
                        alt={user.firstName || "User"}
                      />
                      <AvatarFallback>
                        {user.firstName && user.lastName ? `${user.firstName[0]}${user.lastName[0]}` : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DarkModeToggle />
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => {
                      await signOut();
                    }}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Manage your invoice conversions and downloads.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help
            </Button>
            <Button size="sm" className="md:hidden">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="dashboard">
          <TabsList className="grid grid-cols-3 md:grid-cols-4 mb-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="settings" className="hidden md:block">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">128</div>
                  <p className="text-xs text-muted-foreground">+14% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1.2 GB</div>
                  <div className="mt-2">
                    <Progress value={60} className="h-2" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">60% of 2GB limit</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12 min ago</div>
                  <p className="text-xs text-muted-foreground">Last conversion: invoice_0042.jpg</p>
                </CardContent>
              </Card>
            </div>

            {/* Upload Zone */}
            <UploadZone />

            {/* Recent Conversions */}
            <RecentConversions />

          </TabsContent>

          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload New Invoice</CardTitle>
                <CardDescription>Upload an invoice image to convert it to an Excel file.</CardDescription>
              </CardHeader>
              <CardContent>
                <UploadZone expanded={true} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Conversion History</CardTitle>
                <CardDescription>View all your previous invoice conversions.</CardDescription>
              </CardHeader>
              <CardContent>
                <UploadHistory />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your account and conversion preferences.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Excel Format</h3>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="bg-primary/10">
                        XLSX
                      </Button>
                      <Button variant="outline" size="sm">
                        XLS
                      </Button>
                      <Button variant="outline" size="sm">
                        CSV
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-2">Notifications</h3>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="bg-primary/10">
                        Email
                      </Button>
                      <Button variant="outline" size="sm" className="bg-primary/10">
                        Push
                      </Button>
                      <Button variant="outline" size="sm">
                        SMS
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-2">Auto-Download</h3>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="bg-primary/10">
                        Enabled
                      </Button>
                      <Button variant="outline" size="sm">
                        Disabled
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
