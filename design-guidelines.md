# Design Guidelines for Il Protocollo Tabs

## Consistent Visual Elements

### 1. Header Cards
- **Structure**: Gradient background with layered depth
- **Pattern**: `bg-gradient-to-br from-[color]-500/15 via-[secondary]-500/10 to-[tertiary]-500/5`
- **Border**: `border-[color]-500/30`
- **Shadow**: `shadow-xl shadow-[color]-500/5`
- **Padding**: `p-8`
- **Icon Container**: Gradient rounded box with shadow
- **Title**: Gradient text using `bg-clip-text text-transparent`
- **Badge**: Gradient background with border and shadow

### 2. Statistic Cards
- **Container**: Relative positioning with blur effect on hover
- **Background**: `bg-gradient-to-br from-navy-charcoal/80 to-navy-charcoal/40`
- **Border**: Color-coordinated with content
- **Typography**: Gradient text for numbers, consistent font weights
- **Hover Effect**: Blur intensification with smooth transitions

### 3. Content Cards
- **Hover**: `hover:shadow-2xl hover:shadow-[color]-500/20`
- **Transition**: `transition-all duration-300`
- **Depth Layers**: Multiple gradient overlays for depth
- **Interactive Elements**: Group hover effects with child animations

### 4. Color Schemes by Tab
- **Nutrizione**: Green/Emerald/Teal
- **Esercizio**: Blue/Cyan/Sky
- **Sonno**: Purple/Indigo/Violet
- **Donne**: Pink/Purple/Rose
- **Gravidanza**: Amber/Orange/Yellow
- **Cos'è**: Cyan/Blue/Teal
- **Digiuno**: Red/Orange/Amber
- **Solari**: Yellow/Amber/Orange
- **Toeletta**: Teal/Cyan/Blue
- **Integratori**: Indigo/Purple/Blue
- **Test**: Emerald/Green/Teal
- **Interventi**: Rose/Pink/Red
- **Esercizi Fisici**: Sky/Blue/Indigo
- **Mentalità**: Violet/Purple/Pink
- **Ormoni**: Orange/Red/Pink
- **Longevità**: Gold/Amber/Yellow

### 5. Typography
- **Headers**: 4xl for main, 2xl for sections, xl for subsections
- **Font Weight**: Bold for headers, semibold for emphasis, medium for body
- **Text Colors**: Gradient for emphasis, slate-400 for secondary text

### 6. Spacing
- **Section Gap**: `space-y-8` between major sections
- **Card Grid**: `gap-5` or `gap-6` for grids
- **Internal Padding**: Consistent p-5 or p-6 for cards

### 7. Interactive Elements
- **Badges**: Gradient backgrounds with borders
- **Progress Bars**: Color-coordinated with smooth animations
- **Icons**: Lucide icons with consistent sizing
- **Buttons**: Gradient hover states with shadow effects