const { express, prisma, bcrypt, Router, router, jwt } = require('../../modules/config.ts');
/* Puxar produtos de um cliente */
router.get('/all/:clienteId', async (req, res) => {
    const clienteId = parseInt(req.params.clienteId);
    try {
        // Verifique se o cliente existe
        const cliente = await prisma.cliente.findUnique({
            where: {
                id: clienteId,
            },
        });
        if (!cliente) {
            return res.status(404).json({ erro: 'Cliente não encontrado' });
        }
        // Consulte os produtos associados a esse cliente
        const produtos = await prisma.produto.findMany({
            where: {
                clienteId: clienteId,
            },
        });
        res.status(200).json(produtos);
    }
    catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao obter produtos do cliente' });
    }
});
/* Criar Produtos */
router.post('/create/:clienteId/', async (req, res) => {
    const { nome, preco, descricao, imagem, linkYoutube, estoque, categoria } = req.body;
    const clienteId = parseInt(req.params.clienteId);
    try {
        // Verifique se o cliente existe
        const cliente = await prisma.cliente.findUnique({
            where: {
                id: clienteId,
            },
        });
        if (!cliente) {
            return res.status(404).json({ erro: 'Cliente não encontrado' });
        }
        // Crie um novo produto associado ao cliente
        const produto = await prisma.produto.create({
            data: {
                nome,
                preco,
                descricao,
                imagem,
                linkYoutube,
                estoque,
                categoria,
                clienteId: clienteId, // Associe o produto ao cliente usando o ID do cliente
            },
        });
        res.status(201).json(produto);
    }
    catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao criar produto' });
    }
});
module.exports = router;
