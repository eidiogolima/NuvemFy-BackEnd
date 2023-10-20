const { express, prisma, bcrypt, Router, router, passport, jwt } = require('../../modules/config.ts');
// Rota para autenticação de usuários
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        // Procura o cliente no banco de dados com base no nome fornecido
        const cliente = await prisma.cliente.findUnique({
            where: {
                email,
            },
        });
        // Verifica se o cliente foi encontrado
        if (!cliente) {
            return res.status(401).json({ error: 'E-mail do usuário ou senha inválidos.' });
        }
        // Compara a senha fornecida com a senha armazenada no banco de dados
        const senhaCorreta = await bcrypt.compare(senha, cliente.senha);
        // Se a senha não corresponder, retorna um erro de autenticação
        if (!senhaCorreta) {
            return res.status(401).json({ error: 'E-mail do usuário ou senha inválidos.' });
        }
        // Cria um token JWT se a autenticação for bem-sucedida
        const token = jwt.sign({ userId: cliente.id }, process.env.MY_SECRETKEY, {
            expiresIn: '1h', // Token expira em 1 hora
        });
        // Retorna o token JWT para o cliente
        res.json({ token });
    }
    catch (error) {
        // Captura e trata erros durante o processo de autenticação
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer login.' });
    }
});
module.exports = router;
