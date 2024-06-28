#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from 'chalk';
let myBalance = 50000;
const myPin = 9732581;
console.log(chalk.magentaBright("Welcome to My ATM:"));
async function main() {
    let pinAnswer = await inquirer.prompt([
        {
            name: "pin",
            type: "number",
            message: chalk.yellow('Enter Your PIN:'),
        }
    ]);
    if (pinAnswer.pin !== myPin) {
        console.log(chalk.redBright("Incorrect PIN! Exiting..."));
        return;
    }
    else {
        console.log(chalk.green("PIN is Correct. Successfully Logged In!"));
    }
    while (true) {
        let operationAns = await inquirer.prompt([
            {
                name: "operation",
                type: "list",
                message: chalk.white("Please select an option:"),
                choices: ["Withdraw Amount", "Check Balance", "Fast Cash", "Exit"]
            }
        ]);
        if (operationAns.operation === "Withdraw Amount") {
            let amount = await inquirer.prompt([
                {
                    name: "enterAmount",
                    type: "number",
                    message: chalk.grey("Enter the amount to withdraw:")
                }
            ]);
            if (amount.enterAmount > myBalance) {
                console.log(chalk.redBright('Insufficient Balance!'));
            }
            else {
                myBalance -= amount.enterAmount;
                console.log(chalk.green(`${amount.enterAmount} Withdraw Successful!`));
                console.log(`Your Current Balance is: ${myBalance}`);
            }
        }
        else if (operationAns.operation === "Check Balance") {
            console.log(chalk.magenta(`Your Account Balance is: ${myBalance}`));
        }
        else if (operationAns.operation === "Fast Cash") {
            const fastAmount = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'amount',
                    message: chalk.grey('Select Fast Cash Amount:'),
                    choices: [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000]
                }
            ]);
            let withdrawAmount = fastAmount.amount;
            if (withdrawAmount <= myBalance) {
                myBalance -= withdrawAmount;
                console.log(chalk.green(`Fast Cash withdrawal of ${withdrawAmount} successful! Your remaining balance is: ${myBalance}`));
            }
            else {
                console.log(chalk.redBright('Insufficient balance for fast cash withdrawal!'));
            }
        }
        else {
            console.log(chalk.yellow('Thank you for using ATM!'));
            break;
        }
    }
}
main();
