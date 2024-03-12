// let person: any = {
//     name: "Slavi",
//     age: 19
// };

// // if(typeof person === 'object' && person !== null && 'name' in person) {
//     console.log(person.name);
// // }

// function myFunc(): never {
//     while(true) {

//     }
// }

// let b: () => string

// b = () => {
//     return '4';
// }

// b().charAt(0);

let arr: (number | string | boolean)[]; // number | string | boolean - type union
let arr1: number[] | string[]; // same as above but all the elements have to be of the same type

arr = [1,14141, 'a'];

let human: {
    name?: string, 
    readonly age: number | string,
    greet: (a: number) => string
} = 
{age: '54', name: "Gosho", greet: (a: number) => 'Hello'};

interface DynamicObject {
    [word: string] : (number | string);
}

let result: DynamicObject = {age: 6, name: 'something'};

let templateLit = `name`;
let key = 'name';
let value = 'Slavi';

let tableKey = 'keyMMDDWed';

result[key] = value;

// interface Cat {
//     name: string;
//     age: number;
//     purr: () => void
// }

let pisi: Cat = {
    name: "Pisanka",
    age: 2,
    purr: () => {
        
    }
}
