const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class OrdersController {
  async create(req, res) {
    const user_id = req.user.id
    const { dish_id } = req.body

    const [user] = await knex('users').where({ id: user_id })

    if (!dish_id) {
      throw new AppError('Escolha um prato para fazer o pedido.')
    }

    if (!user) {
      throw new AppError('Crie um usuário para fazer o pedido.')
    }

    if (user.email === 'adm@foodexplorer.com') {
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

    const dishes = dish_id.map(dish => {
      return {
        code: orderCode,
        status: 'pendente',
        created_at: knex.fn.now(),
        user_id,
        dishes_id: dish
      }
    })

    try {
      await knex('orders').insert(dishes)
    } catch {
      throw new AppError('Não foi possível fazer o seu pedido.')
    }

    return res.json()
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

    try {
      await knex('orders').where({ code }).delete()
      await knex('orders').insert(dishes)
      await knex('orders')
    } catch {
      throw new AppError('Não foi possível fazer o update.')
    }

    return res.json()
  }

  async delete(req, res) {
    const { code } = req.params

    const [orders] = await knex('orders').where({ code })

    if (!orders) {
      throw new AppError('Pedido não encontrado')
    }

    try {
      await knex('orders')
        .where({
          code
        })
        .delete()
    } catch {
      throw new AppError('Não foi possível deletar')
    }

    return res.json()
  }
}

module.exports = OrdersController
