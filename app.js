const express = require('express')
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const app = express()
const PORT = 8081

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.get('/products', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, './data.json'))
    const products = JSON.parse(data)

    res.status(200).json({
      products,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve all products',
    })
  }
})

app.get('/products/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const data = fs.readFileSync(path.join(__dirname, './data.json'))
    const products = JSON.parse(data)

    let product = products.find((product) => product.id === id)

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      })
    }
    res.status(200).json({
      product,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve products',
    })
  }
})

app.use(cors())