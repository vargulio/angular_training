export function LoggedMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
 
    descriptor.value = function (...args: any[]) {
        console.log(`LOG: Entering method '${propertyKey}'.`);
        const result = originalMethod.apply(this, args);
        console.log(`LOG: Exiting method '${propertyKey}'.`);
        return result;
    };

    return descriptor;
}