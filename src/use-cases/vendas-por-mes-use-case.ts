import { PagamentoRepository } from "../db/repositories/pagamento-repository";

export async function vendasPorMesUseCase() {
  const repository = new PagamentoRepository();

  const pagamentos = await repository.findAll();

  // Programação funcional: reduce() percorre os pagamentos,
  // agrupa os valores por ano e mês e acumula o total.
  const vendasPorMes = pagamentos.reduce(
    (acumulado, pagamento) => {
      const data = new Date(pagamento.data_do_pagamento);

      const ano = data.getFullYear();
      const mes = String(data.getMonth() + 1).padStart(2, "0");

      // Cria uma chave para identificar cada mês.
      const chave = `${ano}-${mes}`;

      // Cria o registro do mês caso ainda não exista.
      if (!acumulado[chave]) {
        acumulado[chave] = {
          mes: chave,
          valorTotal: 0,
        };
      }

      // Soma o valor do pagamento ao total daquele mês.
      acumulado[chave].valorTotal += Number(
        pagamento.valor_do_pagamento
      );

      return acumulado;
    },
    {} as Record<
      string,
      {
        mes: string;
        valorTotal: number;
      }
    >
  );

  // Converte o resultado em array e ordena os meses.
  return Object.values(vendasPorMes).sort((a, b) =>
    a.mes.localeCompare(b.mes)
  );
}