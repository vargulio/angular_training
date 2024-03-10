
class User {
    constructor(name, age, score) {
        this.name = name;
        this.age = age;
        this.score = score;
    }

    updateScore(multiplier) {
        this.score *= multiplier;
    }

    getStatus() {
        return this.age >= 18 ? "Active" : "Inactive";
    }
}

let bonusMultiplier;


class UserManager {
    constructor() {
        this.users = [];
    }

    addUser(user) {
        this.users.push(user);
    }

    calculateTotalScore() {
        return this.users.reduce((total, user) => total + user.score, 0);
    }

    getAverageScore() {
        return this.users.length ? this.calculateTotalScore() / this.users.length : 0;
    }

    performComplexCalculations() {
        return this.users.reduce((result, user) => {
            for (let i = 0; i < 10; i++) {
                user.updateScore(i + 1);
                result += user.score;
            }
            return result;
        }, 0);
    }

    finalUserCalculation(bonusMultiplier) {
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