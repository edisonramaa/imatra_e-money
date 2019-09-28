# Imatra eKolikko API Documentation


This README shows how to use the API documentation, how to deploy it and how to make changes to the file. 

## Making changes to the API

The API is developed using Swagger. Swagger allows you to describe the structure of your APIs so that machines can read them. We do this by changing the swagger.yaml file and adding/removing or changing the yaml code depending on our needs. After that we can deploy our new changes with redoc-cli.

## How to install redoc-cli

To use redoc and generate the API documentation from the swagger.yaml file, you need to have redoc-cli installed in your machine. To install the redoc-cli you can run the following command globally:

```bash
npm install -g redoc-cli
```

## How to build


After you've made changes to the swagger.yaml file, you run the following command to build the file:
```bash
redoc-cli bundle swagger.yaml --options.theme.colors.primary.main=orange --options.hide-download-button=true
```
After the build we can edit the file that got generated from redoc-cli as a normal HTML page. Most of the code is bundled so the only things that can be changed are basic things like the title of the page.or basic css.

## References
Getting started links:
- [What is Swagger](https://swagger.io/docs/specification/2-0/what-is-swagger/)
- [Swagger basic structure](https://swagger.io/docs/specification/basic-structure/)
- [Redoc](https://github.com/Redocly/redoc)
- [Redoc-cli](https://github.com/Redocly/redoc/blob/master/cli/README.md)


