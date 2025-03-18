
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  BookMarked, 
  Languages, 
  Mic, 
  Users, 
  User,
  Clock, 
  BarChart2, 
  Calendar, 
  Music,
  Award,
  GraduationCap,
  Plus
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getTranslation } from '@/lib/i18n';
import { surahs } from '@/lib/quranData';

// Mock recent activities
const recentActivities = [
  { 
    type: 'memorization',
    title: 'Al-Fatiha',
    date: '2 hours ago',
    description: 'Completed memorization review'
  },
  { 
    type: 'listen',
    title: 'Al-Ikhlas',
    date: 'Yesterday',
    description: 'Listened to recitation'
  },
  { 
    type: 'class',
    title: 'Tajweed Rules',
    date: '3 days ago',
    description: 'Attended online class'
  },
];

// Mock recommended surahs
const recommendedSurahs = [1, 112, 113, 114, 36].map(id => surahs.find(s => s.id === id)!);

// Mock streak data
const mockStreakData = [
  { day: 'Mon', completed: true },
  { day: 'Tue', completed: true },
  { day: 'Wed', completed: true },
  { day: 'Thu', completed: false },
  { day: 'Fri', completed: true },
  { day: 'Sat', completed: true },
  { day: 'Sun', completed: false },
];

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(35); // Mock progress

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">Sign in to Access Your Dashboard</h2>
            <p className="mb-6 text-gray-600">
              Please sign in to view your personalized dashboard and track your memorization progress.
            </p>
            <div className="space-x-4">
              <Button onClick={() => navigate('/auth/login')}>
                Sign In
              </Button>
              <Button variant="outline" onClick={() => navigate('/auth/register')}>
                Create Account
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <div className="glass-panel p-6 md:p-8 rounded-xl mb-8 bg-gradient-to-r from-hafazny-navy to-hafazny-blue text-white">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {user?.name}</h1>
                <p className="opacity-90 mb-4">
                  {user?.role === 'teacher' 
                    ? 'Continue your teaching journey and help students memorize the Quran.' 
                    : 'Continue your memorization journey and track your progress.'}
                </p>
                <Button className="bg-white text-hafazny-blue hover:bg-white/90">
                  {user?.role === 'teacher' ? 'View Students' : 'Continue Learning'}
                </Button>
              </div>
              <div className="mt-6 md:mt-0 flex items-center">
                <div className="mr-6">
                  <p className="text-sm opacity-80">Current Streak</p>
                  <p className="text-3xl font-bold">5 days</p>
                </div>
                <Avatar className="h-16 w-16 border-2 border-white">
                  <AvatarImage src={user?.profileImage} alt={user?.name} />
                  <AvatarFallback className="bg-hafazny-gold text-white text-xl">
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column - Progress and Quick Actions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Progress Overview */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Memorization Progress</CardTitle>
                    <Button variant="ghost" size="sm" className="text-hafazny-blue">
                      View Details
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Overall Progress</span>
                        <span className="text-sm font-medium">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 rounded-md p-3 text-center">
                        <p className="text-2xl font-bold text-hafazny-blue">7</p>
                        <p className="text-xs text-gray-600">Surahs Memorized</p>
                      </div>
                      <div className="bg-gray-50 rounded-md p-3 text-center">
                        <p className="text-2xl font-bold text-hafazny-blue">143</p>
                        <p className="text-xs text-gray-600">Verses Memorized</p>
                      </div>
                      <div className="bg-gray-50 rounded-md p-3 text-center">
                        <p className="text-2xl font-bold text-hafazny-blue">12</p>
                        <p className="text-xs text-gray-600">Hours Practiced</p>
                      </div>
                      <div className="bg-gray-50 rounded-md p-3 text-center">
                        <p className="text-2xl font-bold text-hafazny-blue">32</p>
                        <p className="text-xs text-gray-600">Daily Reviews</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Learning Paths */}
              <Card>
                <CardHeader>
                  <CardTitle>Continue Learning</CardTitle>
                  <CardDescription>Pick up where you left off</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 flex">
                      <div className="mr-4 p-2 bg-hafazny-blue/10 rounded-full h-fit">
                        <BookOpen className="h-6 w-6 text-hafazny-blue" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Surah Al-Baqarah</h3>
                        <p className="text-sm text-gray-600 mb-3">Verses 1-5 memorization</p>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-600">Progress</span>
                          <span className="text-xs text-gray-600">20%</span>
                        </div>
                        <Progress value={20} className="h-1.5" />
                        <Button size="sm" className="mt-3">Continue</Button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4 flex">
                      <div className="mr-4 p-2 bg-hafazny-teal/10 rounded-full h-fit">
                        <Languages className="h-6 w-6 text-hafazny-teal" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Arabic Alphabet</h3>
                        <p className="text-sm text-gray-600 mb-3">Letters pronunciation</p>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-600">Progress</span>
                          <span className="text-xs text-gray-600">60%</span>
                        </div>
                        <Progress value={60} className="h-1.5" />
                        <Button size="sm" className="mt-3">Continue</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Activity Chart */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Weekly Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-end h-32 mb-2">
                    {mockStreakData.map((day, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className={`w-8 ${day.completed ? 'bg-hafazny-blue' : 'bg-gray-200'} rounded-t`}
                          style={{height: day.completed ? '80px' : '20px'}}
                        ></div>
                        <p className="text-xs font-medium mt-2">{day.day}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600 border-t pt-4">
                    <div>Total this week: <span className="font-medium">5 days</span></div>
                    <div>Daily goal: <span className="font-medium">20 minutes</span></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Actions, Recommendations, and Activity */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigate('/memorization-plan')}>
                    <Plus className="h-5 w-5 mb-1" />
                    <span>Create Plan</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigate('/quran')}>
                    <BookOpen className="h-5 w-5 mb-1" />
                    <span>Browse Quran</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigate('/tajweed')}>
                    <Mic className="h-5 w-5 mb-1" />
                    <span>Tajweed</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigate('/community')}>
                    <Users className="h-5 w-5 mb-1" />
                    <span>Community</span>
                  </Button>
                </CardContent>
              </Card>

              {/* Today's Schedule (for teachers) */}
              {user?.role === 'teacher' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Today's Classes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start p-3 bg-gray-50 rounded-md">
                        <Clock className="h-5 w-5 text-hafazny-blue mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium">8:00 AM - 9:00 AM</p>
                          <p className="text-sm text-gray-600">Tajweed Basics Group</p>
                          <div className="flex items-center mt-2">
                            <div className="flex -space-x-2 mr-2">
                              <Avatar className="h-6 w-6 border-2 border-white">
                                <AvatarFallback className="text-xs bg-hafazny-blue text-white">S1</AvatarFallback>
                              </Avatar>
                              <Avatar className="h-6 w-6 border-2 border-white">
                                <AvatarFallback className="text-xs bg-hafazny-teal text-white">S2</AvatarFallback>
                              </Avatar>
                              <Avatar className="h-6 w-6 border-2 border-white">
                                <AvatarFallback className="text-xs bg-hafazny-gold text-white">+3</AvatarFallback>
                              </Avatar>
                            </div>
                            <span className="text-xs text-gray-600">5 students</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start p-3 bg-gray-50 rounded-md">
                        <Clock className="h-5 w-5 text-hafazny-blue mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium">2:00 PM - 3:00 PM</p>
                          <p className="text-sm text-gray-600">One-on-one with Ahmed</p>
                          <p className="text-xs text-gray-600 mt-1">Surah Al-Kahf memorization</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Full Schedule
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* Recommended for You */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended for You</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recommendedSurahs.map((surah) => (
                      <div 
                        key={surah.id}
                        className="flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md cursor-pointer"
                        onClick={() => navigate(`/quran/${surah.id}`)}
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-hafazny-blue/10 flex items-center justify-center text-hafazny-blue font-semibold mr-3">
                            {surah.id}
                          </div>
                          <div>
                            <p className="font-medium">{surah.name}</p>
                            <p className="text-xs text-gray-600">{surah.englishName}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <BookMarked className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/quran')}>
                    Browse All Surahs
                  </Button>
                </CardFooter>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex">
                        <div className="mr-3">
                          {activity.type === 'memorization' && (
                            <div className="w-8 h-8 rounded-full bg-hafazny-blue/10 flex items-center justify-center">
                              <BookMarked className="h-4 w-4 text-hafazny-blue" />
                            </div>
                          )}
                          {activity.type === 'listen' && (
                            <div className="w-8 h-8 rounded-full bg-hafazny-gold/10 flex items-center justify-center">
                              <Music className="h-4 w-4 text-hafazny-gold" />
                            </div>
                          )}
                          {activity.type === 'class' && (
                            <div className="w-8 h-8 rounded-full bg-hafazny-teal/10 flex items-center justify-center">
                              <GraduationCap className="h-4 w-4 text-hafazny-teal" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center mb-1">
                            <p className="font-medium mr-2">{activity.title}</p>
                            <p className="text-xs text-gray-500">{activity.date}</p>
                          </div>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full">
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Bottom Section - Achievements and Stats */}
          <div className="glass-panel p-6 rounded-xl mb-8 bg-gradient-to-r from-hafazny-teal/80 to-hafazny-blue/80 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-semibold mb-3">Your Achievements</h2>
                <p className="mb-6 opacity-90">
                  Track your progress and earn badges as you advance in your Quran memorization journey.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2">
                      <Award className="h-8 w-8 text-hafazny-gold" />
                    </div>
                    <p className="text-sm font-medium">5-Day Streak</p>
                  </div>
                  <div className="text-center opacity-40">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2">
                      <Award className="h-8 w-8" />
                    </div>
                    <p className="text-sm font-medium">Juz Amma</p>
                  </div>
                  <div className="text-center opacity-40">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2">
                      <Award className="h-8 w-8" />
                    </div>
                    <p className="text-sm font-medium">Master</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Button size="lg" className="bg-white text-hafazny-blue hover:bg-white/90">
                  View All Achievements
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
