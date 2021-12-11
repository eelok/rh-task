const context = {
    user: {
        name: "olga",
        email: "olga@mail.com",
        password: "1234"
    },
    date: {
        id: "1234",
        meta: "one"
    }
}

// let {user: {name}} = context;
// console.log(user);
// console.log(name);


function printUsername(){
    return `username = ${name}`;
}

// console.log(printUsername(context.user));
const obj = {
    context: context
};
const {context: {user: {name}}} = obj;
console.log(name);
console.log(printUsername(obj));
