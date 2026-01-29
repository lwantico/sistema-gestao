document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("modalCliente");
    const btnNovo = document.getElementById("btnNovoCliente");
    const fechar = document.getElementById("fecharModalCliente");
    const salvar = document.getElementById("salvarCliente");
    const lista = document.getElementById("listaClientes");

    const inputs = modal.querySelectorAll("input, textarea");

    // ===== ABRIR MODAL =====
    btnNovo.onclick = () => {
        modal.style.display = "flex";
        inputs.forEach(i => i.value = "");
        delete salvar.dataset.editando;
    };

    // ===== FECHAR MODAL =====
    fechar.onclick = () => {
        modal.style.display = "none";
    };

    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    };

    // ===== SALVAR CLIENTE =====
    salvar.onclick = () => {

        let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
        let idEditando = salvar.dataset.editando;

        let cliente;

        if (idEditando) {
            cliente = clientes.find(c => c.id == idEditando);
        } else {
            cliente = { id: Date.now() };
        }

        // Preencher dados
        cliente.nome = inputs[0].value.trim();
        cliente.cpf = inputs[1].value.trim();
        cliente.telefone = inputs[2].value.trim();
        cliente.email = inputs[3].value.trim();
        cliente.limite = Number(inputs[4].value);
        cliente.obs = inputs[5].value.trim();

        if (!cliente.nome || !cliente.cpf) {
            alert("Nome e CPF são obrigatórios");
            return;
        }

        if (!idEditando) {
            clientes.push(cliente);
        }

        delete salvar.dataset.editando;

        localStorage.setItem("clientes", JSON.stringify(clientes));

        modal.style.display = "none";
        renderizarClientes();
    };

    // ===== RENDERIZAR LISTA =====
    function renderizarClientes() {

        let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
        lista.innerHTML = "";

        clientes.forEach(cliente => {

            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${cliente.nome}</td>
                <td>${cliente.cpf}</td>
                <td>${cliente.telefone}</td>
                <td>R$ ${cliente.limite.toFixed(2)}</td>
                <td>
                    <button class="btn small ver">👁 Ver</button>
                    <button class="btn small warning editar">✏ Editar</button>
                </td>
            `;

            // VER
            tr.querySelector(".ver").onclick = () => {
                alert(
                    `Cliente\n\n` +
                    `Nome: ${cliente.nome}\n` +
                    `CPF: ${cliente.cpf}\n` +
                    `Telefone: ${cliente.telefone}\n` +
                    `E-mail: ${cliente.email || "—"}\n` +
                    `Limite: R$ ${cliente.limite.toFixed(2)}`
                );
            };

            // EDITAR
            tr.querySelector(".editar").onclick = () => {
                modal.style.display = "flex";

                inputs[0].value = cliente.nome;
                inputs[1].value = cliente.cpf;
                inputs[2].value = cliente.telefone;
                inputs[3].value = cliente.email;
                inputs[4].value = cliente.limite;
                inputs[5].value = cliente.obs;

                salvar.dataset.editando = cliente.id;
            };

            lista.appendChild(tr);
        });
    }

    // ===== CARREGAR AO ABRIR =====
    renderizarClientes();
});
