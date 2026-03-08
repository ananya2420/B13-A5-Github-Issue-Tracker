1. var- which means Global or function scope. That means access everywhere. Suppose i am declearing a function in the inside of function so it is also accessible of outside of the scope.
let-Block scope. which means suppose i am declearing a function which is only accessible inside the function scope. In the outside part it is not accessible at all. We can declare it outside of the block. But inside part 2 let is not possible otherwise we get an error.

const-blocks scope. so we can't able to reassign it. we have to write it by one line.

2.Spread operator means expands value. They can find out item from array or object.
const nums=[1,2,3];
const copy=[...nums];

3. map()-It is an asynchronous function. It also return new array. It runs for every element.
   filter()-suppose we want to store something such as if a value greater than >18 than store it into the filter. 
   forEach()-It also similar like for. It iterates every element of the array. After when that value is needed call it immmediately. 

4.arrow function-It is a shortcut version.  
const loadAll = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
}
const loadAll → function name

() → parameters

=> → arrow function symbol

{} → function body
In the arrow function they don't care about this, constructor and hoisted.

5.Template literal which means string literal. we can use Back-ties syntex(``) instead of single('') or double("").

const name = "John";

const message = `Hello ${name}`;


Live link- snazzy-lolly-ebb1ae.netlify.app
console.log(message);



