const { express, prisma, bcrypt, Router, router, jwt } = require('../../modules/config.ts'); 

// require("dotenv-safe").config();

async function verificaToken(req, res, next) {
  const token = await req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  jwt.verify(token, process.env.MY_SECRETKEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido.' });
    }
    req.user = user;
   
     next();
  });
}

router.post('/recurso_protegido', verificaToken, (req, res) => {
  res.send('Este é um recurso protegido.');
});


/* Puxa o usuário */
router.get('/all', async (req, res)=>{
  const clientes = await prisma.cliente.findMany();
  res.json(clientes);
})


/* Criar usuário */
router.post('/create', async (req, res) => {
  const { nome,email, senha, isAdmin } = req.body;

  try {
    const saltRounds = 10;
    const hashedSenha = await bcrypt.hash(senha, saltRounds); 
    const cliente = await prisma.cliente.create({
      data: {
        nome,
        email,
        isAdmin,
        senha: hashedSenha,
      },
    });
    res.status(201).json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
});

/* Apagar o usuário */
router.delete('/delete', verificaToken, async (req, res) => {
  const { userId } = req.user; // Obtém o ID do usuário autenticado a partir do token JWT

  try {

    const user = await prisma.cliente.findUnique({
      where: {
        id: userId,
      }
    })

    const isAdmin = user.isAdmin 
    console.log("isAdmin:",isAdmin, user)
    // Verificar se o usuário é um admin ou está tentando excluir o próprio perfil
    if (isAdmin) {
      const cliente = await prisma.cliente.delete({
        where: {
          id: userId, // Usa o ID do usuário autenticado
        },
      });
      res.status(200).json("Usuário excluido");
    } else {
      res.status(403).json({ error: 'Acesso negado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir o usuário.' });
  }
});

/* Atualizar o Usuário */
router.put('/atualizar/:clienteId', async (req, res) => {
  const { nome, email, senha } = req.body;
  const { clienteId } = req.params;

  try {
    const saltRounds = 10;
    const hashedSenha = await bcrypt.hash(senha, saltRounds);

    const cliente = await prisma.cliente.update({
      where: {
        id: parseInt(clienteId), // Supondo que o clienteId seja um número inteiro
      },
      data: {
        nome,
        email,
        senha: hashedSenha,
      },
    });

    res.status(200).json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
});


module.exports = router
