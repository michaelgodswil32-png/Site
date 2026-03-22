/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from "motion/react";
import { Gift, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Zap, Loader2 } from "lucide-react";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function App() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAiImage = async () => {
    setIsGenerating(true);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: 'A luxurious, high-end gift card floating in a vibrant, celebratory atmosphere with golden sparkles, soft bokeh lighting, and a modern aesthetic. 4k resolution, professional product photography style.',
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
          },
        },
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          setImageUrl(`data:image/png;base64,${base64EncodeString}`);
          break;
        }
      }
    } catch (error) {
      console.error("Error generating image:", error);
      // Fallback to a nice placeholder if generation fails
      setImageUrl("https://picsum.photos/seed/giftcard/1200/675");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    generateAiImage();
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">GiftRewards</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
              <a href="#" className="hover:text-indigo-600 transition-colors">How it works</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Rewards</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">FAQ</a>
              <button className="bg-neutral-900 text-white px-5 py-2 rounded-full hover:bg-neutral-800 transition-all">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3 h-3" />
                Limited Time Offer
              </div>
              
              <h1 className="font-display text-5xl md:text-7xl font-extrabold text-neutral-900 leading-[1.1] mb-6 tracking-tight">
                Claim Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Free Gift Card</span> Today.
              </h1>
              
              <p className="text-lg text-neutral-600 mb-10 leading-relaxed max-w-xl">
                Join over 2 million users who have earned rewards. Click the button below to claim your exclusive digital gift card instantly.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
                <a 
                  href="https://singingfiles.com/show.php?l=0&u=2466670&id=74375"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 text-lg"
                >
                  Claim Now
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <ShieldCheck className="w-6 h-6 text-neutral-400" />
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Secure</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Zap className="w-6 h-6 text-neutral-400" />
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Instant</span>
                </div>
                <div className="flex flex-col gap-2">
                  <CheckCircle2 className="w-6 h-6 text-neutral-400" />
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Verified</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: AI Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[16/9] bg-neutral-100 rounded-[2rem] overflow-hidden shadow-2xl relative group">
                {isGenerating ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-neutral-50">
                    <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                    <p className="text-sm font-medium text-neutral-500 animate-pulse">Generating AI Visuals...</p>
                  </div>
                ) : (
                  imageUrl && (
                    <motion.img 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      src={imageUrl} 
                      alt="AI Generated Gift Card" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  )
                )}
                
                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-600/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-violet-600/10 rounded-full blur-3xl" />
              </div>

              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-neutral-100 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Top Rated</p>
                  <p className="text-sm font-bold text-neutral-900">4.9/5 User Rating</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Trust Section */}
      <section className="bg-neutral-50 py-16 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-bold text-neutral-400 uppercase tracking-[0.2em] mb-8">Trusted by Global Brands</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale">
            <span className="text-2xl font-black tracking-tighter">AMAZON</span>
            <span className="text-2xl font-black tracking-tighter">NETFLIX</span>
            <span className="text-2xl font-black tracking-tighter">SPOTIFY</span>
            <span className="text-2xl font-black tracking-tighter">STARBUCKS</span>
            <span className="text-2xl font-black tracking-tighter">APPLE</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-neutral-400 text-sm">
        <p>© 2026 GiftRewards Center. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="#" className="hover:text-neutral-600">Privacy Policy</a>
          <a href="#" className="hover:text-neutral-600">Terms of Service</a>
          <a href="#" className="hover:text-neutral-600">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}
