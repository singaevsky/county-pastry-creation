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
├── backend/                          # NestJS бэкенд
│   ├── src/
│   │   ├── app.module.ts             # Root модуль, импорты всех модулей
│   │   ├── main.ts                   # Entry point (bootstrap)
│   │   ├── common/                   # Shared: filters, guards, interceptors
│   │   │   ├── filters/              # e.g., http-exception.filter.ts
│   │   │   ├── guards/               # e.g., roles.guard.ts (JWT-based)
│   │   │   └── interceptors/         # e.g., logging.interceptor.ts
│   │   ├── config/                   # ConfigService для .env
│   │   │   └── config.module.ts
│   │   ├── auth/                     # Модуль Auth (приоритет 1)
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.dto.ts           # Login/Register DTO с class-validator
│   │   │   ├── jwt.strategy.ts       # Passport JWT
│   │   │   └── entities/             # User entity (shared с users)
│   │   ├── users/                    # Модуль Users (приоритет 2)
│   │   │   ├── users.module.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.repository.ts   # TypeORM repo
│   │   │   └── users.dto.ts          # DTO для профилей, ролей
│   │   ├── recipes/                  # Модуль Recipes (приоритет 3)
│   │   │   ├── recipes.module.ts
│   │   │   ├── recipes.controller.ts
│   │   │   ├── recipes.service.ts
│   │   │   ├── recipes.repository.ts
│   │   │   ├── recipes.entity.ts     # Entity с ингредиентами (JSONB)
│   │   │   └── recipes.dto.ts
│   │   ├── suppliers/                # Модуль Suppliers (приоритет 4)
│   │   │   ├── suppliers.module.ts
│   │   │   ├── suppliers.controller.ts
│   │   │   ├── suppliers.service.ts
│   │   │   ├── suppliers.repository.ts
│   │   │   ├── suppliers.entity.ts
│   │   │   └── suppliers.dto.ts
│   │   ├── pricing/                  # Модуль Calculator (приоритет 5)
│   │   │   ├── pricing.module.ts
│   │   │   ├── pricing.controller.ts
│   │   │   ├── pricing.service.ts    # Динамическое ценообразование
│   │   │   └── pricing.dto.ts        # Input для расчетов
│   │   ├── constructor/              # Модуль Constructor (приоритет 6)
│   │   │   ├── constructor.module.ts
│   │   │   ├── constructor.controller.ts
│   │   │   ├── constructor.service.ts # Wizard логика, JSON сериализация
│   │   │   └── constructor.dto.ts    # Params: colors, fillings, tiers
│   │   ├── orders/                   # Модуль Orders (приоритет 7)
│   │   │   ├── orders.module.ts
│   │   │   ├── orders.controller.ts
│   │   │   ├── orders.service.ts     # Создание заказов, статусы
│   │   │   ├── orders.repository.ts
│   │   │   ├── orders.entity.ts      # С JSON params от constructor
│   │   │   └── orders.dto.ts
│   │   ├── payments/                 # Модуль Payments (приоритет 8)
│   │   │   ├── payments.module.ts    # Расширяемый: dynamic modules для новых систем
│   │   │   ├── payments.controller.ts
│   │   │   ├── payments.service.ts   # Yookassa + Tinkoff, webhooks
│   │   │   └── payments.dto.ts
│   │   ├── geolocation/              # Модуль Geolocation (приоритет 9)
│   │   │   ├── geolocation.module.ts
│   │   │   ├── geolocation.controller.ts
│   │   │   ├── geolocation.service.ts # Назначение кондитера по coords
│   │   │   └── geolocation.dto.ts
│   │   ├── admin/                    # Модуль Admin (приоритет 10)
│   │   │   ├── admin.module.ts
│   │   │   ├── admin.controller.ts   # Дашборды, аналитика
│   │   │   ├── admin.service.ts      # Графики (sales, fillings popularity)
│   │   │   └── admin.dto.ts
│   │   └── integrations/             # Модуль Integrations (приоритет 11)
│   │       ├── integrations.module.ts
│   │       ├── delivery/             # Sub: CDEK + Yandex Delivery
│   │       │   ├── delivery.service.ts
│   │       │   └── delivery.dto.ts
│   │       ├── notifications/        # Sub: Telegram bot, SendPulse
│   │       │   ├── notifications.service.ts
│   │       │   └── notifications.dto.ts
│   │       └── onec/                 # Sub: 1C export (cron)
│   │           └── onec.service.ts
│   ├── test/                         # Jest unit tests
│   │   └── *.spec.ts                 # По модулям
│   ├── .env.example                  # Env template
│   ├── tsconfig.json                 # TS config
│   ├── nest-cli.json                 # Nest CLI
│   └── package.json                  # Deps: nestjs, typeorm, pg, redis, etc.
├── frontend/                         # React + Vite фронтенд (основан на прототипе)
│   ├── public/                       # Assets: logos, images for cakes
│   ├── src/
│   │   ├── components/               # UI: shadcn-ui + custom
│   │   │   ├── ui/                   # shadcn: button, input, etc.
│   │   │   ├── auth/                 # Login/Register forms
│   │   │   ├── admin/                # Dashboards, charts (recharts)
│   │   │   └── cake-builder/         # Wizard: steps for constructor
│   │   ├── hooks/                    # Custom: useAuth, usePricing
│   │   ├── services/                 # API calls (axios)
│   │   ├── types/                    # Shared DTO types
│   │   ├── App.tsx                   # Root (router)
│   │   ├── main.tsx                  # Entry
│   │   └── vite-env.d.ts             # Env types
│   ├── index.html                    # Vite template
│   ├── vite.config.ts                # Vite config (proxies to backend)
│   ├── tailwind.config.js            # Tailwind
│   ├── postcss.config.js             # PostCSS
│   ├── tsconfig.json                 # TS config
│   ├── cypress/                      # E2E tests
│   │   └── e2e/                      # Specs for wizard, orders
│   └── package.json                  # Deps: react, shadcn-ui, tailwind, axios, etc.
├── docker-compose.yml                # Services: postgres, redis, backend, frontend
├── .gitignore                        # Standard
├── README.md                         # Setup, deploy, architecture
└── package.json                      # Root (если нужно workspaces)
