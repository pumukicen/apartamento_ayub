export interface Comentario {
  text: string;
  user: string;
  img?: string;
  date: Date | number;
  lang?: string;
  email: string;
  key?: string;
}
