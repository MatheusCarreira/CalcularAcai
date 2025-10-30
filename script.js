function addSubproduct() {
    const container = document.getElementById('subproducts-container');
    const item = document.createElement('div');
    item.className = 'subproduct-item';
    item.innerHTML = `
      <input type="text" placeholder="Produto" class="subproduct-name">
      <input type="number" step="0.01" placeholder="Custo (R$)" class="subproduct-cost">
      <input type="number" step="0.1" placeholder="Gramas(g)" class="subproduct-grams">
      <button type="button" class="btn btn-remove" onclick="removeSubproduct(this)">X</button>
    `;
    container.appendChild(item);
}

function removeSubproduct(button) {
    if (document.querySelectorAll('.subproduct-item').length > 1) {
        button.parentElement.remove();
    }
}

function calculatePrice() {
    const name = document.getElementById('main-product-name').value.trim() || "Produto";
    const price = parseFloat(document.getElementById('main-product-price').value) || 0;
    const weight = parseFloat(document.getElementById('main-product-weight').value) || 0;
    const unit = document.getElementById('main-product-unit').value;
    const portionGrams = parseFloat(document.getElementById('portion-grams').value) || 0;

    if (!price || !weight || !portionGrams) {
        alert("Preencha nome, preço, peso total e porção!");
        return;
    }

    const totalGrams = unit === 'kg' ? weight * 1000 : weight;
    const mainCostPerGram = price / totalGrams;
    const mainCostPerPortion = mainCostPerGram * portionGrams;

    let subCostPerPortion = 0;
    document.querySelectorAll('.subproduct-item').forEach(item => {
        const cost = parseFloat(item.querySelector('.subproduct-cost').value) || 0;
        const grams = parseFloat(item.querySelector('.subproduct-grams').value) || 0;
        if (cost > 0 && grams > 0) {
            subCostPerPortion += (cost / grams) * portionGrams;
        }
    });

    const operational = parseFloat(document.getElementById('operational-costs').value) || 0;
    const taxRate = parseFloat(document.getElementById('tax-rate').value) || 0;
    const profitMargin = parseFloat(document.getElementById('profit-margin').value) || 0;

    const totalCostPerPortion = mainCostPerPortion + subCostPerPortion + operational;
    const taxDecimal = taxRate / 100;
    const marginDecimal = profitMargin / 100;
    const denominator = 1 - (taxDecimal + marginDecimal);

    if (denominator <= 0) {
        alert("Impostos + margem < 100%");
        return;
    }

    const finalPrice = totalCostPerPortion / denominator;
    const taxAmount = finalPrice * taxDecimal;
    const profit = finalPrice * marginDecimal;

    const totalPortions = Math.floor(totalGrams / portionGrams);

    const fmt = (n) => `R$ ${n.toFixed(2).replace('.', ',')}`;

    document.getElementById('result-name').textContent = name;
    document.getElementById('result-portion').textContent = `${portionGrams}g`;
    document.getElementById('total-cost').textContent = fmt(totalCostPerPortion);
    document.getElementById('final-price').textContent = fmt(finalPrice);
    document.getElementById('total-portions').textContent = totalPortions;

    document.getElementById('main-cost').textContent = fmt(mainCostPerPortion);
    document.getElementById('sub-cost').textContent = fmt(subCostPerPortion);
    document.getElementById('op-cost').textContent = fmt(operational);
    document.getElementById('profit').textContent = fmt(profit);
    document.getElementById('tax-amount').textContent = fmt(taxAmount);

    document.getElementById('result').style.display = 'block';
}

window.onload = () => {
    if (!document.querySelector('.subproduct-item')) addSubproduct();
};