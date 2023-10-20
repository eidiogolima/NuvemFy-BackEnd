-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT,
    "telefone" TEXT,
    "endereco" TEXT,
    "cep" TEXT,
    "cpf" TEXT,
    "cnpj" TEXT,
    "dataDeNascimento" DATETIME,
    "plano" TEXT,
    "categoria" TEXT,
    "tamanhoDaLoja" TEXT,
    "dominio" TEXT
);
INSERT INTO "new_Cliente" ("categoria", "cep", "cnpj", "cpf", "dataDeNascimento", "dominio", "email", "endereco", "id", "nome", "plano", "senha", "tamanhoDaLoja", "telefone") SELECT "categoria", "cep", "cnpj", "cpf", "dataDeNascimento", "dominio", "email", "endereco", "id", "nome", "plano", "senha", "tamanhoDaLoja", "telefone" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");
CREATE UNIQUE INDEX "Cliente_telefone_key" ON "Cliente"("telefone");
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
