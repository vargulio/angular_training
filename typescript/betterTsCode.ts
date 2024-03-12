class User {
    name: string;
    age: number;
    score: number;

    constructor(name: string, age: number, score: number) {
        this.name = name;
        this.age = age;
        this.score = score;
    }

    updateScore(multiplier: number): void {
        this.score *= multiplier;
    }

    getStatus(): string {
        return this.age >= 18 ? "Active" : "Inactive";
    }
}

let bonusMultiplier: number = 1.1;


class UserManager {
    users: User[];

    constructor() {
        this.users = [];
    }

    addUser(user: User): void {
        this.users.push(user);
    }

    calculateTotalScore(): number {
        return this.users.reduce((total, user) => total + user.score, 0);
    }

    getAverageScore(): number {
        return this.users.length ? this.calculateTotalScore() / this.users.length : 0;
    }

    performComplexCalculations(): number {
        return Math.round(Math.random()*100);
    }

    finalUserCalculation(bonusMultiplier: number): number {
        let result = this.getAverageScore();
        for (let j = 0; j < 100; j++) {
            result += this.performComplexCalculations();

            if (j === 99) {
                result *= bonusMultiplier; 
            }
        }
        return result;
    }
}

// Example usage
let userManager = new UserManager();
userManager.addUser(new User("John", 30, 12));
userManager.addUser(new User("Alice", 25, 23));
userManager.addUser(new User("Bob", 20, 34));

console.log("Final Calculation:", userManager.finalUserCalculation(bonusMultiplier));
