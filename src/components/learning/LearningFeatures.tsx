
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { arabicLessons, tajweedRules } from '@/lib/quranData';
import { BookOpen, GraduationCap, BookmarkIcon, CheckCircle } from 'lucide-react';

interface LearningFeaturesProps {
  onClose: () => void;
  goToArabic: () => void;
  goToTajweed: () => void;
}

const LearningFeatures: React.FC<LearningFeaturesProps> = ({
  onClose,
  goToArabic,
  goToTajweed
}) => {
  return (
    <Card className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">Quranic Learning Resources</CardTitle>
          <Button variant="outline" size="sm" onClick={onClose}>Close</Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="arabic">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="arabic">Arabic Language</TabsTrigger>
            <TabsTrigger value="tajweed">Tajweed Rules</TabsTrigger>
          </TabsList>
          
          <TabsContent value="arabic">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <GraduationCap className="h-5 w-5 mr-2 text-hafazny-blue" />
                Arabic Language Lessons
              </h3>
              
              <ScrollArea className="h-[400px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {arabicLessons.map(lesson => (
                    <Card key={lesson.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-lg">{lesson.title}</h4>
                          {lesson.progress > 0 && (
                            <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {lesson.progress}%
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{lesson.description}</p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span className="capitalize">{lesson.level}</span>
                          <span>{lesson.duration} min</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="mt-4 text-center">
                <Button className="bg-hafazny-blue hover:bg-hafazny-navy text-white" onClick={goToArabic}>
                  View All Arabic Lessons
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tajweed">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-green-600" />
                Tajweed Rules
              </h3>
              
              <ScrollArea className="h-[400px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tajweedRules.map(rule => (
                    <Card key={rule.id} className={`overflow-hidden border-l-4 ${rule.color} hover:shadow-md transition-shadow`}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-lg">{rule.name}</h4>
                          <span className="text-sm font-arabic">{rule.arabicName}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{rule.description}</p>
                        <div className="bg-gray-50 p-2 rounded text-center font-arabic text-lg">
                          {rule.example}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="mt-4 text-center">
                <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={goToTajweed}>
                  View All Tajweed Rules
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter>
        <div className="flex w-full justify-between">
          <Button variant="outline" className="flex items-center" onClick={onClose}>
            Return to Quran
          </Button>
          <Button variant="secondary" className="flex items-center">
            <BookmarkIcon className="h-4 w-4 mr-2" />
            Save Progress
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LearningFeatures;
