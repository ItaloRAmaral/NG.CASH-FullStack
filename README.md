# Desafio-NG.CASH 
###### by _[Italo Amaral](https://www.linkedin.com/in/italo-rockenbach-594082132/)_


## 📃 Desafio 
Estruturar uma aplicação web fullstack, dockerizada, cujo objetivo seja possibilitar que usuários da NG consigam realizar transferências internas entre si.

## 🛠️ Ferramentas Utilizadas

## - Front End:
  - React
  - Typescript
  - React Router Dom
  - Context Api
  - React Hooks
  - Phosphor React Icons
  
## - Back End:
  - Node
  - Typescript
  - Express
  - Cors
  - Sequelize
  - md5
  - Jwt

### ⚙️ Como executar

Você precisa ter instalado as seguintes ferramentas: [Git](https://git-scm.com), [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/install/).

Será necessário que a porta 3000 e 3001 estejam disponíveis para a aplicação, Postgresql usará a porta 5432 e o PG Adming usará a 5050

1 - Clone o repositório em uma pasta de sua preferencia 
```
git@github.com:ItaloRAmaral/DesafioTecnico-NG.git
```
2 - Entre na pasta `app` e suba o dockercompose, todas as depêndencias serão automaticamente instaladas
```
npm run compose:up   // para subir a aplicação
npm run compose:down // para parar completamente a aplicação
```
3 - Após rodar o comando, aguarde um pouco que a aplicação irá ficar disponivel nas seguintes rotas:

  `- Front End: http://localhost:3000`

  `- Back End: http://localhost:3001`

# Back-End

## 1 - Rotas do Usuário

###  Login

| Método | Funcionalidade             | URL                              |
| ------ | -------------------------- | -------------------------------- |
| `POST` | Realiza o login do usuário | http://localhost:3001/user/login |

Nessa requisição `POST` é necessário informar o seguinte JSON:

```
{
  "username": "Nome do Usuário",
  "password": "senha_secreta"
}
```

Esta rota retorna o seguinte JSON:
```
{
	"token": 'token_ultra_secreto',
	"username": "Nome do Usuário"
}
```
### Register

| Método | Funcionalidade             | URL                                 |
| ------ | -------------------------- | ----------------------------------- |
| `POST` | Realiza o login do usuário | http://localhost:3001/user/register |

Nessa requisição `POST` é necessário informar o seguinte JSON:

```
{
  "username": "Nome do Usuário",
  "password": "senha_secreta"
}
```
Esta requisição retorna o seguinte JSON 
```
{
	"id": id do usuário,
	"username": "Nome do Usuário",
	"password": "senha_secreta",
	"accountId": o id da conta do usuário,
	"account": {
		"id": o id da conta do usuário,
		"balance": 100 // por padrão é colocado 100 reais de balance para todo novo usuário
	},
	"token": "token_ultra_secreto"
}
```


### Informações do usuário

| Método | Funcionalidade                                    | URL                                |
| ------ | ------------------------------------------------- | ---------------------------------- |
| `GET`  | Recupera as informações do usuário e da sua conta | http://localhost:3001/user/account |

É necesário o envio de um token válido atravéz do headers

Nessa requisição `GET` é retornada as seguintes informações

```
{
  "id": 1,
  "username": "Nome do Usuário",
  "accountId": 1,
  "account": {
    "balance": 100,
  }
}
```

## 2 - Rotas de Transações

Todos as rotas abaixo necessitam de um token válido, que é gerado no login do usário, para poderem funcionar. Este token deve ser passado pelo `header` da requisição na chave `authorization`. 

| Método | Funcionalidade                        | URL                               |
| ------ | ------------------------------------- | --------------------------------- |
| `POST`   | Cria uma nova transação entre contas | http://localhost:3001/transaction/deposit |

Nessa requisição `POST` é necessário informar o seguinte JSON:

```
{
 "username": "nome do usuário a ser transferido",
 "amount": 5 // valor a ser tranferido
}
```

Essa rota retorna o seguinte JSON:
```
{
	"id": id da transferencia,
	"creditedAccountId": id da conta da pessoa que recebeu a transferencia,
	"debitedAccountId": id da conta da pessoa que fez a transferencia,
	"value": "valor da transferencia",
	"createdAt": "2022-11-21T23:32:28.436Z"
}

```

| Método | Funcionalidade                                   | URL                                      |
| ------ | ------------------------------------------------ | ---------------------------------------- |
| `GET`    | Retorna todas as transações do usuário           | http://localhost:3001/transaction/:accountId        |


Nessa requisição `GET` é retornada as seguintes informações

```
[
 {
   "id": 1, // id do usuário que está transferindo
   "debitedAccountId": 1, // id da conta que está sendo debitada
   "creditedAccountId": 2, // id da conta que está sendo creditada
   "value": 50, // valor a ser tranferido
   "createdAt": "2022-11-21T18:26:01.271Z", // data da transferencia
   "debitedAccount": {
        "id": 1,
        "user": {
        "username": "nome do usuário" // nome do usuário que está tranferindo
        "id": 1,
        }
    },
    "creditedAccount": {
        "id": 2,
        "user": {
        "username": "nome do usário" // nome do usuário que está recebendo
        "id": 2,
        }
    }
]
```

# Front End

Para ter acesso ao front end da aplicação, basta apenas acessar o endereço `http://localhost:3000/`.

## 1 - Home Page
Página simples, que lembra o site oficial da _[NG.CASH](http://ng.cash)_, apenas o botão login está funcional. Os outros itens do header são apenas para contribuir com a estética.

Para realizar o login ou se cadastrar, basta clicar no botão `Login` que aparecerá um modal para você fazer o login, ou cadastro

<div align="center">
  <img src="./images/home-page.png" alt="Desafio NG.CASH - Home"/>
</div>

## 2 - Tela de Login e Cadastro

Para realizar o `login` é preciso digitar seu `username` com mais de 3 caracteres e sua `senha` com 8 caracteres, contendo letras maiúsculas, minúsculas e números. 

Caso ainda não tenha conta na NG é possível se cadastrar preenchendo o formulário ao lado sendo o `username` com mais de 3 caracteres e sua `senha` com 8 caracteres que deverá conter letras maiúsculas, minúsculas e números.

<div align="center">
  <img src="./images/login-cadastro.png" alt="Desafio NG.CASH - Registro"/>
</div>

## 3 - Dashboard do Usuário

Com o usuário logado, a tela principal apresenta: 

- saldo atual do usuário;

- Seção voltada à realização de transferências para outros usuários NG a partir do username de quem sofrerá o cash-in;

- Botão para realizar o log-out.

- Tabela de transações realizadas pelo usuário.

- Mecanismo para filtrar a tabela por data de transação e/ou transações do tipo cash-in/cash-out;

<p align="center">
  <img src="./images/dashboard.png" alt="Desafio NG.CASH - Tela Principal"/>
</p>
