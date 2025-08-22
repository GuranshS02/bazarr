const express = require('express')
const Cart = require('../models/cart')
const Product = require('../models/Products')
const {protect} = require('../middleware/authMiddleware')

const router = express.Router()

const getCart = async(userId, guestId) => {
    if(userId){
        return await Cart.findOne({user: userId})
    } else if(guestId){
        return await Cart.findOne({guestId})
    }
    return null
}

router.post('/', async (req, res) => {
    const {productId, size, color, quantity, guestId, userId} = req.body
    try{
        const product = await Product.findById(productId)
        if(!product) return res.status(404).json({message: "Product not found"})

     let cart = await getCart(userId, guestId)

     if(cart){
        const productIndex = cart.products.findIndex(
            (p) =>
                p.productId.toString() === productId &&
            p.size === size &&
            p.color === color
        )

        if(productIndex > -1){
            cart.products[productIndex].quantity += quantity
        } else{
            cart.products.push({
                productId,
                title: product.title,
                image: product.images[0].url,
                price: product.price,
                size,
                color,
                quantity
            })
        }
        cart.totalPrice = cart.products.reduce((acc, item) => {
            const price = typeof item.price === 'number' ? item.price :  0
            const quantity = typeof item.quantity === 'number' ? item.quantity : 1
            return acc + price * quantity 
        },0)
        await cart.save()
        return res.status(200).json(cart)
     } else{
        const safePrice = typeof product.price === 'number' ? product.price : 0
        const safeQuantity = typeof quantity === 'number' ? quantity : 1
        const newCart = await Cart.create({
            user: userId ? userId : undefined,
            guestId: guestId ? guestId : "guest_" + new Date().getTime(),
            products: [
                {
                    productId,
                    title: product.title,
                    image: product.images[0].url,
                    price: safePrice,
                    size,
                    color,
                    quantity: safeQuantity
                }
            ], 
            totalPrice: safePrice * safeQuantity
        })
        return res.status(201).json(newCart)
     }
    } catch(error){
        console.error(error)
        res.status(500).json({message: "Server Error"})
    }
})

router.put('/', async (req, res) => {
    const {productId, quantity, size, color, userId, guestId } = req.body

    try{
        let cart = await getCart(userId, guestId)
        if(!cart) return res.status(404).json({message: "Cart not found"})

            const productIndex = cart.products.findIndex(
                (p) => 
                    p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
            )
            if(productIndex > -1){
                if(quantity > 0){
                cart.products[productIndex].quantity = Number(quantity)
            } else{
                cart.products.splice(productIndex, 1)
            }
            cart.totalPrice = cart.products.reduce((acc, item) => {
                 const price = typeof item.price === 'number' ? item.price : 0
                 const quantity = typeof item.quantity === 'number' ? item.quantity : 1
            return acc + price * quantity
            }, 0)
            await cart.save()
            return res.status(200).json(cart)
        } else{
            return res.status(404).json({message: "Product not found in cart"})
        }
    } catch(error){
        console.error(error)
        res.status(500).json({message:"Server Error"})
    }
})

router.delete('/', async (req, res) => {
    const {productId, size, color, userId, guestId} = req.body

    try{
        let cart = await getCart(userId, guestId)
         if(!cart) return res.status(404).json({message: "Cart not found"})

             const productIndex = cart.products.findIndex(
                (p) => 
                    p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
            )
            if(productIndex > -1){
                cart.products.splice(productIndex, 1)

                cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity, 0
                )
                await cart.save()
                return res.status(200).json(cart)
            } else{
                return res.status(404).json({message: "Product is not found"})
            }   
    } catch(error){
        console.error(error)
        res.status(500).json({message:"Server Error"})
    }
})

router.get('/', async (req, res) => {
    const {userId, guestId} = req.query

    try{
        const cart = await getCart(userId, guestId)
        if(cart){
            res.json(cart)
        } else{
            res.status(404).json({message: "Cart not found"})
        }
    } catch(error){
        console.error(error)
        res.status(500).json({message: "Server Error"})
    }
})

router.post('/merge', protect, async (req,res) => {
    const{guestId} = req.body

    try{
        const guestCart = await Cart.findOne({guestId})
        const userCart = await Cart.findOne({user: req.user._id})

            if(guestCart){
                if(guestCart.products.length === 0){
                    return res.status(400).json({message: "Guest cart is empty"})
                }
                if(userCart){
                    guestCart.products.forEach((guestItem) => {
                        const productIndex = userCart.products.findIndex(
                            (item) =>
                                item.productId.toString() === guestItem.productId.toString() &&
                            item.size === guestItem.size &&
                            item.color === guestItem.color
                        )
                        if(productIndex > -1){
                            userCart.products[productIndex].quantity += guestItem.quantity
                        } else{
                            userCart.products.push(guestItem)
                        }
                    })

                    userCart.totalPrice = userCart.products.reduce(
                        (acc, item) => acc + item.price * item.quantity,0
                    )
                    await userCart.save()

                    try{
                        await Cart.findOneAndDelete({guestId})
                    } catch(error){
                       console.error("Error deleting guest cart:", error) 
                    }
                    res.status(200).json(userCart)
                } else{
                    guestCart.user = req.user._id
                    guestCart.guestId = undefined
                    await guestCart.save()

                    res.status(200).json(guestCart)
                }
            } else{
                if(userCart){
                    return res.status(200).json(userCart)
                }
                res.status(404).json({message: "Guest cart not found"})
            }
    } catch(error){
        console.error(error)
        res.status(500).json({message: "Server Error"})
    }
})
module.exports = router