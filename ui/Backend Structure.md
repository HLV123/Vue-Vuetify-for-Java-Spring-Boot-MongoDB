# Artesanía Viva — Backend (Java + Spring Boot + MongoDB)

---

## CẤU TRÚC THƯ MỤC BACKEND

```
artesania-viva-backend/
│
├── pom.xml
├── mvnw
├── mvnw.cmd
├── .gitignore
├── README.md
│
└── src/
    ├── main/
    │   ├── java/
    │   │   └── com/
    │   │       └── artesaniaviva/
    │   │           │
    │   │           ├── ArtesaniaVivaApplication.java
    │   │           │
    │   │           ├── config/
    │   │           │   ├── SecurityConfig.java
    │   │           │   ├── WebConfig.java
    │   │           │   ├── MongoConfig.java
    │   │           │   └── SwaggerConfig.java
    │   │           │
    │   │           ├── security/
    │   │           │   ├── JwtTokenProvider.java
    │   │           │   ├── JwtAuthenticationFilter.java
    │   │           │   ├── JwtAuthenticationEntryPoint.java
    │   │           │   ├── CustomUserDetails.java
    │   │           │   └── CustomUserDetailsService.java
    │   │           │
    │   │           ├── model/
    │   │           │   ├── User.java
    │   │           │   ├── Role.java
    │   │           │   ├── Product.java
    │   │           │   ├── ProductImage.java
    │   │           │   ├── Category.java
    │   │           │   ├── EthnicGroup.java
    │   │           │   ├── ArtisanProfile.java
    │   │           │   ├── Cart.java
    │   │           │   ├── CartItem.java
    │   │           │   ├── Order.java
    │   │           │   ├── OrderItem.java
    │   │           │   ├── OrderStatus.java
    │   │           │   ├── Review.java
    │   │           │   ├── Wishlist.java
    │   │           │   ├── CustomOrder.java
    │   │           │   ├── CustomOrderStatus.java
    │   │           │   ├── Payment.java
    │   │           │   ├── PaymentMethod.java
    │   │           │   ├── PaymentStatus.java
    │   │           │   ├── Address.java
    │   │           │   ├── Coupon.java
    │   │           │   ├── Blog.java
    │   │           │   ├── Notification.java
    │   │           │   └── Report.java
    │   │           │
    │   │           ├── repository/
    │   │           │   ├── UserRepository.java
    │   │           │   ├── ProductRepository.java
    │   │           │   ├── CategoryRepository.java
    │   │           │   ├── EthnicGroupRepository.java
    │   │           │   ├── CartRepository.java
    │   │           │   ├── OrderRepository.java
    │   │           │   ├── ReviewRepository.java
    │   │           │   ├── WishlistRepository.java
    │   │           │   ├── CustomOrderRepository.java
    │   │           │   ├── PaymentRepository.java
    │   │           │   ├── AddressRepository.java
    │   │           │   ├── CouponRepository.java
    │   │           │   ├── BlogRepository.java
    │   │           │   ├── NotificationRepository.java
    │   │           │   └── ReportRepository.java
    │   │           │
    │   │           ├── dto/
    │   │           │   ├── request/
    │   │           │   │   ├── LoginRequest.java
    │   │           │   │   ├── RegisterRequest.java
    │   │           │   │   ├── ChangePasswordRequest.java
    │   │           │   │   ├── ForgotPasswordRequest.java
    │   │           │   │   ├── ResetPasswordRequest.java
    │   │           │   │   ├── ProductRequest.java
    │   │           │   │   ├── CategoryRequest.java
    │   │           │   │   ├── EthnicGroupRequest.java
    │   │           │   │   ├── CartItemRequest.java
    │   │           │   │   ├── OrderRequest.java
    │   │           │   │   ├── ReviewRequest.java
    │   │           │   │   ├── CustomOrderRequest.java
    │   │           │   │   ├── CustomOrderResponseRequest.java
    │   │           │   │   ├── PaymentRequest.java
    │   │           │   │   ├── AddressRequest.java
    │   │           │   │   ├── CouponRequest.java
    │   │           │   │   ├── CouponValidateRequest.java
    │   │           │   │   ├── BlogRequest.java
    │   │           │   │   ├── ArtisanRegisterRequest.java
    │   │           │   │   ├── ArtisanProfileUpdateRequest.java
    │   │           │   │   ├── ShippingCalculateRequest.java
    │   │           │   │   ├── OrderStatusUpdateRequest.java
    │   │           │   │   ├── ShipOrderRequest.java
    │   │           │   │   ├── UserStatusUpdateRequest.java
    │   │           │   │   ├── ProductApprovalRequest.java
    │   │           │   │   └── ReportResolveRequest.java
    │   │           │   │
    │   │           │   └── response/
    │   │           │       ├── AuthResponse.java
    │   │           │       ├── UserResponse.java
    │   │           │       ├── ProductResponse.java
    │   │           │       ├── ProductDetailResponse.java
    │   │           │       ├── CategoryResponse.java
    │   │           │       ├── EthnicGroupResponse.java
    │   │           │       ├── ArtisanResponse.java
    │   │           │       ├── ArtisanDashboardResponse.java
    │   │           │       ├── ArtisanRevenueResponse.java
    │   │           │       ├── CartResponse.java
    │   │           │       ├── OrderResponse.java
    │   │           │       ├── OrderDetailResponse.java
    │   │           │       ├── ReviewResponse.java
    │   │           │       ├── WishlistResponse.java
    │   │           │       ├── CustomOrderResponse.java
    │   │           │       ├── PaymentResponse.java
    │   │           │       ├── PaymentStatusResponse.java
    │   │           │       ├── ShippingFeeResponse.java
    │   │           │       ├── ShippingProviderResponse.java
    │   │           │       ├── ShippingTrackResponse.java
    │   │           │       ├── AddressResponse.java
    │   │           │       ├── CouponResponse.java
    │   │           │       ├── CouponValidateResponse.java
    │   │           │       ├── BlogResponse.java
    │   │           │       ├── NotificationResponse.java
    │   │           │       ├── UnreadCountResponse.java
    │   │           │       ├── AdminDashboardResponse.java
    │   │           │       ├── RevenueStatResponse.java
    │   │           │       ├── OrderStatResponse.java
    │   │           │       ├── ReportResponse.java
    │   │           │       ├── PageResponse.java
    │   │           │       └── ApiErrorResponse.java
    │   │           │
    │   │           ├── service/
    │   │           │   ├── AuthService.java
    │   │           │   ├── UserService.java
    │   │           │   ├── ProductService.java
    │   │           │   ├── CategoryService.java
    │   │           │   ├── EthnicGroupService.java
    │   │           │   ├── ArtisanService.java
    │   │           │   ├── CartService.java
    │   │           │   ├── OrderService.java
    │   │           │   ├── ReviewService.java
    │   │           │   ├── WishlistService.java
    │   │           │   ├── CustomOrderService.java
    │   │           │   ├── PaymentService.java
    │   │           │   ├── ShippingService.java
    │   │           │   ├── AddressService.java
    │   │           │   ├── CouponService.java
    │   │           │   ├── BlogService.java
    │   │           │   ├── NotificationService.java
    │   │           │   ├── AdminService.java
    │   │           │   ├── FileStorageService.java
    │   │           │   └── EmailService.java
    │   │           │
    │   │           ├── service/impl/
    │   │           │   ├── AuthServiceImpl.java
    │   │           │   ├── UserServiceImpl.java
    │   │           │   ├── ProductServiceImpl.java
    │   │           │   ├── CategoryServiceImpl.java
    │   │           │   ├── EthnicGroupServiceImpl.java
    │   │           │   ├── ArtisanServiceImpl.java
    │   │           │   ├── CartServiceImpl.java
    │   │           │   ├── OrderServiceImpl.java
    │   │           │   ├── ReviewServiceImpl.java
    │   │           │   ├── WishlistServiceImpl.java
    │   │           │   ├── CustomOrderServiceImpl.java
    │   │           │   ├── PaymentServiceImpl.java
    │   │           │   ├── ShippingServiceImpl.java
    │   │           │   ├── AddressServiceImpl.java
    │   │           │   ├── CouponServiceImpl.java
    │   │           │   ├── BlogServiceImpl.java
    │   │           │   ├── NotificationServiceImpl.java
    │   │           │   ├── AdminServiceImpl.java
    │   │           │   ├── FileStorageServiceImpl.java
    │   │           │   └── EmailServiceImpl.java
    │   │           │
    │   │           ├── controller/
    │   │           │   ├── AuthController.java
    │   │           │   ├── ProductController.java
    │   │           │   ├── CategoryController.java
    │   │           │   ├── EthnicGroupController.java
    │   │           │   ├── ArtisanController.java
    │   │           │   ├── CartController.java
    │   │           │   ├── OrderController.java
    │   │           │   ├── ReviewController.java
    │   │           │   ├── WishlistController.java
    │   │           │   ├── CustomOrderController.java
    │   │           │   ├── PaymentController.java
    │   │           │   ├── ShippingController.java
    │   │           │   ├── AddressController.java
    │   │           │   ├── CouponController.java
    │   │           │   ├── BlogController.java
    │   │           │   ├── NotificationController.java
    │   │           │   └── AdminController.java
    │   │           │
    │   │           ├── exception/
    │   │           │   ├── GlobalExceptionHandler.java
    │   │           │   ├── ResourceNotFoundException.java
    │   │           │   ├── BadRequestException.java
    │   │           │   ├── UnauthorizedException.java
    │   │           │   ├── ForbiddenException.java
    │   │           │   ├── DuplicateResourceException.java
    │   │           │   └── FileStorageException.java
    │   │           │
    │   │           ├── mapper/
    │   │           │   ├── UserMapper.java
    │   │           │   ├── ProductMapper.java
    │   │           │   ├── CategoryMapper.java
    │   │           │   ├── EthnicGroupMapper.java
    │   │           │   ├── ArtisanMapper.java
    │   │           │   ├── CartMapper.java
    │   │           │   ├── OrderMapper.java
    │   │           │   ├── ReviewMapper.java
    │   │           │   ├── CustomOrderMapper.java
    │   │           │   ├── PaymentMapper.java
    │   │           │   ├── AddressMapper.java
    │   │           │   ├── CouponMapper.java
    │   │           │   ├── BlogMapper.java
    │   │           │   └── NotificationMapper.java
    │   │           │
    │   │           └── util/
    │   │               ├── SlugUtil.java
    │   │               └── DateUtil.java
    │   │
    │   └── resources/
    │       ├── application.yml
    │       ├── application-dev.yml
    │       ├── application-prod.yml
    │       └── data/
    │           ├── categories-init.json
    │           ├── ethnic-groups-init.json
    │           └── admin-init.json
    │
    └── test/
        └── java/
            └── com/
                └── artesaniaviva/
                    │
                    ├── ArtesaniaVivaApplicationTests.java
                    │
                    ├── controller/
                    │   ├── AuthControllerTest.java
                    │   ├── ProductControllerTest.java
                    │   ├── CategoryControllerTest.java
                    │   ├── CartControllerTest.java
                    │   ├── OrderControllerTest.java
                    │   └── AdminControllerTest.java
                    │
                    ├── service/
                    │   ├── AuthServiceTest.java
                    │   ├── ProductServiceTest.java
                    │   ├── CartServiceTest.java
                    │   ├── OrderServiceTest.java
                    │   └── AdminServiceTest.java
                    │
                    └── repository/
                        ├── UserRepositoryTest.java
                        ├── ProductRepositoryTest.java
                        └── OrderRepositoryTest.java
```

---

## GIẢI THÍCH TỪNG TẦNG

### `config/`

```
SecurityConfig.java              Cấu hình Spring Security, CORS, endpoint public/private
WebConfig.java                   Cấu hình CORS chi tiết, static resource, interceptor
MongoConfig.java                 Cấu hình MongoDB auditing (createdAt, updatedAt tự động)
SwaggerConfig.java               Cấu hình Swagger/OpenAPI cho tài liệu API
```

### `security/`

```
JwtTokenProvider.java            Tạo, parse, validate JWT token
JwtAuthenticationFilter.java     Filter chặn mọi request, đọc token từ header Authorization
JwtAuthenticationEntryPoint.java Xử lý lỗi 401 khi token không hợp lệ
CustomUserDetails.java           Implement UserDetails, chứa id, email, role
CustomUserDetailsService.java    Load user từ MongoDB theo email, dùng cho Spring Security
```

### `model/`

```
User.java                        @Document("users") — id, fullName, email, password, phone, avatar, role, addresses[], createdAt, updatedAt
Role.java                        Enum: CUSTOMER, ARTISAN, ADMIN
Product.java                     @Document("products") — id, name, slug, price, originalPrice, description, material, dimensions, weight, craftProcess, warranty, images[], categoryId, ethnicGroupId, artisanId, isUnique, stock, sold, rating, reviewCount, status, featured, createdAt, updatedAt
ProductImage.java                Embedded: id, url, isPrimary
Category.java                    @Document("categories") — id, name, slug, image, description, productCount
EthnicGroup.java                 @Document("ethnic_groups") — id, name, description, region
ArtisanProfile.java              Embedded trong User hoặc @Document("artisan_profiles") — shopName, ethnic, village, bio, experience, bankInfo
Cart.java                        @Document("carts") — id, userId, items[], updatedAt
CartItem.java                    Embedded: productId, name, price, image, quantity, isUnique
Order.java                       @Document("orders") — id, orderCode, userId, artisanId, items[], shippingAddress, paymentMethod, subtotal, shippingFee, discount, couponCode, total, status, note, trackingNumber, createdAt, updatedAt
OrderItem.java                   Embedded: productId, name, price, image, quantity
OrderStatus.java                 Enum: PENDING, CONFIRMED, PROCESSING, SHIPPING, DELIVERED, CANCELLED, RETURNED
Review.java                      @Document("reviews") — id, productId, userId, userName, rating, comment, createdAt
Wishlist.java                    @Document("wishlists") — id, userId, productIds[]
CustomOrder.java                 @Document("custom_orders") — id, userId, artisanId, description, referenceImages[], budget, status, artisanResponse, createdAt
CustomOrderStatus.java           Enum: PENDING, RESPONDED, ACCEPTED, REJECTED, IN_PROGRESS, COMPLETED
Payment.java                     @Document("payments") — id, orderId, method, amount, status, transactionId, createdAt
PaymentMethod.java               Enum: COD, BANK_TRANSFER, MOMO, VNPAY, ZALOPAY
PaymentStatus.java               Enum: PENDING, COMPLETED, FAILED, REFUNDED
Address.java                     Embedded hoặc @Document — id, userId, fullName, phone, province, district, address, isDefault
Coupon.java                      @Document("coupons") — id, code, type, value, maxDiscount, minOrder, usageLimit, usedCount, startDate, endDate, active
Blog.java                        @Document("blogs") — id, title, slug, content, thumbnail, author, tags[], published, createdAt, updatedAt
Notification.java                @Document("notifications") — id, userId, title, message, type, read, createdAt
Report.java                      @Document("reports") — id, reporterId, targetType, targetId, reason, status, resolvedBy, createdAt
```

### `repository/`

```
UserRepository.java              extends MongoRepository<User, String>
                                 findByEmail(String email)
                                 findByRole(Role role, Pageable pageable)
                                 existsByEmail(String email)

ProductRepository.java           extends MongoRepository<Product, String>
                                 findByCategoryId(String categoryId, Pageable pageable)
                                 findByArtisanId(String artisanId, Pageable pageable)
                                 findByFeaturedTrue()
                                 findByStatus(String status, Pageable pageable)
                                 findByNameContainingIgnoreCase(String keyword, Pageable pageable)

CategoryRepository.java          extends MongoRepository<Category, String>
                                 findBySlug(String slug)

EthnicGroupRepository.java       extends MongoRepository<EthnicGroup, String>

CartRepository.java              extends MongoRepository<Cart, String>
                                 findByUserId(String userId)

OrderRepository.java             extends MongoRepository<Order, String>
                                 findByUserId(String userId, Pageable pageable)
                                 findByArtisanId(String artisanId, Pageable pageable)
                                 findByStatus(OrderStatus status, Pageable pageable)

ReviewRepository.java            extends MongoRepository<Review, String>
                                 findByProductId(String productId, Pageable pageable)
                                 findByUserId(String userId)

WishlistRepository.java          extends MongoRepository<Wishlist, String>
                                 findByUserId(String userId)

CustomOrderRepository.java       extends MongoRepository<CustomOrder, String>
                                 findByUserId(String userId)
                                 findByArtisanId(String artisanId)

PaymentRepository.java           extends MongoRepository<Payment, String>
                                 findByOrderId(String orderId)

AddressRepository.java           extends MongoRepository<Address, String>
                                 findByUserId(String userId)

CouponRepository.java            extends MongoRepository<Coupon, String>
                                 findByCode(String code)

BlogRepository.java              extends MongoRepository<Blog, String>
                                 findByPublishedTrue(Pageable pageable)
                                 findBySlug(String slug)

NotificationRepository.java      extends MongoRepository<Notification, String>
                                 findByUserId(String userId, Pageable pageable)
                                 countByUserIdAndReadFalse(String userId)

ReportRepository.java            extends MongoRepository<Report, String>
                                 findByStatus(String status, Pageable pageable)
```

### `dto/request/`

Mỗi file chứa các field mà frontend gửi lên qua request body:

```
LoginRequest.java                email, password
RegisterRequest.java             fullName, email, phone, password, role
ChangePasswordRequest.java       currentPassword, newPassword
ForgotPasswordRequest.java       email
ResetPasswordRequest.java        token, newPassword
ProductRequest.java              name, price, originalPrice, description, material, dimensions, weight, craftProcess, warranty, categoryId, ethnicGroupId, isUnique, stock, featured
CategoryRequest.java             name, description, image
EthnicGroupRequest.java          name, description, region
CartItemRequest.java             productId, quantity
OrderRequest.java                items[], shippingAddressId, paymentMethod, couponCode, note
ReviewRequest.java               productId, rating, comment
CustomOrderRequest.java          artisanId, description, referenceImages[], budget
CustomOrderResponseRequest.java  price, estimatedDays, message
PaymentRequest.java              orderId, method
AddressRequest.java              fullName, phone, province, district, address, isDefault
CouponRequest.java               code, type, value, maxDiscount, minOrder, usageLimit, startDate, endDate
CouponValidateRequest.java       code
BlogRequest.java                 title, content, thumbnail, tags[], published
ArtisanRegisterRequest.java      shopName, ethnic, village, bio, experience
ArtisanProfileUpdateRequest.java shopName, bio, experience, bankInfo
ShippingCalculateRequest.java    province, district, weight, orderTotal
OrderStatusUpdateRequest.java    status
ShipOrderRequest.java            trackingNumber, shippingProvider
UserStatusUpdateRequest.java     status
ProductApprovalRequest.java      reason (dùng khi từ chối)
ReportResolveRequest.java        action
```

### `dto/response/`

Mỗi file chứa các field mà backend trả về cho frontend:

```
AuthResponse.java                token, user (UserResponse)
UserResponse.java                id, fullName, email, phone, avatar, role, createdAt
ProductResponse.java             id, name, price, originalPrice, image, categoryId, categoryName, ethnicGroup, artisanId, artisanName, isUnique, stock, sold, rating, reviewCount, status, featured
ProductDetailResponse.java       (tất cả field của ProductResponse) + description, material, dimensions, weight, craftProcess, warranty, images[], artisanVillage, createdAt
CategoryResponse.java            id, name, slug, image, description, productCount
EthnicGroupResponse.java         id, name, description, region
ArtisanResponse.java             id, name, ethnic, village, bio, products, rating, avatar
ArtisanDashboardResponse.java    revenue, orderCount, productCount, avgRating, recentOrders[], pendingCustomOrders
ArtisanRevenueResponse.java      dailyRevenue[], monthlyRevenue[], totalRevenue
CartResponse.java                id, items[], itemCount, subtotal
OrderResponse.java               id, orderCode, items[], total, status, paymentMethod, createdAt
OrderDetailResponse.java         (tất cả field của OrderResponse) + shippingAddress, trackingNumber, note, artisanName, statusHistory[]
ReviewResponse.java              id, userName, rating, comment, createdAt
WishlistResponse.java            id, products[]
CustomOrderResponse.java         id, description, budget, status, artisanResponse, createdAt
PaymentResponse.java             id, orderId, method, amount, status
PaymentStatusResponse.java       paymentId, status, transactionId
ShippingFeeResponse.java         fee, estimatedDays, provider
ShippingProviderResponse.java    id, name, description
ShippingTrackResponse.java       trackingNumber, status, history[]
AddressResponse.java             id, fullName, phone, province, district, address, isDefault
CouponResponse.java              id, code, type, value, maxDiscount, minOrder, usageLimit, usedCount, startDate, endDate, active
CouponValidateResponse.java      valid, coupon (CouponResponse), message
BlogResponse.java                id, title, slug, content, thumbnail, author, tags[], published, createdAt
NotificationResponse.java        id, title, message, type, read, createdAt
UnreadCountResponse.java         count
AdminDashboardResponse.java      totalRevenue, totalOrders, totalUsers, totalArtisans, pendingProducts, recentActivities[]
RevenueStatResponse.java         labels[], data[], total
OrderStatResponse.java           labels[], data[], total
ReportResponse.java              id, reporterId, targetType, targetId, reason, status, createdAt
PageResponse.java                content[], page, size, totalElements, totalPages
ApiErrorResponse.java            status, message, timestamp, errors[]
```

### `service/` và `service/impl/`

```
AuthService.java                 login, register, logout, getProfile, updateProfile, changePassword, forgotPassword, resetPassword
UserService.java                 findById, findByEmail, findAll, updateStatus, delete
ProductService.java              findAll, findById, search, findByCategory, findByArtisan, findFeatured, findNewArrivals, create, update, delete, uploadImages, deleteImage, approve, reject
CategoryService.java             findAll, findById, findBySlug, create, update, delete
EthnicGroupService.java          findAll, findById, create, update, delete
ArtisanService.java              findAll, findById, getProfile, updateProfile, getDashboard, getRevenue, register, findPending, approve, reject
CartService.java                 getByUser, addItem, updateItem, removeItem, clear
OrderService.java                findAll, findById, findByUser, findByArtisan, create, cancel, updateStatus, confirm, ship
ReviewService.java               findByProduct, create, update, delete, findByArtisan
WishlistService.java             getByUser, add, remove
CustomOrderService.java          findAll, findById, create, respond, accept, reject
PaymentService.java              create, getStatus, confirm
ShippingService.java             calculateFee, getProviders, track
AddressService.java              findByUser, create, update, delete, setDefault
CouponService.java               validate, findAll, create, update, delete
BlogService.java                 findAll, findById, findBySlug, create, update, delete
NotificationService.java         findByUser, markAsRead, markAllAsRead, getUnreadCount, create
AdminService.java                getDashboard, getRevenueStats, getOrderStats, getReports, resolveReport
FileStorageService.java          store, delete, getUrl
EmailService.java                sendOrderConfirmation, sendPasswordReset, sendArtisanApproval
```

### `controller/`

Mỗi controller tương ứng với 1 nhóm API mà frontend gọi:

```
AuthController.java              @RequestMapping("/api/auth")
                                 POST /login
                                 POST /register
                                 POST /logout
                                 GET  /profile
                                 PUT  /profile
                                 PUT  /change-password
                                 POST /forgot-password
                                 POST /reset-password

ProductController.java           @RequestMapping("/api/products")
                                 GET  /
                                 GET  /{id}
                                 GET  /search
                                 GET  /category/{categoryId}
                                 GET  /artisan/{artisanId}
                                 GET  /featured
                                 GET  /new-arrivals
                                 POST /
                                 PUT  /{id}
                                 DELETE /{id}
                                 POST /{id}/images
                                 DELETE /{productId}/images/{imageId}

CategoryController.java          @RequestMapping("/api/categories")
                                 GET  /
                                 GET  /{id}
                                 POST /
                                 PUT  /{id}
                                 DELETE /{id}

EthnicGroupController.java       @RequestMapping("/api/ethnic-groups")
                                 GET  /
                                 GET  /{id}
                                 POST /
                                 PUT  /{id}
                                 DELETE /{id}

ArtisanController.java           @RequestMapping("/api/artisans")
                                 GET  /
                                 GET  /{id}
                                 GET  /profile
                                 PUT  /profile
                                 GET  /dashboard
                                 GET  /revenue
                                 POST /register

CartController.java              @RequestMapping("/api/cart")
                                 GET  /
                                 POST /items
                                 PUT  /items/{itemId}
                                 DELETE /items/{itemId}
                                 DELETE /

OrderController.java             @RequestMapping("/api/orders")
                                 GET  /
                                 GET  /{id}
                                 POST /
                                 PUT  /{id}/cancel
                                 PUT  /{id}/status
                                 GET  /artisan
                                 PUT  /{id}/confirm
                                 PUT  /{id}/ship

ReviewController.java            @RequestMapping("/api/reviews")
                                 GET  /product/{productId}
                                 POST /
                                 PUT  /{id}
                                 DELETE /{id}
                                 GET  /artisan/{artisanId}

WishlistController.java          @RequestMapping("/api/wishlist")
                                 GET  /
                                 POST /
                                 DELETE /{productId}

CustomOrderController.java       @RequestMapping("/api/custom-orders")
                                 GET  /
                                 GET  /{id}
                                 POST /
                                 PUT  /{id}/respond
                                 PUT  /{id}/accept
                                 PUT  /{id}/reject

PaymentController.java           @RequestMapping("/api/payments")
                                 POST /
                                 GET  /{paymentId}
                                 PUT  /{paymentId}/confirm

ShippingController.java          @RequestMapping("/api/shipping")
                                 POST /calculate
                                 GET  /providers
                                 GET  /track/{trackingNumber}

AddressController.java           @RequestMapping("/api/addresses")
                                 GET  /
                                 POST /
                                 PUT  /{id}
                                 DELETE /{id}
                                 PUT  /{id}/default

CouponController.java            @RequestMapping("/api/coupons")
                                 POST /validate
                                 GET  /
                                 POST /
                                 PUT  /{id}
                                 DELETE /{id}

BlogController.java              @RequestMapping("/api/blogs")
                                 GET  /
                                 GET  /{id}
                                 POST /
                                 PUT  /{id}
                                 DELETE /{id}

NotificationController.java      @RequestMapping("/api/notifications")
                                 GET  /
                                 PUT  /{id}/read
                                 PUT  /read-all
                                 GET  /unread-count

AdminController.java             @RequestMapping("/api/admin")
                                 GET  /dashboard
                                 GET  /users
                                 PUT  /users/{userId}/status
                                 GET  /products/pending
                                 PUT  /products/{productId}/approve
                                 PUT  /products/{productId}/reject
                                 GET  /stats/revenue
                                 GET  /stats/orders
                                 GET  /reports
                                 PUT  /reports/{reportId}
                                 GET  /artisans/pending
                                 PUT  /artisans/{artisanId}/approve
                                 PUT  /artisans/{artisanId}/reject
```

### `exception/`

```
GlobalExceptionHandler.java      @RestControllerAdvice — bắt tất cả exception, trả về ApiErrorResponse thống nhất
ResourceNotFoundException.java   404 — khi không tìm thấy product, order, user, ...
BadRequestException.java         400 — dữ liệu đầu vào không hợp lệ
UnauthorizedException.java       401 — chưa đăng nhập hoặc token hết hạn
ForbiddenException.java          403 — không có quyền truy cập
DuplicateResourceException.java  409 — email đã tồn tại, mã coupon trùng, ...
FileStorageException.java        500 — lỗi khi upload/delete file ảnh
```

### `mapper/`

```
Mỗi mapper chuyển đổi giữa Model ↔ DTO:

UserMapper.java                  User → UserResponse
ProductMapper.java               Product → ProductResponse, ProductDetailResponse
                                 ProductRequest → Product
CategoryMapper.java              Category → CategoryResponse
                                 CategoryRequest → Category
OrderMapper.java                 Order → OrderResponse, OrderDetailResponse
                                 OrderRequest → Order
ReviewMapper.java                Review → ReviewResponse
                                 ReviewRequest → Review
... (tương tự cho các mapper còn lại)
```

### `util/`

```
SlugUtil.java                    Tạo slug từ tiếng Việt có dấu: "Thổ Cẩm H'Mong" → "tho-cam-hmong"
DateUtil.java                    Format ngày, tính khoảng thời gian
```

### `resources/`

```
application.yml                  Cấu hình chung: MongoDB URI, JWT secret, server port, file upload path
application-dev.yml              Cấu hình riêng môi trường development
application-prod.yml             Cấu hình riêng môi trường production
data/categories-init.json        Dữ liệu danh mục khởi tạo ban đầu
data/ethnic-groups-init.json     Dữ liệu nhóm dân tộc khởi tạo ban đầu
data/admin-init.json             Tài khoản admin mặc định
```

### `test/`

```
controller/                      Test API endpoint bằng MockMvc
service/                         Test business logic bằng Mockito
repository/                      Test truy vấn MongoDB bằng @DataMongoTest
```

---

## ÁNH XẠ FRONTEND → BACKEND

```
Frontend file                    Backend file nhận request
─────────────────────────────    ──────────────────────────────
src/api/services.js              
  authService.*                  → AuthController.java
  productService.*               → ProductController.java
  categoryService.*              → CategoryController.java
  ethnicService.*                → EthnicGroupController.java
  cartService.*                  → CartController.java
  orderService.*                 → OrderController.java
  reviewService.*                → ReviewController.java
  artisanService.*               → ArtisanController.java
  customOrderService.*           → CustomOrderController.java
  wishlistService.*              → WishlistController.java
  paymentService.*               → PaymentController.java
  shippingService.*              → ShippingController.java
  blogService.*                  → BlogController.java
  notificationService.*          → NotificationController.java
  adminService.*                 → AdminController.java
  couponService.*                → CouponController.java
  addressService.*               → AddressController.java

Frontend store                   Backend response format
─────────────────────────────    ──────────────────────────────
src/stores/auth.js               
  login() nhận                   → AuthResponse { token, user }
  user.role kiểm tra             → Role enum: CUSTOMER, ARTISAN, ADMIN

src/stores/product.js            
  products[] nhận                → PageResponse<ProductResponse>
  currentProduct nhận            → ProductDetailResponse

src/stores/cart.js               
  items[] nhận                   → CartResponse { items[] }

src/utils/helpers.js             
  ORDER_STATUSES dùng            → OrderStatus enum cùng giá trị
  PAYMENT_METHODS dùng           → PaymentMethod enum cùng giá trị
```

---

## TỔNG SỐ FILE BACKEND

```
config/                           4 file
security/                         5 file
model/                           24 file
repository/                      15 file
dto/request/                     24 file
dto/response/                    32 file
service/                         21 file (interface)
service/impl/                    21 file (implementation)
controller/                      17 file
exception/                        7 file
mapper/                          14 file
util/                             2 file
resources/                        6 file
test/                            14 file
root                              1 file (Application.java)
────────────────────────────────────
Tổng                            207 file
```