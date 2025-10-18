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
├── .gitignore                        # Standard ignores
├── .env.example                      # Новое: Env template (добавлен ниже)
├── README.md                         # Updated with migrations, tests, deploy
├── docker-compose.yml                # Postgres, Redis, backend, frontend
├── package.json                      # Root (workspaces: ["backend", "frontend"])
├── backend/
│   ├── .eslintrc.js                  # ESLint config
│   ├── .env.example                  # Local env (копия root)
│   ├── nest-cli.json                 # Nest CLI
│   ├── ormconfig.ts                  # TypeORM config
│   ├── package.json                  # Deps: nestjs, typeorm, etc.
│   ├── src/
│   │   ├── app.module.ts             # Root module
│   │   ├── main.ts                   # Bootstrap with helmet, winston
│   │   ├── common/                   # Shared
│   │   │   ├── filters/              # http-exception.filter.ts
│   │   │   ├── guards/               # roles.guard.ts, jwt-auth.guard.ts (новое ниже)
│   │   │   ├── interceptors/         # logging.interceptor.ts
│   │   │   ├── decorators/           # roles.decorator.ts (новое ниже)
│   │   │   └── logger/               # winston.config.ts
│   │   ├── config/                   # config.module.ts
│   │   ├── auth/                     # Приоритет 1
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.dto.ts
│   │   │   ├── jwt.strategy.ts
│   │   │   └── local-auth.guard.ts   # Новое: Local strategy guard (добавлен ниже)
│   │   ├── users/                    # Приоритет 2
│   │   │   ├── users.module.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.repository.ts
│   │   │   ├── users.dto.ts
│   │   │   └── entities/user.entity.ts
│   │   ├── recipes/                  # Приоритет 3
│   │   │   ├── recipes.module.ts
│   │   │   ├── recipes.controller.ts
│   │   │   ├── recipes.service.ts
│   │   │   ├── recipes.repository.ts
│   │   │   ├── recipes.dto.ts
│   │   │   └── entities/recipe.entity.ts
│   │   ├── suppliers/                # Приоритет 4
│   │   │   ├── suppliers.module.ts
│   │   │   ├── suppliers.controller.ts
│   │   │   ├── suppliers.service.ts
│   │   │   ├── suppliers.repository.ts
│   │   │   ├── suppliers.dto.ts
│   │   │   └── entities/supplier.entity.ts  # Новое: Entity (добавлен ниже)
│   │   ├── pricing/                  # Приоритет 5
│   │   │   ├── pricing.module.ts
│   │   │   ├── pricing.controller.ts
│   │   │   ├── pricing.service.ts
│   │   │   └── pricing.dto.ts
│   │   ├── constructor/              # Приоритет 6
│   │   │   ├── constructor.module.ts
│   │   │   ├── constructor.controller.ts
│   │   │   ├── constructor.service.ts
│   │   │   └── constructor.dto.ts
│   │   ├── orders/                   # Приоритет 7
│   │   │   ├── orders.module.ts
│   │   │   ├── orders.controller.ts
│   │   │   ├── orders.service.ts
│   │   │   ├── orders.repository.ts
│   │   │   ├── orders.dto.ts
│   │   │   └── entities/order.entity.ts
│   │   ├── payments/                 # Приоритет 8
│   │   │   ├── payments.module.ts
│   │   │   ├── payments.controller.ts
│   │   │   ├── payments.service.ts
│   │   │   ├── payments.dto.ts
│   │   │   └── gateways/             # Расширение для плагинов
│   │   │       ├── yookassa.gateway.ts
│   │   │       └── tinkoff.gateway.ts  # Новое: Tinkoff плагин (добавлен ниже)
│   │   ├── geolocation/              # Приоритет 9
│   │   │   ├── geolocation.module.ts
│   │   │   ├── geolocation.controller.ts
│   │   │   ├── geolocation.service.ts
│   │   │   └── geolocation.dto.ts
│   │   ├── admin/                    # Приоритет 10
│   │   │   ├── admin.module.ts
│   │   │   ├── admin.controller.ts
│   │   │   ├── admin.service.ts
│   │   │   └── admin.dto.ts
│   │   ├── integrations/             # Приоритет 11
│   │   │   ├── integrations.module.ts
│   │   │   ├── delivery/
│   │   │   │   ├── delivery.service.ts
│   │   │   │   └── delivery.dto.ts
│   │   │   ├── notifications/
│   │   │   │   ├── notifications.service.ts
│   │   │   │   └── notifications.dto.ts
│   │   │   └── onec/
│   │   │       └── onec.service.ts
│   │   └── migrations/               # Новое: Полные миграции
│   │       ├── CreateUserTable.ts    # Пример (обновлен)
│   │       ├── CreateRecipeTable.ts  # Новое (добавлен ниже)
│   │       ├── CreateSupplierTable.ts # Новое (добавлен ниже)
│   │       ├── CreateOrderTable.ts   # Новое (добавлен ниже)
│   │       └── ... (для остальных entities)
│   ├── test/                         # Тесты
│   │   ├── auth.service.spec.ts      # Новое (добавлен ниже)
│   │   ├── admin.service.spec.ts     # Существующий
│   │   └── ... (для всех сервисов)
│   └── tsconfig.json                 # TS config
├── frontend/
│   ├── cypress/
│   │   └── e2e/
│   │       ├── adminCharts.cy.ts
│   │       ├── constructor.cy.ts
│   │       └── orders.cy.ts          # Новое: e2e для orders (добавлен ниже)
│   ├── index.html                    # Vite template
│   ├── package.json                  # Deps: react, shadcn-ui, etc.
│   ├── postcss.config.js             # PostCSS
│   ├── public/                       # Assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                   # shadcn-ui
│   │   │   ├── auth/                 # Новое: Auth forms
│   │   │   │   ├── Login.tsx         # Новое (добавлен ниже)
│   │   │   │   └── Register.tsx      # Новое (добавлен ниже)
│   │   │   ├── admin/                # Charts
│   │   │   │   ├── AdminDashboard.tsx
│   │   │   │   ├── SalesChart.tsx
│   │   │   │   ├── FillingsPopularityChart.tsx
│   │   │   │   └── ConstructorConversionChart.tsx
│   │   │   └── cake-builder/         # Wizard
│   │   │       ├── WizardSteps.tsx
│   │   │       ├── ColorSelection.tsx
│   │   │       ├── FillingSelection.tsx # Новое (добавлен ниже)
│   │   │       ├── TierSelection.tsx # Новое (добавлен ниже)
│   │   │       ├── UploadSketch.tsx  # Новое (добавлен ниже)
│   │   │       └── PreviewPrice.tsx
│   │   ├── hooks/                    # useAdminData.ts, useAuth.ts (новое ниже)
│   │   ├── services/                 # api.ts
│   │   ├── types/                    # Shared DTO types
│   │   ├── utils/                    # jsonSerializer.ts
│   │   ├── App.tsx                   # Root with router (обновлен ниже)
│   │   ├── main.tsx                  # Entry
│   │   └── vite-env.d.ts             # Env types
│   ├── tailwind.config.js            # Tailwind
│   ├── tsconfig.json                 # TS config
│   ├── tsconfig.node.json            # Node TS
│   └── vite.config.ts                # Vite with proxy
└── .github/
    └── workflows/
        └── ci.yml                    # Новое: CI/CD (добавлен ниже)
