const connection = require('../database/connection');

module.exports = {
  async store(req, res) {
    const { filename } = req.file;
    const { first_name, last_name, email, password, phone, document, number_starts, push_id } = req.body;

    const checkEmail = await connection('users').where({
      email
    }).select('users.email')

    if (checkEmail.length > 0) {
      return res.status(422).send({ message: `O email já está em uso`, data: checkEmail })
    }

    try {
      const response = await connection('users').insert({
        first_name,
        last_name,
        email,
        phone,
        document,
        number_starts,
        push_id,
        password,
        avatar_path: filename
      })

      console.log(response)
      return res.send(response);

    }
    catch (error) {
      console.log(error)
      return res.send(error)
    }
  },

  async listAll(req, res) {

    try {
      const response = await connection('users').select('*');
      return res.send(response);
    }
    catch (error) {
      return res.send(error)
    }
  },

  async listData(req, res) {
    const { user_id } = req.body;

    try {
      const response = await connection('users').where({ id: user_id }).select('*');
      if (response.length > 0) {
        return res.send(response);
      }
      return res.send({ message: 'Usuário não encontrado' });
    }
    catch (error) {
      return res.send(error)
    }


  },

  async updateUser(req, res) {
    const { userData } = req.body;

    console.log(userData)

    try {
      const response = await connection('users').where({ id: userData.id }).update(userData);

      console.log(response)
      if (response === 1) {
        const newData = await connection('users').where({ id: userData.id }).select('*');

        return res.send(newData);

      }
      return res.send({ message: 'Erro ao atualizar dados' });
    }
    catch (error) {
      return res.send(error)
    }

  },


  async updateUserPhoto(req, res) {
    const { filename } = req.file;
    const { id } = req.body;

    console.log(id);

    try {
      const response = await connection('users').where({ id: id }).update({ avatar_path: filename });

      console.log(response)
      if (response === 1) {
        const newData = await connection('users').where({ id: id }).select('*');

        return res.send(newData);

      }
      return res.send({ message: 'Erro ao atualizar dados' });
    }
    catch (error) {
      return res.send(error)
    }

  },
}