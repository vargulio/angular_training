class Injector{
    private classesPool: Map<any, any> = new Map();
    constructor(private providers: any[]) {
        providers.forEach(provider => {
            this.classesPool.set(provider, new provider());
        })
    }
    get(service: any) {
        const existingInstance = this.classesPool.get(service);
        if(!existingInstance) {
            throw new Error('No provider for '+ service);
        }
        return existingInstance;
    }
}

class Service {
    doSomething() {
        console.log('Doing something');
    }
}
class Component {
    constructor(public service: Service) {}
}

const injector = new Injector([]);
const component = new Component(injector.get(Service));

component.service.doSomething();