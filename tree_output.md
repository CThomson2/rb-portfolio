./
├── next-env.d.ts
├── output2.txt
├── chem-formulas.csv
├── components/
│   ├── features/
│   │   ├── products/
│   │   │   ├── ProductDialog/
│   │   │   │   ├── ProductDialog.tsx
│   │   │   │   ├── ProductTable.tsx
│   │   │   │   └── dialog.module.css
│   │   │   └── ProductTable/
│   │   │       ├── header/
│   │   │       │   └── SearchBar.tsx
│   │   │       ├── table-data/
│   │   │       │   ├── ProductName.tsx
│   │   │       │   ├── ProductGrade.tsx
│   │   │       │   └── ProductStockLevel.tsx
│   │   │       ├── tabs/
│   │   │       │   ├── index.tsx
│   │   │       │   └── TabItem.tsx
│   │   │       ├── columns.tsx
│   │   │       └── index.tsx
│   │   └── inventory/
│   │       ├── DrumsTable/
│   │       │   ├── columns.tsx
│   │       │   └── index.tsx
│   │       ├── TransactionsTable/
│   │       │   ├── columns.tsx
│   │       │   └── index.tsx
│   │       ├── CreateForm/
│   │       │   └── index.tsx
│   │       └── OrdersGrid/
│   │           ├── GridItem.tsx
│   │           └── index.tsx
│   ├── ui/
│   │   ├── FloatingNavbar.tsx
│   │   ├── Globe.tsx
│   │   ├── GradientBg.tsx
│   │   ├── GridGlobe.tsx
│   │   ├── HoverBorder.tsx
│   │   ├── InfiniteCards.tsx
│   │   ├── LayoutGrid.tsx
│   │   ├── Pin.tsx
│   │   ├── Spotlight.tsx
│   │   ├── CanvasRevealEffect.tsx
│   │   ├── DropdownMenu.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Card.tsx
│   │   ├── Avatar.tsx
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── List.tsx
│   │   ├── Select.tsx
│   │   ├── Table.tsx
│   │   ├── Tooltip.tsx
│   │   ├── Separator.tsx
│   │   ├── TextGenerateEffect.tsx
│   │   ├── BentoGrid.tsx
│   │   └── MovingBorders.tsx
│   ├── shared/
│   │   ├── projects/
│   │   │   ├── Timeline.tsx
│   │   │   ├── LastUpdate.tsx
│   │   │   ├── ProjectManager.tsx
│   │   │   └── Resources.tsx
│   │   └── table/
│   │       ├── footer/
│   │       │   ├── Pagination.tsx
│   │       │   └── index.tsx
│   │       ├── header/
│   │       │   ├── ActionButton.tsx
│   │       │   ├── TableHeader.tsx
│   │       │   └── SearchBar.tsx
│   │       ├── ux/
│   │       │   ├── Actions.tsx
│   │       │   └── SortableColumn.tsx
│   │       └── DataTable.tsx
│   └── home/
│       ├── Clients.tsx
│       ├── Footer.tsx
│       ├── Grid.tsx
│       ├── MagicButton.tsx
│       ├── RecentProjects.tsx
│       ├── Approach.tsx
│       ├── Hero.tsx
│       ├── Sidebar.tsx
│       ├── Experience.module.css
│       ├── grid.module.css
│       ├── Barcode.tsx
│       ├── Experience.tsx
│       └── UserDashboard.tsx
├── components.json
├── content/
│   ├── about/
│   │   └── index.ts
│   ├── confetti.json
│   ├── globe.json
│   ├── products/
│   │   └── index.ts
│   ├── terms/
│   │   ├── terms.txt
│   │   ├── index.ts
│   │   └── types.ts
│   └── main/
│       └── index.ts
├── next.config.mjs
├── postcss.config.js
├── sentry.client.config.ts
├── sentry.edge.config.ts
├── sentry.server.config.ts
├── tsconfig.json
├── database/
│   ├── client.ts
│   ├── sql/
│   │   ├── init/
│   │   │   ├── config.sql
│   │   │   ├── dec24Stock.sql
│   │   │   └── seedDrumData.sql
│   │   ├── functions/
│   │   │   └── triggers.sql
│   │   └── misc/
│   │       ├── still_data_dump.sql
│   │       └── queries_tx_drums.sql
│   ├── prisma/
│   │   ├── generated/
│   │   │   └── public-client/
│   │   │       ├── runtime/
│   │   │       │   ├── edge-esm.js
│   │   │       │   ├── edge.js
│   │   │       │   ├── index-browser.d.ts
│   │   │       │   ├── index-browser.js
│   │   │       │   ├── library.d.ts
│   │   │       │   ├── library.js
│   │   │       │   ├── react-native.js
│   │   │       │   └── wasm.js
│   │   │       ├── default.d.ts
│   │   │       ├── default.js
│   │   │       ├── edge.d.ts
│   │   │       ├── edge.js
│   │   │       ├── index-browser.js
│   │   │       ├── index.d.ts
│   │   │       ├── index.js
│   │   │       ├── libquery_engine-darwin-arm64.dylib.node*
│   │   │       ├── package.json
│   │   │       ├── schema.prisma
│   │   │       ├── wasm.d.ts
│   │   │       └── wasm.js
│   │   ├── schema.prisma.md
│   │   └── schema.prisma
│   └── repositories/
│       ├── shared/
│       │   └── types.ts
│       ├── drums/
│       │   ├── index.ts
│       │   └── queries.ts
│       ├── products/
│       │   ├── index.ts
│       │   └── queries/
│       │       ├── update.ts
│       │       ├── fetch.ts
│       │       └── gradeFilter.ts
│       ├── transactions/
│       │   ├── index.ts
│       │   └── queries.ts
│       ├── orders/
│       │   ├── index.ts
│       │   └── queries.ts
│       └── index.ts
├── app/
│   ├── (routes)/
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── delivery/
│   │   │   └── page.tsx
│   │   ├── terms/
│   │   │   └── page.tsx
│   │   ├── products/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── inventory/
│   │       ├── page.tsx
│   │       ├── transactions/
│   │       │   ├── page.tsx
│   │       │   └── _table.tsx
│   │       └── orders/
│   │           ├── create/
│   │           │   └── page.tsx
│   │           └── page.tsx
│   ├── api/
│   │   ├── products/
│   │   │   ├── fetch/
│   │   │   │   └── route.ts
│   │   │   ├── count/
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   ├── sentry-example-api/
│   │   │   └── route.js
│   │   └── inventory/
│   │       ├── transactions/
│   │       │   └── route.ts
│   │       ├── route.ts
│   │       └── orders/
│   │           └── route.ts
│   ├── global-error.jsx
│   ├── provider.tsx
│   ├── sentry-example-page/
│   │   └── page.jsx
│   ├── providers.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── constants/
│   │   ├── table.ts
│   │   └── template_data.tsx
│   ├── StockTake_24.xlsx
│   ├── hooks/
│   │   └── useDebounce.ts
│   └── utils/
│       ├── chemicalFormula.ts
│       ├── index.ts
│       └── formatters.ts
├── types/
│   ├── content/
│   │   └── index.ts
│   ├── database/
│   │   ├── transactions.ts
│   │   ├── drums.ts
│   │   ├── products.ts
│   │   └── orders.ts
│   └── enums/
│       ├── drums.ts
│       └── products.ts
├── README.md
├── tailwind.config.ts
├── package-lock.json
├── package.json
├── tree_output.txt
└── tree_output.md

71 directories, 170 files
