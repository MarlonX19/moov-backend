const connection = require('../database/connection');
const axios = require('axios');

const { ONE_SIGNAL_APP_ID } = require('../constants/index');

console.log(ONE_SIGNAL_APP_ID);


module.exports = {

  async store(req, res) {
    const { accepted, delivered, value,
      observation, fromLatitude, fromLongitude, toLatitude, toLongitude,
      delivered_at, date, user_id,
      driver_id, fromTown, toTown } = req.body;

    try {
      const response = await connection('delivery').insert({
        accepted,
        delivered,
        value,
        observation,
        fromLatitude,
        fromLongitude,
        toLatitude,
        toLongitude,
        fromTown,
        toTown,
        delivered_at,
        date,
        driver_id,
        user_id
      });
      // console.log(response);

      if (accepted) {
        const push = await connection('users')
          .where({ id: user_id })
          .select("push_id");

        axios.post('https://onesignal.com/api/v1/notifications', {
            "app_id": ONE_SIGNAL_APP_ID,
            "include_player_ids": [push[0].push_id],
            "data": {"foo": "conteúdo"},
            "contents": {"en": "O carreteiro aceitou a proposta"}
        }).then(response => {
          console.log(response.data)
        }).catch(error => {
          console.log(error)
        })
      }

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

  async listDelivery(req, res) {
    const { user_id, type } = req.body;
    console.log(user_id, type)
    //in this context user_id can be both driver id and ordinary user id

    let tableId = '';
    if (type === 'users') {
      tableId = 'user';
    } else {
      tableId = 'driver';
    }


    try {
      const response = await connection('delivery')
        .where(`${tableId}_id`, `${user_id}`)
        .join(type, `delivery.${tableId}_id`, `${type}.id`)
        .select("*");

      if (response.length > 0) {

        return res.send({ message: 'Entregas encontradas', messageCode: '200', response: response })
      }
      return res.send({ message: 'Nenhum entrega encontrada', messageCode: '404' });
    }
    catch (error) {
      console.log(error)
      return res.send({ message: 'Erro ao consultar entregas', messageCode: '505' })
    }
  }
}