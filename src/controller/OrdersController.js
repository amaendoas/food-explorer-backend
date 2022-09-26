const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class OrdersController {
  async create(req, res) {
    const { id } = req.params;
    const { dish_id } = req.body;

    const user = await knex('users').where({id})

    if(!dish_id) {
      throw new AppError("Escolha um prato para fazer o pedido.")
    }

    if(user.length === 0) {
      throw new AppError("Crie um usuário para fazer o pedido.")
    }

    let orderCode = 1;

    const orders = await knex('orders')

    if(orders.length !== 0) {
      const lastOrderCode = orders[orders.length-1]
      console.log(lastOrderCode)
      orderCode = lastOrderCode.code
    }

    const codeExists = await knex('orders').where({
      code: orderCode
    })

    if(codeExists.length !== 0) {
      orderCode+= 1
    }

    const dishes = dish_id.map(dish => {
      return {
        code: orderCode,
        status: "pendente",
        created_at: knex.fn.now(),
        user_id: id,
        dishes_id: dish,
      }
    })

    try {
      await knex('orders').insert(dishes)
    } catch {
      throw new AppError("Não foi possível fazer o seu pedido.")
    }

    return res.json()
  }

  async updateStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    try {
        await knex('orders').update({status}).where({
          code: id
        })
    } catch {
      throw new AppError("Não foi possível fazer o update")
    }

    return res.json()
  }

  async update(req,res) {
    const { id } = req.params;
    const { dishes_id } = req.body;

    const [orders] = await knex('orders').where({code: id})

    const dishes = dishes_id.map(dish => {
      return {
        code: id,
        status: orders.status,
        created_at: orders.created_at,
        user_id: orders.user_id,
        dishes_id: dish,
      }
    })


    try {
      await knex('orders').where({code: id}).delete()
      await knex('orders').insert(dishes)
    } catch {
      throw new AppError("Não foi possível fazer o update.")
    }

    return res.json()
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      await knex('orders').where({
        code: id
      }).delete()
    } catch {
      throw new AppError("Não foi possível deletar")
    }

    return res.json()

  }
}

module.exports = OrdersController
