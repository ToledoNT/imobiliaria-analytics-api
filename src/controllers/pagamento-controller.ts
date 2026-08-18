import { NextResponse } from "next/server";
import { buscarPagamentosUseCase } from "../use-cases/buscar-pagamentos-use-case";

export async function pagamentoController() {
  try {
    const pagamentos = await buscarPagamentosUseCase();

    return NextResponse.json(pagamentos);
  } catch (error) {
    console.error("Erro ao buscar pagamentos:", error);

    return NextResponse.json(
      { error: "Erro ao buscar pagamentos" },
      { status: 500 }
    );
  }
}