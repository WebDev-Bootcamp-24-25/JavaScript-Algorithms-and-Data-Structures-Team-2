const totalPurchase = document.getElementById("total-purchase");
const cashPayment = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const cashDrawer = document.getElementById("cash-drawer");
const purchaseBtn = document.getElementById("purchase-btn");
const clearBtn = document.getElementById("clear-btn");

// Add event listener to clear button
clearBtn.addEventListener("click", () => {
  changeDue.textContent = "";
  cashPayment.value = "";
  cashPayment.focus();
});

// Add event listener to purchase button
purchaseBtn.addEventListener("click", () => {
    let total = Number(totalPurchase.value);
    let payment = Number(cashPayment.value);
    let change = 0;
    if(payment < total) {
        changeDue.textContent = "Customer does not have enough money to purchase the item";
    }
    else if (payment == total) {
        changeDue.textContent = "No change due - customer paid with exact cash";
    }
    else {
        change = payment - total;
        changeDue.textContent = change.toFixed(2);
    }
});
