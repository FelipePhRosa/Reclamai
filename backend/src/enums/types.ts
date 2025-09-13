enum Reportstatus {
    PENDENTE = 'pendente',
    APROVADO = 'aprovado',
    REJEITADO = 'rejeitado'
};

enum Role {
    Owner = 1,
    Admin = 2,
    Moderador = 3,
    Suporte = 4,
    UserComum = 5,
    Banned = 6,
    Prefeito = 7,
    Vereador = 8,
    Presidente = 9
};

export enum ReportCategory {
  Deslizamentos = 1,
  Alagamentos = 2,
  Assalto = 3,
  Incêndio = 4,
  Iluminacao = 5,
  Buracos = 6,
  Desabamentos = 7,
  Outros = 8
}
