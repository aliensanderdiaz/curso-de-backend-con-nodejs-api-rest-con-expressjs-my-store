const ProductService = require('./../services/product.service')
const validatorHandler = require('./../middlewares/validator.handler')
const { createProductSchema, getProductSchema, updateProductSchema } = require('./../schemas/product.schema')
const expres = require('express')

const router = expres.Router()
const service = new ProductService()


router.get('/', async (req, res, next) => {

  try {
    const products = await service.find()

    res.json(products)
  } catch (error) {
    next(error)
  }

})


router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await service.findOne(id)

      return res.json(product)
    } catch (error) {
      next(error)
    }
  })

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
  const body = req.body
  const newProduct = await service.create(body)
  res.json(newProduct)
})

router.put('/:id',
validatorHandler(getProductSchema, 'params'),
validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const updateProduct = await service.update(id, body)
    res.json(updateProduct)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const idDelete = await service.delete(id)
    return res.json(idDelete)
  } catch (error) {
    next(error)
  }
})


module.exports = router
