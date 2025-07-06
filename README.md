 # To run the application:

 **Prerequisite**: Ensure Node.js version 22 or higher is installed to run the application

  ## Development mode:
  ### Terminal 1: Start Spring Boot backend
  ```bash
  mvn spring-boot:run
  ```

  ### Terminal 2: Start React frontend
  ```bash
  cd client
  npm run dev
  ```

  ## Production build:
  ### Build everything together
  ```bash
  mvn clean install
  ```
  ### Then run the Spring Boot app (frontend will be served at localhost:8080)
  ```bash
  java -jar target/demo-0.0.1-SNAPSHOT.jar
  ```

# Testing the API

## GET /products (No Authentication)
### Should return 401 Unauthorized since authentication is required.
```bash
curl -X GET http://localhost:8080/products
```

## GET /products (User Role)
### Should return 200 OK with an empty list initially (or products if data exists).
```bash
curl -X GET -u user:password http://localhost:8080/products
```

## POST /products (Admin Role)
### Creates a new product; should return 201 Created with the product details.
```bash
curl -X POST -u admin:password -H "Content-Type: application/json" -d '{"name":"Laptop","description":"Gaming laptop","price":999.99,"category":"Electronics"}' http://localhost:8080/products
```

## GET /products/{id} (User Role)
### Retrieves the product with ID 1; should return 200 OK with the product details.
```bash
curl -X GET -u user:password http://localhost:8080/products/1
```

## PUT /products/{id} (Admin Role)
### Updates the product with ID 1; should return 200 OK with the updated product.
```bash
curl -X PUT -u admin:password -H "Content-Type: application/json" -d '{"name":"Updated Laptop","description":"New description","price":1099.99,"category":"Electronics"}' http://localhost:8080/products/1
```

## DELETE /products/{id} (Admin Role)
### Deletes the product with ID 1; should return 204 No Content.
```bash
curl -X DELETE -u admin:password http://localhost:8080/products/1
```

## POST /products (User Role)
### Attempts to create a product as a USER; should return 403 Forbidden since USER lacks permission.
```bash
curl -X POST -u user:password -H "Content-Type: application/json" -d '{"name":"Test","price":10,"category":"Test"}' http://localhost:8080/products
```

## POST /products (Admin Role, Invalid Data)
### Attempts to create a product with invalid data (empty name, negative price, empty category);
### should return 400 Bad Request with validation error details.
```bash
curl -X POST -u admin:password -H "Content-Type: application/json" -d '{"name":"","price":-1,"category":""}' http://localhost:8080/products
```
