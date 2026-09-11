# Fulva — Premium Kozhikoden Halwa E-commerce Website

[![Live Website](https://img.shields.io/badge/Live-Website-success?style=for-the-badge)](https://fulva.vercel.app/)
[![Reference Brand](https://img.shields.io/badge/Original-Brand-blue?style=for-the-badge)](https://www.fulva.in/)

Fulva is a premium e-commerce web application dedicated to showcasing and selling authentic Kozhikoden Halwa. This project is a front-end replica/implementation of the original Fulva brand website, designed with a focus on rich aesthetics, smooth animations, and a highly interactive user experience. 

It features dynamic product showcases, cinematic introductions, and detailed product views, offering a modern, visually stunning interface.

## 🚀 Technologies Used

This project is built using a modern React stack, emphasizing performance and immersive 3D/animated visuals.

### Core Stack
* **[React 19](https://react.dev/)**: The core UI library used for building component-based, state-driven user interfaces.
* **[Vite 8](https://vitejs.dev/)**: A blazing-fast frontend build tool and development server.
* **JavaScript (ES6+) / JSX**: The primary programming language used throughout the application.

### Styling & UI
* **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework used for rapid, responsive layout and styling. Configured with custom brand colors (cream, strawberry, halwa).
* **Vanilla CSS**: Extensively used alongside Tailwind for complex, component-specific styling and layout tweaks (e.g., `App.css`, `ProductDetails.css`, `CinematicIntroHero.css`).
* **[Lucide React](https://lucide.dev/)**: A beautiful, consistent icon library used for UI elements (menus, arrows, social icons).

### Animations & 3D Graphics
* **[Framer Motion](https://www.framer.com/motion/)**: Used for fluid, declarative UI animations and transitions across the application.
* **[Three.js](https://threejs.org/) & [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)**: Implemented for rich 3D graphics and rendering.
* **[React Three Drei](https://github.com/pmndrs/drei)** & **[@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing)**: Helper utilities and post-processing effects for the 3D canvases.
* **Custom WebGL Shaders**: Custom shader programs located in `src/shaders/` for advanced graphical effects.

## 🏗 Application Architecture

The application is a Single Page Application (SPA) driven by state rather than complex client-side routing. 

```mermaid
flowchart TD
    App[App.jsx (Main State Controller)]
    
    App -->|view='home'| Home[Home View]
    App -->|view='shop'| Shop[Shop View]
    App -->|view='contact'| Contact[Contact View]
    App -->|selectedProduct !== null| ProductDetails[Product Details View]

    Home --> CinematicIntroHero
    Home --> OnamSection
    Home --> PopularProducts
    Home --> FeaturedSection
    Home --> CelebritySection
    Home --> MarketplaceSection
    Home --> HeritageSection
    Home --> SpotlightSection
    Home --> RecipeSection
    Home --> CustomerReviews
    Home --> ReelsSection
    
    Shop --> ShopPage[Shop Page Component]
    
    PopularProducts -.->|Select Product| ProductDetails
    ShopPage -.->|Select Product| ProductDetails
    ProductDetails -.->|Back Button| App
```

### Key Mechanisms
1. **State-Based Navigation**: Instead of relying heavily on `react-router-dom` (though installed), the root `App.jsx` uses a `view` state (`'home'`, `'shop'`, `'contact'`) and a `selectedProduct` state to conditionally render the main views.
2. **Product Data Flow**: Hardcoded product data resides in `src/data/flavors.js`. When a user clicks a product in the `ShopPage` or `PopularProducts` section, the full product object is passed to `App.jsx`, which updates `selectedProduct` and mounts the `ProductDetails` component.
3. **Dynamic Theming**: The `Header` component listens to window scroll events to dynamically toggle dark/light themes depending on the active background section.

## 📂 Project Structure

```text
fulva/
├── public/                 # Static assets (favicons, etc.)
├── src/
│   ├── assets/             # Images, videos, and media used in components
│   ├── components/         # Reusable UI components and page sections
│   │   ├── App.jsx         # Application entry point and state router
│   │   ├── Header.jsx, Footer.jsx
│   │   ├── ShopPage.jsx, ProductDetails.jsx, Contact.jsx
│   │   └── *Section.jsx    # Various sections for the Home page
│   ├── data/
│   │   └── flavors.js      # Hardcoded product database (flavors, prices, details)
│   ├── shaders/            # Custom WebGL shaders for 3D effects
│   ├── index.css           # Global Tailwind CSS imports
│   └── main.jsx            # React DOM rendering entry point
├── eslint.config.js        # ESLint configuration
├── tailwind.config.js      # Tailwind CSS theme and content configuration
├── vite.config.js          # Vite configuration
└── package.json            # Project metadata and dependencies
```

## 🛠 Local Development

### Prerequisites
* Node.js (v18 or higher recommended)
* npm (comes with Node.js)

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd fulva-clone/fulva
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running Locally

Start the Vite development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173/`.

### Building for Production

To create an optimized production build:
```bash
npm run build
```
The compiled files will be output to the `dist/` directory, ready to be served by any static file server.

## 🚀 Deployment

The live application is hosted on **Vercel** (`https://fulva.vercel.app/`).

To deploy your own instance to Vercel:
1. Push your code to a GitHub/GitLab/Bitbucket repository.
2. Import the repository in the Vercel dashboard.
3. Vercel will automatically detect the Vite framework, run `npm install`, execute `npm run build`, and serve the `dist` folder.

## 📝 Modifying Content & Products

Currently, the application does not have a backend CMS or database. 

To add, remove, or modify the halwa products:
1. Open `src/data/flavors.js`.
2. Edit the array of JavaScript objects. You can modify properties like name, price, description, accent colors, and image paths.
3. Replace or add new product images in the `src/assets/` directory and update the corresponding reference in `flavors.js`.

## 🔮 Implemented vs. Planned Features

### Currently Implemented ✅
* **Immersive Home Page**: Fully responsive layout with cinematic intros, scroll-based animations, and rich media integration.
* **Product Browsing**: Dedicated Shop page to view all available halwa flavors.
* **Product Details**: Deep-dive view for individual products, showing pricing, ingredients, and rich imagery.
* **Custom 3D Effects**: Interactive elements powered by React Three Fiber.
* **Contact Information**: Static contact page layout.

### Planned / Future Enhancements 🚧
* **E-commerce Checkout Flow**: Implementation of a shopping cart, checkout page, and integration with a payment gateway (e.g., Stripe, Razorpay). *(Currently, you can view products but cannot complete a purchase).*
* **Backend Integration**: Migrating hardcoded product data (`flavors.js`) to a Headless CMS or a custom backend database (Node.js/Express, Firebase, etc.).
* **Client-side Routing**: Fully integrating `react-router-dom` to provide shareable URLs for specific pages and products (e.g., `/shop`, `/product/strawberry-halwa`).
* **Authentication**: User login and profile management for order tracking.

## 🐛 Troubleshooting

* **Blank Screen / White Page**: Ensure you have run `npm install` and that all dependencies (especially Three.js and Framer Motion) are correctly installed. Check the browser console for JavaScript errors.
* **Images/Videos Not Loading**: Verify that the paths in `flavors.js` correctly map to existing files in the `src/assets/` or `public/` directories.
* **Scroll Getting Stuck**: The application programmatically locks scrolling during the initial cinematic intro (`document.body.style.overflow = 'hidden'`). If you encounter scroll lock during development, verify that the `isIntroComplete` state in `App.jsx` is being properly set.
