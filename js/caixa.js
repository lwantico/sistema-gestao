document.addEventListener("DOMContentLoaded", () => {

    const btnCaixa = document.getElementById("btnCaixa");
    const modal = document.getElementById("modalCaixa");
    const fecharModal = document.getElementById("fecharModal");
    const formaPagamento = document.getElementById("formaPagamento");
    const campoAut = document.getElementById("campoAut");
    const confirmar = document.getElementById("confirmarPagamento");
    const senhaInput = modal.querySelector('input[type="password"]');
    const autInput = campoAut.querySelector('input');

    const usarCredito = document.getElementById("usarCredito");
    const parcelamento = document.getElementById("parcelamentoCredito");
    const numParcelas = document.getElementById("numParcelas");

    if (!btnCaixa) return;

    // Abrir modal
    btnCaixa.onclick = () => {
        modal.style.display = "flex";
        senhaInput.value = "";
        formaPagamento.value = "";
        autInput.value = "";
        campoAut.style.display = "none";
        usarCredito.checked = false;
        parcelamento.style.display = "none";
    };

    // Fechar modal
    fecharModal.onclick = () => {
        modal.style.display = "none";
    };

    // Forma de pagamento
    formaPagamento.onchange = () => {
        if (formaPagamento.value === "pix" || formaPagamento.value === "cartao") {
            campoAut.style.display = "block";
        } else {
            campoAut.style.display = "none";
            autInput.value = "";
        }
    };

    // Usar crédito
    usarCredito.onchange = () => {

        if (!usarCredito.checked) {
            parcelamento.style.display = "none";
            return;
        }

        const credito = JSON.parse(
            localStorage.getItem("credito_pedido_101")
        );

        if (!credito) {
            alert("Crédito NÃO aprovado para este pedido.");
            usarCredito.checked = false;
            return;
        }

        parcelamento.style.display = "block";
        numParcelas.value = credito.parcelas;
    };

    // Confirmar pagamento
    confirmar.onclick = () => {

        if (!senhaInput.value) {
            alert("Digite a senha do caixa!");
            return;
        }

        if (!formaPagamento.value) {
            alert("Selecione a forma de pagamento!");
            return;
        }

        if (
            (formaPagamento.value === "pix" || formaPagamento.value === "cartao") &&
            !autInput.value
        ) {
            alert("Digite o AUT do comprovante!");
            return;
        }

        // Geração de parcelas
        if (usarCredito.checked) {

            const credito = JSON.parse(
                localStorage.getItem("credito_pedido_101")
            );

            const parcelas = [];
            const hoje = new Date();
            const qtd = Number(numParcelas.value);

            for (let i = 1; i <= qtd; i++) {
                const vencimento = new Date(hoje);
                vencimento.setMonth(hoje.getMonth() + i);

                parcelas.push({
                    pedido: 101,
                    numero: i,
                    totalParcelas: qtd,
                    valor: credito.valorParcela,
                    vencimento: vencimento.toISOString().split("T")[0],
                    status: "aberta"
                });
            }

            localStorage.setItem(
                "parcelas_pedido_101",
                JSON.stringify(parcelas)
            );
        }

        alert("Pagamento registrado com sucesso ✔");
        modal.style.display = "none";
    };
});
