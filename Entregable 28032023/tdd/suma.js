let testPasados = 0;
let totalTest=4;

//crear la funcion de suma
//rest operatorator
const sumar =(...nums)=>{
    if(nums.length===0) return 0;
    if(nums.some(elm=>typeof elm !=="number")) return null;
    return nums.reduce((acc,i)=>acc+i,0);
    // console.log(nums);
    // if(nums.length===0) return 0; // if(!num1 || !num2) return 0;
    // for(let i=0;i<nums.length;i++){
    //     if(typeof nums[i] !=="number"){
    //         return null;
    //     }
    // } // if(typeof num1 !== "number" || typeof num2 !=="number") return null;
    // let resultado=0;
    // for(let i=0;i<nums.length;i++){
    //     resultado+=nums[i];
    // }
    // return resultado;
};


//realiza las pruebas
//1.
console.log("1. La función debe devolver null si algún parámetro no es numérico.");
let resultado1 = sumar(1,"2");
if(resultado1===null){
    console.log('-->Test 1 paso');
    testPasados++;
} else {
    console.log(`-->Test 1 NO paso, porque se esperaba un resultado null, pero se obtuvo ${typeof resultado1} `);
}

//2.
console.log("2. La función debe devolver 0 si no se pasó ningún parámetro");
let resultado2 = sumar();
if(resultado2===0){
    console.log('-->Test 2 paso');
    testPasados++;
} else {
    console.log(`-->Test 2 NO paso, porque se esperaba un resultado 0, pero se obtuvo ${typeof resultado2} `);
}

//3.
console.log("3. La función debe poder realizar la suma correctamente. ");
let resultado3 = sumar(1,5);
if(resultado3===6){
    console.log('-->Test 3 paso');
    testPasados++;
} else {
    console.log(`-->Test 3 NO paso, porque se esperaba un resultado 6, pero se obtuvo ${ resultado3} `);
}

//4.
console.log("4. La función debe poder hacer la suma con cualquier cantidad de números");
let resultado4 = sumar(1,2,3,4);
if(resultado4===10){
    console.log('-->Test 4 paso');
    testPasados++;
} else {
    console.log(`-->Test 4 NO paso, porque se esperaba un resultado 10, pero se obtuvo ${ resultado4} `);
}


//validar cuantos test has pasado
if(testPasados === totalTest) console.log("Todos los test pasaron exitosamente");
else console.log(`Pasaron ${testPasados} de un total ${totalTest}`);
