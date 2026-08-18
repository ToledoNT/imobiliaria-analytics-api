import { PagamentoRepository } from "../db/repositories/pagamento-repository";

export async function pagamentosPorImovelUseCase() {
  const repository = new PagamentoRepository();

  const pagamentos = await repository.findAll();

  const pagamentosPorImovel = pagamentos.reduce(
    (acumulado, pagamento) => {
      const codigoImovel = pagamento.imovel.codigo;

      if (!acumulado[codigoImovel]) {
        acumulado[codigoImovel] = {
          codigoImovel: pagamento.imovel.codigo,
          descricaoImovel: pagamento.imovel.descricao,
          valorAcumulado: 0,
        };
      }

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

  return Object.values(pagamentosPorImovel);
}
