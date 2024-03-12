var User = /** @class */ (function () {
    function User(name, age, score) {
        this.name = name;
        this.age = age;
        this.score = score;
    }
    User.prototype.updateScore = function (multiplier) {
        this.score *= multiplier;
    };
    User.prototype.getStatus = function () {
        return this.age >= 18 ? "Active" : "Inactive";
    };
    return User;
}());
var bonusMultiplier = 1.1;
var UserManager = /** @class */ (function () {
    function UserManager() {
        this.users = [];
    }
    UserManager.prototype.addUser = function (user) {
        this.users.push(user);
    };
    UserManager.prototype.calculateTotalScore = function () {
        return this.users.reduce(function (total, user) { return total + user.score; }, 0);
    };
    UserManager.prototype.getAverageScore = function () {
        return this.users.length ? this.calculateTotalScore() / this.users.length : 0;
    };
    UserManager.prototype.performComplexCalculations = function () {
        return Math.round(Math.random() * 100);
    };
    UserManager.prototype.finalUserCalculation = function (bonusMultiplier) {
        var result = this.getAverageScore();
        for (var j = 0; j < 100; j++) {
            result += this.performComplexCalculations();
            if (j === 99) {
                result *= bonusMultiplier;
            }
        }
        return result;
    };
    return UserManager;
}());
// Example usage
var userManager = new UserManager();
userManager.addUser(new User("John", 30, 12));
userManager.addUser(new User("Alice", 25, 23));
userManager.addUser(new User("Bob", 20, 34));
console.log("Final Calculation:", userManager.finalUserCalculation(bonusMultiplier));
