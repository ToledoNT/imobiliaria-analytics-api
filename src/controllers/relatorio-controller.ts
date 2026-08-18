import { NextResponse } from "next/server";
import { pagamentosPorImovelUseCase } from "../use-cases/pagamentos-por-imovel-use-case";
import { vendasPorMesUseCase } from "../use-cases/vendas-por-mes-use-case";
import { vendasPorTipoUseCase } from "../use-cases/vendas-por-tipo-use-case";

export async function pagamentosPorImovelController() {
  try {
    const resultado = await pagamentosPorImovelUseCase();

    return NextResponse.json(resultado);
  } catch (error) {
    console.error(
      "Erro ao buscar pagamentos acumulados por imóvel:",
      error
    );

    return NextResponse.json(
      {
        error: "Erro ao buscar pagamentos acumulados por imóvel",
      },
      {
        status: 500,
      }
    );
  }
}

export async function vendasPorMesController() {
  try {
    const resultado = await vendasPorMesUseCase();

    return NextResponse.json(resultado);
  } catch (error) {
    console.error(
      "Erro ao buscar vendas por mês:",
      error
    );

    return NextResponse.json(
      {
        error: "Erro ao buscar vendas por mês",
      },
      {
        status: 500,
      }
    );
  }
}

export async function vendasPorTipoController() {
  try {
    const resultado = await vendasPorTipoUseCase();

    return NextResponse.json(resultado);
  } catch (error) {
    console.error(
      "Erro ao buscar vendas por tipo de imóvel:",
      error
    );

    return NextResponse.json(
      {
        error: "Erro ao buscar vendas por tipo de imóvel",
      },
      {
        status: 500,
      }
    );
  }
}