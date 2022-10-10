import { Loja } from "./Loja";

export interface Vendedor {
  email: string;
  password: string;
  idVendedor: number;
  nome: string;
  loja: Loja;
}
