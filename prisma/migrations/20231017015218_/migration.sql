/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN "categoria" TEXT;
ALTER TABLE "Cliente" ADD COLUMN "cep" TEXT;
ALTER TABLE "Cliente" ADD COLUMN "cnpj" TEXT;
ALTER TABLE "Cliente" ADD COLUMN "cpf" TEXT;
ALTER TABLE "Cliente" ADD COLUMN "dataDeNascimento" DATETIME;
ALTER TABLE "Cliente" ADD COLUMN "dominio" TEXT;
ALTER TABLE "Cliente" ADD COLUMN "email" TEXT;
ALTER TABLE "Cliente" ADD COLUMN "endereco" TEXT;
ALTER TABLE "Cliente" ADD COLUMN "plano" TEXT;
ALTER TABLE "Cliente" ADD COLUMN "tamanhoDaLoja" TEXT;
ALTER TABLE "Cliente" ADD COLUMN "telefone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");
