
// object literal way of creating an object
const prodlist = {
    products: [
        { title: 'Pillow',
        description: 'a soft pillow',
        price: 19.99,
        imageUrl: 'https://images.unsplash.com/photo-1581091019745-7d3bbae7b8b3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGlsbG93JTIwcGlkbG93fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'
        },
        { title: 'Carpet',
        description: 'a soft carpet',
        price: 89.99,
        imageUrl: 'https://images.unsplash.com/photo-1581091019745-7d3bbae7b8b3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGlsbG93JTIwcGlkbG93fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'
        }
    ],
    render() {
        const renderHook = document.getElementById('app');
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        for (const prod of this.products) {
            const prodEl = document.createElement('li');
            prodEl.className = 'product-item';
            prodEl.innerHTML = `
            <div>
            <img src="${prod.imageUrl}" alt="${prod.title}">
            <div class="product-item__content">
            <h2>${prod.title}</h2>
            <h3>\$${prod.price}</h3>
            <p>${prod.description}</p>
            <button>Add to Cart</button>
            </div>
            </div>
            `;
            prodList.append(prodEl);
        }
        console.log(prodList);
        renderHook.append(prodList);
    
    }

}

// oop way of creating an object
class Product {
    title = 'DEFAULT';
    imageUrl;
    description;
    price;
    constructor(title, image, desc, price) {
        this.title = title;
        this.imageUrl = image;
        this.description = desc;
        this.price = price;
    }
}
// give me a url of an image
// 


const prodlist2 = {
    products: [
        new Product('Pillow', 'https://images.unsplash.com/photo-1581091019745-7d3bbae7b8b3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGlsbG93JTIwcGlkbG93fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80', 'a soft pillow', 19.99),
        new Product('Carpet', 'https://images.unsplash.com/photo-1581091019745-7d3bbae7b8b3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGlsbG93JTIwcGlkbG93fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80', 'a soft carpet', 89.99)
    ]
}

class ElementAttribute {
    constructor(name,value){
        this.name = name;
        this.value = value;
    }
    // get name(){
    //     return this.name;
    // }
    // get value(){
    //     return this.value;
    // }
    // set name(name){
    //     this.name = name;
    // }
    // set value(value){
    //     this.value = value;
    // }
}


class Component {

    constructor(renderHookId,render=false) {
        this.hookId = renderHookId;
        if (render)
            this.render();
    }

    render(){}

    createRootElement(tag,cssClasses,attributes){

        const Rootelement = document.createElement(tag);
        if (cssClasses){
            Rootelement.className = cssClasses;
        }
        
        if (attributes!=undefined &&  attributes && attributes.length > 0){
            console.log(attributes[0].value)
            for (const attr of attributes){
                console.log(attr);
                Rootelement.setAttribute(attr.name,attr.value);
            }
        }
        document.getElementById(this.hookId).append(Rootelement);
        return Rootelement;

    }



}




class ShoppingCart extends Component{
    items = [];

    constructor(renderHookId){
        super(renderHookId,true)
    }

    set cartItems(value) {
        this.items = value;
        this.totalOutput.innerHTML = `<h2> Total: \$${this.totalAmount.toFixed(2)}</h2>`;
    }
    get totalAmount() {
        const sum = this.items.reduce((prevVal,curItem) => prevVal + curItem.price,0);
        return sum;
    }

    addProduct(product) {
        this.items.push(product);
        this.cartItems = this.items;
    }

    orderItems(){
        console.log('order me');
        console.log(this.items);
    }

    render() {
        const cartEl = this.createRootElement('section','cart');
        cartEl.innerHTML = `
        <h2> Total : \$${0}</h2>
        <button> Order Now! </button>`;
        
        this.totalOutput = cartEl.querySelector('h2');
        const orderButton = cartEl.querySelector('button');
        // without the bind the addeventlistner binds this to  orderbutton
        // orderButton.addEventListener('click',this.orderItems.bind(this));
        orderButton.addEventListener('click',() => this.orderItems())
        return cartEl;
    }


}


class ProductList extends Component{

    constructor(renderHookId) {
        super(renderHookId,false);
        this.fetchProducts();
        this.render();
    }

    fetchProducts(){
        this.#products = [
            new Product('Pillow', 'https://images.unsplash.com/photo-1581091019745-7d3bbae7b8b3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGlsbG93JTIwcGlkbG93fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80', 'a soft pillow', 19.99),
            new Product('Carpet', 'https://images.unsplash.com/photo-1581091019745-7d3bbae7b8b3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGlsbG93JTIwcGlkbG93fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80', 'a soft carpet', 89.99) 
        ]
    }



    render(){
        this.createRootElement('ul','product-list',[new ElementAttribute('id','prod-list')]);
        
        for (const prod of this.#products){
            const productItem = new ProductItem(prod,'prod-list');
            productItem.render();
        }
       
    }

}

class ProductItem extends Component{

    constructor(product,renderHookId){
        super(renderHookId,false);
        this.product = product;
        this.render();
    }

    addToCart(){
        console.log(this.product);
        App.addProductToCart(this.product);

    }

    render(){
        // const prodEl = document.createElement('li');
        // prodEl.className = 'product-item';
        const prodEl = this.createRootElement('li','product-item');
        prodEl.innerHTML = `
        <div>
            <h1>${this.product.title}</h1>
            <div class="product-item__content">
                <h2>${this.product.title}</h2>
                <h3>\$${this.product.price}</h3>
                <p>${this.product.description}</p>
                <button>Add to Cart</button>
            </div>
        </div>
        `;
        const AddCartbutton = prodEl.querySelector('button');
        AddCartbutton.addEventListener('click',this.addToCart.bind(this));

    }

}


class Shop {

    constructor(){
        this.render();
    }

    render(){
        this.shoppingCart = new ShoppingCart('app');
        // this.shoppingCart.render();
        // const renderHook = document.getElementById('app');
        const productList = new ProductList('app');
        // productList.render();
        
        // renderHook.append(prodList);
        // renderHook.append(shopList);

    }
}


class App {
    static cart;

    static init(){
        this.shop = new Shop();
        // this.shop.render();
        this.cart = this.shop.shoppingCart;

    }

    static addProductToCart(product) {
        this.cart.addProduct(product);
    }



}

App.init();

