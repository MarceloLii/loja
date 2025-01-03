let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function atualizarCarrinho() {
    const tabela = document.getElementById('tabela-carrinho');
    tabela.innerHTML = `
        <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th>Ações</th>
        </tr>
    `;

    let total = 0;

    carrinho.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.produto}</td>
            <td>R$ ${item.preco.toFixed(2)}</td>
            <td>
                <button onclick="removerItem(${index})">Remover</button>
            </td>
        `;
        tabela.appendChild(tr);
        total += item.preco;
    });

    const frete = calcularFrete();

    const trFrete = document.createElement('tr');
    trFrete.innerHTML = `
        <td colspan="2">Frete</td>
        <td>R$ ${frete.toFixed(2)}</td>
    `;
    tabela.appendChild(trFrete);

    const trTotal = document.createElement('tr');
    trTotal.innerHTML = `
        <td colspan="2"><strong>Total</strong></td>
        <td><strong>R$ ${(total + frete).toFixed(2)}</strong></td>
    `;
    tabela.appendChild(trTotal);
}

function calcularFrete() {
    const freteOption = document.getElementById('select-frete').value;
    if (freteOption === 'SQN 305') return 0;
    if (freteOption === 'SQN 302' || freteOption === 'SQN 102') return 5;
    if (freteOption === 'SQN 303' || freteOption === 'SQN 103') return 4;
    if (freteOption === 'SQN 304' || freteOption === 'SQN 104') return 3;
    if (freteOption === 'SQN 306' || freteOption === 'SQN 106') return 3;
    if (freteOption === 'SQN 307' || freteOption === 'SQN 107') return 5;
    if (freteOption === 'SQN 308' || freteOption === 'SQN 108') return 7;
    return 0;
}

function removerItem(index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
    atualizarCarrinho();
}

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function finalizarCompra() {
    const nome = document.getElementById('nome').value;
    const complemento = document.getElementById('complemento').value;
    const textoCarrinho = carrinho.map(item => `${item.produto} - R$ ${item.preco.toFixed(2)}`).join(', ');
    const frete = calcularFrete();
    const total = carrinho.reduce((sum, item) => sum + item.preco, 0) + frete;
    const mensagem = `Olá, meu nome é ${nome}. Gostaria de finalizar minha compra: ${textoCarrinho}. Frete: R$ ${frete.toFixed(2)}, Total: R$ ${total.toFixed(2)}. Complemento: ${complemento}`;
    const telefone = '61991775771';
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

document.addEventListener('DOMContentLoaded', atualizarCarrinho);
