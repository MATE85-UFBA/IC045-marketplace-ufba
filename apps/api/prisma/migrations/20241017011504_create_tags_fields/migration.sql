-- CreateTable
CREATE TABLE "TbUsuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "img" TEXT,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "id_papel" INTEGER NOT NULL,

    CONSTRAINT "TbUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TbTags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TbTags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TbUsuario_email_key" ON "TbUsuario"("email");
