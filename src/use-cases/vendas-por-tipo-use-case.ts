import { PagamentoRepository } from "../db/repositories/pagamento-repository";

export async function vendasPorTipoUseCase() {
  const repository = new PagamentoRepository();

  const pagamentos = await repository.findAll();

  // Programação funcional: reduce() percorre os pagamentos,
  // agrupa por tipo de imóvel e acumula os valores.
  const vendasPorTipo = pagamentos.reduce(
    (acumulado, pagamento) => {
      const tipo = pagamento.imovel.tipo_imovel.descricao;

      // Cria o registro do tipo caso ainda não exista.
      if (!acumulado[tipo]) {
        acumulado[tipo] = {
          tipo,
          valorTotal: 0,
        };
      }

      // Soma o valor do pagamento ao total daquele tipo.
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

  // Converte o objeto agrupado em uma lista.
  const resultados = Object.values(vendasPorTipo);

  // Programação funcional: reduce() calcula o valor total
  // de todos os tipos de imóveis.
  const valorTotalGeral = resultados.reduce(
    (total, item) => total + item.valorTotal,
    0
  );

  // Programação funcional: map() percorre os resultados
  // e cria o resultado final, incluindo o percentual.
  return resultados.map((item) => ({
    tipo: item.tipo,
    valorTotal: item.valorTotal,
    percentual: Number(
      ((item.valorTotal / valorTotalGeral) * 100).toFixed(2)
    ),
  }));
}