const boom = require('@hapi/boom')
const { v4: uuidv4 } = require('uuid');


class ProductService {

  constructor() {
    this.products = []
    this.generate()
  }

  generate() {
    let limit = 100
    for (let index = 0; index < limit; index++) {
      let price = Math.floor(Math.random() * 1000)
      this.products.push({
        id: uuidv4(),
        name: 'producto ' + index,
        price: price,
        image: 'http://placeimg.com/640/480',
        isBlock: price < 500
      })
    }
  }

  async create(data) {
    const newProduct = {
      id: uuidv4(),
      ...data
    }
    this.products.push(newProduct)
    return newProduct
  }

  // async find() {
  //   return this.products
  // }

  find() {
    // let total = this.getTotal()
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products)
      }, 5000)
    })
  }

  async findOne(id) {
    const product = this.products.find(product => product.id === id)
    if (!product) {
      throw boom.notFound('product not found')
    }
    if (product.isBlock) {
      throw boom.conflict('product is block')
    }
    return product
  }

  async update(id, data) {
    const index = this.products.findIndex(product => product.id === id)
    if (index === -1) {
      throw boom.notFound('product not found')
    }
    const product = this.products[index]
    this.products[index] = {
      id,
      ...product,
      ...data
    }
    return this.products[index]
  }

  async delete(id) {
    const index = this.products.findIndex(product => product.id === id)
    if (index === -1) {
      throw boom.notFound('product not found')
    }
    this.products.splice(index, 1)
    return { id }
  }
}

module.exports = ProductService
