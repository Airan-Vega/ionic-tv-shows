# Project Creation

It has been created using the tab template that comes with Ionic.

## Versions Used:

- **NodeJS**: 22.19.0
- **npm**: 10.9.3
- **Ionic**: 7.2.1
- **Angular**: 20.0.0

## Command to Start the Application:

```bash
ionic serve
```

## Command to Start the Application in android:
```bash
ionic build
npx cap add android
npx cap open android
npx cap sync android
```
https://capacitorjs.com/docs/android

## Command to Start the Application in ios:
```bash
ionic build
npx cap add ios
npx cap open ios
npx cap sync ios
```
https://capacitorjs.com/docs/ios

# Folder Organization

I have chosen to structure the files in a modular way to separate the business logic into different modules. This organization facilitates the scalability and maintenance of the project.
All modules will be contained within the “feature” folder. In this case, only one module was needed, which would be tv-shows. 
