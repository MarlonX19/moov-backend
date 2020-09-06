const connection = require('../database/connection');


module.exports = {

  async store(req, res) {
    const { accepted, delivered, value, observation, from, to, delivered_at, date, user_id, driver_id } = req.body;

    try {
      const response = await connection('delivery').insert({
        accepted,
        delivered,
        value,
        observation,
        from,
        to,
        delivered_at,
        date,
        driver_id,
        user_id
      });
      console.log(response)
      return res.send({ message: "Entrega criada com sucesso", messageCode: "200" })
    }
    catch (error) {
      console.log(error)

      return res.send({ message: "Erro ao criar entrega", messageCode: "500" })
    }
  },

  async listAll(req, res) {

    try {
      const response = await connection('delivery').select("*");
      console.log(response)
      if (response.length > 0) {
        return res.send({ message: 'Entregas registradas na base de dados', messageCode: '200', response: response })
      }
      return res.send({ message: 'Nenhum entrega encontrada na base da dados', messageCode: '404' });
    }
    catch (error) {
      console.log(error)

      return res.send({ message: 'Erro ao buscar entregas na base da dados', messageCode: '500' })
    }
  },

  async listConsult(req, res) {
    const { user_id } = req.body;

    try {
      const response = await connection('consultations')
        .where({ user_id })
        .join('doctors', 'consultations.doctor_id', 'doctors.id')
        .select("consultations.id",
          "consultations.symptons",
          "consultations.isOpen",
          "consultations.time",
          "consultations.date",
          "doctors.first_name",
          "doctors.last_name",
          "doctors.phone",
          "doctors.email",
          "doctors.avatar_path",
        );

      if (response.length > 0) {
        return res.send(response)
      }
      return res.send({ message: 'Nenhum consulta encontrada' });
    }
    catch (error) {
      console.log(error)

      return res.send(error)
    }
  }
}