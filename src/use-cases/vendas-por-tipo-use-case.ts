import { PagamentoRepository } from "../db/repositories/pagamento-repository";

export async function vendasPorTipoUseCase() {
  const repository = new PagamentoRepository();

  const pagamentos = await repository.findAll();

  const vendasPorTipo = pagamentos.reduce(
    (acumulado, pagamento) => {
      const tipo = pagamento.imovel.tipo_imovel.descricao;

      if (!acumulado[tipo]) {
        acumulado[tipo] = {
          tipo,
          valorTotal: 0,
        };
      }

      acumulado[tipo].valorTotal += Number(
        pagamento.valor_do_pagamento
      );

      return acumulado;
    },
    {} as Record<
      string,
      {
        tipo: string;
        valorTotal: number;
      }
    >
  );

  const resultados = Object.values(vendasPorTipo);

  const valorTotalGeral = resultados.reduce(
    (total, item) => total + item.valorTotal,
    0
  );

  return resultados.map((item) => ({
    tipo: item.tipo,
    valorTotal: item.valorTotal,
    percentual: Number(
      ((item.valorTotal / valorTotalGeral) * 100).toFixed(2)
    ),
  }));
}
