const { RESTDataSource } = require('apollo-datasource-rest');




class ProductsAPI extends RESTDataSource {
  constructor() {
    super();
    // this.baseURL = 'http://products_service:4000/';
    this.baseURL = process.env.PRODUCTS_API_URL;
  }

  async getProducts() {
    // return this.get(`/products/`);
    return this.get(`products`);
  }

  async filterProduct(props) {
    console.log(props)
    let response
    response = this.post(`products/filter/`, props);
    console.log(response)
    return response
  }

  async lookForProductByTitle(props) {
    let title = props.title
    // return this.get(`/products/`);
    return this.post(`products/${title}`);
  }

  async getProduct(productId) {
    return this.get(`products/${productId}`);
  }

  async createProduct(user, args, price) {
    this.body = {
      "title": args.title,
      "seller": user.username,
      "category": args.category,
      "image": args.image,
      "price": price,
      "description": args.description,
      "comments": [],
      "latitude": user.latitude,
      "longitude": user.longitude,
    }
    console.log(this.body)
    return this.post(`products/`, this.body);    
  }

  async createComment(productId, username, commentsBody) {
    this.body = {
      "username": username,
      "body": commentsBody
    }
    return this.post(`products/comment/${productId}`, this.body);
  }

  async deleteProduct(productId) {
    return this.delete(`products/${productId}`);
  }

}

module.exports = ProductsAPI;
