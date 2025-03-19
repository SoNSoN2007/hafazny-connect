
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="glass-panel p-8 rounded-xl mb-8 bg-gradient-to-r from-hafazny-navy to-hafazny-blue">
            <div className="text-center text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">About Hafazny</h1>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Your trusted companion on the journey of Quran memorization and Arabic learning
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-gray-700 mb-4">
                  At Hafazny, our mission is to make Quran memorization and Arabic learning accessible to everyone around the world. We strive to provide effective tools and resources that help Muslims connect with the Quran in a meaningful way.
                </p>
                <p className="text-gray-700">
                  We believe that technology can be a powerful ally in preserving and spreading Islamic knowledge, and we are committed to developing innovative solutions that serve this purpose.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
                <p className="text-gray-700 mb-4">
                  We envision a world where every Muslim has access to high-quality Quranic education regardless of their location, economic status, or prior knowledge. We aim to create a global community of Quran learners supporting each other in their journey.
                </p>
                <p className="text-gray-700">
                  Our long-term vision is to become the leading platform for Islamic education, combining traditional knowledge with modern technology.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <h2 className="text-2xl font-semibold mb-6 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-3">Quran Memorization</h3>
                <p className="text-gray-700">
                  Structured memorization plans, audio recitations by renowned reciters, and progress tracking to help you memorize the Quran effectively.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-3">Arabic Learning</h3>
                <p className="text-gray-700">
                  Comprehensive Arabic lessons designed specifically for understanding the Quran, from basic alphabet to advanced grammar.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-3">Tajweed Rules</h3>
                <p className="text-gray-700">
                  Detailed explanations of tajweed rules with examples to help you perfect your Quran recitation according to proper pronunciation rules.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-center">Contact Us</h2>
              <div className="text-center">
                <p className="text-gray-700 mb-2">Email: support@hafazny.com</p>
                <p className="text-gray-700 mb-2">Phone: +1 (555) 123-4567</p>
                <p className="text-gray-700">Address: 123 Islamic Center St., Knowledge City</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
