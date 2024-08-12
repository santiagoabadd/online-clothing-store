FullStack Online Store Using a Microservices Architecture

The backend was built with Spring Boot, implementing technologies such as Docker for containerization, Spring Cloud Gateway and Eureka for routing and service discovery, and Kafka for asynchronous messaging. Using WebFlux, the order service communicates reactively with the customer and inventory services. Each time an order is created, a query is made to the customer's token to identify the associated customer. Additionally, the inventory service checks if there is sufficient stock of all the products in the order.

Resilience4j is used to protect and ensure the resilience of these service interactions. Mechanisms were implemented to handle potential failures in service communication and to ensure that the system remains stable even in adverse situations.

Authentication and authorization were managed with Spring Security and Keycloak, while MySQL and PostgreSQL were used as databases.

On the frontend, React with TypeScript was used to create an interactive user interface. Redux is employed to manage the global state of the shopping cart, ensuring that operations related to the cart (such as adding, removing, and updating products) are handled efficiently and consistently. Keycloak is integrated for authentication through oidc-client, ensuring a smooth and secure user experience.






Tienda online FullStack utilizando una arquitectura de microservicios.

El backend fue construido con Spring Boot, implementando tecnologías como Docker para contenerización, Spring Cloud Gateway y Eureka para enrutamiento y descbrimiento de servicios, y Kafka para mensajería asíncrona. Mediante webflux, el servicio de órdenes se comunica de manera reactiva con los servicios de clientes e inventario. Cada vez que se crea una orden, se realiza una consulta al token del cliente para identificar al cliente asociado. Además, mediante el servicio de inventario, se verifica si hay suficiente stock de todos los productos en la orden.
Se utiliza Resilience4j para proteger y asegurar la resiliencia de estas interacciones entre servicios. Implementé mecanismos para manejar posibles fallos en la comunicación entre servicios y garantizar que el sistema se mantenga estable incluso en situaciones adversas.
La autenticación y autorización fueron gestionadas con Spring Security y Keycloak, mientras que MySQL y PostgreSQL se utilizaron como bases de datos.

En el frontend, utilicé React con TypeScript para crear una interfaz de usuario interactiva. Redux es empleado para gestionar el estado global del carrito de compras, asegurando que las operaciones relacionadas con el carrito (como añadir, eliminar y actualizar productos) sean manejadas de manera eficiente y consistente. Keycloak se integra para la autenticación a través de oidc-client, garantizando una experiencia de usuario fluida y segura.

![Diagrama Online Shop](https://drive.google.com/uc?id=180GCkrzY5-ejVp0EfUc7SN28q3PxNzMI)

HOME VIEW

![Home View](https://drive.google.com/uc?id=1093R9sBSpTem2KvSNhz-iuwVD4JMilPx)
![Home View2](https://drive.google.com/uc?id=1fGpsMxuY_CRF7R7-sOkkMwKGEaJgRuim)
![Home View2](https://drive.google.com/uc?id=1xBtIQHVh7bY_0jHfo8Gxena8haYiLOvB)
![Home View3](https://drive.google.com/uc?id=1xtnrrtCFeWnRPS9yrn4W8FjsMlpV8qv3)

PRODUCTS VIEW

![Products View](https://drive.google.com/uc?id=1m3VH9da2aemDD0KVpKFPAhmWaZu7wiVZ)
![Products View](https://drive.google.com/uc?id=1IR0Q9U9dikgh2MuGxrJM3a1Jh8fwo3H7)
![Products View](https://drive.google.com/uc?id=1XBjBbeqFM98aNBHlIh8Konfh2_EvutBX)

PRODUCT VIEW

![Product View](https://drive.google.com/uc?id=1-5RKo4XCamA-jrGz1qIbMYuFsZOXuoLa)

CART VIEW

![Cart View](https://drive.google.com/uc?id=19GUP1MFDtRmYM0j_Oq4OMH6QD65Nq2mp)


