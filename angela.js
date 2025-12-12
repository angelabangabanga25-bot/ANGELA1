// References to HTML elements
const addBtn = document.getElementById("add-btn");
const categoryInput = document.getElementById("category-input");
const amountInput = document.getElementById("amount-input");
const expenseNameInput = document.getElementById("expense-name");
const expensesTableBody = document.getElementById("expenses-table-body");
const totalAmountDisplay = document.getElementById("total-amount");
const filterCategory = document.getElementById("filter-category");

let expenses = []; // Stores all expenses

// --- ADD EXPENSE ---
addBtn.addEventListener("click", function () {

    const name = expenseNameInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value;

    // Validation
    if (name === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid name and amount.");
        return;
    }

    // Create expense object
    const expense = {
        id: Date.now(),
        name,
        amount,
        category
    };

    expenses.push(expense);

    // Reset fields
    expenseNameInput.value = "";
    amountInput.value = "";

    renderTable();
    updateTotal();
});

// --- DELETE EXPENSE ---
function deleteExpense(id) {
    expenses = expenses.filter(exp => exp.id !== id);
    renderTable();
    updateTotal();
}

// --- RENDER TABLE (with filter) ---
function renderTable() {
    const selectedFilter = filterCategory.value;
    expensesTableBody.innerHTML = "";

    const filteredExpenses = expenses.filter(exp => {
        return selectedFilter === "All" || exp.category === selectedFilter;
    });

    filteredExpenses.forEach(exp => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${exp.name}</td>
            <td>$${exp.amount.toFixed(2)}</td>
            <td>${exp.category}</td>
            <td><button onclick="deleteExpense(${exp.id})">Delete</button></td>
        `;

        expensesTableBody.appendChild(row);
    });
}

// --- UPDATE TOTAL ---
function updateTotal() {
    const selectedFilter = filterCategory.value;

    const total = expenses
        .filter(exp => selectedFilter === "All" || exp.category === selectedFilter)
        .reduce((sum, exp) => sum + exp.amount, 0);

    totalAmountDisplay.textContent = `₱${total.toFixed(2)}`;
}

// --- FILTER CHANGE EVENT ---
filterCategory.addEventListener("change", () => {
    renderTable();
    updateTotal();
});
