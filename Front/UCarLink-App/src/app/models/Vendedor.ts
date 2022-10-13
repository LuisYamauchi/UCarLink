import { Loja } from "./Loja";

export interface Vendedor {
  idVendedor: number;
  nome: string;
  usuario: string;
  email: string;
  password: string;
  loja: Loja;
}
