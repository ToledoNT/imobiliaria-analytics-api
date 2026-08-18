import { PagamentoRepository } from "../db/repositories/pagamento-repository";

export async function vendasPorMesUseCase() {
  const repository = new PagamentoRepository();

  const pagamentos = await repository.findAll();

  const vendasPorMes = pagamentos.reduce(
    (acumulado, pagamento) => {
      const data = new Date(pagamento.data_do_pagamento);

      const ano = data.getFullYear();
      const mes = String(data.getMonth() + 1).padStart(2, "0");

      const chave = `${ano}-${mes}`;

      if (!acumulado[chave]) {
        acumulado[chave] = {
          mes: chave,
          valorTotal: 0,
        };
      }

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

  return Object.values(vendasPorMes).sort((a, b) =>
    a.mes.localeCompare(b.mes)
  );
}