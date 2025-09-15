function bankApp() {
    let balance = 1000; 

    while (true) {
        let choice = prompt(
`Welcome to Your Bank!
----------------------
1. Check Balance
2. Deposit Money
3. Withdraw Money
4. Exit
----------------------
Enter your choice (1-4):`
        );

        if (choice === null) {
            console.log("Exited the app.");
            break;
        }

        switch (choice.trim()) {
            case "1":
                console.log("$ Your current balance is: ₹" + balance.toFixed(2));
                break;

            case "2":
                let deposit = prompt("Enter amount to deposit:");
                if (deposit === null || isNaN(deposit) || Number(deposit) <= 0) {
                    console.log(" Invalid deposit amount.");
                } else {
                    balance += Number(deposit);
                    console.log("  ₹" + Number(deposit).toFixed(2) + " deposited successfully.");
                    console.log("$ New balance: ₹" + balance.toFixed(2));
                }
                break;

            case "3":
                let withdraw = prompt("Enter amount to withdraw:");
                if (withdraw === null || isNaN(withdraw) || Number(withdraw) <= 0) {
                    console.log(" Invalid withdrawal amount.");
                } else if (Number(withdraw) > balance) {
                    console.log(" Insufficient balance.");
                } else {
                    balance -= Number(withdraw);
                    console.log(" ₹" + Number(withdraw).toFixed(2) + " withdrawn successfully.");
                    console.log("$ New balance: ₹" + balance.toFixed(2));
                }
                break;

            case "4":
                console.log(" Thank you for using the bank app. Goodbye!");
                return;

            default:
                console.log(" Invalid choice. Please enter 1, 2, 3, or 4.");
        }

        console.log("--------------------------------------");
    }
}