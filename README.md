# Foodstyle App

The application is responsible of:

- User authentication
- Todo management

## Dependencies

- yarn

## Installation

```bash
$ yarn
```

## Create the .env.dev file

```bash
$ cp .env.example .env.dev
```

_For testing purposes I hardcoded the local API endpoint._

```bash
API=http://localhost:4000
```

## Generate react hooks from the GraphQL schema

The following command will generate `src/hooks/api.ts` that will contain all the queries, mutations and typings for the graphql files specified in `src/operations/`.

_Make sure that the API is running and is accessible on the `API` environment variable that you provided so the introspection will work._

```bash
$ API=http://localhost:4000 yarn codegen
```

## Running the app

```bash
$ yarn dev
```
