import { defineStore } from 'pinia'
import { productService } from '@/api/services'

// Mock data for when backend is not connected
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: "Túi Thổ Cẩm H'Mong Hoa Văn Cổ",
    price: 1200000,
    originalPrice: 1500000,
    images: ['/images/product-sample-1.jpg'],
    image: '/images/product-sample-1.jpg',
    categoryId: 'cat-textiles',
    categoryName: 'Thổ Cẩm & Vải Dệt',
    ethnicGroup: "H'Mong",
    artisanId: 'art-1',
    artisanName: 'Mùa A Súa',
    artisanVillage: 'Tả Phìn, Sapa',
    isUnique: true,
    stock: 1,
    sold: 0,
    rating: 4.9,
    reviewCount: 24,
    description: 'Chiếc túi được may hoàn toàn thủ công từ vải lanh dệt tay, nhuộm chàm tự nhiên. Họa tiết thêu chữ thập kể câu chuyện về mùa màng bội thu của người H\'Mong vùng cao Tây Bắc.',
    material: '100% Vải lanh tự nhiên, nhuộm chàm',
    dimensions: '35cm x 30cm x 10cm',
    weight: '500g',
    craftProcess: 'Dệt tay khung cửi truyền thống → Vẽ sáp ong → Nhuộm chàm 15 lần → Thêu tay hoa văn cổ',
    warranty: 'Bảo hành đường chỉ trọn đời. Đổi trả trong 7 ngày nếu lỗi sản xuất.',
    status: 'ACTIVE',
    featured: true,
    createdAt: '2026-01-15T08:00:00Z'
  },
  {
    id: '2',
    name: 'Bình Gốm Bàu Trúc Khắc Nổi',
    price: 850000,
    originalPrice: null,
    images: ['/images/product-sample-3.jpg'],
    image: '/images/product-sample-3.jpg',
    categoryId: 'cat-pottery',
    categoryName: 'Gốm Sứ',
    ethnicGroup: 'Chăm',
    artisanId: 'art-2',
    artisanName: 'Đàng Thị Hoa',
    artisanVillage: 'Bàu Trúc, Ninh Thuận',
    isUnique: false,
    stock: 5,
    sold: 12,
    rating: 4.8,
    reviewCount: 18,
    description: 'Gốm không bàn xoay, nung lộ thiên đặc trưng của người Chăm Ninh Thuận. Mỗi bình mang màu sắc hỏa biến tự nhiên độc đáo, không bình nào giống bình nào.',
    material: 'Đất sét Bàu Trúc nguyên chất',
    dimensions: 'Cao 35cm, đường kính miệng 12cm',
    weight: '1.2kg',
    craftProcess: 'Nhào đất thủ công → Nặn tay không bàn xoay → Chạm khắc hoa văn → Nung lộ thiên 800°C',
    warranty: 'Đổi trả trong 3 ngày nếu vỡ do vận chuyển.',
    status: 'ACTIVE',
    featured: true,
    createdAt: '2026-01-20T08:00:00Z'
  },
  {
    id: '3',
    name: 'Khăn Lụa Tơ Tằm Dệt Jacquard',
    price: 2500000,
    originalPrice: 2800000,
    images: ['/images/category-textiles.jpg'],
    image: '/images/category-textiles.jpg',
    categoryId: 'cat-textiles',
    categoryName: 'Thổ Cẩm & Vải Dệt',
    ethnicGroup: 'Thái',
    artisanId: 'art-3',
    artisanName: 'Lò Thị Yến',
    artisanVillage: 'Mường Lay, Điện Biên',
    isUnique: true,
    stock: 1,
    sold: 0,
    rating: 5.0,
    reviewCount: 8,
    description: 'Sợi tơ tằm thượng hạng, nhuộm màu từ vỏ cây và lá rừng. Kỹ thuật dệt hoa văn nổi phức tạp (Jacquard) đã truyền qua 5 thế hệ.',
    material: '100% Tơ tằm nguyên chất',
    dimensions: '180cm x 60cm',
    weight: '200g',
    craftProcess: 'Nuôi tằm → Kéo sợi → Nhuộm tự nhiên → Dệt Jacquard thủ công',
    warranty: 'Bảo hành 1 năm. Đổi trả trong 7 ngày.',
    status: 'ACTIVE',
    featured: true,
    createdAt: '2026-02-01T08:00:00Z'
  },
  {
    id: '4',
    name: 'Vòng Cổ Bạc Chạm Khắc Thủ Công',
    price: 3200000,
    originalPrice: null,
    images: ['/images/product-sample-2.jpg'],
    image: '/images/product-sample-2.jpg',
    categoryId: 'cat-jewelry',
    categoryName: 'Trang Sức',
    ethnicGroup: 'Dao Đỏ',
    artisanId: 'art-4',
    artisanName: 'Lý Quầy Duyên',
    artisanVillage: 'Tả Phìn, Sapa',
    isUnique: true,
    stock: 1,
    sold: 0,
    rating: 4.9,
    reviewCount: 15,
    description: 'Bạc ta nguyên chất 95%, được chạm khắc thủ công bằng búa và đục nhỏ. Hoa văn mang ý nghĩa xua đuổi tà ma, cầu may mắn theo tín ngưỡng người Dao.',
    material: 'Bạc ta 950 nguyên chất',
    dimensions: 'Đường kính 16cm, rộng 1.5cm',
    weight: '120g',
    craftProcess: 'Nung bạc → Cán mỏng → Uốn hình → Chạm khắc tay → Đánh bóng',
    warranty: 'Bảo hành trọn đời. Đánh bóng miễn phí mỗi 6 tháng.',
    status: 'ACTIVE',
    featured: true,
    createdAt: '2026-02-05T08:00:00Z'
  },
  {
    id: '5',
    name: 'Giỏ Mây Tre Đan Tây Nguyên',
    price: 450000,
    originalPrice: null,
    images: ['/images/category-baskets.jpg'],
    image: '/images/category-baskets.jpg',
    categoryId: 'cat-baskets',
    categoryName: 'Mây Tre Đan',
    ethnicGroup: 'Ê Đê',
    artisanId: 'art-5',
    artisanName: 'Y Bluen',
    artisanVillage: 'Buôn Ma Thuột, Đắk Lắk',
    isUnique: false,
    stock: 10,
    sold: 35,
    rating: 4.7,
    reviewCount: 42,
    description: 'Giỏ đan từ mây rừng nguyên sinh Tây Nguyên, kỹ thuật đan lát 3 lớp bền chắc. Có thể sử dụng để trang trí hoặc đựng đồ hàng ngày.',
    material: 'Mây rừng tự nhiên, tre nứa',
    dimensions: '30cm x 25cm x 20cm',
    weight: '400g',
    craftProcess: 'Thu hoạch mây → Phơi khô → Chẻ sợi → Đan 3 lớp → Xử lý chống mối mọt',
    warranty: 'Bảo hành 6 tháng.',
    status: 'ACTIVE',
    featured: false,
    createdAt: '2026-01-10T08:00:00Z'
  },
  {
    id: '6',
    name: "Váy Áo Thổ Cẩm Dao Tiền Nguyên Bản",
    price: 4500000,
    originalPrice: 5200000,
    images: ['/images/about-culture.jpg'],
    image: '/images/about-culture.jpg',
    categoryId: 'cat-textiles',
    categoryName: 'Thổ Cẩm & Vải Dệt',
    ethnicGroup: 'Dao Tiền',
    artisanId: 'art-6',
    artisanName: 'Triệu Thị Mai',
    artisanVillage: 'Ba Vì, Hà Nội',
    isUnique: true,
    stock: 1,
    sold: 0,
    rating: 5.0,
    reviewCount: 3,
    description: 'Bộ trang phục truyền thống Dao Tiền hoàn chỉnh, thêu tay 100% với hơn 200 giờ công. Họa tiết biểu tượng cây tiền và hoa văn cổ truyền.',
    material: 'Vải cotton tự nhiên, chỉ thêu cotton',
    dimensions: 'Free size',
    weight: '800g',
    craftProcess: 'Cắt vải → Thêu tay 200+ giờ → Nhuộm chàm → Hoàn thiện',
    warranty: 'Bảo hành đường chỉ trọn đời.',
    status: 'ACTIVE',
    featured: true,
    createdAt: '2026-02-08T08:00:00Z'
  },
  {
    id: '7',
    name: 'Bộ Tách Trà Gốm Phù Lãng',
    price: 680000,
    originalPrice: null,
    images: ['/images/category-pottery.jpg'],
    image: '/images/category-pottery.jpg',
    categoryId: 'cat-pottery',
    categoryName: 'Gốm Sứ',
    ethnicGroup: 'Kinh',
    artisanId: 'art-7',
    artisanName: 'Nguyễn Văn Hiệp',
    artisanVillage: 'Phù Lãng, Bắc Ninh',
    isUnique: false,
    stock: 8,
    sold: 56,
    rating: 4.6,
    reviewCount: 67,
    description: 'Bộ tách trà gồm 1 ấm và 4 chén, được làm từ đất sét đỏ Phù Lãng. Men tự nhiên tạo nên lớp da gốm sần mộc mạc đặc trưng.',
    material: 'Đất sét đỏ Phù Lãng',
    dimensions: 'Ấm: 15x10cm, Chén: 7x5cm',
    weight: '600g',
    craftProcess: 'Nhào đất → Chuốt bàn xoay → Phơi → Nung 1200°C → Tráng men tự nhiên',
    warranty: 'Đổi trả trong 7 ngày.',
    status: 'ACTIVE',
    featured: false,
    createdAt: '2026-01-25T08:00:00Z'
  },
  {
    id: '8',
    name: 'Vòng Tay Bạc Đen H\'Mong',
    price: 1800000,
    originalPrice: 2000000,
    images: ['/images/category-jewelry.jpg'],
    image: '/images/category-jewelry.jpg',
    categoryId: 'cat-jewelry',
    categoryName: 'Trang Sức',
    ethnicGroup: "H'Mong",
    artisanId: 'art-1',
    artisanName: 'Mùa A Súa',
    artisanVillage: 'Tả Phìn, Sapa',
    isUnique: false,
    stock: 3,
    sold: 20,
    rating: 4.8,
    reviewCount: 31,
    description: 'Vòng tay bạc ta, oxi hóa tạo lớp đen đặc trưng. Hoa văn xoắn ốc biểu tượng cho sự sinh sôi và thịnh vượng.',
    material: 'Bạc ta 925, oxi hóa tự nhiên',
    dimensions: 'Đường kính 6.5cm, rộng 0.8cm',
    weight: '45g',
    craftProcess: 'Nung bạc → Rèn tay → Khắc hoa văn → Oxi hóa → Đánh bóng điểm nhấn',
    warranty: 'Bảo hành trọn đời.',
    status: 'ACTIVE',
    featured: true,
    createdAt: '2026-01-28T08:00:00Z'
  }
]

const MOCK_CATEGORIES = [
  { id: 'cat-textiles', name: 'Thổ Cẩm & Vải Dệt', slug: 'tho-cam-vai-det', image: '/images/category-textiles.jpg', productCount: 3, description: 'Vải dệt thổ cẩm, khăn piêu, áo quần truyền thống' },
  { id: 'cat-jewelry', name: 'Trang Sức', slug: 'trang-suc', image: '/images/category-jewelry.jpg', productCount: 2, description: 'Vòng bạc, nhẫn, hoa tai thủ công' },
  { id: 'cat-pottery', name: 'Gốm Sứ', slug: 'gom-su', image: '/images/category-pottery.jpg', productCount: 2, description: 'Gốm Bàu Trúc, Phù Lãng, Bát Tràng' },
  { id: 'cat-baskets', name: 'Mây Tre Đan', slug: 'may-tre-dan', image: '/images/category-baskets.jpg', productCount: 1, description: 'Giỏ, gùi, đồ mây tre đan' }
]

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    featuredProducts: [],
    categories: [],
    currentProduct: null,
    loading: false,
    error: null,
    filters: {
      search: '',
      categoryId: null,
      ethnicGroup: null,
      minPrice: 0,
      maxPrice: 10000000,
      sortBy: 'newest',
      isUnique: null
    },
    pagination: {
      page: 1,
      size: 12,
      total: 0,
      totalPages: 0
    },
    useMock: true // Toggle for demo mode
  }),

  getters: {
    filteredProducts: (state) => {
      let result = [...state.products]

      if (state.filters.search) {
        const q = state.filters.search.toLowerCase()
        result = result.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.ethnicGroup?.toLowerCase().includes(q) ||
          p.artisanName?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
        )
      }

      if (state.filters.categoryId) {
        result = result.filter(p => p.categoryId === state.filters.categoryId)
      }

      if (state.filters.ethnicGroup) {
        result = result.filter(p => p.ethnicGroup === state.filters.ethnicGroup)
      }

      if (state.filters.isUnique !== null) {
        result = result.filter(p => p.isUnique === state.filters.isUnique)
      }

      result = result.filter(p => p.price >= state.filters.minPrice && p.price <= state.filters.maxPrice)

      switch (state.filters.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price)
          break
        case 'price-desc':
          result.sort((a, b) => b.price - a.price)
          break
        case 'popular':
          result.sort((a, b) => b.sold - a.sold)
          break
        case 'rating':
          result.sort((a, b) => b.rating - a.rating)
          break
        default:
          result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      }

      return result
    },

    ethnicGroups: (state) => {
      const groups = [...new Set(state.products.map(p => p.ethnicGroup).filter(Boolean))]
      return groups.sort()
    }
  },

  actions: {
    async fetchProducts(params = {}) {
      this.loading = true
      try {
        if (this.useMock) {
          await new Promise(r => setTimeout(r, 300))
          this.products = MOCK_PRODUCTS
          this.pagination.total = MOCK_PRODUCTS.length
          this.pagination.totalPages = 1
          return
        }
        const { data } = await productService.getAll({
          page: this.pagination.page - 1,
          size: this.pagination.size,
          ...params
        })
        this.products = data.content || data
        this.pagination.total = data.totalElements || data.length
        this.pagination.totalPages = data.totalPages || 1
      } catch (err) {
        this.error = 'Không thể tải sản phẩm'
        // Fallback to mock
        this.products = MOCK_PRODUCTS
      } finally {
        this.loading = false
      }
    },

    async fetchFeatured() {
      try {
        if (this.useMock) {
          this.featuredProducts = MOCK_PRODUCTS.filter(p => p.featured)
          return
        }
        const { data } = await productService.getFeatured()
        this.featuredProducts = data
      } catch {
        this.featuredProducts = MOCK_PRODUCTS.filter(p => p.featured)
      }
    },

    async fetchProductById(id) {
      this.loading = true
      try {
        if (this.useMock) {
          await new Promise(r => setTimeout(r, 200))
          this.currentProduct = MOCK_PRODUCTS.find(p => p.id === id) || null
          return this.currentProduct
        }
        const { data } = await productService.getById(id)
        this.currentProduct = data
        return data
      } catch {
        this.currentProduct = MOCK_PRODUCTS.find(p => p.id === id) || null
        return this.currentProduct
      } finally {
        this.loading = false
      }
    },

    async fetchCategories() {
      try {
        if (this.useMock) {
          this.categories = MOCK_CATEGORIES
          return
        }
        const { data } = await categoryService.getAll()
        this.categories = data
      } catch {
        this.categories = MOCK_CATEGORIES
      }
    },

    setFilter(key, value) {
      this.filters[key] = value
      this.pagination.page = 1
    },

    resetFilters() {
      this.filters = {
        search: '',
        categoryId: null,
        ethnicGroup: null,
        minPrice: 0,
        maxPrice: 10000000,
        sortBy: 'newest',
        isUnique: null
      }
      this.pagination.page = 1
    }
  }
})
