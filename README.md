# Imatra eKolikko PWA Web-app

The application introduces an innovative way for the citizens of Imatra to do small tasks for the community and for each other and in return to get paid in virtual credits for the tasks performed. Then, in turn, they could use those credits to pay for different services that the City of Imatra manages and provides.

To give life to the idea, a software project has been implemented in the form of a progressive web application which is also suitable for mobile devices. Through the application, the people using it are able to post tasks, apply for tasks, get credits for the tasks done and give credits to people for doing the tasks, redeem different benefits with their credits, as well as transfer the credits to someone else using the application. 

## How to run the Application

The application has two parts: Front-end implemented with Angular 7, and the back-end done with Java Spring Boot. To have the application up and runningm you need to have the following pre-installed:

- Java 8
- Git
- Angular cli
- MySQL
- IDE such as IntelliJ Idea
- Tomcat
- NodeJs to run Angular (Guides how to setup an angular project: https://angular.io/guide/quickstart)

There are three core modules in the app: 
e-money-ui - contains the front-end of the application with Angular 7 and PWA architecture.
e-money-web - contains the back-end of the application, controllers,models, services and repositories.
e-money-core - contains the core controllers/services and repositories using generics.

To run the front-end of the application go to e-money-ui/src/main/ng-client execute the following commands:
```bash
npm install
ng serve -o
```
To run the back-end of the application, first you need to configure the database. To do that, create an empty database in MySQL then go to e-money-web/src/main/resources/application.properties and replace the "spring.datasource.url", "spring.datasource.username" and "spring.datasource.password" with your database credentials. After that, open IntelliJ, open Maven, go to imatra_e-money (root) and click "clean" and after that "install". Select "EmoneyWebStarter" and hit run.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)

# 

