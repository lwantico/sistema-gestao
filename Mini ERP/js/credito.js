document.addEventListener("DOMContentLoaded", () => {

    const btnCredito = document.getElementById("btnCredito");
    const statusPedido = document.querySelector(".pedido-header .status");

    if (!btnCredito || !statusPedido) return;

    btnCredito.onclick = () => {

        const limiteCliente = 500;
        const totalPedido = 250;

        if (totalPedido > limiteCliente) {
            alert("Crédito NEGADO ❌\nLimite insuficiente.");
            statusPedido.textContent = "Crédito Negado";
            statusPedido.className = "status negado";
            return;
        }

        if (!confirm("Crédito disponível.\nDeseja aprovar a venda no crédito?")) {
            return;
        }

        // Simula parcelamento
        const valorParcela = (totalPedido / parcelas).toFixed(2);

        const dadosCredito = {
            pedido: 101,
            total: totalPedido,
            parcelas: parcelas,
            valorParcela: valorParcela,
            status: "ativo"
        };

        localStorage.setItem("credito_pedido_101", JSON.stringify(dadosCredito));

        statusPedido.textContent = "Crédito Aprovado";
        statusPedido.className = "status aprovado";

        alert(
            "Crédito aprovado ✅\n" +
            `Parcelado em ${parcelas}x de R$ ${valorParcela}`
        );
    };
});
