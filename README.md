# Backend_postgresSql

This API provides a powerful backend solution that manages user and product data, offering seamless CRUD (Create, Read, Update, Delete) operations on products while enforcing user authentication for enhanced security.



## Introduction

User and Product Entities: We've implemented a robust data structure that includes user and product entities, establishing a clear one-to-many and many-to-one relationship. Users can be associated with multiple products, providing a comprehensive data model.

CRUD Operations: Our API enables Create, Read, Update, and Delete operations on products. This allows users to efficiently manage their product listings, making it easy to add new products, update existing ones, and remove outdated entries.

Authentication Middleware: To ensure data integrity and user privacy, we've integrated a middleware that mandates user authentication before performing any CRUD operation. This safeguards sensitive information and prevents unauthorized access.

Scalable Backend: Powered by PostgreSQL and Express.js, our backend is designed for scalability, ensuring smooth handling of requests even as the application grows. This solid foundation allows us to focus on expanding features without worrying about infrastructure limitations.


This API was developed as an assessment for an internship.
