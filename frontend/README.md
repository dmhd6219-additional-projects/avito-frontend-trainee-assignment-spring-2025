## Запуск локально

1. Сборка
    ```bash
    docker build -t avito-frontend .
    ```
2. Запуск
    ```bash
    docker run --name avito-frontend-container -p 4000:4000 -e VITE_BACKEND_BASE_URL="http://localhost:8080/api/v1" avito-frontend
    ```
