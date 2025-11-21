export interface ApiResponse<T> {
  status: string
  message?: string
  data: T
}

export interface ApiError {
  status: string
  message: string
  errors?: Record<string, string[]>
}

export interface PaginationMeta {
  current_page: number
  per_page: number
  total_pages: number
  total_count: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}
