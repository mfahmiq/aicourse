"use client"

import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const { toast } = useToast()
  
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  
  // Initialize form values once user data is loaded
  useState(() => {
    if (isLoaded && user) {
      setFirstName(user.firstName || "")
      setLastName(user.lastName || "")
    }
  })
  
  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
          <p className="mt-2 text-sm text-gray-500">Loading profile...</p>
        </div>
      </div>
    )
  }
  
  if (!user) {
    router.push("/sign-in")
    return null
  }
  
  const initials = user.firstName && user.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}`
    : user.firstName?.[0] || "U"
  
  const handleUpdateProfile = async () => {
    try {
      setIsUpdating(true)
      
      await user.update({
        firstName,
        lastName
      })
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Update failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsUpdating(false)
    }
  }
  
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-600"></div>
            <span className="text-xl font-bold">Easy Study</span>
          </Link>
          <Button asChild variant="outline">
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </nav>
      
      <div className="container py-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-3xl font-bold">Your Profile</h1>
          
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and how others see you on the platform.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user.imageUrl} alt={user.fullName || "User"} />
                    <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="https://accounts.clerk.dev/user/profile/appearance">
                        Change Avatar
                      </Link>
                    </Button>
                    <p className="mt-2 text-xs text-gray-500">
                      Click to manage your profile image in Clerk
                    </p>
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    value={user.emailAddresses[0]?.emailAddress || ""}
                    disabled
                  />
                  <p className="text-xs text-gray-500">
                    To change your email, please visit your{" "}
                    <Link 
                      href="https://accounts.clerk.dev/user/profile/contact" 
                      className="text-blue-600 hover:underline"
                    >
                      Clerk account settings
                    </Link>
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/dashboard">Cancel</Link>
                </Button>
                <Button 
                  onClick={handleUpdateProfile}
                  disabled={isUpdating}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isUpdating ? "Updating..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Account Management</CardTitle>
                <CardDescription>
                  Manage your account settings and security options.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md bg-blue-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Account Management</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>
                          For advanced account settings like password changes, two-factor authentication, 
                          and connected accounts, please visit your Clerk account settings.
                        </p>
                      </div>
                      <div className="mt-4">
                        <div className="-mx-2 -my-1.5 flex">
                          <Button variant="outline" size="sm" asChild className="text-blue-600 hover:bg-blue-100">
                            <Link href="https://accounts.clerk.dev/user/security">
                              Manage Account
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}