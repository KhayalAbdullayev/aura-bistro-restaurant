🍽️ Aura Bistro — Fine Dining ExperienceA modern, fully responsive single-page restaurant landing page built with pure semantic HTML5 and vanilla CSS3. This project was developed as part of Assignment 1 in the 
Mayerfeld Practicum Program® – AI-Assisted Frontend Developer.📌 Project OverviewAura Bistro showcases an artisanal culinary experience with a clean design, structured menu, interactive form components, 
and intuitive single-page navigation.The primary technical objective of this project is to demonstrate foundational CSS layout engines (Flexbox and 2D CSS Grid), clean HTML5 semantics, and mobile-first 
responsiveness without relying on external CSS frameworks or JavaScript libraries.✨ Key FeaturesSemantic Landmarks: Built exclusively using <header>, <nav>, <main>, <section>, <article>, and <footer> 
tags to maximize accessibility and SEO performance.Strict Document Hierarchy: Exactly one <h1> element placed in the Hero section, followed by structured <h2> to <h4> headings across all sub-sections.
Flexbox Layout Engine: Used for 1D row alignments in the sticky header navigation, side-by-side About layout, menu item cards, and footer sections.2D CSS Grid Engine: Applied to the Reservation 
Form to manage multi-column field alignments and full-width CTA button spanning (grid-column: 1 / -1).Zero Horizontal Scroll: Designed with max-width: 100% and overflow-x: hidden resets to ensure 
fluid responsiveness across mobile, tablet, and desktop viewports.CSS Custom Properties (Variables): Maintainable global palette (:root) for colors, typography, and spacing.🛠️ Built WithHTML5 — 
Markup & Document StructureCSS3 — Custom Styling, CSS Variables, Flexbox, & CSS GridGit & GitHub — Version Control & Source Management📐 Technical Architecture & Layout DecisionsSectionComponentTech Stack / 
PatternPurposeHeader & NavSticky NavigationFlexbox (space-between)Keeps logo and anchor routing accessible at top of viewportHeroBanner & CTAFlexbox CenteringClean vertical & horizontal focal pointAboutRestaurant
StoryFlexbox WrapperSide-by-side text and photo layout on desktopMenuDishes & PricingFlexbox RowSeparates dish info (<div class="menu-item-info">) from price (.price)ReservationBooking FormCSS Grid 
(repeat(2, 1fr))Clean 2-column input layout on desktop, collapses to 1-column on mobileFooterBusiness InfoFlexbox WrapperResponsive multi-column layout for operating hours and contact details
📱 Mobile ResponsivenessThe application includes @media (max-width: 768px) breakpoint overrides:Navigation items switch to vertical column layouts (flex-direction: column).The Reservation Form's 2-column grid 
collapses into a single touch-friendly column (grid-template-columns: 1fr).Typography dynamically scales down to fit smaller display aspect ratios.📂 Folder Structureaura-bistro-restaurant/
├── index.html       # Primary Semantic HTML5 document
├── style.css        # Vanilla CSS stylesheet (Variables, Resets, Grid/Flexbox)
└── README.md        # Technical Documentation
🚀 Getting Started LocallyTo run this project on your local machine:Clone the repository:git clone https://github.com/YOUR_USERNAME/aura-bistro-restaurant.git
Navigate to the project directory:cd aura-bistro-restaurant
Open index.html in your browser:
Double-click index.html or open it with Live Server in VS Code 
