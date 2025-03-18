
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Play, Mic, Award, BookMarked, BookText } from 'lucide-react';
import { tajweedRules, TajweedRule } from '@/lib/quranData';
import { useAuth } from '@/context/AuthContext';

const TajweedRuleCard: React.FC<{ rule: TajweedRule }> = ({ rule }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{rule.name}</CardTitle>
          <Badge className={`${rule.color} text-gray-800`}>{rule.arabicName}</Badge>
        </div>
        <CardDescription>{rule.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md mb-2">
          <h4 className="text-sm font-medium mb-1">Example:</h4>
          <p className="text-lg font-arabic text-right">{rule.example}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button size="sm" variant="outline">Learn More</Button>
        <Button size="sm">
          <Play className="mr-2 h-4 w-4" /> Listen
        </Button>
      </CardFooter>
    </Card>
  );
};

const Tajweed: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(30); // Mock progress

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="glass-panel p-8 rounded-xl mb-8 bg-gradient-to-r from-hafazny-navy to-hafazny-blue">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Tajweed Learning</h1>
                <p className="text-lg opacity-90 mb-6">
                  Master the art of Quranic recitation with our comprehensive Tajweed courses and interactive lessons.
                </p>
                <Button className="bg-white text-hafazny-blue px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                  Start Learning
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 md:w-64 md:h-64 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                    <BookText className="w-24 h-24 md:w-32 md:h-32 text-white" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-hafazny-gold/20 rounded-full filter blur-xl animate-pulse-soft"></div>
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full filter blur-xl animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Your Progress (for logged in users) */}
          {isAuthenticated && (
            <div className="glass-panel p-6 rounded-xl mb-8">
              <h2 className="text-xl font-semibold mb-4">Your Tajweed Progress</h2>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <div className="mr-4 p-2 bg-blue-100 rounded-full">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Lessons Completed</p>
                        <p className="text-xl font-semibold">3/10</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <div className="mr-4 p-2 bg-green-100 rounded-full">
                        <Mic className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Practice Sessions</p>
                        <p className="text-xl font-semibold">12</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <div className="mr-4 p-2 bg-amber-100 rounded-full">
                        <Award className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Achievements</p>
                        <p className="text-xl font-semibold">2</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Tajweed Lessons Tabs */}
          <Tabs defaultValue="rules" className="mb-8">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="rules">Tajweed Rules</TabsTrigger>
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
            </TabsList>

            <TabsContent value="rules">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tajweedRules.map((rule) => (
                  <TajweedRuleCard key={rule.id} rule={rule} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="lessons">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Introduction to Tajweed</CardTitle>
                    <CardDescription>Learn the basic principles of Tajweed</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Progress</span>
                      <span className="text-sm font-medium">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                    <p className="mt-4 text-sm text-gray-600">Duration: 20 minutes</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Continue</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Articulation Points</CardTitle>
                    <CardDescription>Understanding Makharij Al-Huruf</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Progress</span>
                      <span className="text-sm font-medium">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                    <p className="mt-4 text-sm text-gray-600">Duration: 30 minutes</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Continue</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Noon and Meem Rules</CardTitle>
                    <CardDescription>Mastering Noon and Meem Sakinah rules</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Progress</span>
                      <span className="text-sm font-medium">0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                    <p className="mt-4 text-sm text-gray-600">Duration: 25 minutes</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline">Start Lesson</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="practice">
              <div className="text-center py-8">
                <BookMarked className="h-16 w-16 mx-auto text-hafazny-blue opacity-60 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Practice Your Tajweed</h3>
                <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                  Record your recitation and get instant feedback on your tajweed application
                </p>
                {isAuthenticated ? (
                  <div className="flex flex-col items-center gap-4">
                    <Button size="lg" className="bg-hafazny-blue">
                      <Mic className="mr-2 h-5 w-5" /> Start Recording
                    </Button>
                    <p className="text-sm text-gray-500">
                      Your recordings are private and used only for providing feedback
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <p className="text-amber-600 mb-2">You need to log in to use this feature</p>
                    <Button onClick={() => navigate('/auth/login')} size="lg">
                      Sign In to Continue
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Tajweed Certification */}
          <div className="glass-panel p-6 rounded-xl mb-8 bg-gradient-to-r from-hafazny-teal/80 to-hafazny-blue/80 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-semibold mb-3">Tajweed Certification</h2>
                <p className="mb-6 opacity-90">
                  Earn an official certificate in Tajweed by completing all lessons and passing the final assessment.
                </p>
                <Button variant="outline" className="bg-white/10 border-white hover:bg-white/20">
                  Learn More
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg">
                    <Award className="h-20 w-20 text-hafazny-gold" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tajweed;
