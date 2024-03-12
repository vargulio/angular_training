interface ServiceHistory {
    dateDone: string;
    details: string;
    vehicle: Vehicle;
}

type OnGoingRepair = Omit<ServiceHistory, 'dateDone'>;

enum Problems {
    FLAT_TYRE,
    BROKEN_HEADLIGHT,
    DEAD_BATTERY,
    BROKEN_WINDOW,
    ENGINE_PROBLEM
}

class Repair {
    constructor(
        public estimatedTime: number,
        public cost: number,
        public vehicle: Vehicle,
        public details: string) { }
}

abstract class Vehicle {
    make: string;
    model: string;
}

class Car extends Vehicle {
    fuelType: 'diesel' | 'gasoline'
}


class Truck extends Vehicle {
    cargoVolume: number;

}

class EVehicle extends Vehicle {
    batteryType: string;
}

class CarShop {
    serviceHistory: Array<ServiceHistory>;
    currentRepairs: Array<OnGoingRepair>;
    priceList: Map<Problems, number>;
    balance: number;
}

class Mechanic {
    specialty: Array<Problems>;
    timeLeft: number;
    private _repairsDone: Array<Repair> = [];
    private _repairsToBeDone: Array<Repair> = [];

    get repairsToBeDone(): number {
        return this._repairsDone.length;
    }
    private _currentVehicle: Vehicle;

    set currentVehicle(vehicle: Vehicle) {
        this._currentVehicle = vehicle;
    }

    receiveVehicleForRepair(vehicle: Vehicle): void {
        const repair =  new Repair(Math.round(Math.random()*60), Math.round(Math.random()*1000), vehicle, 'some notes');
        this._repairsToBeDone.push(repair);
    }

    repairVehicle(vehicle: Vehicle): Vehicle {
        return vehicle;
    }

    reportWorkDone(): Array<Repair> {
        const doneRepairs = JSON.parse(JSON.stringify(this._repairsDone));
        this._repairsDone = [];
        return doneRepairs;
    }
}

class Reciever {
    currentVehicle: Vehicle;

    constructor(private mechanics: Array<Mechanic>) { }

    receiveForAssessing(vehicle: Vehicle, problem: Problems): Mechanic | null {
        const mechanic = this.mechanics.find(m => m.repairsToBeDone === 0 && m.specialty.some(s => s === problem)) ?? null;
        if (!mechanic) {
            return null;
        }

        mechanic.currentVehicle = vehicle;
        return mechanic;
    }
}

class Accountant {
    issueAnInvoice(repair: Repair): number {
        return repair.cost;
    }

    submitDoneWorkToHistory(mechanics: Array<Mechanic>, carshopService: CarShop) {
       const allDoneRepairs = mechanics
        .reduce((acc:Array<Repair> , mechanic: Mechanic) => {
            return acc.concat(...mechanic.reportWorkDone());
        }, []);

        let serviceHistoryItems = allDoneRepairs.map((r: Repair): ServiceHistory => {
            return {
                dateDone: new Date().toDateString(),
                details: r.details,
                vehicle: r.vehicle
            }
        });

        carshopService.serviceHistory.push(...serviceHistoryItems);
        carshopService.balance+= allDoneRepairs.reduce((acc: number, r:Repair) => acc+ r.cost, 0);
    }
}

class Boss {
    collectMoney(carshopService: CarShop, amount: number): void{
        carshopService.balance-= amount;
    }
}

class Something implements ServiceHistory {
    constructor(
        public dateDone: string,
        public details: string,
        public vehicle: Vehicle){}
    
    doSmth = (): string => {
        return this.dateDone + '';
    };
}