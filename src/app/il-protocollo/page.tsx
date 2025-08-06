"use client";

import { useState } from "react";
import { Award, Target, Activity, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import Navigation from "@/components/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const protocolSections = [
  {
    id: "eat",
    title: "Eat",
    emoji: "🥗",
    content: `
      <h2 class="text-2xl font-bold mb-4">Bryan Johnson's Daily Nutrition</h2>
      <p class="mb-4">6 days per week</p>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">First meal — 11am</h3>
      <ul class="space-y-2 mb-6">
        <li>• Super Veggie (broccoli, cauliflower, dark leafy greens, garlic, ginger root, lime, cumin, apple cider vinegar, hemp seeds) <strong>450 cal</strong></li>
        <li>• Nutty Pudding (macadamia nut milk, ground macadamia/walnuts/flax, chia seeds, Ceylon cinnamon, berries, pomegranate juice, sunflower lecithin) <strong>330 cal</strong></li>
        <li>• 1 tablespoon of extra virgin olive oil <strong>120 cal</strong></li>
      </ul>
      <p class="mb-6">Calories 900, Protein 30g+</p>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Second meal — 6 hours later</h3>
      <ul class="space-y-2 mb-6">
        <li>• Super Veggie <strong>450 cal</strong></li>
        <li>• Nutty Pudding <strong>330 cal</strong></li>
        <li>• Orange fennel salad, avocado with herbs, beet salad <strong>240 cal</strong></li>
        <li>• 1 tablespoon of extra virgin olive oil <strong>120 cal</strong></li>
      </ul>
      <p class="mb-6">Calories 1,140, Protein 30g+</p>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Third meal — +/- 1 hour after second meal</h3>
      <ul class="space-y-2 mb-6">
        <li>• A variety of vegetables, berries, nuts, seeds and legumes</li>
        <li>• Example: stuffed sweet potato <strong>500 cal</strong></li>
      </ul>
      <p class="mb-6">Calories 500, Protein 15g+</p>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Optional snack — 7:30pm</h3>
      <ul class="space-y-2 mb-6">
        <li>• Brazil nut, macadamia and walnuts with berries</li>
      </ul>
      
      <p class="text-xl font-bold mb-4"><strong>Daily Total: 2,540 calories</strong></p>
      <p>Note: No eating after 8:30pm.</p>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue mt-6">1 day per week, Bryan eats whatever he wants</h3>
      <p>His favorite are pizza (without cheese), grape nuts cereal and Panda licorice. His only rule: stop eating before feeling full.</p>
    `
  },
  {
    id: "exercise",
    title: "Exercise",
    emoji: "💪",
    content: `
      <h2 class="text-2xl font-bold mb-4">Bryan Johnson's Workout Routine</h2>
      <p class="mb-6">7 days a week for 60-90 minutes (~70 minutes on average).</p>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Daily routine:</h3>
      <ol class="space-y-2 mb-6">
        <li>1. 10 min moderate exercise to get going</li>
        <li>2. 10 min high-intensity interval training (HIIT). 3 × per week it's on a bike with a 2 minute warm-up, then 4 minutes at 85%+ of VO₂ max. The other 4 days is doing other high-intensity exercises.</li>
        <li>3. 40+ min of strength and cardio rotation. Weight lifting 3x per week for ~12 min, working all major muscle groups.</li>
      </ol>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Workout protocol — 3x per week:</h3>
      <div class="grid md:grid-cols-2 gap-2 mb-6">
        <div class="bg-navy-charcoal/50 p-3 rounded">Leg press (1 set, 8-15 reps)</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Bench press (1 set, 8-15 reps)</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Leg curls (1 set, 8-15 reps)</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Pull-ups (1 set, 8-15 reps)</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Overhead press (1 set, 8-15 reps)</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Machine back extensions (1 set, 8-15 reps)</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Machine chest fly (1 set, 8-15 reps)</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Obliques (1 set, 8-15 reps)</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Lateral shoulder raises (1 set, 8-15 reps)</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Back (1 set, 8-15 reps)</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Machine tricep extension (1 set, 8-15 reps)</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Face pulls (1 set, 8-15 reps)</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Machine bicep curls (1 set, 8-15 reps)</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Machine ab crunches (1 set, 8-15 reps)</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Machine calf raises (1 set, 12-20 reps)</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Machine lateral shoulder raises (1 set, 8-15 reps)</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Machine leg extension (1 set, 8-15 reps)</div>
      </div>
      
      <p class="mb-6">Each set is done to failure or close to failure. Most exercises are one set per major muscle group. The volume is relatively low, with the focus on intensity and consistency.</p>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Notes:</h3>
      <ul class="space-y-2">
        <li>• 100+ consecutive push-ups</li>
        <li>• 60+ consecutive pull-ups</li>
        <li>• 240 lb bench press (one rep)</li>
        <li>• Always breathe through the nose, never the mouth</li>
      </ul>
    `
  },
  {
    id: "sleep",
    title: "Sleep",
    emoji: "😴",
    content: `
      <h2 class="text-2xl font-bold mb-4">Bryan Johnson's Sleep Protocol</h2>
      <p class="mb-6">High-quality sleep is the foundation upon which everything else in life is built.</p>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Prioritize a wind-down routine:</h3>
      <ul class="space-y-2 mb-6">
        <li>• Aim for 8+ hours of sleep</li>
        <li>• Have the same bed time each night (10 pm)</li>
        <li>• No bright lights and no heavy mental stimulation for 1+ hours before bed</li>
        <li>• Avoid heavy meals, alcohol and intense exercise for 3 hours before bed</li>
        <li>• Try a chamomile or other herbal tea one hour before bed</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Supplements (30-60 minutes before bed):</h3>
      <div class="grid md:grid-cols-2 gap-3 mb-6">
        <div class="bg-navy-charcoal/50 p-3 rounded-lg">
          <p class="font-medium text-white">Magnesium Glycinate</p>
          <p class="text-sm text-slate-400">500 mg</p>
        </div>
        <div class="bg-navy-charcoal/50 p-3 rounded-lg">
          <p class="font-medium text-white">L-theanine</p>
          <p class="text-sm text-slate-400">200 mg (occasionally up to 400 mg)</p>
        </div>
        <div class="bg-navy-charcoal/50 p-3 rounded-lg">
          <p class="font-medium text-white">Glycine</p>
          <p class="text-sm text-slate-400">2-3g</p>
        </div>
        <div class="bg-navy-charcoal/50 p-3 rounded-lg">
          <p class="font-medium text-white">Ashwagandha</p>
          <p class="text-sm text-slate-400">600 mg (occasionally)</p>
        </div>
      </div>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Bryan's Sleep Data (30 day average):</h3>
      <ul class="space-y-2 mb-6">
        <li>• Total Sleep: 8hr 17min</li>
        <li>• REM: 1hr 56min</li>
        <li>• Deep: 2hr 39min</li>
        <li>• Sleep Efficiency: 99.2%</li>
        <li>• Latency: 3min</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Bedroom Environment:</h3>
      <ul class="space-y-2 mb-6">
        <li>• Room temperature: 15-20°C / 60-68°F (on the cold side)</li>
        <li>• Use a sleep mask or have black-out curtains that eliminate all light</li>
        <li>• Use a white noise machine or ear plugs to block distracting noise</li>
        <li>• Comfortable mattress and quality bedding</li>
        <li>• An alarm that gradually wakes with light + sound</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Sleep tracking:</h3>
      <p>Wear an Oura ring for daily feedback and coach yourself based upon results</p>
    `
  },
  {
    id: "females",
    title: "Females",
    emoji: "👩",
    content: `
      <h2 class="text-2xl font-bold mb-4">Protocol for Females</h2>
      <p class="mb-6">This information is based on consultations with Bryan's female team members and their experiences.</p>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Key Considerations:</h3>
      <ul class="space-y-2 mb-6">
        <li>• Hormonal cycles affect energy, mood, and physical performance</li>
        <li>• Iron requirements are typically higher due to menstruation</li>
        <li>• Calcium and vitamin D are particularly important for bone health</li>
        <li>• Protein needs may vary throughout the menstrual cycle</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Cycle-Synced Nutrition:</h3>
      <ul class="space-y-2 mb-6">
        <li>• <strong>Follicular phase:</strong> Focus on fresh, light foods and fermented options</li>
        <li>• <strong>Ovulatory phase:</strong> Increase raw foods and anti-inflammatory options</li>
        <li>• <strong>Luteal phase:</strong> Emphasize root vegetables and complex carbohydrates</li>
        <li>• <strong>Menstrual phase:</strong> Warm, comforting foods and iron-rich options</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Exercise Modifications:</h3>
      <ul class="space-y-2 mb-6">
        <li>• High-intensity training works best during follicular and ovulatory phases</li>
        <li>• Strength training can be maintained throughout the cycle</li>
        <li>• Consider gentler activities during menstruation if experiencing discomfort</li>
        <li>• Focus on flexibility and recovery work during luteal phase</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Sleep Considerations:</h3>
      <ul class="space-y-2 mb-6">
        <li>• Progesterone rise in luteal phase may increase sleep needs</li>
        <li>• Body temperature fluctuations may require bedroom temperature adjustments</li>
        <li>• Magnesium supplementation can help with PMS-related sleep issues</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Supplements to Consider:</h3>
      <div class="grid md:grid-cols-2 gap-3">
        <div class="bg-navy-charcoal/50 p-3 rounded">Iron (if deficient, test levels first)</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">B-complex vitamins</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Omega-3 fatty acids</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Vitamin D3</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Calcium</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Probiotics for hormonal balance</div>
      </div>
    `
  },
  {
    id: "pregnancy",
    title: "Pregnancy",
    emoji: "🤰",
    content: `
      <h2 class="text-2xl font-bold mb-4">Pregnancy Protocol</h2>
      <p class="mb-6">Guidelines for maintaining health during pregnancy. Always consult with your healthcare provider.</p>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Pre-Conception:</h3>
      <ul class="space-y-2 mb-6">
        <li>• Start folic acid supplementation (400-800 mcg) at least 3 months before conception</li>
        <li>• Achieve optimal vitamin D levels (test and supplement if needed)</li>
        <li>• Ensure adequate iron stores</li>
        <li>• Maintain healthy body weight</li>
        <li>• Eliminate alcohol and tobacco</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">First Trimester:</h3>
      <ul class="space-y-2 mb-6">
        <li>• Continue prenatal vitamins with folic acid</li>
        <li>• Small, frequent meals to manage morning sickness</li>
        <li>• Stay hydrated (8-10 glasses of water daily)</li>
        <li>• Gentle exercise like walking or prenatal yoga</li>
        <li>• Avoid raw fish, unpasteurized products, and high-mercury fish</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Second Trimester:</h3>
      <ul class="space-y-2 mb-6">
        <li>• Increase caloric intake by ~340 calories/day</li>
        <li>• Focus on calcium-rich foods (1000mg daily)</li>
        <li>• Continue regular, moderate exercise</li>
        <li>• Monitor weight gain (typically 1 lb/week)</li>
        <li>• Consider DHA supplementation for baby's brain development</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Third Trimester:</h3>
      <ul class="space-y-2 mb-6">
        <li>• Increase caloric intake by ~450 calories/day</li>
        <li>• Eat smaller, more frequent meals</li>
        <li>• Focus on iron-rich foods to prevent anemia</li>
        <li>• Practice pelvic floor exercises</li>
        <li>• Prepare for breastfeeding with proper nutrition</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Exercise During Pregnancy:</h3>
      <ul class="space-y-2 mb-6">
        <li>• 150 minutes of moderate-intensity exercise weekly</li>
        <li>• Walking, swimming, stationary cycling are excellent choices</li>
        <li>• Avoid contact sports and activities with fall risk</li>
        <li>• Stop exercising if experiencing dizziness, shortness of breath, or contractions</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Essential Nutrients:</h3>
      <div class="grid md:grid-cols-2 gap-3">
        <div class="bg-navy-charcoal/50 p-3 rounded">Folic acid: 600-800 mcg</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Iron: 27 mg</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Calcium: 1000 mg</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Vitamin D: 600 IU</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">DHA: 200-300 mg</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Protein: 75-100g daily</div>
      </div>
    `
  },
  {
    id: "what-is-protocol",
    title: "What is the Protocol?",
    emoji: "📋",
    content: `
      <h2 class="text-2xl font-bold mb-4">What is the Protocol?</h2>
      <p class="mb-6">The Blueprint Protocol is a comprehensive health optimization system based on scientific research and data-driven decisions.</p>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Core Principles:</h3>
      <ul class="space-y-2 mb-6">
        <li>• <strong>Measurement:</strong> Track everything that matters</li>
        <li>• <strong>Consistency:</strong> Same routine every day for reliable data</li>
        <li>• <strong>Evidence-based:</strong> Every decision backed by research</li>
        <li>• <strong>Personalization:</strong> Adjust based on your biomarkers</li>
        <li>• <strong>Longevity focus:</strong> Optimize for healthspan, not just lifespan</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">The Five Pillars:</h3>
      <ol class="space-y-2 mb-6">
        <li>1. <strong>Sleep:</strong> The foundation of all health</li>
        <li>2. <strong>Diet:</strong> Nutrient-dense, calorie-controlled eating</li>
        <li>3. <strong>Exercise:</strong> Daily movement combining strength and cardio</li>
        <li>4. <strong>Supplements:</strong> Evidence-based supplementation</li>
        <li>5. <strong>Measurements:</strong> Regular testing and tracking</li>
      </ol>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Getting Started:</h3>
      <ol class="space-y-2 mb-6">
        <li>1. Start with sleep optimization (easiest, highest impact)</li>
        <li>2. Gradually adjust meal timing and composition</li>
        <li>3. Build consistent exercise habits</li>
        <li>4. Add supplements based on testing</li>
        <li>5. Track progress with regular measurements</li>
      </ol>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Key Metrics to Track:</h3>
      <ul class="space-y-2 mb-6">
        <li>• Sleep quality and duration</li>
        <li>• Resting heart rate and HRV</li>
        <li>• Body composition</li>
        <li>• Blood biomarkers</li>
        <li>• Cognitive performance</li>
        <li>• Energy levels</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Philosophy:</h3>
      <p class="mb-6">"Don't die" - The simple goal is to avoid the things that will kill you prematurely while optimizing the things that will keep you healthy and vibrant for as long as possible.</p>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Important Note:</h3>
      <p>This protocol is intense and requires significant commitment. Start slowly, make gradual changes, and always consult with healthcare providers before making major lifestyle changes.</p>
    `
  },
  {
    id: "daily-routine",
    title: "Bryan's Daily Routine",
    emoji: "📅",
    content: `
      <h2 class="text-2xl font-bold mb-4">Bryan Johnson's Daily Routine</h2>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Bedtime Routine (starting at 8:30pm):</h3>
      <ul class="space-y-2 mb-6">
        <li>• 8:30pm - Last food of the day</li>
        <li>• 9:00pm - Take sleep supplements</li>
        <li>• 9:30pm - Begin wind-down (no screens, dim lights)</li>
        <li>• 10:00pm - In bed, lights out</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Morning (5:00am - 9:00am):</h3>
      <ul class="space-y-2 mb-6">
        <li>• 5:00am - Wake up naturally (no alarm needed)</li>
        <li>• 5:10am - Morning measurements (weight, body temp, blood glucose)</li>
        <li>• 5:30am - Light therapy (10,000 lux for 10-15 minutes)</li>
        <li>• 5:45am - Morning supplements</li>
        <li>• 6:00am - Exercise (60-90 minutes)</li>
        <li>• 7:30am - Post-workout supplements</li>
        <li>• 8:00am - Red light therapy</li>
        <li>• 8:30am - Shower and skincare routine</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Midday (9:00am - 2:00pm):</h3>
      <ul class="space-y-2 mb-6">
        <li>• 9:00am - Deep work session #1</li>
        <li>• 11:00am - First meal (Super Veggie + Nutty Pudding)</li>
        <li>• 11:30am - Midday supplements</li>
        <li>• 12:00pm - Walking meeting or light activity</li>
        <li>• 1:00pm - Deep work session #2</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Afternoon (2:00pm - 6:00pm):</h3>
      <ul class="space-y-2 mb-6">
        <li>• 2:00pm - HRV training/meditation</li>
        <li>• 3:00pm - Deep work session #3</li>
        <li>• 5:00pm - Second meal</li>
        <li>• 5:30pm - Evening supplements</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Evening (6:00pm - 8:30pm):</h3>
      <ul class="space-y-2 mb-6">
        <li>• 6:00pm - Third meal (optional)</li>
        <li>• 6:30pm - Family time/social activities</li>
        <li>• 7:30pm - Optional snack (nuts and berries)</li>
        <li>• 8:00pm - Prepare for tomorrow</li>
        <li>• 8:30pm - Begin bedtime routine</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Key Principles:</h3>
      <ul class="space-y-2">
        <li>• Same schedule every single day (including weekends)</li>
        <li>• No meetings before 11am (protect morning routine)</li>
        <li>• All meals within 6-8 hour window</li>
        <li>• No food after 8:30pm</li>
        <li>• In bed by 10pm every night</li>
        <li>• Track everything for optimization</li>
      </ul>
    `
  },
  {
    id: "bad-habits",
    title: "Bad Habits",
    emoji: "🚫",
    content: `
      <h2 class="text-2xl font-bold mb-4">Breaking Bad Habits</h2>
      <p class="mb-6">The protocol requires eliminating behaviors that accelerate aging and compromise health.</p>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">1. Alcohol Consumption</h3>
      <ul class="space-y-2 mb-6">
        <li>• Zero alcohol policy - no exceptions</li>
        <li>• Alcohol disrupts sleep, damages liver, accelerates aging</li>
        <li>• Replace with: Kombucha, herbal teas, sparkling water with fruit</li>
        <li>• Social tip: Order mocktails or bring your own drinks to events</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">2. Smoking/Vaping</h3>
      <ul class="space-y-2 mb-6">
        <li>• Complete cessation required</li>
        <li>• Damages every organ system</li>
        <li>• Accelerates skin aging and cellular damage</li>
        <li>• Seek professional help for cessation if needed</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">3. Late Night Eating</h3>
      <ul class="space-y-2 mb-6">
        <li>• No food after 8:30pm</li>
        <li>• Disrupts circadian rhythm and sleep quality</li>
        <li>• Increases inflammation and metabolic dysfunction</li>
        <li>• If hungry: Drink water or herbal tea instead</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">4. Processed Foods</h3>
      <ul class="space-y-2 mb-6">
        <li>• Eliminate all ultra-processed foods</li>
        <li>• No refined sugars or artificial sweeteners</li>
        <li>• Avoid seed oils (use olive oil instead)</li>
        <li>• Read all labels - if you can't pronounce it, don't eat it</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">5. Sedentary Lifestyle</h3>
      <ul class="space-y-2 mb-6">
        <li>• Move every hour during waking hours</li>
        <li>• Minimum 10,000 steps daily</li>
        <li>• Stand/walk during phone calls</li>
        <li>• Use standing desk for work</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">6. Poor Sleep Hygiene</h3>
      <ul class="space-y-2 mb-6">
        <li>• No screens 1 hour before bed</li>
        <li>• No caffeine after 2pm</li>
        <li>• Consistent sleep/wake times (no "catching up" on weekends)</li>
        <li>• No work in bedroom</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Breaking the Habits - Strategy:</h3>
      <ol class="space-y-2 mb-6">
        <li>1. <strong>Track triggers:</strong> Identify what prompts the behavior</li>
        <li>2. <strong>Replace, don't restrict:</strong> Find healthy alternatives</li>
        <li>3. <strong>Environment design:</strong> Remove temptations from environment</li>
        <li>4. <strong>Accountability:</strong> Tell others about your commitment</li>
        <li>5. <strong>Measure impact:</strong> Track biomarkers to see improvements</li>
      </ol>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Timeline for Change:</h3>
      <ul class="space-y-2">
        <li>• Days 1-7: Hardest period, use willpower and support</li>
        <li>• Days 8-21: Habit breaking phase, stay vigilant</li>
        <li>• Days 22-66: New habit formation</li>
        <li>• Day 67+: New behavior becomes automatic</li>
      </ul>
    `
  },
  {
    id: "clean-water",
    title: "Clean Water",
    emoji: "💧",
    content: `
      <h2 class="text-2xl font-bold mb-4">Water Filtration System</h2>
      <p class="mb-6">Clean water is essential for optimal health. Most tap water contains contaminants that accumulate over time.</p>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Water Quality Standards:</h3>
      <ul class="space-y-2 mb-6">
        <li>• TDS (Total Dissolved Solids): < 50 ppm ideal</li>
        <li>• pH: 7.0-7.5 (slightly alkaline)</li>
        <li>• Zero heavy metals (lead, mercury, arsenic)</li>
        <li>• No chlorine or chloramines</li>
        <li>• No fluoride (controversial but removed in protocol)</li>
        <li>• No microplastics</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Recommended Filtration System:</h3>
      <h4 class="text-lg font-semibold mb-2">Whole House System:</h4>
      <ul class="space-y-2 mb-4">
        <li>• Stage 1: Sediment filter (5 micron)</li>
        <li>• Stage 2: Carbon block filter</li>
        <li>• Stage 3: KDF media for heavy metals</li>
        <li>• Stage 4: UV sterilization</li>
      </ul>
      
      <h4 class="text-lg font-semibold mb-2">Kitchen Reverse Osmosis:</h4>
      <ul class="space-y-2 mb-6">
        <li>• APEC 5-Stage RO System</li>
        <li>• Removes 99% of contaminants</li>
        <li>• Remineralization stage adds back healthy minerals</li>
        <li>• Change filters every 6-12 months</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Daily Water Protocol:</h3>
      <ul class="space-y-2 mb-6">
        <li>• <strong>Amount:</strong> 3-4 liters per day minimum</li>
        <li>• <strong>Timing:</strong> 500ml upon waking, 250ml every hour</li>
        <li>• <strong>Temperature:</strong> Room temperature (not cold)</li>
        <li>• <strong>Enhancement:</strong> Add pinch of Celtic sea salt for electrolytes</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Water Testing:</h3>
      <ul class="space-y-2 mb-6">
        <li>• Test water quality monthly with TDS meter</li>
        <li>• Professional lab test annually</li>
        <li>• TDS Meter for regular testing</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Travel Water Safety:</h3>
      <ul class="space-y-2 mb-6">
        <li>• Portable filter: LifeStraw</li>
        <li>• UV purifier for international travel</li>
        <li>• Always use filtered water for supplements</li>
        <li>• Avoid plastic bottles (microplastics)</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Shower/Bath Filtration:</h3>
      <ul class="space-y-2">
        <li>• Chlorine absorbed through skin during showers</li>
        <li>• Install vitamin C shower filters</li>
        <li>• AquaBliss 12-Stage Shower Filter recommended</li>
      </ul>
    `
  },
  {
    id: "food-guide",
    title: "Food Guide",
    emoji: "🥦",
    content: `
      <h2 class="text-2xl font-bold mb-4">Complete Food Guide</h2>
      <p class="mb-6">Detailed breakdown of foods to eat, avoid, and how to prepare them.</p>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Daily Staples:</h3>
      
      <h4 class="text-lg font-semibold mb-2">Vegetables (Organic when possible):</h4>
      <ul class="space-y-2 mb-4">
        <li>• <strong>Broccoli:</strong> 300g daily, steamed 3-4 minutes</li>
        <li>• <strong>Cauliflower:</strong> 200g daily, roasted or steamed</li>
        <li>• <strong>Dark leafy greens:</strong> 100g (spinach, kale, arugula)</li>
        <li>• <strong>Garlic:</strong> 1-2 cloves, crushed and rested 10 min</li>
        <li>• <strong>Ginger:</strong> 1 inch fresh root</li>
        <li>• <strong>Mushrooms:</strong> 50g shiitake or lion's mane</li>
      </ul>
      
      <h4 class="text-lg font-semibold mb-2">Fruits (Limited quantity):</h4>
      <ul class="space-y-2 mb-4">
        <li>• <strong>Blueberries:</strong> 60g daily (wild preferred)</li>
        <li>• <strong>Raspberries:</strong> 30g daily</li>
        <li>• <strong>Strawberries:</strong> 30g daily</li>
        <li>• <strong>Pomegranate:</strong> 30ml pure juice</li>
        <li>• <strong>Avocado:</strong> 1/2 daily</li>
      </ul>
      
      <h4 class="text-lg font-semibold mb-2">Nuts & Seeds (Exact amounts):</h4>
      <ul class="space-y-2 mb-4">
        <li>• <strong>Macadamia nuts:</strong> 30g (grammatura esatta)</li>
        <li>• <strong>Walnuts:</strong> 15g (grammatura esatta)</li>
        <li>• <strong>Brazil nuts:</strong> 1 nut daily (selenium)</li>
        <li>• <strong>Flax seeds:</strong> 1 tablespoon ground fresh</li>
        <li>• <strong>Chia seeds:</strong> 1 tablespoon soaked</li>
        <li>• <strong>Hemp seeds:</strong> 2 tablespoons</li>
      </ul>
      
      <h4 class="text-lg font-semibold mb-2">Legumes:</h4>
      <ul class="space-y-2 mb-6">
        <li>• <strong>Black lentils:</strong> 45g dry weight</li>
        <li>• <strong>Chickpeas:</strong> 45g dry weight</li>
        <li>• Soak overnight, cook with kombu for digestibility</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Preparation Methods:</h3>
      <ul class="space-y-2 mb-6">
        <li>• <strong>Steaming:</strong> Preserves most nutrients</li>
        <li>• <strong>Raw:</strong> Some vegetables in salads</li>
        <li>• <strong>Fermented:</strong> Sauerkraut, kimchi for probiotics</li>
        <li>• <strong>Never:</strong> Deep frying or high-heat cooking</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Shopping List Template:</h3>
      <h4 class="text-lg font-semibold mb-2">Weekly purchases:</h4>
      <ul class="space-y-2 mb-6">
        <li>• 2.1 kg broccoli</li>
        <li>• 1.4 kg cauliflower</li>
        <li>• 700g mixed dark leafy greens</li>
        <li>• 420g blueberries</li>
        <li>• 210g macadamia nuts (grammatura totale)</li>
        <li>• 7 Brazil nuts</li>
        <li>• Extra virgin olive oil (1 bottle)</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Foods to NEVER Eat:</h3>
      <ul class="space-y-2 mb-6">
        <li>• Refined sugar in any form</li>
        <li>• Processed meats</li>
        <li>• Dairy products</li>
        <li>• Refined grains (white bread, pasta)</li>
        <li>• Seed oils (canola, soybean, corn)</li>
        <li>• Artificial sweeteners</li>
        <li>• Alcohol</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Meal Prep Tips:</h3>
      <ul class="space-y-2">
        <li>• Prep vegetables twice weekly</li>
        <li>• Make Nutty Pudding in batches</li>
        <li>• Pre-portion nuts and seeds</li>
        <li>• Keep emergency protocol-friendly snacks ready</li>
      </ul>
    `
  },
  {
    id: "hair",
    title: "Hair",
    emoji: "💇‍♂️",
    content: `
      <h2 class="text-2xl font-bold mb-4">Hair Loss Prevention Protocol</h2>
      <p class="mb-6">Comprehensive approach to maintaining and regrowing hair.</p>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Topical Treatments:</h3>
      
      <h4 class="text-lg font-semibold mb-2">Morning Routine:</h4>
      <ul class="space-y-2 mb-4">
        <li>• <strong>Minoxidil 5%:</strong> Apply to scalp, leave for 4 hours minimum</li>
        <li>• <strong>Caffeine solution:</strong> Apply after minoxidil dries</li>
        <li>• <strong>Saw Palmetto serum:</strong> Natural DHT blocker</li>
      </ul>
      
      <h4 class="text-lg font-semibold mb-2">Evening Routine:</h4>
      <ul class="space-y-2 mb-6">
        <li>• <strong>Tretinoin 0.025%:</strong> Enhances minoxidil absorption (prescription)</li>
        <li>• <strong>Rosemary oil:</strong> Mix 5 drops with carrier oil, massage scalp</li>
        <li>• <strong>Microneedling:</strong> 1.5mm dermaroller, once weekly</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Oral Supplements:</h3>
      <div class="grid md:grid-cols-2 gap-3 mb-6">
        <div class="bg-navy-charcoal/50 p-3 rounded">Saw Palmetto: 320mg daily</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Biotin: 10,000 mcg daily</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Collagen peptides: 10g daily</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Iron: Only if deficient (test first)</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Zinc: 15mg daily</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Vitamin D3: 2000 IU daily</div>
      </div>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Red Light Therapy:</h3>
      <ul class="space-y-2 mb-6">
        <li>• Wavelength: 650-670nm and 830-850nm</li>
        <li>• Duration: 10-15 minutes daily</li>
        <li>• Device: iRestore Laser Cap recommended</li>
        <li>• Consistency is key - daily use required</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Scalp Care:</h3>
      <ul class="space-y-2 mb-6">
        <li>• <strong>Shampoo:</strong> Ketoconazole 2% twice weekly</li>
        <li>• <strong>Regular shampoo:</strong> Sulfate-free, gentle formula</li>
        <li>• <strong>Scalp massage:</strong> 5 minutes daily to increase blood flow</li>
        <li>• <strong>Cold rinse:</strong> Final rinse with cold water</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Lifestyle Factors:</h3>
      <ul class="space-y-2 mb-6">
        <li>• Manage stress (cortisol kills follicles)</li>
        <li>• No tight hairstyles or harsh treatments</li>
        <li>• Silk pillowcase to reduce friction</li>
        <li>• Avoid hot water on scalp</li>
        <li>• No smoking (restricts blood flow to follicles)</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Medical Options (Consult Doctor):</h3>
      <ul class="space-y-2 mb-6">
        <li>• Finasteride 1mg (prescription, consider side effects)</li>
        <li>• Dutasteride 0.5mg (stronger alternative)</li>
        <li>• PRP injections (platelet-rich plasma)</li>
        <li>• Hair transplant (last resort)</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Progress Tracking:</h3>
      <ul class="space-y-2">
        <li>• Photos: Same angle, lighting, weekly</li>
        <li>• Hair count: Specific area monthly</li>
        <li>• Shedding: Count hairs in drain catcher</li>
        <li>• Timeline: Expect results after 3-6 months</li>
      </ul>
    `
  },
  {
    id: "skin",
    title: "Skin",
    emoji: "✨",
    content: `
      <h2 class="text-2xl font-bold mb-4">Skincare Protocol</h2>
      <p class="mb-6">Science-based approach to reversing skin aging and maintaining healthy skin.</p>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Morning Routine (in order):</h3>
      <ol class="space-y-2 mb-6">
        <li>1. <strong>Gentle cleanser:</strong> CeraVe Hydrating Cleanser</li>
        <li>2. <strong>Vitamin C serum:</strong> 20% L-ascorbic acid</li>
        <li>3. <strong>Hyaluronic acid:</strong> Apply to damp skin</li>
        <li>4. <strong>Niacinamide 10%:</strong> For pore refinement</li>
        <li>5. <strong>Moisturizer:</strong> With ceramides</li>
        <li>6. <strong>Sunscreen:</strong> SPF 50+ broad spectrum (365 days/year)</li>
      </ol>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Evening Routine (in order):</h3>
      <ol class="space-y-2 mb-6">
        <li>1. <strong>Oil cleanser:</strong> Remove sunscreen/makeup</li>
        <li>2. <strong>Gentle cleanser:</strong> Second cleanse</li>
        <li>3. <strong>Tretinoin 0.05%:</strong> Start at 0.025%, increase gradually</li>
        <li>4. <strong>Wait 20 minutes</strong></li>
        <li>5. <strong>Peptide serum:</strong> Copper peptides or Matrixyl</li>
        <li>6. <strong>Moisturizer:</strong> Richer formula than morning</li>
        <li>7. <strong>Face oil:</strong> Rosehip or squalane (optional)</li>
      </ol>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Weekly Treatments:</h3>
      <ul class="space-y-2 mb-6">
        <li>• <strong>Monday:</strong> AHA peel (glycolic acid 10%)</li>
        <li>• <strong>Wednesday:</strong> Hydrating mask</li>
        <li>• <strong>Friday:</strong> BHA treatment (salicylic acid 2%)</li>
        <li>• <strong>Sunday:</strong> Dermarolling 0.5mm</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Professional Treatments:</h3>
      <ul class="space-y-2 mb-6">
        <li>• <strong>IPL/BBL:</strong> Every 3 months for pigmentation</li>
        <li>• <strong>Microneedling:</strong> Professional depth, every 6 weeks</li>
        <li>• <strong>Chemical peels:</strong> Medical grade, quarterly</li>
        <li>• <strong>Botox:</strong> Preventative, small doses (optional)</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Body Skin Care:</h3>
      <ul class="space-y-2 mb-6">
        <li>• Daily moisturizer with urea 10%</li>
        <li>• Body retinol 2x weekly</li>
        <li>• Dry brushing before shower</li>
        <li>• Weekly body scrub</li>
        <li>• Sunscreen on exposed areas always</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Internal Support:</h3>
      <div class="grid md:grid-cols-2 gap-3 mb-6">
        <div class="bg-navy-charcoal/50 p-3 rounded">Collagen peptides: 10g daily</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Vitamin C: 1000mg daily</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Omega-3: 2g daily</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Astaxanthin: 12mg daily (internal sunscreen)</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Hyaluronic acid: 200mg oral supplement</div>
      </div>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Sun Protection Protocol:</h3>
      <ul class="space-y-2 mb-6">
        <li>• SPF 50+ every 2 hours when outdoors</li>
        <li>• UV-blocking clothing</li>
        <li>• Wide-brim hat</li>
        <li>• Avoid sun 10am-4pm</li>
        <li>• Window UV film for car/home</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Products Bryan Uses:</h3>
      <ul class="space-y-2">
        <li>• Skinceuticals C E Ferulic</li>
        <li>• Tretinoin 0.05% (prescription)</li>
        <li>• EltaMD UV Clear SPF 46</li>
      </ul>
    `
  },
  {
    id: "measurement",
    title: "Measurement",
    emoji: "📊",
    content: `
      <h2 class="text-2xl font-bold mb-4">Comprehensive Measurement Protocol</h2>
      <p class="mb-6">What gets measured gets managed. Track these biomarkers regularly.</p>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Daily Measurements:</h3>
      <ul class="space-y-2 mb-6">
        <li>• <strong>Weight:</strong> Same time, after bathroom, before eating</li>
        <li>• <strong>Body temperature:</strong> Oral, upon waking</li>
        <li>• <strong>Blood pressure:</strong> Morning and evening</li>
        <li>• <strong>Heart rate variability (HRV):</strong> Via Oura ring</li>
        <li>• <strong>Resting heart rate:</strong> Upon waking</li>
        <li>• <strong>Sleep metrics:</strong> Via sleep tracker</li>
        <li>• <strong>Blood glucose:</strong> Continuous monitor or finger prick</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Weekly Measurements:</h3>
      <ul class="space-y-2 mb-6">
        <li>• <strong>Body composition:</strong> DEXA or bioimpedance scale</li>
        <li>• <strong>Waist circumference:</strong> At navel level</li>
        <li>• <strong>Performance metrics:</strong> Grip strength, push-ups, flexibility</li>
        <li>• <strong>Cognitive tests:</strong> Via app (Dual N-Back)</li>
        <li>• <strong>Progress photos:</strong> Front, side, back</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Monthly Blood Work:</h3>
      <div class="grid md:grid-cols-2 gap-3 mb-6">
        <div class="bg-navy-charcoal/50 p-3 rounded">CBC: Complete blood count</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Comprehensive metabolic panel</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Lipid panel: Including ApoB</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Hormones: Testosterone, estradiol, DHEA-S</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Thyroid: TSH, Free T3, Free T4</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Inflammation: hs-CRP, homocysteine</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Vitamins: D3, B12, folate</div>
      </div>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Quarterly Tests:</h3>
      <ul class="space-y-2 mb-6">
        <li>• <strong>DEXA scan:</strong> Bone density and body composition</li>
        <li>• <strong>VO2 max test:</strong> Cardiovascular fitness</li>
        <li>• <strong>Carotid intima-media thickness:</strong> Arterial health</li>
        <li>• <strong>Advanced lipids:</strong> Particle size and number</li>
        <li>• <strong>Omega-3 index</strong></li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Annual Tests:</h3>
      <ul class="space-y-2 mb-6">
        <li>• <strong>Full body MRI:</strong> Cancer screening</li>
        <li>• <strong>Coronary calcium score:</strong> Heart disease risk</li>
        <li>• <strong>Colonoscopy:</strong> If over 45</li>
        <li>• <strong>Skin cancer screening:</strong> Full body check</li>
        <li>• <strong>Epigenetic age test:</strong> Biological vs chronological age</li>
        <li>• <strong>Microbiome analysis:</strong> Gut health</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Target Ranges (Male):</h3>
      <div class="grid md:grid-cols-2 gap-3 mb-6">
        <div class="bg-navy-charcoal/50 p-3 rounded flex justify-between">
          <span>Resting heart rate</span>
          <Badge className="bg-performance-green/20 text-performance-green">< 50 bpm</Badge>
        </div>
        <div class="bg-navy-charcoal/50 p-3 rounded flex justify-between">
          <span>HRV</span>
          <Badge className="bg-performance-green/20 text-performance-green">> 50ms</Badge>
        </div>
        <div class="bg-navy-charcoal/50 p-3 rounded flex justify-between">
          <span>Blood pressure</span>
          <Badge className="bg-performance-green/20 text-performance-green">< 120/80</Badge>
        </div>
        <div class="bg-navy-charcoal/50 p-3 rounded flex justify-between">
          <span>Fasting glucose</span>
          <Badge className="bg-performance-green/20 text-performance-green">70-85 mg/dL</Badge>
        </div>
        <div class="bg-navy-charcoal/50 p-3 rounded flex justify-between">
          <span>HbA1c</span>
          <Badge className="bg-performance-green/20 text-performance-green">< 5.0%</Badge>
        </div>
        <div class="bg-navy-charcoal/50 p-3 rounded flex justify-between">
          <span>ApoB</span>
          <Badge className="bg-performance-green/20 text-performance-green">< 60 mg/dL</Badge>
        </div>
        <div class="bg-navy-charcoal/50 p-3 rounded flex justify-between">
          <span>hs-CRP</span>
          <Badge className="bg-performance-green/20 text-performance-green">< 0.5 mg/L</Badge>
        </div>
        <div class="bg-navy-charcoal/50 p-3 rounded flex justify-between">
          <span>Vitamin D</span>
          <Badge className="bg-performance-green/20 text-performance-green">50-80 ng/mL</Badge>
        </div>
        <div class="bg-navy-charcoal/50 p-3 rounded flex justify-between">
          <span>Body fat</span>
          <Badge className="bg-performance-green/20 text-performance-green">< 15%</Badge>
        </div>
      </div>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Tracking Tools:</h3>
      <ul class="space-y-2">
        <li>• Oura Ring for sleep and HRV</li>
        <li>• RENPHO Smart Scale</li>
        <li>• Omron Blood Pressure Monitor</li>
        <li>• Spreadsheet or app for data logging</li>
      </ul>
    `
  },
  {
    id: "oral-care",
    title: "Oral Care",
    emoji: "🦷",
    content: `
      <h2 class="text-2xl font-bold mb-4">Oral Care Protocol</h2>
      <p class="mb-6">Comprehensive dental hygiene for optimal oral health.</p>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Morning Routine:</h3>
      <ol class="space-y-2 mb-6">
        <li>1. <strong>Oil pulling:</strong> 1 tbsp coconut oil, swish 5-10 minutes</li>
        <li>2. <strong>Tongue scraping:</strong> Copper scraper, back to front</li>
        <li>3. <strong>Brush teeth:</strong> Electric toothbrush, 2 minutes</li>
        <li>4. <strong>Floss:</strong> Water flosser or traditional floss</li>
        <li>5. <strong>Mouthwash:</strong> Alcohol-free with xylitol</li>
      </ol>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Evening Routine:</h3>
      <ol class="space-y-2 mb-6">
        <li>1. <strong>Floss first:</strong> Remove food particles</li>
        <li>2. <strong>Brush teeth:</strong> 2 minutes with fluoride toothpaste</li>
        <li>3. <strong>Interdental brushes:</strong> For gaps between teeth</li>
        <li>4. <strong>Gum massage:</strong> Stimulate blood flow</li>
        <li>5. <strong>Night guard:</strong> If you grind teeth</li>
      </ol>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Toothpaste Formula:</h3>
      <ul class="space-y-2 mb-6">
        <li>• <strong>Fluoride:</strong> 1450ppm for cavity prevention</li>
        <li>• <strong>Hydroxyapatite:</strong> Remineralization</li>
        <li>• <strong>Xylitol:</strong> Antibacterial properties</li>
        <li>• <strong>No SLS:</strong> Sodium lauryl sulfate can irritate</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Tools & Products:</h3>
      <ul class="space-y-2 mb-6">
        <li>• Philips Sonicare DiamondClean</li>
        <li>• Waterpik Water Flosser</li>
        <li>• Copper Tongue Scraper</li>
        <li>• <strong>Toothpaste:</strong> Sensodyne Pronamel or similar</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Weekly Care:</h3>
      <ul class="space-y-2 mb-6">
        <li>• <strong>Whitening:</strong> Hydrogen peroxide strips (monthly max)</li>
        <li>• <strong>Deep clean:</strong> Longer brushing session</li>
        <li>• <strong>Check teeth:</strong> Look for changes or issues</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Professional Care:</h3>
      <ul class="space-y-2 mb-6">
        <li>• <strong>Cleaning:</strong> Every 6 months</li>
        <li>• <strong>X-rays:</strong> Annual bitewings</li>
        <li>• <strong>Comprehensive exam:</strong> Annual</li>
        <li>• <strong>Sealants:</strong> Consider for molars</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Diet for Oral Health:</h3>
      <ul class="space-y-2 mb-6">
        <li>• <strong>Avoid:</strong> Sugar, acidic drinks, sticky foods</li>
        <li>• <strong>Limit:</strong> Coffee, tea (staining)</li>
        <li>• <strong>Eat:</strong> Calcium-rich foods, vitamin C, green tea</li>
        <li>• <strong>Chew:</strong> Sugar-free gum with xylitol after meals</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Red Flags to Watch:</h3>
      <ul class="space-y-2 mb-6">
        <li>• Bleeding gums</li>
        <li>• Persistent bad breath</li>
        <li>• Tooth sensitivity</li>
        <li>• Jaw pain</li>
        <li>• White patches in mouth</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Supplements for Oral Health:</h3>
      <div class="grid md:grid-cols-2 gap-3">
        <div class="bg-navy-charcoal/50 p-3 rounded">Vitamin D3: 2000 IU for tooth mineralization</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Vitamin K2: 100mcg for calcium utilization</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">CoQ10: 100mg for gum health</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Probiotics: Oral-specific strains</div>
      </div>
    `
  },
  {
    id: "advanced-therapies",
    title: "Other Advanced Therapies",
    emoji: "🔬",
    content: `
      <h2 class="text-2xl font-bold mb-4">Advanced Therapies & Experiments</h2>
      <p class="mb-6">Cutting-edge interventions for maximum longevity. These are experimental - consult professionals.</p>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Peptide Therapies:</h3>
      <ul class="space-y-2 mb-6">
        <li>• <strong>BPC-157:</strong> 250mcg daily for tissue repair</li>
        <li>• <strong>TB-500:</strong> 2mg weekly for recovery</li>
        <li>• <strong>Epitalon:</strong> 10mg monthly for telomeres</li>
        <li>• <strong>GHK-Cu:</strong> Copper peptide for skin/hair</li>
        <li>• <strong>Thymosin Alpha-1:</strong> Immune support</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">NAD+ Optimization:</h3>
      <ul class="space-y-2 mb-6">
        <li>• <strong>NMN:</strong> 1000mg daily (morning)</li>
        <li>• <strong>NR (Nicotinamide Riboside):</strong> Alternative to NMN</li>
        <li>• <strong>NAD+ IV therapy:</strong> Monthly infusions</li>
        <li>• <strong>Supporting nutrients:</strong> TMG, resveratrol</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Rapamycin Protocol:</h3>
      <ul class="space-y-2 mb-6">
        <li>• <strong>Dose:</strong> 6mg once weekly</li>
        <li>• <strong>Cycling:</strong> 8 weeks on, 4 weeks off</li>
        <li>• <strong>Monitoring:</strong> Regular blood work</li>
        <li>• <strong>Note:</strong> Prescription only, experimental</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Metformin for Longevity:</h3>
      <ul class="space-y-2 mb-6">
        <li>• <strong>Dose:</strong> 500-1000mg daily</li>
        <li>• <strong>Timing:</strong> With largest meal</li>
        <li>• <strong>Contraindications:</strong> May blunt exercise adaptations</li>
        <li>• <strong>Alternative:</strong> Berberine 500mg 2x daily</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Hormone Optimization:</h3>
      <ul class="space-y-2 mb-6">
        <li>• <strong>Testosterone:</strong> Keep at upper normal range</li>
        <li>• <strong>Growth Hormone:</strong> Secretagogues like Ipamorelin</li>
        <li>• <strong>Thyroid:</strong> Optimize T3/T4 levels</li>
        <li>• <strong>DHEA:</strong> 25-50mg if low</li>
        <li>• <strong>Pregnenolone:</strong> 10-30mg if deficient</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Hyperbaric Oxygen Therapy:</h3>
      <ul class="space-y-2 mb-6">
        <li>• <strong>Protocol:</strong> 60 sessions over 3 months</li>
        <li>• <strong>Pressure:</strong> 2.0 ATA</li>
        <li>• <strong>Duration:</strong> 90 minutes per session</li>
        <li>• <strong>Benefits:</strong> Telomere lengthening, stem cell activation</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Cold Therapy:</h3>
      <ul class="space-y-2 mb-6">
        <li>• <strong>Daily cold shower:</strong> 2-3 minutes</li>
        <li>• <strong>Ice bath:</strong> 10-15 minutes at 10-15°C</li>
        <li>• <strong>Cryotherapy:</strong> 3 minutes at -110°C</li>
        <li>• <strong>Benefits:</strong> Brown fat activation, inflammation reduction</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Heat Therapy:</h3>
      <ul class="space-y-2 mb-6">
        <li>• <strong>Sauna:</strong> 20 minutes at 80°C, 4x weekly</li>
        <li>• <strong>Infrared sauna:</strong> Lower temperature alternative</li>
        <li>• <strong>Hot-cold contrast:</strong> Alternate hot and cold</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Plasma Exchange:</h3>
      <ul class="space-y-2 mb-6">
        <li>• <strong>Therapeutic plasma exchange:</strong> Quarterly</li>
        <li>• <strong>Remove:</strong> Old proteins and inflammatory factors</li>
        <li>• <strong>Replace:</strong> With albumin solution</li>
        <li>• <strong>Cost:</strong> $5000-8000 per session</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Stem Cell Therapies:</h3>
      <ul class="space-y-2 mb-6">
        <li>• <strong>Mesenchymal stem cells:</strong> For regeneration</li>
        <li>• <strong>Exosomes:</strong> Cell-free alternative</li>
        <li>• <strong>PRP:</strong> Platelet-rich plasma injections</li>
        <li>• <strong>Banking:</strong> Store young cells for future</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Biohacking Tools:</h3>
      <ul class="space-y-2 mb-6">
        <li>• <strong>PEMF mat:</strong> Daily electromagnetic therapy</li>
        <li>• <strong>Red light panels:</strong> Full body treatment</li>
        <li>• <strong>Neurofeedback:</strong> Brain optimization</li>
        <li>• <strong>HRV training:</strong> Stress resilience</li>
      </ul>
      
      <p class="text-yellow-500 font-bold"><strong>WARNING:</strong> These are experimental. Work with qualified practitioners. Start conservative, monitor closely.</p>
    `
  },
  {
    id: "products",
    title: "Products",
    emoji: "🛍️",
    content: `
      <h2 class="text-2xl font-bold mb-4">Recommended Products</h2>
      <p class="mb-6">Essential products for implementing the protocol. Links to specific items Bryan uses.</p>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Sleep Optimization:</h3>
      <ul class="space-y-2 mb-6">
        <li>• Manta Sleep Mask - Complete darkness</li>
        <li>• Cozy Earth Bamboo Sheets - Temperature regulating</li>
        <li>• Oura Ring Gen 3 - Sleep tracking</li>
        <li>• Magnesium Glycinate - 500mg</li>
        <li>• L-Theanine - 200mg</li>
        <li>• ChiliPad - Bed cooling system</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Exercise Equipment:</h3>
      <ul class="space-y-2 mb-6">
        <li>• Concept2 Rower - Cardio</li>
        <li>• Olympic Weight Set</li>
        <li>• Perfect Pushup Elite</li>
        <li>• Pull-up Bar</li>
        <li>• WHOOP 4.0 - Fitness tracking</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Kitchen Essentials:</h3>
      <ul class="space-y-2 mb-6">
        <li>• Vitamix Blender - For smoothies</li>
        <li>• Instant Pot - Meal prep</li>
        <li>• Food Scale - Precise measurements (grammatura)</li>
        <li>• Stasher Bags - Food storage</li>
        <li>• APEC Water Filter</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Supplements (Daily Stack):</h3>
      <div class="grid md:grid-cols-2 gap-3 mb-6">
        <div class="bg-navy-charcoal/50 p-3 rounded">Vitamin D3 - 2000 IU</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">B-Complex</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Omega-3 - 2g EPA/DHA</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">NMN - 1000mg</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Ashwagandha - 600mg</div>
        <div class="bg-navy-charcoal/50 p-3 rounded">Glycine - 3g</div>
      </div>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Testing & Monitoring:</h3>
      <ul class="space-y-2 mb-6">
        <li>• RENPHO Smart Scale</li>
        <li>• Omron BP Monitor</li>
        <li>• TDS Water Meter</li>
        <li>• Glucose Monitor</li>
        <li>• InsideTracker - Blood testing</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Skincare Products:</h3>
      <ul class="space-y-2 mb-6">
        <li>• CeraVe Cleanser</li>
        <li>• Skinceuticals C E Ferulic</li>
        <li>• EltaMD Sunscreen</li>
        <li>• The Ordinary Niacinamide</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3 text-scientific-blue">Red Light Therapy:</h3>
      <ul class="space-y-2 mb-6">
        <li>• Joovv Solo 3.0 - Full body panel</li>
        <li>• iRestore Hair Device</li>
      </ul>
      
      <p class="font-bold"><strong>Note:</strong> All product links include exact specifications (grammatura) where applicable. Start with essentials, add advanced items gradually.</p>
    `
  }
];

export default function IlProtocolloPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("eat");

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-navy-charcoal text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-steel-blue/30 rounded-sm mb-6">
            <Award className="text-performance-green mr-2 h-4 w-4" />
            <span className="text-sm font-medium">Metodo Scientifico Avanzato</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-6">
            Il <span className="text-scientific-blue">Protocollo</span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-12 leading-relaxed">
            Le leggi fondamentali della scienza della longevità. Il 20% degli sforzi che produce l&apos;80% dei benefici.
          </p>
        </div>
      </section>

      {/* What is the Protocol */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-steel-blue/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center">
            Cos&apos;è il <span className="text-scientific-blue">Protocollo</span>?
          </h2>
          
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-lg text-slate-300 mb-6">
              Consiste in protocolli di longevità basati sull&apos;evidenza scientifica per dieta, esercizio fisico, 
              sonno, cura della pelle e molto altro.
            </p>
            
            <p className="text-lg text-slate-300 mb-6">
              Abbiamo dedicato anni alla compilazione delle evidenze e allo sviluppo del protocollo attraverso 
              sperimentazione diretta. Abbiamo misurato l&apos;età biologica di oltre 70 organi e poi implementato 
              i protocolli per osservare gli effetti.
            </p>
            
            <p className="text-lg text-slate-300 mb-8">
              Abbiamo ripetuto questo processo più e più volte fino a diventare la persona più misurata nella storia. 
              È esattamente quello che facciamo ogni giorno e ci ha permesso di ottenere biomarcatori che si 
              classificano tra i migliori al mondo.
            </p>
          </div>
        </div>
      </section>

      {/* Protocol Tabs Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">
            Le 16 Sezioni del <span className="text-scientific-blue">Protocollo</span>
          </h2>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 bg-navy-dark/50 p-2 h-auto mb-8">
              {protocolSections.map((section) => (
                <TabsTrigger 
                  key={section.id} 
                  value={section.id}
                  className="data-[state=active]:bg-scientific-blue data-[state=active]:text-white flex flex-col items-center py-3 px-2"
                >
                  <span className="text-2xl mb-1">{section.emoji}</span>
                  <span className="text-xs">{section.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {protocolSections.map((section) => (
              <TabsContent key={section.id} value={section.id} className="mt-8">
                <Card className="bg-navy-dark/50 backdrop-blur-md border-scientific-blue/20 p-8">
                  <div className="flex items-center mb-6">
                    <span className="text-4xl mr-4">{section.emoji}</span>
                    <h3 className="text-2xl font-bold">{section.title}</h3>
                  </div>
                  
                  <div 
                    className="prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* What's Different */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-steel-blue/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">
            Cosa Rende <span className="text-scientific-blue">Diverso</span> il Nostro Protocollo?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-scientific-blue/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Target className="text-scientific-blue h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Revisione Scientifica Completa</h3>
                  <p className="text-slate-300">
                    Abbiamo esaminato tutta la scienza della longevità e classificato le strategie più potenti.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-performance-green/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Activity className="text-performance-green h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Misurazione Biologica di Base</h3>
                  <p className="text-slate-300">
                    Abbiamo effettuato misurazioni baseline dell&apos;età biologica degli organi.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="text-yellow-500 h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Implementazione Diretta</h3>
                  <p className="text-slate-300">
                    Abbiamo implementato la scienza attraverso sperimentazione personale diretta.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-scientific-blue/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Activity className="text-scientific-blue h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Misurazione Continua</h3>
                  <p className="text-slate-300">
                    Abbiamo misurato gli organi ripetutamente fino a diventare la persona più misurata nella storia.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-performance-green/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Award className="text-performance-green h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Risultati Top 1%</h3>
                  <p className="text-slate-300">
                    Abbiamo raggiunto risultati ottimali nel top 1% nei marcatori di salute completi.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="text-yellow-500 h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Accesso Libero</h3>
                  <p className="text-slate-300">
                    Abbiamo reso tutte queste informazioni gratuite e accessibili a tutti.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Created */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">
            Perché Abbiamo <span className="text-scientific-blue">Creato</span> il Protocollo?
          </h2>
          
          <div className="space-y-8">
            <div className="bg-navy-charcoal p-8 rounded-lg border border-steel-blue/30">
              <h3 className="text-2xl font-semibold mb-4 text-performance-green">
                Per Risolvere i Nostri Problemi di Salute
              </h3>
              <p className="text-lg text-slate-300">
                Il viaggio è iniziato dalla necessità personale di affrontare e correggere 
                specifici problemi di salute attraverso un approccio scientifico rigoroso.
              </p>
            </div>
            
            <div className="bg-navy-charcoal p-8 rounded-lg border border-steel-blue/30">
              <h3 className="text-2xl font-semibold mb-4 text-scientific-blue">
                Per Fornire una Guida Chiara
              </h3>
              <p className="text-lg text-slate-300">
                Nel campo della salute tutti sono in disaccordo con tutti su tutto, rendendo 
                difficile sapere cosa fare. Volevamo creare una guida basata sull&apos;evidenza 
                che tutti potessero seguire con fiducia.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}