const fs = require('node:fs')

class CartsManagerFile {
    constructor(){
        this.path = './src/mockDB/Carts.json'
    }

    readFile = async () => {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            console.log(data)
            return JSON.parse(data)
        } catch (error) {
            return []
        }
    }
 //obtener carrito por id
    getCartById = async (cid) => {
        const carts = await this.readFile()
        const cart = carts.find (cart => cart.id === cid)
        if (!cart){
            return 'no se encuentra el carrito'
        }
        return cart
    }
 //crear carrito
    createCart = async () => {
        const carts = this.readFile()
        let newCart
        if(carts.length === 0){
            newCart  = {id: 1, products:  []}
        } else {
            newCart  = {id: carts.length + 1, products:  []}
        }
        carts.push(newCart)
        const results = await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2),'utf-8')
        return results
    }
 //agregar producto al carrito
    addProductToCart = async (cid, pid) => {
        const carts = await this.readFile()
        const cartIndex = carts.findIndex (cart => cart.id === cid)
        if (cartIndex === -1){
            return 'no se encuentra el carrito'
        }
        carts[cartIndex].products = {productId: pid}
        const results = await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2),'utf-8')

        return results
    }
}

module.exports = CartsManagerFile