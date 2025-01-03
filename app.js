let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function adicionarAoCarrinho(produto, preco) {
    // Verifica se os valores de produto e preco são válidos
    if (produto && preco !== undefined) {
        // Adiciona o produto e preço ao carrinho
        carrinho.push({ produto, preco });
        salvarCarrinho();
        atualizarCarrinhoCount();
    } else {
        console.error('Erro: Produto ou preço não definidos.');
    }
}

function salvarCarrinho() {
    // Salva o carrinho no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function atualizarCarrinhoCount() {
    // Atualiza o contador de itens no carrinho
    const carrinhoCount = document.getElementById('carrinho-count');
    carrinhoCount.textContent = carrinho.length;
}

document.addEventListener('DOMContentLoaded', atualizarCarrinhoCount);
