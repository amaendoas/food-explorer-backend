const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class OrdersController {
  async create(req, res) {
    const user_id = req.user.id
    const data = req.body

    for (let index = 0; index < data.length; index++) {
      const existsDish = await knex('dishes').where({ id: data[index].dish_id});
      if(existsDish.length === 0) {
        throw new AppError('Prato não encontrado!')
      }
    }
    
    const [user] = await knex('users').where({ id: user_id })

    if (data.length === 0) {
      throw new AppError('Escolha um prato para fazer o pedido.')
    }

    if (!user) {
      throw new AppError('Crie um usuário para fazer o pedido.')
    }

    if (user.isAdmin) {
      throw new AppError(
        'Você não pode fazer um pedido como administrador, por favor entre em outra conta'
      )
    }

    let orderCode = 1

    const orders = await knex('orders').orderBy('code', 'asc')

    if (orders.length !== 0) {
      const lastOrderCode = orders[orders.length - 1]
      orderCode = lastOrderCode.code
    }

    const codeExists = await knex('orders').where({
      code: orderCode
    })

    if (codeExists.length !== 0) {
      orderCode += 1
    }

    const dishes = data.map(dish => {
      return {
        code: orderCode,
        status: 'pendente',
        created_at: knex.fn.now(),
        user_id,
        dish_id: dish.dish_id,
        dish_quant: dish.dish_quant
      }
    })
    
    await knex('orders').insert(dishes)

    return res.json()
  }

  async index(req, res) {
    const orders = await knex('orders')
    return res.json(orders)
  }

  async show(req,res) {
    const { id } = req.params
    const user_id = req.user.id
    const orders = await knex('orders').where({ user_id: id})

    const [user] = await knex('users').where({ id: user_id })

    if(Number(user_id) !== Number(id) && !user.isAdmin) {
      throw new AppError('Usuário não autorizado')
    }

    return res.json(orders)
  }

  async updateStatus(req, res) {
    const { code } = req.params
    const { status } = req.body

    const [order] = await knex('orders').where({ code })

    if (!order) {
      throw new AppError('Pedido não encontrado')
    }

    await knex('orders').update({ status }).where({
      code
    })


    return res.json()
  }

  async update(req, res) {
    const { code } = req.params
    const { dishes_id } = req.body
    const user_id = req.user.id

    const [orders] = await knex('orders').where({ code })

    if (!orders) {
      throw new AppError('Pedido não encontrado')
    }

    const dishes = dishes_id.map(dish => {
      return {
        code,
        status: orders.status,
        created_at: orders.created_at,
        user_id: orders.user_id,
        dishes_id: dish
      }
    })

      await knex('orders').where({ code }).delete()
      await knex('orders').insert(dishes)
      await knex('orders')

    return res.json()
  }

  async delete(req, res) {
    const { code } = req.params

    const [orders] = await knex('orders').where({ code })

    if (!orders) {
      throw new AppError('Pedido não encontrado')
    }
    await knex('orders')
      .where({
        code
      })
      .delete()

    return res.json()
  }
}

module.exports = OrdersController
