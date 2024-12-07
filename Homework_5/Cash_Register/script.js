const totalPurchase = document.getElementById("total-purchase");
const cashPayment = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const cashDrawer = document.getElementById("cash-drawer");
const purchaseBtn = document.getElementById("purchase-btn");
const clearBtn = document.getElementById("clear-btn");

// Initial values for price and cid (cash in drawer)
let price = Number(totalPurchase.value);
let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];

// Map for currency units
const currencyUnit = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
};

// Function to update price and cid when input values change
function updatePriceAndCid() {
    price = Number(totalPurchase.value);
}

function updateCashDrawer() {
    cid = [
        ["PENNY", 1.01],
        ["NICKEL", 2.05],
        ["DIME", 3.1],
        ["QUARTER", 4.25],
        ["ONE", 90],
        ["FIVE", 55],
        ["TEN", 20],
        ["TWENTY", 60],
        ["ONE HUNDRED", 100]
    ];
}

// Add event listener to update price and cid when input values change
totalPurchase.addEventListener("change", updatePriceAndCid);

// Add event listener to clear button
clearBtn.addEventListener("click", () => {
    changeDue.innerHTML = "";
    cashPayment.value = "";
    cashPayment.focus();
});

// Function to check if the cash drawer has enough money to return the exact change
function checkCashRegister(price, payment, cid) {
    let change = payment - price;
    let changeDueArray = [];

    if (change < 0) {
        return "Customer does not have enough money to purchase the item";
    } else if (change === 0) {
        return "No change due - customer paid with exact cash";
    }

    let totalInDrawer = cid.reduce((acc, [, amount]) => acc + amount, 0);

    if (change > totalInDrawer) {
        return "Status: INSUFFICIENT_FUNDS";
    }

    cid = [...cid].reverse();

    for (let [unit, amount] of cid) {
        let unitValue = currencyUnit[unit];
        let amountToReturn = 0;

        while (change >= unitValue && amount > 0) {
            change -= unitValue;
            amount -= unitValue;
            amountToReturn += unitValue;
            change = Math.round(change * 100) / 100; // Round to avoid floating point errors
        }

        if (amountToReturn > 0) {
            changeDueArray.push(`${unit}: $${amountToReturn.toFixed(2)}`);
        }
    }

    // Check if we were able to give the right amount of change
    if (change > 0) {
        return "Status: INSUFFICIENT_FUNDS";
    }

    let changeStatus = Object.values(cid).reduce((acc, [, amount]) => acc + amount, 0) === changeDueArray.reduce((acc, item) => acc + parseFloat(item.split(": $")[1]), 0) ? "Status: CLOSED" : "Status: OPEN";

    return `${changeStatus}<br/>${changeDueArray.join("<br/>")}`;
}

function calculateChange(price, payment) {
    let change = payment - price;

    if(change > 0)
    return "<br/><br/><b>TOTAL CHANGE: $" + change.toFixed(2) + "</b>";
    else return "";
}

// Function to display cash drawer
function displayCashDrawer(cid) {
    let cashDrawerContent = cid.map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`).join("<br/>");

    cashDrawer.innerHTML = cashDrawerContent;
}

// Display initial cash drawer
displayCashDrawer(cid);

// Add event listener to purchase button
purchaseBtn.addEventListener("click", () => {
    let payment = Number(cashPayment.value);
    changeDue.innerHTML = "<h2>Change Due</h2>" + checkCashRegister(price, payment, cid) +  calculateChange(price, payment);
});
