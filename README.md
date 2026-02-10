# Vue-Vuetify-for-Java-Spring-Boot-MongoDB
Frontend này được thiết kế để gọi đến các REST API `/api/*` của backend Spring Boot qua Vite proxy, gửi/nhận JSON với JWT authentication, và render giao diện tương ứng với 3 vai trò (Customer, Artisan, Admin) — toàn bộ endpoint đã được map sẵn trong `src/api/services.js`, chỉ cần backend implement đúng các controller là chạy.
