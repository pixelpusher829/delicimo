# Delicimo 🍳

Delicimo is a modern, high-performance recipe search application built with React 19, Vite, and Tailwind CSS. It leverages the Spoonacular API to provide users with a rich database of recipes, complete with nutritional information, ingredients, and step-by-step instructions.

## ✨ Features

- **Recipe Search:** Search through thousands of recipes with ease.
- **Detailed Recipe Views:** In-depth information including:
  - Ingredients lists.
  - Step-by-step cooking instructions.
  - Comprehensive nutritional breakdowns.
  - Health and dietary labels (e.g., Gluten-Free, Vegan, Dairy-Free).
- **Responsive Design:** A polished, mobile-first UI built with Tailwind CSS and Shadcn UI components.
- **Mock Data Fallback:** Seamless development and demoing experience even without an active API key or when API quotas are exceeded.
- **Optimized Performance:** Built with Vite and React 19 for a fast, modern development and user experience.

## 🚀 Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 7](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) & [Shadcn/ui](https://ui.shadcn.com/)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **API:** [Spoonacular API](https://spoonacular.com/food-api)

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (latest LTS recommended)
- [Bun](https://bun.sh/) (preferred package manager)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/delicimo.git
   cd delicimo
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your Spoonacular API key:
   ```env
   VITE_API_SECRET_KEY=your_spoonacular_api_key_here
   ```

4. **Enable API Calls (Optional):**
   By default, the application uses mock data for development. To enable live API calls, set `apiActive = true` in `src/api/useSearchRecipes.tsx`.

### Development

Start the development server:
```bash
bun dev
```

Build for production:
```bash
bun build
```

Lint the codebase:
```bash
bun lint
```

## 📂 Project Structure

- `src/api`: React hooks for data fetching and API integration.
- `src/app`: Application entry point and global styles.
- `src/components/ui`: Reusable UI components (buttons, selects, etc.).
- `src/layout`: Structural components like Header, Footer, and Page Root.
- `src/pages`: Main page components (Home and Recipe details).
- `public/mock`: Static JSON files used for development and API fallbacks.

## 📄 License

This project is open-source and available under the MIT License.
