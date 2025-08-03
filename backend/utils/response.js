exports.success = (res, data, message = 'Operação realizada com sucesso') => {
  return res.status(200).json({ success: true, data, message });
};

exports.error = (res, status = 500, message = 'Erro interno', error = '') => {
  return res.status(status).json({ success: false, message, error });
};