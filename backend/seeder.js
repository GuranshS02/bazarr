const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Product = require ('./models/Products')
const User = require('./models/User')
const Cart = require('./models/cart')
const products = require('./data/products')

dotenv.config()

mongoose.connect(process.env.MONGO_URI)

const seedData = async () => {
    try{
        await Product.deleteMany()
        await User.deleteMany()
        await Cart.deleteMany()
        
        const createdUser = await User.create({
            firstName: 'Admin',
            lastName: 'User',
            dob: new Date('1990-01-01'),
            interestedIn: 'Unisex',
            email: 'admin@example.com',
            password: '123456',
            role: 'admin'
        })

        const userId = createdUser._id
        const sampleProducts = products.map((product) => {
            return {...product, user: userId}
        })
        await Product.insertMany(sampleProducts)

        console.log('Product data seeded successfully')
        process.exit()
    } catch(error) {
        console.error('Error seeding the data:', error)
        process.exit(1)
    }
}

seedData()