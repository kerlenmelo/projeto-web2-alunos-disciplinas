const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET = 'secretoParaJWT';

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        success: false,
        message: 'Email e senha são obrigatórios.',
      });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.compareSenha(senha))) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas.',
      });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET, {
      expiresIn: '2h',
    });

    return res.json({ success: true, token });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Erro interno no login.',
      error: err.message,
    });
  }
};
