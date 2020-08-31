const connection = require('../database/connection');
const crypto = require('crypto');
const mailer = require('../modules/mailer');


module.exports = {
  async Login(req, res) {
    const { email, password } = req.body;

    try {
      const response = await connection('users').where({
        email,
        password
      }).select('users.first_name', 'users.phone', 'users.last_name', 'users.id', 'users.email', 'users.avatar_path', 'push_id')

      if (response.length > 0) {
        return res.status(200).send(response)
      }

      return res.status(404).send({ message: 'Usuário não encontrado', response: response })

    }
    catch (error) {

      return res.send(error)
    }
  },


  async checkEmail(req, res) {
    const { email } = req.body;

    try {
      const response = await connection('users').where({
        email
      }).select('users.email')

      console.log(response+'haha')

      if (response.length > 0) {
        return res.status(200).send({ message: `O email já está em uso`, response: response })
      }

      return res.status(404).send();

    }
    catch (error) {

      return res.send(error)
    }
  },


  async forgot(req, res) {
    const { email } = req.body;

    const user_data = await connection('users').where({
      email
    }).select('*')


    console.log(user_data)

    if (!user_data) {
      return res.status(403).json({ error: 'Email informado inexistente' })
    }

    console.log(user_data)

    const token = crypto.randomBytes(20).toString('hex');
    const now = new Date();

    now.setHours(now.getHours() + 1);

    const recovery_status = await connection('users')
      .where('id', 1) //hardcoded, replace paramenter for user_data.id
      .update({
        passwordResetToken: token,
        passwordResetExpires: now
      })

    if (!recovery_status) {
      return res.status(500).json({ error: 'Erro ao gerar token' })
    }

    mailer.sendMail({
      to: 'marlon.englemam@gmail.com',
      from: 'xyxyxy19@protonmail.com',
      subject: "Recuperação de senha | Portfolio",
      template: 'auth/forgot_password',
      context: { token },
    }, (err) => {
      if (err) {
        return res.status(400).send({ error: 'Erro ao enviar email de recuperação' })
      }
    })

    return res.status(200).json({ message: 'Token de segurança gerado e enviado ao seu email' })

  },


}