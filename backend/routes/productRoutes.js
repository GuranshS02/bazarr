const express = require('express')
const Product = require('../models/Products')
const {protect, admin} = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', protect, admin, async (req, res) => {
    try{
        const{title, description, price, discountPrice, countInStock, category, brand, sizes, colors, collection, material, gender, images, isFeatured, isPublished, tags, dimensions, weight, sku}= req.body
        const product = new Product({title, description, price, discountPrice, countInStock, category, brand, sizes, colors, collection, material, gender, images, isFeatured, isPublished, isFastSelling, tags, dimensions, weight, sku,
            user: req.user._id
        })

        const createdProduct = await product.save()
        res.status(201).json(createdProduct)
    } catch (error){
        console.error(error)
        res.status(500).send("Server Error")
    }
})

router.put('/:id', protect, admin, async (req, res) => {
    try{
        const{title, description, price, discountPrice, countInStock, category, brand, sizes, colors, collection, material, gender, images, isFeatured, isPublished, isFastSelling, tags, dimensions, weight, sku}= req.body

        const product = await Product.findById(req.params.id)

        if(product) {
            product.title = title || product.title
            product.description = description || product.description
            product.price = price || product.price
            product.discountPrice = discountPrice || product.discountPrice
            product.countInStock = countInStock || product.countInStock
            product.category = category || product.category
            product.brand = brand || product.brand
            product.sizes = sizes || product.sizes
            product.colors = colors || product.colors
            product.collection = collection || product.collection
            product.material = material || product.material
            product.gender = gender || product.gender
            product.images = images || product.images
            product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured
            product.isPublished = isPublished !== undefined ? isPublished : product.isPublished
            product.isFastSelling = isFastSelling !== undefined ? isFastSelling : product.isFastSelling;
            product.tags = tags || product.tags
            product.dimensions = dimensions || product.dimensions
            product.weight = weight || product.weight
            product.sku = sku || product.sku

            const updatedProduct = await product.save()
            res.json(updatedProduct)
        } else {
            res.status(404).json({message: "Product not found"})
        }
    } catch(error){
        console.error(error)
        res.status(500).send("Server Error")
    }
})

router.delete('/:id', protect, admin, async (req, res) => {
    try{
        const product = await Product.findById(req.params.id)
        if(product){
            await product.deleteOne()
            res.json({message: "Product removed"})
        } else {
            res.status(404).json({message: "Product not found"})
        }
    } catch(error){
        console.error(error)
        res.status(500).send("Server Error")
    }

})

router.get('/', async (req, res) => {
    try{
        const {collection, size, color, sortBy, category, brand, gender, limit, maxPrice, minPrice, search, material} = req.query
        let query = {}

        if(collection && collection.toLocaleLowerCase() !== 'all') {
            query.collection = collection
        }

        if(category && category.toLocaleLowerCase() !== 'all') {
            query.category = category
        }

        if(material) {
            query.material= {$in: material.split(',')}
        }

        if(brand) {
            query.brand= {$in: brand.split(',')}
        }

        if(size) {
            query.sizes= {$in: size.split(',')}
        }

        if(color) {
            query.colors= {$in: [color]}
        }

        if(gender) {
            query.gender= gender
        }

        if(minPrice || maxPrice) {
            query.price={}
            if(minPrice) query.price.$gte = Number(minPrice)
            if(maxPrice) query.price.$lte = Number(maxPrice)
        }

        if(search) {
            query.$or = [
                {title: {$regex: search, $options: "i"}},
                {description: {$regex: search, $options: "i"}},
                { brand: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } }
            ]
        }

        let sort = {}
        if(sortBy) {
            switch(sortBy) {
                case "priceAsc":
                    sort = {price: 1}
                    break
                case "PriceDesc":
                    sort = {price: -1}
                    break
                case "popularity":
                    sort = {rating: -1}
                    break
                default:
                    break  
            }
        }

        let products = await Product.find(query)
        .sort(sort)
        .limit(Number(limit) || 0)
        res.json(products)
    } catch(error) {
        console.error(error)
        res.status(500).send("Server Error")
    }
})

// Return all products for featured
router.get('/featured', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


router.get('/best-seller', async(req, res) => {
    try {
        const bestSeller = await Product.findOne().sort({rating: -1})
        if(bestSeller) {
            res.json(bestSeller)
        } else{
            res.status(400).json({message: "No best seller found"})
        }
    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
    }
})

router.get('/new-arrivals', async(req, res) => {
    try {
        const newArrivals = await Product.find().sort({createdAt: -1}).limit(8)
        res.json(newArrivals)
    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
    }
})

router.get('/similar/:id', async(req, res) => {
    const {id} = req.params
    
    try {
        const product = await Product.findById(id)

        if(!product) {
            return res.status(400).json({message: "Product Not Found"})
        }

        const similarProducts = await Product.find({
            _id: {$ne: id},
            gender: product.gender,
            category: product.category
        }).limit(4)

        res.json(similarProducts)
    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
    }
})

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if(product) {
            res.json(product)
        } else{
            res.status(400).json({message: "Product Not Found"})
        }
    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
    }
})


module.exports = router

