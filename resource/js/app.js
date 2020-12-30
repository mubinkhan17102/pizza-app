import axios from 'axios';

const allBtn = document.querySelectorAll('.btn');
const totalQty = document.getElementById('totalQty');
allBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const pizza = btn.dataset.pizza;
        updatePizza(pizza);
        updateTotal();
    })
})

async function updatePizza(pizza) {
    try {
        const response = await axios.post('/updatepizza', { pizza: pizza });
    } catch (err) {
        throw err;
    }
}

function updateTotal() {
    if (!totalQty) {
        totalQty.innerHTML = '1';
    }
    else {
        const total = totalQty.innerHTML;
        totalQty.innerHTML = parseInt(total) + 1;
    }
}
