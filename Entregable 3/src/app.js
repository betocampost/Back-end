import express from "express";
import path from "path";
import ProductManager from "./ProductManager.js";


const express = require('express');
const bodyParser = require('body-require');

const app = express();
const port = process.env.port || 8080

app.use(bodyParser.urlencoded({extended:true}))
apr.use(bodyParser.json())

app.get('/name/:id'), (req, res)=>{
  res.send({message : "Productos: ${req.params.name}!"})
}


app.listen(port, () => {
  console.log('Api REST corriendo en http://localhost:${port}');
})


//----------------------------------------------------------------------------------------------//

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const productManager = new ProductManager(
  path.resolve(process.cwd(), "public", "products.json")
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/productos", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    const limit = req.query.limit;
    let limitedProducts;
    if (limit) {
      limitedProducts = products.slice(0, limit);
    }
    res.send(limitedProducts || products);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//crear la ruta de la app
app.post("/productos", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    const newProduct = req.body;
    await productManager.addProduct(products, newProduct);
    res.send(newProduct);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//inicializar el servidor

  app.listen(port, () => {
  console.log(`Iniciado en http://localhost:${port}`);
});