
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

class ShoppingCart {
    items = [];

    render() {
        const cartEl = document.createElement('section');
        cartEl.innerHTML = `
        <h2> Total : \$${0}</h2>
        <button> Order Now! </button>`;
        cartEl.className = 'cart';
        return cartEl;
    }


}


class ProductList {
    products = [
        new Product('Pillow', 'https://images.unsplash.com/photo-1581091019745-7d3bbae7b8b3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGlsbG93JTIwcGlkbG93fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80', 'a soft pillow', 19.99),
        new Product('Carpet', 'https://images.unsplash.com/photo-1581091019745-7d3bbae7b8b3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGlsbG93JTIwcGlkbG93fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80', 'a soft carpet', 89.99) 
    ]
    constructor() {}
    render(){
       
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        for (const prod of this.products){
            const productItem = new ProductItem(prod);
            const prodEl = productItem.createProductItem();
            prodList.append(prodEl);
        }
       
        return prodList;
    }

}

class ProductItem {
    constructor(product){
        this.product = product;
    }

    addToCart(){
        console.log(this.product);
    }

    createProductItem(){
        const prodEl = document.createElement('li');
        prodEl.className = 'product-item';
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

        return prodEl;
    }

}





class Shop {

    render(){
        const renderHook = document.getElementById('app');
        const productList = new ProductList();
        const prodList = productList.render();
        const shoppingCart = new ShoppingCart();
        const shopList = shoppingCart.render();

        renderHook.append(prodList);
        renderHook.append(shopList);

    }
}

const shop = new Shop();
shop.render();


// prodlist.render();