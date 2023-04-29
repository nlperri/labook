# Labook

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter lista de posts;
- [x] Deve ser possível criar um post;
- [x] Deve ser possível editar um post;
- [x] Deve ser possível deletar um post;
- [x] Deve ser possível dar like/dislike em um post;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O post sempre deverá ter um usuário;
- [x] O usuário não deve poder dar like/dislike no próprio post;
- [x] Caso usuário dê um dislike em um post que já tenha dado dislike, o dislike é desfeito (deleta o item da tabela);
- [x] Caso usuário dê um like em um post que já tenha dado like, o like é desfeito (deleta o item da tabela);
- [x] Caso usuário dê um like em um post que tenha dado dislike, o like sobrescreve o dislike.
- [x] Caso usuário dê um dislike em um post que tenha dado like, o dislike sobrescreve o like.

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco SQLite;
- [x] O usuário deve ser identificado por um JJWT (JSON Web Token);
