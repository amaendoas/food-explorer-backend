const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class DishesController {
  async create(req, res) {
    const { name, description, price, ingredients } = req.body;
    const user_id = req.user.id;

    const [adm] = await knex('users').where({id: user_id});

    if(adm.email !== 'adm@foodexplorer.com') {
      throw new AppError('Você não está autorizado a criar um prato, faça o login como adm!', 401)
    }

    if(!name) {
      throw new AppError("Escolha um nome para o prato!")
    }
    if(!description) {
      throw new AppError("Adicione uma descrição.")
    }
    if(!price) {
      throw new AppError("o preço é obrigatório!")
    }

    try {
      const dish_id = await knex("dishes").insert({
        name,
        description,
        price
      })

      const IngredientsInsert = ingredients.map(ingredient => {
        return {
          name: ingredient,
          dish_id
        }
      })

      await knex("ingredients").insert(IngredientsInsert)

    } catch {
      throw new AppError("Não foi possível cadastrar!")
    }

    return res.json()
  }

  async show(req, res) {
    const { id } = req.params;
    const [dish] = await knex('dishes').where({id});

    if(!dish) {
      throw new AppError("Prato não encontrado!")
    };

    return res.json(dish)
  }

  async index(req, res) {
    const [dishes] = await knex('dishes');

    if(!dishes) {
      throw new AppError("Nenhum prato cadastrado!")
    };

    return res.json(dishes)
  }

  async update(req, res) {
    const { name, description, price, ingredients } = req.body;
    const { id } = req.params;
    const user_id = req.user.id;

    const [dishes] = await knex('dishes').where({id});
    
    if(!dishes) {
      throw new AppError('Prato não encontrado')
    }
    
    const [adm] = await knex('users').where({id: user_id});

    if(adm.email !== 'adm@foodexplorer.com') {
      throw new AppError('Você não está autorizado a atualizar esse prato, faça o login como adm!', 401)
    }
    
    try {
      await knex("dishes").update({
        name,
        description,
        price
      }).where({id})

      await knex("ingredients").where({dish_id: id}).del()

      const IngredientsUpdate = ingredients.map(ingredient => {
        return {
          name: ingredient,
          dish_id: id
        }
      })

      await knex("ingredients").insert(IngredientsUpdate).where({dish_id: id})

    } catch {
      throw new AppError("Não foi possível atualizar!")
    }

    return res.json()
  }

  async delete(req, res) {
    const { id } = req.params;
    const user_id = req.user.id;
    const [dishes] = await knex('dishes').where({id});
    
    if(!dishes) {
      throw new AppError('Prato não encontrado')
    }
    
    const [adm] = await knex('users').where({id: user_id});

    if(adm.email !== 'adm@foodexplorer.com') {
      throw new AppError('Você não está autorizado a deletar esse prato, faça o login como adm!', 401)
    }

    try {
      await knex('dishes').where({id}).delete();

      await knex('ingredients').where({dish_id: id}).delete();
      
    } catch {
      throw new AppError("Não foi possível deletar!")
    }


    return res.json()
  }
}

module.exports = DishesController