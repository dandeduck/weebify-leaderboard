import "./deps.ts"

console.log('The port is: ', Deno.env.get('PORT'));
console.log('The var is: ', Deno.env.get('MONGO_CLIENT'));