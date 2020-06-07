# Talk Radio Challenge
👌 Teste prático para a vaga de Desenvolvedor Backend NodeJS Pleno


# Instalação

```bash
$ git clone https://github.com/mateuschaves/talk-radio-challenge.git
```

```bash
$ cd talk-radio-challenge
```

```bash
# yarn
$ yarn install

# npm
$ npm install
```

# Execução

```bash
# yarn
$ yarn start:dev

# npm
$ npm run start:dev
```

# Compilação

```bash
# yarn
$ yarn build

# npm
$ npm run build
```

# Testes

```bash

# yarn
$ yarn test

# npm
$ npm run test
```

# Arquitetura

Toda a lógica de parse está concentrada na pasta ``helpers`` que possui dois arquivos ``Game.ts`` e ``File.ts``.


# ``Game.ts``

Aqui estão concentrada todas as funções auxiliares relacionadas a captura das informações necessárias para o parse do arquivo de log.

```typescript
getAllGames(fileContent: string): string[] | null
```
Aceita o conteúdo do arquivo de log como parâmetro e retorna um array de ```string``` onde cada elemento são todos os logs de um jogo.

```typescript
getAllPlayersFromGame(game: string): Set<string>
```
Aceita os logs de um jogo como parâmetro e retorma os jogadores do jogo em uma estrutura de dados do tipo ``Set([])`` que não permite elementos repetidos.

```typescript
getGameLines(game: string): string[]
```
Também aceita os logs de um jogo como parâmetro, porém retorna um array de string, onde cada elemento do array é uma linha de log do jogo.

```typescript
getPlayersNamesFromKillEventLine(line: string): IPlayersNames
```
Aceita uma linha de log como parâmetro e retorna, se existir, um objeto contento o nome do jogador que matou e o nome do jogador que morreu.

```typescript
getPlayerScore(player: string, game: string): number
```
Aceita o nome do jogador e o conteúdo de log de um jogo como parâmetro, e retorna a pontuação do jogador.

```typescript
getAllKillsFromGame(game: string): number
```
Aceita os logs de um jogo como parâmetro e retorna a quantidade de kills que houveram na partida.

```typescript
proccessGeneralRank(fileContent: string): IRank[]
```
Aceita o conteúdo do arquivo de log como parâmetro, e retorna a pontuação geral de todos os jogadores.

```typescript
parseGame(game: string, id: number): IGame
```
Aceita os logs de um jogo e o seu id e retorna o no formato especificado as informações da partida.

```typescript
proccessGameLogFile(file: string): IGame[] 
```
Aceita o conteúdo do arquivo de log e retorna um array com todos os jogos no formato especificado.

# ``File.ts``
Aqui estão concentrada todas as funções auxiliares relacionadas a leitura do arquivo de log.

```typescript
readFile(fileName: string, encoding: EncondingOptions): string | null
```
Aceita o nome do arquivo e o tipo de codificação e retorna o conteúdo do arquivo informado.

# API

A API é possui duas rotas:

GET ``/game/:id``

Aceita como parâmetro o id de um jogo e retorna um objeto com as informações do jogo\
Obs: o parâmetro id é um número que inicia com 0 e representa individualmente cada partida.

Exemplo de resposta:
```json
{
    "total_kills": 4,
    "players": [
        "Isgalamido",
        "Mocinha",
        "Zeh",
        "Dono da Bola"
    ],
    "kills": [
        {
            "player": "Isgalamido",
            "kills": 1
        },
        {
            "player": "Mocinha",
            "kills": 0
        },
        {
            "player": "Dono da Bola",
            "kills": -1
        },
        {
            "player": "Zeh",
            "kills": -2
        }
    ]
}
```

GET ``/rank/general``

Não aceita nenhum parâmetro e retorna um ranking de jogadores, considerando todas as partidas, com mais kills.

```json
[
    {
        "player": "Isgalamido",
        "kills": 129
    },
    {
        "player": "Zeh",
        "kills": 116
    },
    {
        "player": "Oootsimo",
        "kills": 102
    },
    {
        "player": "Assasinu Credi",
        "kills": 71
    },
    {
        "player": "Dono da Bola",
        "kills": 33
    },
    {
        "player": "Chessus",
        "kills": 31
    },
    {
        "player": "Mocinha",
        "kills": 0
    },
    {
        "player": "UnnamedPlayer",
        "kills": 0
    },
    {
        "player": "Maluquinho",
        "kills": 0
    },
    {
        "player": "Mal",
        "kills": -15
    }
]
```
