import {faker} from "@faker-js/faker";

const { commerce,database,random,image, name, internet } = faker;

//definimos el idioma de los datos generados por faker
faker.locale = "es";

//funcion para generar producto
export const generateProduct = ()=>{
    return {
        title:commerce.productName(),
        price:commerce.price(),
        stock:random.numeric(1),
        id:database.mongodbObjectId(),
        image:image.image(),
    }
}
// console.log(generateProduct());

export const generateUser = ()=>{
    let products=[];
    const numberOfProducts = Math.ceil(Math.random()*10);//genera entre 1 y 10, numero de producto que agregamos al carrito del usuario
    for(let i=0;i<numberOfProducts;i++){
        const newProduct = generateProduct(); //generamos un nuevo producto
        products.push(newProduct);
    }
    // console.log(numberOfProducts);
    // console.log(products);
    return {
        first_name:name.firstName(),
        last_name:name.lastName(),
        avatar:internet.avatar(),
        id:database.mongodbObjectId(),
        cart:products
    }
}
// console.log(generateUser());