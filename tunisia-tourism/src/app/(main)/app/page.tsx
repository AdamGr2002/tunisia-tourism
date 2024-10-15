'use client'

import { useUser, SignOutButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Compass, Palmtree, Sun, Umbrella, Users, Calendar, Star, MapPin, Book } from "lucide-react"
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function TourismApp() {
  const { isSignedIn, user } = useUser()
  const router = useRouter()
  const guides = useQuery(api.guides.getGuides);
  const createUser = useMutation(api.users.createUser);

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/")
    } else if (user) {
      createUser({ name: user.fullName!, email: user.primaryEmailAddress!.emailAddress, clerkId: user.id });
    }
  }, [isSignedIn, router, user, createUser])

  if (!isSignedIn) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
      <div className="container mx-auto p-4">
        <header className="flex justify-between items-center mb-8 bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center space-x-2">
            <Palmtree className="h-8 w-8 text-yellow-500" />
            <h1 className="text-4xl font-bold text-blue-600">Tunisia Tourism 2.0</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-blue-700">Welcome, {user.firstName}!</span>
            <SignOutButton>
              <Button variant="outline" className="bg-red-500 text-white hover:bg-red-600">Sign Out</Button>
            </SignOutButton>
          </div>
        </header>
        <Tabs defaultValue="itinerary" className="bg-white rounded-lg shadow-lg p-4">
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-4">
            <TabsTrigger value="itinerary" className="bg-yellow-100 hover:bg-yellow-200">
              <Compass className="mr-2 h-4 w-4" />
              Itinerary
            </TabsTrigger>
            <TabsTrigger value="guides" className="bg-green-100 hover:bg-green-200">
              <Users className="mr-2 h-4 w-4" />
              Guides
            </TabsTrigger>
            <TabsTrigger value="booking" className="bg-purple-100 hover:bg-purple-200">
              <Calendar className="mr-2 h-4 w-4" />
              Booking
            </TabsTrigger>
            <TabsTrigger value="reviews" className="bg-pink-100 hover:bg-pink-200">
              <Star className="mr-2 h-4 w-4" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="map" className="bg-blue-100 hover:bg-blue-200">
              <MapPin className="mr-2 h-4 w-4" />
              Map
            </TabsTrigger>
            <TabsTrigger value="culture" className="bg-orange-100 hover:bg-orange-200">
              <Book className="mr-2 h-4 w-4" />
              Culture
            </TabsTrigger>
          </TabsList>
          <div className="mt-4 p-4 bg-white rounded-lg shadow-inner">
            <TabsContent value="itinerary">
              <h2>Personalized Itinerary Builder</h2>
              {/* Add PersonalizedItineraryBuilder component here */}
            </TabsContent>
            <TabsContent value="guides">
              <h2>Local Guide Profiles</h2>
              {guides ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {guides.map((guide) => (
                    <div key={guide._id} className="bg-white p-4 rounded-lg shadow">
                      <h3 className="text-lg font-semibold">{guide.name}</h3>
                      <p>{guide.location}</p>
                      <p>Languages: {guide.languages.join(', ')}</p>
                      <p>Specialties: {guide.specialties.join(', ')}</p>
                      <p>Rating: {guide.rating} ({guide.reviews} reviews)</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Loading guides...</p>
              )}
            </TabsContent>
            <TabsContent value="booking">
              <h2>Booking System</h2>
              {/* Add BookingSystem component here */}
            </TabsContent>
            <TabsContent value="reviews">
              <h2>User Reviews</h2>
              {/* Add UserReviews component here */}
            </TabsContent>
            <TabsContent value="map">
              <h2>Interactive Map</h2>
              {/* Add InteractiveMap component here */}
            </TabsContent>
            <TabsContent value="culture">
              <h2>Cultural Information Database</h2>
              {/* Add CulturalInfoDatabase component here */}
            </TabsContent>
          </div>
        </Tabs>
      </div>
      <footer className="mt-8 bg-blue-600 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p>© 2024 Tunisia Tourism 2.0</p>
          <div className="flex space-x-4">
            <Umbrella className="h-6 w-6" />
            <Sun className="h-6 w-6" />
            <Palmtree className="h-6 w-6" />
          </div>
        </div>
      </footer>
    </div>
  )
}