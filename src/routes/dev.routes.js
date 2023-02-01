
const { Router } = require('express')

const devRoutes = Router()

devRoutes.get('/', (req, res) => {
  return res.json({
    message: "Success"
  })
})

module.exports = devRoutes