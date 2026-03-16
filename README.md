<h1>MBST – Mobile Store App</h1>

<p>
	<strong>Modern, accessible, and fully tested React app for browsing, filtering, and purchasing smartphones.</strong>
</p>

---

## Table of Contents

- [Features](#features)
- [Usage Examples](#usage-examples)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Accessibility](#accessibility)
- [API](#api)
- [Contributing](#contributing)

---

## Features

- Browse a list of smartphones with search and color filtering
- View detailed product information and specifications
- **Frontend:** React 19, TypeScript, Vite
- **Styling:** SCSS (Sass), CSS Modules
- **Routing:** React Router DOM v7
- **State Management:** React Context API
- **Testing:** Vitest, Playwright, Testing Library
- **Linting/Formatting:** ESLint, Prettier

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/clauCampos/mstb.git
cd mbst
```

2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file if you need to override API keys or environment variables (see `.env.example` if present).

### Running the App

- **Development:**

  ```sh
  npm run dev
  ```

  Visit [http://localhost:5173](http://localhost:5173) (or as shown in terminal).

- **Production Build:**
  ```sh
  npm run build
  npm run preview
  ```

## Available Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Lint code
- `npm run lint-fix` – Lint and auto-fix
- `npm run format` – Format code with Prettier
- `npm run test:unit` – Run unit tests (Vitest)
- `npm run test:e2e` – Run E2E tests (Playwright UI)
- `npm run test:e2e:run` – Run E2E tests (headless)
- `npm run test:coverage` – Run unit tests with coverage
- `npm run show-report` – Open Playwright HTML test report

## Usage Examples

### Code Snippets

**Using a context value in a component (reading cart state):**

```tsx
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

const CartSummary = () => {
  const { cartItems, total } = useContext(CartContext)
  return (
    <div>
      <p>Items in cart: {cartItems.length}</p>
      <p>Total: ${total}</p>
    </div>
  )
}
```

**Filtering/searching products:**

```tsx
import { useState } from 'react'

const ProductsList = ({ products }) => {
  const [search, setSearch] = useState('')
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search products...'
      />
      <ul>
        {filtered.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

**Minimal routing example (navigate between pages):**

```tsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import ProductsListPage from './pages/ProductsListPage'
import CartPage from './pages/CartPage'

const App = () => (
  <BrowserRouter>
    <nav>
      <Link to='/'>Products</Link>
      <Link to='/cart'>Cart</Link>
    </nav>
    <Routes>
      <Route path='/' element={<ProductsListPage />} />
      <Route path='/cart' element={<CartPage />} />
    </Routes>
  </BrowserRouter>
)
```

**Test example (unit test for a component):**

```ts
import { render, screen } from '@testing-library/react';
import CartSummary from '../src/components/ShoppingCart/CartSummary';

test('shows cart item count and total', () => {
  const mockContext = {
    cartItems: [{ id: 1 }, { id: 2 }],
    total: 100,
  };
  render(
    <CartContext.Provider value={mockContext}>
      <CartSummary />
    </CartContext.Provider>
  );
  expect(screen.getByText(/Items in cart: 2/)).toBeInTheDocument();
  expect(screen.getByText(/Total: \$100/)).toBeInTheDocument();
});
```

### API Usage

- All product data is fetched from:
  `https://prueba-tecnica-api-tienda-moviles.onrender.com`
- Example API call (using fetch):

```ts
fetch('https://prueba-tecnica-api-tienda-moviles.onrender.com/products', {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
})
  .then((res) => res.json())
  .then((data) => console.log(data))
```

The MBST app is organized for clarity, scalability, and maintainability. Here’s how the main parts interact:

- **App.tsx**: The root component. Sets up routing, context providers, and layout.
- **Pages** (`src/pages/`): Top-level views for each route (e.g., product list, product info, cart). Each page composes feature components and handles page-specific logic.
- **Components** (`src/components/`):
  - **ProductsList, ProductInfo, ShoppingCart**: Feature modules, each with their own UI, hooks, and styles.
  - **Shared**: Reusable UI elements (modals, links, color pickers, etc.).
  - **Ui**: Icons and layout components (header, layout wrappers).
- **Context** (`src/context/`):
  - **CartContext, ProductsContext, ProductDetailContext**: Provide global state and actions for cart, product data, and product details. Used by components/pages via React Context API.
- **Services** (`src/services/`):
  - **api.ts**: Handles all API requests to the backend.
- **Types** (`src/types/`): Shared TypeScript types and interfaces for products, API responses, and color options.
- **Styles**: SCSS modules for component and page-level styling.
- **Tests** (`/tests/`):
  - **unit/**: Unit and integration tests for components and logic.
  - **e2e/**: End-to-end tests for user flows and accessibility.

**Data Flow Example:**

1. User interacts with a page (e.g., adds a product to cart).
2. The page/component dispatches an action via a Context provider (e.g., `CartContext`).
3. State updates trigger UI changes across relevant components.
4. API calls (fetching products, etc.) are handled by `api.ts` and results flow into context/providers.

This modular structure ensures separation of concerns, easy testing, and maintainability.

## Project Structure

```
mbst/
├── public/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── assets/
│   ├── components/
│   │   ├── ProductsList/
│   │   │   ├── ProductsList.tsx
│   │   │   ├── ResultsFilterBar.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useResultsFiltersBar.ts
│   │   │   │   └── useSearchBar.ts
│   │   │   ├── types/
│   │   │   │   └── ResultsFiltersBarTypes.ts
│   │   │   └── styles/
│   │   │       ├── ProductsListStyles.scss
│   │   │       ├── ResultsFiltersBarStyles.scss
│   │   │       └── SeachBarStyles.scss
│   │   ├── ProductInfo/
│   │   │   ├── DetailsNavigation.tsx
│   │   │   ├── ProductInfo.tsx
│   │   │   ├── ProductSpecifications.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useDetailsNavigation.ts
│   │   │   │   └── useProductInfo.ts
│   │   │   └── styles/
│   │   │       ├── DetailsNavigation.scss
│   │   │       ├── ProductInfoStyles.scss
│   │   │       └── ProductSpecsStyles.scss
│   │   ├── ShoppingCart/
│   │   │   ├── ShoppingCart.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useShoppingCart.ts
│   │   │   └── styles/
│   │   │       └── ShoppingCartStyles.scss
│   │   ├── Shared/
│   │   │   ├── ColorOptionsListItem/
│   │   │   ├── Modal/
│   │   │   ├── ProductsCardLink/
│   │   │   └── StorageOptionsList/
│   │   └── Ui/
│   │       ├── Icons/
│   │       │   ├── BasketEmptyIcon.tsx
│   │       │   ├── BasketFullIcon.tsx
│   │       │   ├── CaretBackIcon.tsx
│   │       │   ├── CloseIcon.tsx
│   │       │   └── LogoIcon.tsx
│   │       └── Layout/
│   │           ├── AppHeader.tsx
│   │           ├── Layout.tsx
│   │           └── styles/
│   ├── context/
│   │   ├── CartContext.tsx
│   │   ├── ProductDetailContext.tsx
│   │   ├── ProductsContext.tsx
│   │   └── types/
│   │       ├── CartContextTypes.ts
│   │       ├── ProductDetailContextTypes.ts
│   │       └── ProductsContextTypes.ts
│   ├── pages/
│   │   ├── CartPage.tsx
│   │   ├── ProductInfoPage.tsx
│   │   ├── ProductsListPage.tsx
│   │   └── styles/
│   │       ├── CartPageStyles.scss
│   │       ├── ProductDetailPageStyles.scss
│   │       └── ProductsListPageStyles.scss
│   ├── services/
│   │   └── api.ts
│   └── types/
│       ├── ColorOption.ts
│       ├── FetchTypes.ts
│       ├── ProductTypes.ts
│       └── ProductWithColors.ts
├── tests/
│   ├── unit/
│   │   ├── AlertModal.test.tsx
│   │   ├── AppHeader.test.tsx
│   │   ├── CartPage.test.tsx
│   │   ├── ColorOptionsListItem.test.tsx
│   │   ├── DetailsNavigation.test.tsx
│   │   ├── ProductInfo.test.tsx
│   │   ├── ProductInfoPage.test.tsx
│   │   ├── ProductSpecifications.test.tsx
│   │   ├── ProductsCardLink.test.tsx
│   │   ├── ProductsList.test.tsx
│   │   ├── ProductsListPage.test.tsx
│   │   ├── ResultsFilterBar.test.tsx
│   │   ├── SearchBar.test.tsx
│   │   ├── ShoppingCart.test.tsx
│   │   └── StorageOptionsList.test.tsx
│   └── e2e/
│       ├── accessibility/
│       │   └── accessibility.spec.ts
│       ├── cart/
│       │   └── cart.spec.ts
│       ├── header/
│       │   └── header-links.spec.ts
│       ├── productCardLink/
│       │   └── products-card-link-ui.spec.ts
│       ├── productInfoPage/
│       │   ├── products-info-similar-items-list.spec.ts
│       │   ├── products-info-specifications.spec.ts
│       │   └── products-info.spec.ts
│       ├── productsPage/
│       │   └── products-list.spec.ts
│       └── service/
│           ├── products-info-service.spec.ts
│           └── products-service.spec.ts
├── package.json
├── README.md
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js
├── vitest.config.ts
├── playwright.config.ts
```

## Testing

- **Unit tests:**
  - Located in `tests/unit/`
  - Run with `npm run test:unit`
  - Uses Vitest and Testing Library

- **End-to-end (E2E) tests:**
  - Located in `tests/e2e/`
  - Run with `npm run test:e2e` (UI) or `npm run test:e2e:run` (headless)
  - Uses Playwright and @axe-core/playwright for accessibility

- **Coverage:**
  - Run `npm run test:coverage` for unit test coverage report

## Accessibility

- Automated accessibility checks using Playwright and axe-core
- Keyboard navigation and screen reader support
- Color contrast and focus indicators

## API

- The app fetches product data from a remote API:
  - `https://prueba-tecnica-api-tienda-moviles.onrender.com`
- API key is read from environment variable: `VITE_API_KEY`
- See `src/services/api.ts` for details

## Contributing

We welcome contributions! Please follow these guidelines to help maintain code quality and consistency:

### Coding Standards

- Use **TypeScript** for all source code.
- Follow the existing **file and folder structure**.
- Use **ESLint** and **Prettier** for code style and formatting. Run `npm run lint` and `npm run format` before committing.
- Write clear, descriptive commit messages.
- Add or update **unit/E2E tests** for new features or bug fixes.
- Ensure all tests pass (`npm run test:unit` and `npm run test:e2e:run`).

### Pull Request Process

1. **Fork** the repository and create your feature branch:  
   `git checkout -b feature/your-feature`
2. **Make your changes** and commit with a clear message.
3. **Run linting and tests** locally before pushing:

- `npm run lint`
- `npm run format`
- `npm run test:unit`
- `npm run test:e2e:run`

4. **Push** to your fork:  
   `git push origin feature/your-feature`
5. **Open a Pull Request** on GitHub:

- Describe your changes and reference any related issues.
- Ensure the PR passes all automated checks (CI, lint, tests).

6. **Participate in code review** and address feedback as needed.

Thank you for helping improve MBST!
