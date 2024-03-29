#!/usr/bin/env node
import inquirer from "inquirer";
let balance = 50000;
let pin = 4567;
async function atmTransaction() {
    let pinAnswer = await inquirer.prompt([{
            name: "rim",
            message: "Enter Your Pin",
            type: "number"
        }]);
    if (pinAnswer.rim === pin) {
        console.log("Correct pin code");
        let opr = await inquirer.prompt([{
                name: "operation",
                message: "Select Transaction",
                type: "list",
                choices: ["Withdraw", "Deposit", "Check Balance", "Fastcash", "Exit"]
            }]);
        if (opr.operation === "Withdraw") {
            let amountAns = await inquirer.prompt([{
                    name: "amount",
                    message: "Enter the amount you want to withdraw",
                    type: "number",
                    validate: function (value) {
                        if (value <= balance) {
                            return true;
                        }
                        return "Insufficient balance";
                    }
                }]);
            balance -= amountAns.amount;
            console.log("Withdrawal successful. Your current balance is " + balance);
        }
        else if (opr.operation === "Deposit") {
            let depositAmount = await inquirer.prompt([{
                    name: "amount",
                    message: "Enter the amount you want to deposit",
                    type: "number"
                }]);
            balance += depositAmount.amount;
            console.log("Deposit successful. Your current balance is " + balance);
        }
        else if (opr.operation === "Check Balance") {
            console.log("Your current balance is " + balance);
        }
        else if (opr.operation === "Fastcash") {
            let fast = await inquirer.prompt([{
                    name: "fast_opt",
                    message: "Select the amount you want to withdraw",
                    type: "list",
                    choices: ["100", "500", "1000", "2000", "5000"]
                }]);
            balance -= parseInt(fast.fast_opt);
            console.log(`Your remaining balance is ${balance}`);
        }
        else if (opr.operation === "Exit") {
            console.log("Thank you for using our ATM. Have a nice day!");
            return;
        }
        // Prompt for another transaction
        await atmTransaction();
    }
    else {
        console.log("Invalid pin code");
        // Prompt for pin again
        await atmTransaction();
    }
}
// Call the function to start ATM transactions
atmTransaction();
