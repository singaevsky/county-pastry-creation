# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/a3e889e3-ca65-48ae-a002-8509623596d3

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a3e889e3-ca65-48ae-a002-8509623596d3) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a3e889e3-ca65-48ae-a002-8509623596d3) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)


county-pastry-creation/
├── .env.example                      # Env template
├── .eslintrc.js                      # Unified ESLint
├── .gitignore                        # Standard
├── README.md                         # Setup, deploy (updated with new roles, constructor)
├── docker-compose.yml                # Postgres, Redis, backend, frontend
├── package.json                      # Workspaces
├── .github/workflows/ci.yml          # CI/CD (updated for new tests)
├── backend/
│   ├── nest-cli.json
│   ├── ormconfig.ts
│   ├── package.json                  # Deps: nestjs, typeorm, etc.
│   ├── src/
│   │   ├── app.module.ts             # Root (imports new entities)
│   │   ├── main.ts                   # Bootstrap
│   │   ├── common/
│   │   │   ├── http-exception.filter.ts
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── local-auth.guard.ts
│   │   │   ├── roles.decorator.ts    # Updated for new roles
│   │   │   ├── roles.guard.ts        # Updated for new roles check
│   │   │   └── winston.config.ts
│   │   ├── config/config.module.ts
│   │   ├── auth/                     # Updated: roles in DTO
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.dto.ts           # Updated: enum Role expanded
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.service.ts
│   │   │   └── jwt.strategy.ts
│   │   ├── users/                    # Updated: entity with new roles
│   │   │   ├── user.entity.ts        # Updated: enum Role expanded
│   │   │   ├── users.controller.ts
│   │   │   ├── users.dto.ts
│   │   │   ├── users.module.ts
│   │   │   └── users.service.ts
│   │   ├── recipes/                  # Updated: fillings entity
│   │   │   ├── recipe.entity.ts
│   │   │   ├── fillings.entity.ts    # New: Editable fillings DB
│   │   │   ├── products.entity.ts    # New: Product types DB
│   │   │   ├── recipes.controller.ts
│   │   │   ├── recipes.dto.ts
│   │   │   ├── recipes.module.ts
│   │   │   └── recipes.service.ts    # Updated: fetch fillings/products
│   │   ├── suppliers/
│   │   │   ├── supplier.entity.ts
│   │   │   ├── suppliers.controller.ts
│   │   │   ├── suppliers.dto.ts
│   │   │   ├── suppliers.module.ts
│   │   │   └── suppliers.service.ts
│   │   ├── pricing/
│   │   │   ├── pricing.controller.ts
│   │   │   ├── pricing.dto.ts
│   │   │   ├── pricing.module.ts
│   │   │   └── pricing.service.ts
│   │   ├── constructor/              # Updated: product type, 3 photos, fillings from DB
│   │   │   ├── constructor.controller.ts # Updated: fetch products/fillings
│   │   │   ├── constructor.dto.ts        # Updated: productType, designPhotos array
│   │   │   ├── constructor.module.ts
│   │   │   └── constructor.service.ts    # Updated: dynamic validation by type
│   │   ├── orders/
│   │   │   ├── order.entity.ts
│   │   │   ├── orders.controller.ts      # Updated: @Roles for sales_manager
│   │   │   ├── orders.dto.ts
│   │   │   ├── orders.module.ts
│   │   │   └── orders.service.ts
│   │   ├── payments/
│   │   │   ├── payments.controller.ts
│   │   │   ├── payments.dto.ts
│   │   │   ├── payments.module.ts
│   │   │   ├── payments.service.ts
│   │   │   ├── yookassa.gateway.ts
│   │   │   └── tinkoff.gateway.ts
│   │   ├── geolocation/                  # Updated: @Roles for logistics_manager
│   │   │   ├── geolocation.controller.ts
│   │   │   ├── geolocation.dto.ts
│   │   │   ├── geolocation.module.ts
│   │   │   └── geolocation.service.ts
│   │   ├── admin/                        # Updated: CRUD for fillings/products (editable by admin/baker)
│   │   │   ├── admin.controller.ts
│   │   │   ├── admin.dto.ts
│   │   │   ├── admin.module.ts
│   │   │   └── admin.service.ts          # Updated: edit fillings/products
│   │   ├── integrations/
│   │   │   ├── integrations.module.ts
│   │   │   ├── delivery.service.ts
│   │   │   ├── notifications.service.ts
│   │   │   └── onec.service.ts
│   │   └── migrations/
│   │       ├── CreateUserTable.ts
│   │       ├── CreateRecipeTable.ts
│   │       ├── CreateSupplierTable.ts
│   │       ├── CreateOrderTable.ts
│   │       ├── CreateProductsTable.ts   # New
│   │       └── CreateFillingsTable.ts   # New
│   ├── test/
│   │   ├── auth.service.spec.ts
│   │   ├── admin.service.spec.ts
│   │   ├── orders.service.spec.ts
│   │   └── constructor.service.spec.ts  # New
│   └── tsconfig.json
├── frontend/
│   ├── cypress/
│   │   └── e2e/
│   │       ├── adminCharts.cy.ts
│   │       ├── constructor.cy.ts        # Updated: product type, photos
│   │       └── orders.cy.ts
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── public/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── vite-env.d.ts
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── auth/
│   │   │   │   ├── Login.tsx
│   │   │   │   └── Register.tsx          # Updated: role select
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.tsx
│   │   │   │   ├── SalesChart.tsx
│   │   │   │   ├── FillingsPopularityChart.tsx
│   │   │   │   └── ConstructorConversionChart.tsx
│   │   │   └── cake-builder/
│   │   │       ├── WizardSteps.tsx      # Updated: product select, dynamic steps, 3 photos
│   │   │       ├── ProductSelection.tsx # New: Item choice
│   │   │       ├── ColorSelection.tsx
│   │   │       ├── FillingSelection.tsx # Updated: from API, max 5
│   │   │       ├── TierSelection.tsx
│   │   │       ├── UploadDesign.tsx     # New: 3 photos upload
│   │   │       ├── UploadSketch.tsx
│   │   │       └── PreviewPrice.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useAdminData.ts
│   │   │   └── useProducts.ts           # New: Fetch products/fillings
│   │   ├── services/
│   │   │   └── api.ts                   # Updated: endpoints for products/fillings
│   │   ├── types/
│   │   │   └── index.ts                 # Updated: ProductType, Filling
│   │   └── utils/
│   │       └── jsonSerializer.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
