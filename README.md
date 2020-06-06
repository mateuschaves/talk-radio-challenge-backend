# Talk Radio Challenge
Teste prático para a vaga de Desenvolvedor Backend NodeJS Pleno


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
