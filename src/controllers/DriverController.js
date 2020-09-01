const connection = require('../database/connection');

module.exports = {

  //insert
  async store(req, res) {
    const { filename } = req.file;
    const { first_name, last_name, email, password, phone, document, number_stars, push_id } = req.body;

    try {
      const response = await connection('drivers').insert({
        first_name,
        last_name,
        email,
        phone,
        document,
        number_stars,
        push_id,
        password,
        avatar_path: filename
      });

      console.log(response)

      return res.send(response);

    }
    catch (error) {
      return res.send(error)
    }
  },

  async listAll(req, res) {

    try {
      const response = await connection('drivers').select('*');
      return res.send({ response: response });
    }
    catch (error) {
      return res.send(error)
    }
  },

  async listData(req, res) {
    const { driver_id } = req.body;

    try {
      const response = await connection('drivers').where({ id: driver_id }).select('*');
      if (response.length > 0) {
        return res.send(response);
      }
      return res.send({ message: 'Motorista não encontrado' });
    }
    catch (error) {
      return res.send(error)
    }

  },

}