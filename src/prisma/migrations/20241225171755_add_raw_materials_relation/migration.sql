-- CreateTable
CREATE TABLE "bottle_sizes" (
    "id" SERIAL NOT NULL,
    "volume" VARCHAR(10) NOT NULL,

    CONSTRAINT "bottle_sizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chemical_groups" (
    "group_id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "chemical_groups_pkey" PRIMARY KEY ("group_id")
);

-- CreateTable
CREATE TABLE "product_prices" (
    "product_id" INTEGER NOT NULL,
    "bottle_size_id" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "product_prices_pkey" PRIMARY KEY ("product_id","bottle_size_id")
);

-- CreateTable
CREATE TABLE "products" (
    "product_id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "sku" VARCHAR(20) NOT NULL,
    "raw_material_id" INTEGER,
    "grade" VARCHAR(10) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "raw_materials" (
    "raw_material_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "cas_number" VARCHAR(20) NOT NULL,
    "chemical_group" VARCHAR(50) DEFAULT 'Hydrocarbon',
    "description" VARCHAR(150),
    "un_code" CHAR(4),
    "flash_point" INTEGER,

    CONSTRAINT "raw_materials_pkey" PRIMARY KEY ("raw_material_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_sku_key" ON "products"("sku");

-- AddForeignKey
ALTER TABLE "product_prices" ADD CONSTRAINT "fk_bottle_size" FOREIGN KEY ("bottle_size_id") REFERENCES "bottle_sizes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_prices" ADD CONSTRAINT "fk_product" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "fk_raw_material" FOREIGN KEY ("raw_material_id") REFERENCES "raw_materials"("raw_material_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
