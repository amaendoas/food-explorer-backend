const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage');

class DishesImageController {
  async update(req, res) {
    const imageFilename = req.file.filename;
    const { id } = req.params;

    console.log(id)

    const diskStorage = new DiskStorage();

    const [dish] = await knex('dishes').where({id});


    if (!dish) {
      throw new AppError('Esse prato não existe', 404);
    }

    if (dish.image) {
      await diskStorage.deleteFile(dish.image);
    }

    const filename = await diskStorage.saveFile(imageFilename);
    dish.image = filename;

    await knex('dishes').where({id}).update(dish)

    return res.json(dish);
  }
}

module.exports = DishesImageController;
