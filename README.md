## Start the App

### `npm start`

## Component Tree

- root:
    - App:
        - ListRepositories (repos, currentPage)
            - SearchForm (username)
            - Table
            - ClientSidePagination 
        - CreateRepository
            - CreateForm

## Reference

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Scaffolded by `npx create-react-app my-app --template typescript` (https://create-react-app.dev/docs/adding-typescript/)

For filtering and sorting, I found an example from https://tanstack.com/table/latest/docs/framework/react/examples/filters, and used code from there.
 
            