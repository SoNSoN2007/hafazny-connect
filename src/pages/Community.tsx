
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, MessageSquare, BookOpen, Trophy } from 'lucide-react';

const Community: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="glass-panel p-8 rounded-xl mb-8 bg-gradient-to-r from-hafazny-navy to-hafazny-blue">
            <div className="text-white max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Join Our Quran Learning Community</h1>
              <p className="text-lg opacity-90 mb-6">
                Connect with fellow learners, share your progress, and support each other on the journey of Quran memorization.
              </p>
              <Button className="bg-white text-hafazny-blue hover:bg-opacity-90">
                Join Community
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Study Groups */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-hafazny-blue/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-hafazny-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Study Groups</h3>
                    <p className="text-sm text-gray-600">Join or create study circles</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Browse Groups
                </Button>
              </CardContent>
            </Card>

            {/* Discussions */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-hafazny-gold/10 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-hafazny-gold" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Discussions</h3>
                    <p className="text-sm text-gray-600">Share knowledge and ask questions</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View Forums
                </Button>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-hafazny-teal/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-hafazny-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Resources</h3>
                    <p className="text-sm text-gray-600">Access learning materials</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Browse Resources
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Progress Showcase */}
          <div className="glass-panel p-6 rounded-xl mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Community Achievements</h2>
              <Trophy className="w-6 h-6 text-hafazny-gold" />
            </div>
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Join the community to see and share achievements!</p>
              <Button variant="outline">Sign Up Now</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
