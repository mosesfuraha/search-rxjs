# RxjsSearch

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.0.

## Project Overview

RxjsSearch is an Angular application that demonstrates the use of RxJS observables, particularly BehaviorSubject, for state management and implementing add-to-cart functionality. The project fetches product data from the Fake Store API and allows users to search for products and add them to their cart.

Key features:

- Product listing and search functionality
- Add to cart feature
- Reactive state management using BehaviorSubject

You can view the deployed application here: [https://add-to-cart-hazel.vercel.app/](https://add-to-cart-hazel.vercel.app/)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Project Structure

The project includes a `ProductService` that handles fetching products from the Fake Store API and provides search functionality. The service uses RxJS operators like `retry`, `catchError`, and `map` for error handling and data transformation.
