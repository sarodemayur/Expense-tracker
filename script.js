

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let totalAmount = calculateTotalAmount(expenses);

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');
const selectcategory = document.getElementById('Select-Category');
const searchcategory = document.querySelector('#search-input');
const searchbtn = document.querySelector('#search-btn');

addBtn.addEventListener('click', function(){
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if(category === ''){
        alert('Please select a category');
        return;
    }
    if(isNaN(amount) || amount <= 0){
        alert('Please enter a valid amount');
        return;
    }
    if(date === ''){
        alert('Please select a date');
        return;
    }

    expenses.push({category, amount, date});
    localStorage.setItem('expenses', JSON.stringify(expenses));

    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;

    appendExpenseRow({category, amount, date});
});

// Filter expenses by category
selectcategory.addEventListener('change', function(e) {
    e.preventDefault();
    const selectedCategory = selectcategory.value;
    if (selectedCategory == 'Select-Category') {
        renderExpenses(expenses);
    } else {
        const filteredExpenses = expenses.filter(expense => expense.category === selectedCategory);
        renderExpenses(filteredExpenses);
    }
});

searchbtn.addEventListener('click',function(f){
    f.preventDefault();
    const categorysearch = searchcategory.value;
    if(categorysearch.value == 'Select-Category'){
        renderExpenses(expenses);
    }else{
        const filteredExpenses = expenses.filter(expense => expense.category === categorysearch);
        renderExpenses(filteredExpenses);
    }
});

function calculateTotalAmount(expenses) {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
}

function appendExpenseRow(expense) {
    const newRow = expenseTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function(){
        const index = expenses.findIndex(exp => exp === expense);
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));

        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;

        expenseTableBody.removeChild(newRow);
    } );

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
}

function renderExpenses(expenses) {
    expenseTableBody.innerHTML = '';
    totalAmount = calculateTotalAmount(expenses);
    totalAmountCell.textContent = totalAmount;

    // Render expenses
    expenses.forEach(expense => appendExpenseRow(expense));
}
renderExpenses(expenses);


