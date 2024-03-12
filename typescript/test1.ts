interface Cat {
    name: string;
    age: number;
    purr: () => void
}

class SomeClass  {
    private name: string;
    age: number;
    purr: () => void;
}

// interface MyFuncyFuc {
//     (a: number, b: string): string
// }

// type NumberOrString = number | string;

type Shape = 'rectangle' | 'circle' | 'square';

// function getArea(shape: Shape): number {

//     switch(shape) {
//         case 'rectangle':
//             return 2;
//         case 'circle': 
//             return 20;
//         default: 
//             const exhaustiveCheck: never = shape;
//             return 1;
//     }
// }

type BusinessPartner = {
    name: string;
}
type ContactDetails = {
    email: string;
    phone: number;
    name: number;
}

type Employee = BusinessPartner & ContactDetails;

// let b: Employee  = {
//     email: 'string',
//     phone: 1
// }


abstract class Volumeable {
    volume: number = 0;
}

class Glass extends Volumeable {
    material: string = ''
}

class Bucket extends Volumeable {
    hasHandle: boolean = false;
}



function myFunc1<T>(arr: T[]): T {
    return arr[0];
}

function myFunct2<T extends {length: number}>(arg: T): number {
    return arg.length;
}

type KeysOfResponse = keyof HttpResponse<any>; // 'status' | 'ok' | 'body'

function something(arg: keyof HttpResponse<any> ): string {
    return arg;
}

type BodyOnly = Pick<HttpResponse<any>, 'body'>;
