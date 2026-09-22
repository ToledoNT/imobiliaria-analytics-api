import { PagamentoRepository } from "../db/repositories/pagamento-repository";

export async function pagamentosPorImovelUseCase() {
  const repository = new PagamentoRepository();

  const pagamentos = await repository.findAll();

  // Programação funcional: reduce() percorre os pagamentos,
  // agrupa por código do imóvel e acumula os valores.
  const pagamentosPorImovel = pagamentos.reduce(
    (acumulado, pagamento) => {
      // Obtém o código do imóvel de cada pagamento.
      const codigoImovel = pagamento.imovel.codigo;

      // Cria o registro do imóvel caso ele ainda não exista.
      if (!acumulado[codigoImovel]) {
        acumulado[codigoImovel] = {
          codigoImovel: pagamento.imovel.codigo,
          descricaoImovel: pagamento.imovel.descricao,
          valorAcumulado: 0,
        };
      }

      // Soma o valor do pagamento ao total acumulado do imóvel.
      acumulado[codigoImovel].valorAcumulado += Number(
        pagamento.valor_do_pagamento
      );

      return acumulado;
    },
    {} as Record<
      number,
      {
        codigoImovel: number;
        descricaoImovel: string;
        valorAcumulado: number;
      }
    >
  );

  // Converte o objeto agrupado em um array para retornar o resultado.
  return Object.values(pagamentosPorImovel);
}