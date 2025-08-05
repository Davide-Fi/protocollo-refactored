import { db } from "./index";
import { protocolTabs } from "./schema";

const protocolData = [
  {
    tabIndex: 1,
    concernName: "Nutrizione Ottimale",
    tabTitle: "Eat",
    emoji: "🥗",
    contentHtml: `<h1 class="text-2xl">Bryan Johnson's Daily Nutrition</h1>
<p>6 days per week</p>
<div class="grid">
<h2>First meal — 11am</h2>
<ul>
<li>Super Veggie (broccoli, cauliflower, dark leafy greens, garlic, ginger root, lime, cumin, apple cider vinegar, hemp seeds) <strong>450 cal</strong></li>
<li>Nutty Pudding (macadamia nut milk, ground macadamia/walnuts/flax, chia seeds, Ceylon cinnamon, berries (blueberries/raspberries/strawberries), pomegranate juice, sunflower lecithin) <strong>330 cal</strong></li>
<li>1 tablespoon of extra virgin olive oil <strong>120 cal</strong></li>
</ul>
<p>Calories 900, Protein 30g+</p>

<h2>Second meal — 6 hours later</h2>
<ul>
<li>Super Veggie <strong>450 cal</strong></li>
<li>Nutty Pudding <strong>330 cal</strong></li>
<li>Orange fennel salad, avocado with herbs, beet salad <strong>240 cal</strong></li>
<li>1 tablespoon of extra virgin olive oil <strong>120 cal</strong></li>
</ul>
<p>Calories 1,140, Protein 30g+</p>

<h2>Third meal — +/- 1 hour after second meal</h2>
<ul>
<li>A variety of vegetables, berries, nuts, seeds and legumes</li>
<li>Example: stuffed sweet potato <strong>500 cal</strong></li>
</ul>
<p>Calories 500, Protein 15g+</p>

<h2>Optional snack — 7:30pm</h2>
<ul>
<li>Brazil nut, macadamia and walnuts with berries</li>
</ul>

<p><strong>Daily Total: 2,540 calories</strong></p>
<p>Note: No eating after 8:30pm.</p>

<h2>1 day per week, Bryan eats whatever he wants</h2>
<p>His favorite are pizza (without cheese), grape nuts cereal and Panda licorice. His only rule: stop eating before feeling full.</p>
</div>`
  },
  {
    tabIndex: 2,
    concernName: "Fitness e Forza",
    tabTitle: "Exercise",
    emoji: "💪",
    contentHtml: `<h1 class="text-2xl">Bryan Johnson's Workout Routine</h1>
<p>7 days a week for 60-90 minutes (~70 minutes on average).</p>

<h2>Daily routine:</h2>
<ol>
<li>10 min moderate exercise to get going</li>
<li>10 min high-intensity interval training (HIIT). 3 × per week it's on a bike with a 2 minute warm-up, then 4 minutes at 85%+ of VO₂ max. The other 4 days is doing other high-intensity exercises.</li>
<li>40+ min of strength and cardio rotation. Weight lifting 3x per week for ~12 min, working all major muscle groups.</li>
</ol>

<h2>Workout protocol — 3x per week:</h2>
<ul>
<li>Leg press (1 set, 8-15 reps)</li>
<li>Bench press (1 set, 8-15 reps)</li>
<li>Leg curls (1 set, 8-15 reps)</li>
<li>Pull-ups (1 set, 8-15 reps)</li>
<li>Overhead press (1 set, 8-15 reps)</li>
<li>Machine back extensions (1 set, 8-15 reps)</li>
<li>Machine chest fly (1 set, 8-15 reps)</li>
<li>Obliques (1 set, 8-15 reps)</li>
<li>Lateral shoulder raises (1 set, 8-15 reps)</li>
<li>Back (1 set, 8-15 reps)</li>
<li>Machine tricep extension (1 set, 8-15 reps)</li>
<li>Face pulls (1 set, 8-15 reps)</li>
<li>Machine bicep curls (1 set, 8-15 reps)</li>
<li>Machine ab crunches (1 set, 8-15 reps)</li>
<li>Machine calf raises (1 set, 12-20 reps)</li>
<li>Machine lateral shoulder raises (1 set, 8-15 reps)</li>
<li>Machine leg extension (1 set, 8-15 reps)</li>
</ul>

<p>Each set is done to failure or close to failure. Most exercises are one set per major muscle group. The volume is relatively low, with the focus on intensity and consistency.</p>

<h2>Notes:</h2>
<ul>
<li>100+ consecutive push-ups</li>
<li>60+ consecutive pull-ups</li>
<li>240 lb bench press (one rep)</li>
<li>Always breathe through the nose, never the mouth</li>
</ul>`
  },
  {
    tabIndex: 3,
    concernName: "Sonno di Qualità",
    tabTitle: "Sleep",
    emoji: "😴",
    contentHtml: `<h1 class="text-2xl">Bryan Johnson's Sleep Protocol</h1>
<p>High-quality sleep is the foundation upon which everything else in life is built.</p>

<h2>Prioritize a wind-down routine:</h2>
<ul>
<li>Aim for 8+ hours of sleep</li>
<li>Have the same bed time each night (10 pm)</li>
<li>No bright lights and no heavy mental stimulation for 1+ hours before bed</li>
<li>Avoid heavy meals, alcohol and intense exercise for 3 hours before bed</li>
<li>Try a chamomile or other herbal tea one hour before bed</li>
</ul>

<h2>Supplements (30-60 minutes before bed):</h2>
<ul>
<li>Magnesium (I take Magnesium Glycinate 500 mg)</li>
<li>L-theanine 200 mg (occasionally up to 400 mg)</li>
<li>Glycine 2-3g</li>
<li>Ashwagandha 600 mg (occasionally)</li>
</ul>

<h2>Bryan's Sleep Data (30 day average):</h2>
<ul>
<li>Total Sleep: 8hr 17min</li>
<li>REM: 1hr 56min</li>
<li>Deep: 2hr 39min</li>
<li>Sleep Efficiency: 99.2%</li>
<li>Latency: 3min</li>
</ul>

<h2>Bedroom Environment:</h2>
<ul>
<li>Room temperature: 15-20°C / 60-68°F (on the cold side)</li>
<li>Use a sleep mask or have black-out curtains that eliminate all light</li>
<li>Use a white noise machine or ear plugs to block distracting noise</li>
<li>Comfortable mattress, I really like <a href="https://cozyearth.com/?rfsn=7684165.da566f">Cozy Earth sheets</a> and bedding</li>
<li>An alarm that gradually wakes with light + sound</li>
</ul>

<h2>Sleep tracking:</h2>
<p>Wear an Oura ring for daily feedback and coach yourself based upon results</p>`
  },
  {
    tabIndex: 4,
    concernName: "Salute Femminile",
    tabTitle: "Females",
    emoji: "👩",
    contentHtml: `<h1 class="text-2xl">Protocol for Females</h1>
<p>This information is based on consultations with Bryan's female team members and their experiences.</p>

<h2>Key Considerations:</h2>
<ul>
<li>Hormonal cycles affect energy, mood, and physical performance</li>
<li>Iron requirements are typically higher due to menstruation</li>
<li>Calcium and vitamin D are particularly important for bone health</li>
<li>Protein needs may vary throughout the menstrual cycle</li>
</ul>

<h2>Cycle-Synced Nutrition:</h2>
<ul>
<li><strong>Follicular phase:</strong> Focus on fresh, light foods and fermented options</li>
<li><strong>Ovulatory phase:</strong> Increase raw foods and anti-inflammatory options</li>
<li><strong>Luteal phase:</strong> Emphasize root vegetables and complex carbohydrates</li>
<li><strong>Menstrual phase:</strong> Warm, comforting foods and iron-rich options</li>
</ul>

<h2>Exercise Modifications:</h2>
<ul>
<li>High-intensity training works best during follicular and ovulatory phases</li>
<li>Strength training can be maintained throughout the cycle</li>
<li>Consider gentler activities during menstruation if experiencing discomfort</li>
<li>Focus on flexibility and recovery work during luteal phase</li>
</ul>

<h2>Sleep Considerations:</h2>
<ul>
<li>Progesterone rise in luteal phase may increase sleep needs</li>
<li>Body temperature fluctuations may require bedroom temperature adjustments</li>
<li>Magnesium supplementation can help with PMS-related sleep issues</li>
</ul>

<h2>Supplements to Consider:</h2>
<ul>
<li>Iron (if deficient, test levels first)</li>
<li>B-complex vitamins</li>
<li>Omega-3 fatty acids</li>
<li>Vitamin D3</li>
<li>Calcium</li>
<li>Probiotics for hormonal balance</li>
</ul>`
  },
  {
    tabIndex: 5,
    concernName: "Gravidanza Sana",
    tabTitle: "Pregnancy",
    emoji: "🤰",
    contentHtml: `<h1 class="text-2xl">Pregnancy Protocol</h1>
<p>Guidelines for maintaining health during pregnancy. Always consult with your healthcare provider.</p>

<h2>Pre-Conception:</h2>
<ul>
<li>Start folic acid supplementation (400-800 mcg) at least 3 months before conception</li>
<li>Achieve optimal vitamin D levels (test and supplement if needed)</li>
<li>Ensure adequate iron stores</li>
<li>Maintain healthy body weight</li>
<li>Eliminate alcohol and tobacco</li>
</ul>

<h2>First Trimester:</h2>
<ul>
<li>Continue prenatal vitamins with folic acid</li>
<li>Small, frequent meals to manage morning sickness</li>
<li>Stay hydrated (8-10 glasses of water daily)</li>
<li>Gentle exercise like walking or prenatal yoga</li>
<li>Avoid raw fish, unpasteurized products, and high-mercury fish</li>
</ul>

<h2>Second Trimester:</h2>
<ul>
<li>Increase caloric intake by ~340 calories/day</li>
<li>Focus on calcium-rich foods (1000mg daily)</li>
<li>Continue regular, moderate exercise</li>
<li>Monitor weight gain (typically 1 lb/week)</li>
<li>Consider DHA supplementation for baby's brain development</li>
</ul>

<h2>Third Trimester:</h2>
<ul>
<li>Increase caloric intake by ~450 calories/day</li>
<li>Eat smaller, more frequent meals</li>
<li>Focus on iron-rich foods to prevent anemia</li>
<li>Practice pelvic floor exercises</li>
<li>Prepare for breastfeeding with proper nutrition</li>
</ul>

<h2>Exercise During Pregnancy:</h2>
<ul>
<li>150 minutes of moderate-intensity exercise weekly</li>
<li>Walking, swimming, stationary cycling are excellent choices</li>
<li>Avoid contact sports and activities with fall risk</li>
<li>Stop exercising if experiencing dizziness, shortness of breath, or contractions</li>
</ul>

<h2>Essential Nutrients:</h2>
<ul>
<li>Folic acid: 600-800 mcg</li>
<li>Iron: 27 mg</li>
<li>Calcium: 1000 mg</li>
<li>Vitamin D: 600 IU</li>
<li>DHA: 200-300 mg</li>
<li>Protein: 75-100g daily</li>
</ul>`
  },
  {
    tabIndex: 6,
    concernName: "Comprensione del Protocollo",
    tabTitle: "What is the Protocol?",
    emoji: "📋",
    contentHtml: `<h1 class="text-2xl">What is the Protocol?</h1>
<p>The Blueprint Protocol is a comprehensive health optimization system based on scientific research and data-driven decisions.</p>

<h2>Core Principles:</h2>
<ul>
<li><strong>Measurement:</strong> Track everything that matters</li>
<li><strong>Consistency:</strong> Same routine every day for reliable data</li>
<li><strong>Evidence-based:</strong> Every decision backed by research</li>
<li><strong>Personalization:</strong> Adjust based on your biomarkers</li>
<li><strong>Longevity focus:</strong> Optimize for healthspan, not just lifespan</li>
</ul>

<h2>The Five Pillars:</h2>
<ol>
<li><strong>Sleep:</strong> The foundation of all health</li>
<li><strong>Diet:</strong> Nutrient-dense, calorie-controlled eating</li>
<li><strong>Exercise:</strong> Daily movement combining strength and cardio</li>
<li><strong>Supplements:</strong> Evidence-based supplementation</li>
<li><strong>Measurements:</strong> Regular testing and tracking</li>
</ol>

<h2>Getting Started:</h2>
<ol>
<li>Start with sleep optimization (easiest, highest impact)</li>
<li>Gradually adjust meal timing and composition</li>
<li>Build consistent exercise habits</li>
<li>Add supplements based on testing</li>
<li>Track progress with regular measurements</li>
</ol>

<h2>Key Metrics to Track:</h2>
<ul>
<li>Sleep quality and duration</li>
<li>Resting heart rate and HRV</li>
<li>Body composition</li>
<li>Blood biomarkers</li>
<li>Cognitive performance</li>
<li>Energy levels</li>
</ul>

<h2>Philosophy:</h2>
<p>"Don't die" - The simple goal is to avoid the things that will kill you prematurely while optimizing the things that will keep you healthy and vibrant for as long as possible.</p>

<h2>Important Note:</h2>
<p>This protocol is intense and requires significant commitment. Start slowly, make gradual changes, and always consult with healthcare providers before making major lifestyle changes.</p>`
  },
  {
    tabIndex: 7,
    concernName: "Routine Quotidiana",
    tabTitle: "Bryan's Daily Routine",
    emoji: "📅",
    contentHtml: `<h1 class="text-2xl">Bryan Johnson's Daily Routine</h1>

<h2>Bedtime Routine (starting at 8:30pm):</h2>
<ul>
<li>8:30pm - Last food of the day</li>
<li>9:00pm - Take sleep supplements</li>
<li>9:30pm - Begin wind-down (no screens, dim lights)</li>
<li>10:00pm - In bed, lights out</li>
</ul>

<h2>Morning (5:00am - 9:00am):</h2>
<ul>
<li>5:00am - Wake up naturally (no alarm needed)</li>
<li>5:10am - Morning measurements (weight, body temp, blood glucose)</li>
<li>5:30am - Light therapy (10,000 lux for 10-15 minutes)</li>
<li>5:45am - Morning supplements</li>
<li>6:00am - Exercise (60-90 minutes)</li>
<li>7:30am - Post-workout supplements</li>
<li>8:00am - Red light therapy</li>
<li>8:30am - Shower and skincare routine</li>
</ul>

<h2>Midday (9:00am - 2:00pm):</h2>
<ul>
<li>9:00am - Deep work session #1</li>
<li>11:00am - First meal (Super Veggie + Nutty Pudding)</li>
<li>11:30am - Midday supplements</li>
<li>12:00pm - Walking meeting or light activity</li>
<li>1:00pm - Deep work session #2</li>
</ul>

<h2>Afternoon (2:00pm - 6:00pm):</h2>
<ul>
<li>2:00pm - HRV training/meditation</li>
<li>3:00pm - Deep work session #3</li>
<li>5:00pm - Second meal</li>
<li>5:30pm - Evening supplements</li>
</ul>

<h2>Evening (6:00pm - 8:30pm):</h2>
<ul>
<li>6:00pm - Third meal (optional)</li>
<li>6:30pm - Family time/social activities</li>
<li>7:30pm - Optional snack (nuts and berries)</li>
<li>8:00pm - Prepare for tomorrow</li>
<li>8:30pm - Begin bedtime routine</li>
</ul>

<h2>Key Principles:</h2>
<ul>
<li>Same schedule every single day (including weekends)</li>
<li>No meetings before 11am (protect morning routine)</li>
<li>All meals within 6-8 hour window</li>
<li>No food after 8:30pm</li>
<li>In bed by 10pm every night</li>
<li>Track everything for optimization</li>
</ul>`
  },
  {
    tabIndex: 8,
    concernName: "Eliminare Cattive Abitudini",
    tabTitle: "Bad Habits",
    emoji: "🚫",
    contentHtml: `<h1 class="text-2xl">Breaking Bad Habits</h1>
<p>The protocol requires eliminating behaviors that accelerate aging and compromise health.</p>

<h2>Habits to Eliminate:</h2>

<h3>1. Alcohol Consumption</h3>
<ul>
<li>Zero alcohol policy - no exceptions</li>
<li>Alcohol disrupts sleep, damages liver, accelerates aging</li>
<li>Replace with: Kombucha, herbal teas, sparkling water with fruit</li>
<li>Social tip: Order mocktails or bring your own drinks to events</li>
</ul>

<h3>2. Smoking/Vaping</h3>
<ul>
<li>Complete cessation required</li>
<li>Damages every organ system</li>
<li>Accelerates skin aging and cellular damage</li>
<li>Seek professional help for cessation if needed</li>
</ul>

<h3>3. Late Night Eating</h3>
<ul>
<li>No food after 8:30pm</li>
<li>Disrupts circadian rhythm and sleep quality</li>
<li>Increases inflammation and metabolic dysfunction</li>
<li>If hungry: Drink water or herbal tea instead</li>
</ul>

<h3>4. Processed Foods</h3>
<ul>
<li>Eliminate all ultra-processed foods</li>
<li>No refined sugars or artificial sweeteners</li>
<li>Avoid seed oils (use olive oil instead)</li>
<li>Read all labels - if you can't pronounce it, don't eat it</li>
</ul>

<h3>5. Sedentary Lifestyle</h3>
<ul>
<li>Move every hour during waking hours</li>
<li>Minimum 10,000 steps daily</li>
<li>Stand/walk during phone calls</li>
<li>Use standing desk for work</li>
</ul>

<h3>6. Poor Sleep Hygiene</h3>
<ul>
<li>No screens 1 hour before bed</li>
<li>No caffeine after 2pm</li>
<li>Consistent sleep/wake times (no "catching up" on weekends)</li>
<li>No work in bedroom</li>
</ul>

<h2>Breaking the Habits - Strategy:</h2>
<ol>
<li><strong>Track triggers:</strong> Identify what prompts the behavior</li>
<li><strong>Replace, don't restrict:</strong> Find healthy alternatives</li>
<li><strong>Environment design:</strong> Remove temptations from environment</li>
<li><strong>Accountability:</strong> Tell others about your commitment</li>
<li><strong>Measure impact:</strong> Track biomarkers to see improvements</li>
</ol>

<h2>Timeline for Change:</h2>
<ul>
<li>Days 1-7: Hardest period, use willpower and support</li>
<li>Days 8-21: Habit breaking phase, stay vigilant</li>
<li>Days 22-66: New habit formation</li>
<li>Day 67+: New behavior becomes automatic</li>
</ul>`
  },
  {
    tabIndex: 9,
    concernName: "Acqua Pura",
    tabTitle: "Clean Water",
    emoji: "💧",
    contentHtml: `<h1 class="text-2xl">Water Filtration System</h1>
<p>Clean water is essential for optimal health. Most tap water contains contaminants that accumulate over time.</p>

<h2>Water Quality Standards:</h2>
<ul>
<li>TDS (Total Dissolved Solids): < 50 ppm ideal</li>
<li>pH: 7.0-7.5 (slightly alkaline)</li>
<li>Zero heavy metals (lead, mercury, arsenic)</li>
<li>No chlorine or chloramines</li>
<li>No fluoride (controversial but removed in protocol)</li>
<li>No microplastics</li>
</ul>

<h2>Recommended Filtration System:</h2>
<h3>Whole House System:</h3>
<ul>
<li>Stage 1: Sediment filter (5 micron)</li>
<li>Stage 2: Carbon block filter</li>
<li>Stage 3: KDF media for heavy metals</li>
<li>Stage 4: UV sterilization</li>
</ul>

<h3>Kitchen Reverse Osmosis:</h3>
<ul>
<li><a href="https://www.amazon.com/APEC-5-Stage-Reverse-Drinking-Water/dp/B00I0ZGOZM">APEC 5-Stage RO System</a></li>
<li>Removes 99% of contaminants</li>
<li>Remineralization stage adds back healthy minerals</li>
<li>Change filters every 6-12 months</li>
</ul>

<h2>Daily Water Protocol:</h2>
<ul>
<li><strong>Amount:</strong> 3-4 liters per day minimum</li>
<li><strong>Timing:</strong> 500ml upon waking, 250ml every hour</li>
<li><strong>Temperature:</strong> Room temperature (not cold)</li>
<li><strong>Enhancement:</strong> Add pinch of Celtic sea salt for electrolytes</li>
</ul>

<h2>Water Testing:</h2>
<ul>
<li>Test water quality monthly with TDS meter</li>
<li>Professional lab test annually</li>
<li><a href="https://www.amazon.com/HoneForest-Temperature-0-9999pm-Accuracy-Testing/dp/B073713G5F">TDS Meter for regular testing</a></li>
</ul>

<h2>Travel Water Safety:</h2>
<ul>
<li>Portable filter: <a href="https://www.amazon.com/LifeStraw-Personal-Camping-Emergency-Preparedness/dp/B006QF3TW4">LifeStraw</a></li>
<li>UV purifier for international travel</li>
<li>Always use filtered water for supplements</li>
<li>Avoid plastic bottles (microplastics)</li>
</ul>

<h2>Shower/Bath Filtration:</h2>
<ul>
<li>Chlorine absorbed through skin during showers</li>
<li>Install vitamin C shower filters</li>
<li><a href="https://www.amazon.com/AquaBliss-Output-12-Stage-Shower-Filter/dp/B01G7AZB96">AquaBliss 12-Stage Shower Filter</a></li>
</ul>`
  },
  {
    tabIndex: 10,
    concernName: "Guida Alimentare",
    tabTitle: "Food Guide",
    emoji: "🥦",
    contentHtml: `<h1 class="text-2xl">Complete Food Guide</h1>
<p>Detailed breakdown of foods to eat, avoid, and how to prepare them.</p>

<h2>Daily Staples:</h2>

<h3>Vegetables (Organic when possible):</h3>
<ul>
<li><strong>Broccoli:</strong> 300g daily, steamed 3-4 minutes</li>
<li><strong>Cauliflower:</strong> 200g daily, roasted or steamed</li>
<li><strong>Dark leafy greens:</strong> 100g (spinach, kale, arugula)</li>
<li><strong>Garlic:</strong> 1-2 cloves, crushed and rested 10 min</li>
<li><strong>Ginger:</strong> 1 inch fresh root</li>
<li><strong>Mushrooms:</strong> 50g shiitake or lion's mane</li>
</ul>

<h3>Fruits (Limited quantity):</h3>
<ul>
<li><strong>Blueberries:</strong> 60g daily (wild preferred)</li>
<li><strong>Raspberries:</strong> 30g daily</li>
<li><strong>Strawberries:</strong> 30g daily</li>
<li><strong>Pomegranate:</strong> 30ml pure juice</li>
<li><strong>Avocado:</strong> 1/2 daily</li>
</ul>

<h3>Nuts & Seeds (Exact amounts):</h3>
<ul>
<li><strong>Macadamia nuts:</strong> 30g (grammatura esatta)</li>
<li><strong>Walnuts:</strong> 15g (grammatura esatta)</li>
<li><strong>Brazil nuts:</strong> 1 nut daily (selenium)</li>
<li><strong>Flax seeds:</strong> 1 tablespoon ground fresh</li>
<li><strong>Chia seeds:</strong> 1 tablespoon soaked</li>
<li><strong>Hemp seeds:</strong> 2 tablespoons</li>
</ul>

<h3>Legumes:</h3>
<ul>
<li><strong>Black lentils:</strong> 45g dry weight</li>
<li><strong>Chickpeas:</strong> 45g dry weight</li>
<li>Soak overnight, cook with kombu for digestibility</li>
</ul>

<h2>Preparation Methods:</h2>
<ul>
<li><strong>Steaming:</strong> Preserves most nutrients</li>
<li><strong>Raw:</strong> Some vegetables in salads</li>
<li><strong>Fermented:</strong> Sauerkraut, kimchi for probiotics</li>
<li><strong>Never:</strong> Deep frying or high-heat cooking</li>
</ul>

<h2>Shopping List Template:</h2>
<h3>Weekly purchases:</h3>
<ul>
<li>2.1 kg broccoli</li>
<li>1.4 kg cauliflower</li>
<li>700g mixed dark leafy greens</li>
<li>420g blueberries</li>
<li>210g macadamia nuts (grammatura totale)</li>
<li>7 Brazil nuts</li>
<li>Extra virgin olive oil (1 bottle)</li>
</ul>

<h2>Foods to NEVER Eat:</h2>
<ul>
<li>Refined sugar in any form</li>
<li>Processed meats</li>
<li>Dairy products</li>
<li>Refined grains (white bread, pasta)</li>
<li>Seed oils (canola, soybean, corn)</li>
<li>Artificial sweeteners</li>
<li>Alcohol</li>
</ul>

<h2>Meal Prep Tips:</h2>
<ul>
<li>Prep vegetables twice weekly</li>
<li>Make Nutty Pudding in batches</li>
<li>Pre-portion nuts and seeds</li>
<li>Keep emergency protocol-friendly snacks ready</li>
</ul>`
  },
  {
    tabIndex: 11,
    concernName: "Salute dei Capelli",
    tabTitle: "Hair",
    emoji: "💇‍♂️",
    contentHtml: `<h1 class="text-2xl">Hair Loss Prevention Protocol</h1>
<p>Comprehensive approach to maintaining and regrowing hair.</p>

<h2>Topical Treatments:</h2>

<h3>Morning Routine:</h3>
<ul>
<li><strong>Minoxidil 5%:</strong> Apply to scalp, leave for 4 hours minimum</li>
<li><strong>Caffeine solution:</strong> Apply after minoxidil dries</li>
<li><strong>Saw Palmetto serum:</strong> Natural DHT blocker</li>
</ul>

<h3>Evening Routine:</h3>
<ul>
<li><strong>Tretinoin 0.025%:</strong> Enhances minoxidil absorption (prescription)</li>
<li><strong>Rosemary oil:</strong> Mix 5 drops with carrier oil, massage scalp</li>
<li><strong>Microneedling:</strong> 1.5mm dermaroller, once weekly</li>
</ul>

<h2>Oral Supplements:</h2>
<ul>
<li><strong>Saw Palmetto:</strong> 320mg daily</li>
<li><strong>Biotin:</strong> 10,000 mcg daily</li>
<li><strong>Collagen peptides:</strong> 10g daily</li>
<li><strong>Iron:</strong> Only if deficient (test first)</li>
<li><strong>Zinc:</strong> 15mg daily</li>
<li><strong>Vitamin D3:</strong> 2000 IU daily</li>
</ul>

<h2>Red Light Therapy:</h2>
<ul>
<li>Wavelength: 650-670nm and 830-850nm</li>
<li>Duration: 10-15 minutes daily</li>
<li>Device: <a href="https://www.amazon.com/iRestore-Laser-Hair-Growth-System/dp/B01N7JQJ0Y">iRestore Laser Cap</a></li>
<li>Consistency is key - daily use required</li>
</ul>

<h2>Scalp Care:</h2>
<ul>
<li><strong>Shampoo:</strong> Ketoconazole 2% twice weekly</li>
<li><strong>Regular shampoo:</strong> Sulfate-free, gentle formula</li>
<li><strong>Scalp massage:</strong> 5 minutes daily to increase blood flow</li>
<li><strong>Cold rinse:</strong> Final rinse with cold water</li>
</ul>

<h2>Lifestyle Factors:</h2>
<ul>
<li>Manage stress (cortisol kills follicles)</li>
<li>No tight hairstyles or harsh treatments</li>
<li>Silk pillowcase to reduce friction</li>
<li>Avoid hot water on scalp</li>
<li>No smoking (restricts blood flow to follicles)</li>
</ul>

<h2>Medical Options (Consult Doctor):</h2>
<ul>
<li>Finasteride 1mg (prescription, consider side effects)</li>
<li>Dutasteride 0.5mg (stronger alternative)</li>
<li>PRP injections (platelet-rich plasma)</li>
<li>Hair transplant (last resort)</li>
</ul>

<h2>Progress Tracking:</h2>
<ul>
<li>Photos: Same angle, lighting, weekly</li>
<li>Hair count: Specific area monthly</li>
<li>Shedding: Count hairs in drain catcher</li>
<li>Timeline: Expect results after 3-6 months</li>
</ul>`
  },
  {
    tabIndex: 12,
    concernName: "Cura della Pelle",
    tabTitle: "Skin",
    emoji: "✨",
    contentHtml: `<h1 class="text-2xl">Skincare Protocol</h1>
<p>Science-based approach to reversing skin aging and maintaining healthy skin.</p>

<h2>Morning Routine (in order):</h2>
<ol>
<li><strong>Gentle cleanser:</strong> CeraVe Hydrating Cleanser</li>
<li><strong>Vitamin C serum:</strong> 20% L-ascorbic acid</li>
<li><strong>Hyaluronic acid:</strong> Apply to damp skin</li>
<li><strong>Niacinamide 10%:</strong> For pore refinement</li>
<li><strong>Moisturizer:</strong> With ceramides</li>
<li><strong>Sunscreen:</strong> SPF 50+ broad spectrum (365 days/year)</li>
</ol>

<h2>Evening Routine (in order):</h2>
<ol>
<li><strong>Oil cleanser:</strong> Remove sunscreen/makeup</li>
<li><strong>Gentle cleanser:</strong> Second cleanse</li>
<li><strong>Tretinoin 0.05%:</strong> Start at 0.025%, increase gradually</li>
<li><strong>Wait 20 minutes</strong></li>
<li><strong>Peptide serum:</strong> Copper peptides or Matrixyl</li>
<li><strong>Moisturizer:</strong> Richer formula than morning</li>
<li><strong>Face oil:</strong> Rosehip or squalane (optional)</li>
</ol>

<h2>Weekly Treatments:</h2>
<ul>
<li><strong>Monday:</strong> AHA peel (glycolic acid 10%)</li>
<li><strong>Wednesday:</strong> Hydrating mask</li>
<li><strong>Friday:</strong> BHA treatment (salicylic acid 2%)</li>
<li><strong>Sunday:</strong> Dermarolling 0.5mm</li>
</ul>

<h2>Professional Treatments:</h2>
<ul>
<li><strong>IPL/BBL:</strong> Every 3 months for pigmentation</li>
<li><strong>Microneedling:</strong> Professional depth, every 6 weeks</li>
<li><strong>Chemical peels:</strong> Medical grade, quarterly</li>
<li><strong>Botox:</strong> Preventative, small doses (optional)</li>
</ul>

<h2>Body Skin Care:</h2>
<ul>
<li>Daily moisturizer with urea 10%</li>
<li>Body retinol 2x weekly</li>
<li>Dry brushing before shower</li>
<li>Weekly body scrub</li>
<li>Sunscreen on exposed areas always</li>
</ul>

<h2>Internal Support:</h2>
<ul>
<li><strong>Collagen peptides:</strong> 10g daily</li>
<li><strong>Vitamin C:</strong> 1000mg daily</li>
<li><strong>Omega-3:</strong> 2g daily</li>
<li><strong>Astaxanthin:</strong> 12mg daily (internal sunscreen)</li>
<li><strong>Hyaluronic acid:</strong> 200mg oral supplement</li>
</ul>

<h2>Sun Protection Protocol:</h2>
<ul>
<li>SPF 50+ every 2 hours when outdoors</li>
<li>UV-blocking clothing</li>
<li>Wide-brim hat</li>
<li>Avoid sun 10am-4pm</li>
<li>Window UV film for car/home</li>
</ul>

<h2>Products Bryan Uses:</h2>
<ul>
<li><a href="https://www.amazon.com/SkinCeuticals-Vitamin-Ferulic-Combination-Antioxidant/dp/B002B9DWVM">Skinceuticals C E Ferulic</a></li>
<li><a href="https://www.amazon.com/Tretinoin-Cream-0-05-20g/dp/B07DFPBSJ7">Tretinoin 0.05%</a> (prescription)</li>
<li><a href="https://www.amazon.com/EltaMD-Clear-Broad-Spectrum-SPF-46/dp/B002MSN3QQ">EltaMD UV Clear SPF 46</a></li>
</ul>`
  },
  {
    tabIndex: 13,
    concernName: "Monitoraggio Biometrico",
    tabTitle: "Measurement",
    emoji: "📊",
    contentHtml: `<h1 class="text-2xl">Comprehensive Measurement Protocol</h1>
<p>What gets measured gets managed. Track these biomarkers regularly.</p>

<h2>Daily Measurements:</h2>
<ul>
<li><strong>Weight:</strong> Same time, after bathroom, before eating</li>
<li><strong>Body temperature:</strong> Oral, upon waking</li>
<li><strong>Blood pressure:</strong> Morning and evening</li>
<li><strong>Heart rate variability (HRV):</strong> Via Oura ring</li>
<li><strong>Resting heart rate:</strong> Upon waking</li>
<li><strong>Sleep metrics:</strong> Via sleep tracker</li>
<li><strong>Blood glucose:</strong> Continuous monitor or finger prick</li>
</ul>

<h2>Weekly Measurements:</h2>
<ul>
<li><strong>Body composition:</strong> DEXA or bioimpedance scale</li>
<li><strong>Waist circumference:</strong> At navel level</li>
<li><strong>Performance metrics:</strong> Grip strength, push-ups, flexibility</li>
<li><strong>Cognitive tests:</strong> Via app (Dual N-Back)</li>
<li><strong>Progress photos:</strong> Front, side, back</li>
</ul>

<h2>Monthly Blood Work:</h2>
<ul>
<li><strong>CBC:</strong> Complete blood count</li>
<li><strong>Comprehensive metabolic panel</strong></li>
<li><strong>Lipid panel:</strong> Including ApoB</li>
<li><strong>Hormones:</strong> Testosterone, estradiol, DHEA-S</li>
<li><strong>Thyroid:</strong> TSH, Free T3, Free T4</li>
<li><strong>Inflammation:</strong> hs-CRP, homocysteine</li>
<li><strong>Vitamins:</strong> D3, B12, folate</li>
</ul>

<h2>Quarterly Tests:</h2>
<ul>
<li><strong>DEXA scan:</strong> Bone density and body composition</li>
<li><strong>VO2 max test:</strong> Cardiovascular fitness</li>
<li><strong>Carotid intima-media thickness:</strong> Arterial health</li>
<li><strong>Advanced lipids:</strong> Particle size and number</li>
<li><strong>Omega-3 index</strong></li>
</ul>

<h2>Annual Tests:</h2>
<ul>
<li><strong>Full body MRI:</strong> Cancer screening</li>
<li><strong>Coronary calcium score:</strong> Heart disease risk</li>
<li><strong>Colonoscopy:</strong> If over 45</li>
<li><strong>Skin cancer screening:</strong> Full body check</li>
<li><strong>Epigenetic age test:</strong> Biological vs chronological age</li>
<li><strong>Microbiome analysis:</strong> Gut health</li>
</ul>

<h2>Target Ranges (Male):</h2>
<ul>
<li><strong>Resting heart rate:</strong> < 50 bpm</li>
<li><strong>HRV:</strong> > 50ms (age-dependent)</li>
<li><strong>Blood pressure:</strong> < 120/80</li>
<li><strong>Fasting glucose:</strong> 70-85 mg/dL</li>
<li><strong>HbA1c:</strong> < 5.0%</li>
<li><strong>ApoB:</strong> < 60 mg/dL</li>
<li><strong>hs-CRP:</strong> < 0.5 mg/L</li>
<li><strong>Vitamin D:</strong> 50-80 ng/mL</li>
<li><strong>Body fat:</strong> < 15%</li>
</ul>

<h2>Tracking Tools:</h2>
<ul>
<li><a href="https://ouraring.com">Oura Ring</a> for sleep and HRV</li>
<li><a href="https://www.amazon.com/RENPHO-Bluetooth-Bathroom-Composition-Smartphone/dp/B01N1UX8RW">RENPHO Smart Scale</a></li>
<li><a href="https://www.amazon.com/Omron-Platinum-Pressure-Monitor-100-Reading/dp/B07Q4J6MFD">Omron Blood Pressure Monitor</a></li>
<li>Spreadsheet or app for data logging</li>
</ul>`
  },
  {
    tabIndex: 14,
    concernName: "Igiene Orale",
    tabTitle: "Oral Care",
    emoji: "🦷",
    contentHtml: `<h1 class="text-2xl">Oral Care Protocol</h1>
<p>Comprehensive dental hygiene for optimal oral health.</p>

<h2>Morning Routine:</h2>
<ol>
<li><strong>Oil pulling:</strong> 1 tbsp coconut oil, swish 5-10 minutes</li>
<li><strong>Tongue scraping:</strong> Copper scraper, back to front</li>
<li><strong>Brush teeth:</strong> Electric toothbrush, 2 minutes</li>
<li><strong>Floss:</strong> Water flosser or traditional floss</li>
<li><strong>Mouthwash:</strong> Alcohol-free with xylitol</li>
</ol>

<h2>Evening Routine:</h2>
<ol>
<li><strong>Floss first:</strong> Remove food particles</li>
<li><strong>Brush teeth:</strong> 2 minutes with fluoride toothpaste</li>
<li><strong>Interdental brushes:</strong> For gaps between teeth</li>
<li><strong>Gum massage:</strong> Stimulate blood flow</li>
<li><strong>Night guard:</strong> If you grind teeth</li>
</ol>

<h2>Toothpaste Formula:</h2>
<ul>
<li><strong>Fluoride:</strong> 1450ppm for cavity prevention</li>
<li><strong>Hydroxyapatite:</strong> Remineralization</li>
<li><strong>Xylitol:</strong> Antibacterial properties</li>
<li><strong>No SLS:</strong> Sodium lauryl sulfate can irritate</li>
</ul>

<h2>Tools & Products:</h2>
<ul>
<li><a href="https://www.amazon.com/Philips-Sonicare-DiamondClean-Electric-Toothbrush/dp/B078GVMVRH">Philips Sonicare DiamondClean</a></li>
<li><a href="https://www.amazon.com/Waterpik-Water-Flosser-Electric-Dental/dp/B01GNVFP8Y">Waterpik Water Flosser</a></li>
<li><a href="https://www.amazon.com/Tongue-Scraper-Copper-Ayurvedic-Cleaner/dp/B07F9XY3PB">Copper Tongue Scraper</a></li>
<li><strong>Toothpaste:</strong> Sensodyne Pronamel or similar</li>
</ul>

<h2>Weekly Care:</h2>
<ul>
<li><strong>Whitening:</strong> Hydrogen peroxide strips (monthly max)</li>
<li><strong>Deep clean:</strong> Longer brushing session</li>
<li><strong>Check teeth:</strong> Look for changes or issues</li>
</ul>

<h2>Professional Care:</h2>
<ul>
<li><strong>Cleaning:</strong> Every 6 months</li>
<li><strong>X-rays:</strong> Annual bitewings</li>
<li><strong>Comprehensive exam:</strong> Annual</li>
<li><strong>Sealants:</strong> Consider for molars</li>
</ul>

<h2>Diet for Oral Health:</h2>
<ul>
<li><strong>Avoid:</strong> Sugar, acidic drinks, sticky foods</li>
<li><strong>Limit:</strong> Coffee, tea (staining)</li>
<li><strong>Eat:</strong> Calcium-rich foods, vitamin C, green tea</li>
<li><strong>Chew:</strong> Sugar-free gum with xylitol after meals</li>
</ul>

<h2>Red Flags to Watch:</h2>
<ul>
<li>Bleeding gums</li>
<li>Persistent bad breath</li>
<li>Tooth sensitivity</li>
<li>Jaw pain</li>
<li>White patches in mouth</li>
</ul>

<h2>Supplements for Oral Health:</h2>
<ul>
<li><strong>Vitamin D3:</strong> 2000 IU for tooth mineralization</li>
<li><strong>Vitamin K2:</strong> 100mcg for calcium utilization</li>
<li><strong>CoQ10:</strong> 100mg for gum health</li>
<li><strong>Probiotics:</strong> Oral-specific strains</li>
</ul>`
  },
  {
    tabIndex: 15,
    concernName: "Terapie Avanzate",
    tabTitle: "Other Advanced Therapies",
    emoji: "🔬",
    contentHtml: `<h1 class="text-2xl">Advanced Therapies & Experiments</h1>
<p>Cutting-edge interventions for maximum longevity. These are experimental - consult professionals.</p>

<h2>Peptide Therapies:</h2>
<ul>
<li><strong>BPC-157:</strong> 250mcg daily for tissue repair</li>
<li><strong>TB-500:</strong> 2mg weekly for recovery</li>
<li><strong>Epitalon:</strong> 10mg monthly for telomeres</li>
<li><strong>GHK-Cu:</strong> Copper peptide for skin/hair</li>
<li><strong>Thymosin Alpha-1:</strong> Immune support</li>
</ul>

<h2>NAD+ Optimization:</h2>
<ul>
<li><strong>NMN:</strong> 1000mg daily (morning)</li>
<li><strong>NR (Nicotinamide Riboside):</strong> Alternative to NMN</li>
<li><strong>NAD+ IV therapy:</strong> Monthly infusions</li>
<li><strong>Supporting nutrients:</strong> TMG, resveratrol</li>
</ul>

<h2>Rapamycin Protocol:</h2>
<ul>
<li><strong>Dose:</strong> 6mg once weekly</li>
<li><strong>Cycling:</strong> 8 weeks on, 4 weeks off</li>
<li><strong>Monitoring:</strong> Regular blood work</li>
<li><strong>Note:</strong> Prescription only, experimental</li>
</ul>

<h2>Metformin for Longevity:</h2>
<ul>
<li><strong>Dose:</strong> 500-1000mg daily</li>
<li><strong>Timing:</strong> With largest meal</li>
<li><strong>Contraindications:</strong> May blunt exercise adaptations</li>
<li><strong>Alternative:</strong> Berberine 500mg 2x daily</li>
</ul>

<h2>Hormone Optimization:</h2>
<ul>
<li><strong>Testosterone:</strong> Keep at upper normal range</li>
<li><strong>Growth Hormone:</strong> Secretagogues like Ipamorelin</li>
<li><strong>Thyroid:</strong> Optimize T3/T4 levels</li>
<li><strong>DHEA:</strong> 25-50mg if low</li>
<li><strong>Pregnenolone:</strong> 10-30mg if deficient</li>
</ul>

<h2>Hyperbaric Oxygen Therapy:</h2>
<ul>
<li><strong>Protocol:</strong> 60 sessions over 3 months</li>
<li><strong>Pressure:</strong> 2.0 ATA</li>
<li><strong>Duration:</strong> 90 minutes per session</li>
<li><strong>Benefits:</strong> Telomere lengthening, stem cell activation</li>
</ul>

<h2>Cold Therapy:</h2>
<ul>
<li><strong>Daily cold shower:</strong> 2-3 minutes</li>
<li><strong>Ice bath:</strong> 10-15 minutes at 10-15°C</li>
<li><strong>Cryotherapy:</strong> 3 minutes at -110°C</li>
<li><strong>Benefits:</strong> Brown fat activation, inflammation reduction</li>
</ul>

<h2>Heat Therapy:</h2>
<ul>
<li><strong>Sauna:</strong> 20 minutes at 80°C, 4x weekly</li>
<li><strong>Infrared sauna:</strong> Lower temperature alternative</li>
<li><strong>Hot-cold contrast:</strong> Alternate hot and cold</li>
</ul>

<h2>Plasma Exchange:</h2>
<ul>
<li><strong>Therapeutic plasma exchange:</strong> Quarterly</li>
<li><strong>Remove:</strong> Old proteins and inflammatory factors</li>
<li><strong>Replace:</strong> With albumin solution</li>
<li><strong>Cost:</strong> $5000-8000 per session</li>
</ul>

<h2>Stem Cell Therapies:</h2>
<ul>
<li><strong>Mesenchymal stem cells:</strong> For regeneration</li>
<li><strong>Exosomes:</strong> Cell-free alternative</li>
<li><strong>PRP:</strong> Platelet-rich plasma injections</li>
<li><strong>Banking:</strong> Store young cells for future</li>
</ul>

<h2>Biohacking Tools:</h2>
<ul>
<li><strong>PEMF mat:</strong> Daily electromagnetic therapy</li>
<li><strong>Red light panels:</strong> Full body treatment</li>
<li><strong>Neurofeedback:</strong> Brain optimization</li>
<li><strong>HRV training:</strong> Stress resilience</li>
</ul>

<p><strong>WARNING:</strong> These are experimental. Work with qualified practitioners. Start conservative, monitor closely.</p>`
  },
  {
    tabIndex: 16,
    concernName: "Prodotti Consigliati",
    tabTitle: "Products",
    emoji: "🛍️",
    contentHtml: `<h1 class="text-2xl">Recommended Products</h1>
<p>Essential products for implementing the protocol. Links to specific items Bryan uses.</p>

<h2>Sleep Optimization:</h2>
<ul>
<li><a href="https://www.amazon.com/Manta-Sleep-Mask-Sleeping-Adjustable/dp/B07PRG2CQY">Manta Sleep Mask</a> - Complete darkness</li>
<li><a href="https://cozyearth.com/?rfsn=7684165.da566f">Cozy Earth Bamboo Sheets</a> - Temperature regulating</li>
<li><a href="https://ouraring.com">Oura Ring Gen 3</a> - Sleep tracking</li>
<li><a href="https://www.amazon.com/Magnesium-Glycinate-400mg-Capsules-Supplement/dp/B07BFPMMR6">Magnesium Glycinate</a> - 500mg</li>
<li><a href="https://www.amazon.com/NOW-Supplements-L-Theanine-200-Capsules/dp/B00GQV94D0">L-Theanine</a> - 200mg</li>
<li><a href="https://www.amazon.com/ChiliPad-Cube-Temperature-Regulating-Mattress/dp/B07GKDVPGH">ChiliPad</a> - Bed cooling system</li>
</ul>

<h2>Exercise Equipment:</h2>
<ul>
<li><a href="https://www.amazon.com/Concept2-Model-Indoor-Rowing-Machine/dp/B00NH9WF4K">Concept2 Rower</a> - Cardio</li>
<li><a href="https://www.amazon.com/CAP-Barbell-Olympic-Weight-Set/dp/B08DD5FGCR">Olympic Weight Set</a></li>
<li><a href="https://www.amazon.com/Perfect-Pushup-Elite/dp/B008DNAJ5M">Perfect Pushup Elite</a></li>
<li><a href="https://www.amazon.com/Pull-Up-Bar-Doorway-Chin-Up/dp/B001EJMS6K">Pull-up Bar</a></li>
<li><a href="https://www.amazon.com/WHOOP-4-0-Optimization-Tracker-Continuous/dp/B09HX9XSYH">WHOOP 4.0</a> - Fitness tracking</li>
</ul>

<h2>Kitchen Essentials:</h2>
<ul>
<li><a href="https://www.amazon.com/Vitamix-Professional-750-Heritage-Blender/dp/B00GGCUVUA">Vitamix Blender</a> - For smoothies</li>
<li><a href="https://www.amazon.com/Instant-Pot-Duo-Multi-Use-Programmable/dp/B01NBKTPTS">Instant Pot</a> - Meal prep</li>
<li><a href="https://www.amazon.com/OXO-Good-Grips-Scale-Stainless/dp/B000WJMTNA">Food Scale</a> - Precise measurements (grammatura)</li>
<li><a href="https://www.amazon.com/Stasher-Reusable-Silicone-Food-Bag/dp/B01DZQT99I">Stasher Bags</a> - Food storage</li>
<li><a href="https://www.amazon.com/APEC-5-Stage-Reverse-Drinking-Water/dp/B00I0ZGOZM">APEC Water Filter</a></li>
</ul>

<h2>Supplements (Daily Stack):</h2>
<ul>
<li><a href="https://www.amazon.com/Life-Extension-Vitamin-Softgels-Vitamin/dp/B004U5Y2E4">Vitamin D3</a> - 2000 IU</li>
<li><a href="https://www.amazon.com/Thorne-Research-Complex-Vitamin-Capsules/dp/B00013YZ1Q">B-Complex</a></li>
<li><a href="https://www.amazon.com/Nordic-Naturals-Ultimate-Support-Softgels/dp/B00FH3KUX0">Omega-3</a> - 2g EPA/DHA</li>
<li><a href="https://www.amazon.com/ProHealth-Longevity-1000mg-Serving-Capsules/dp/B07QGV3YGF">NMN</a> - 1000mg</li>
<li><a href="https://www.amazon.com/Nutricost-Ashwagandha-600mg-120-Capsules/dp/B01GV4ZKHK">Ashwagandha</a> - 600mg</li>
<li><a href="https://www.amazon.com/NOW-Supplements-Glycine-1000-Capsules/dp/B001T73AHA">Glycine</a> - 3g</li>
</ul>

<h2>Testing & Monitoring:</h2>
<ul>
<li><a href="https://www.amazon.com/RENPHO-Bluetooth-Bathroom-Composition-Smartphone/dp/B01N1UX8RW">RENPHO Smart Scale</a></li>
<li><a href="https://www.amazon.com/Omron-Platinum-Pressure-Monitor-100-Reading/dp/B07Q4J6MFD">Omron BP Monitor</a></li>
<li><a href="https://www.amazon.com/HoneForest-Temperature-0-9999pm-Accuracy-Testing/dp/B073713G5F">TDS Water Meter</a></li>
<li><a href="https://www.amazon.com/Care-Touch-Diabetes-Testing-Kit/dp/B076VSN7TR">Glucose Monitor</a></li>
<li><a href="https://www.insidetracker.com">InsideTracker</a> - Blood testing</li>
</ul>

<h2>Skincare Products:</h2>
<ul>
<li><a href="https://www.amazon.com/CeraVe-Hydrating-Facial-Cleanser-Fragrance/dp/B01MSSDEPK">CeraVe Cleanser</a></li>
<li><a href="https://www.amazon.com/SkinCeuticals-Vitamin-Ferulic-Combination-Antioxidant/dp/B002B9DWVM">Skinceuticals C E Ferulic</a></li>
<li><a href="https://www.amazon.com/EltaMD-Clear-Broad-Spectrum-SPF-46/dp/B002MSN3QQ">EltaMD Sunscreen</a></li>
<li><a href="https://www.amazon.com/Ordinary-Niacinamide-10-Zinc-30ml/dp/B06WVJ7M66">The Ordinary Niacinamide</a></li>
</ul>

<h2>Red Light Therapy:</h2>
<ul>
<li><a href="https://www.amazon.com/JOOVV-Light-Therapy-Device-Model/dp/B07F8BZ2SJ">Joovv Solo 3.0</a> - Full body panel</li>
<li><a href="https://www.amazon.com/iRestore-Laser-Hair-Growth-System/dp/B01N7JQJ0Y">iRestore Hair Device</a></li>
</ul>

<p><strong>Note:</strong> All product links include exact specifications (grammatura) where applicable. Start with essentials, add advanced items gradually.</p>`
  }
];

export async function seedProtocolTabs() {
  console.log("Seeding protocol tabs...");
  
  try {
    // Clear existing protocol tabs
    await db.delete(protocolTabs);
    
    // Insert new protocol tabs
    for (const tab of protocolData) {
      await db.insert(protocolTabs).values(tab);
      console.log(`Inserted tab ${tab.tabIndex}: ${tab.tabTitle}`);
    }
    
    console.log("✅ Successfully seeded protocol tabs");
  } catch (error) {
    console.error("❌ Error seeding protocol tabs:", error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  seedProtocolTabs()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}