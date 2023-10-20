-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "linkYoutube" TEXT,
    "estoque" INTEGER NOT NULL,
    "categoria" TEXT NOT NULL,
    "clienteId" INTEGER NOT NULL,
    CONSTRAINT "Produto_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Produto" ("categoria", "clienteId", "descricao", "estoque", "id", "imagem", "linkYoutube", "nome", "preco") SELECT "categoria", "clienteId", "descricao", "estoque", "id", "imagem", "linkYoutube", "nome", "preco" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
