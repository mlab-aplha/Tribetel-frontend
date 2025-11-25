export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data: T;
    statusCode?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasMore: boolean;
}

export interface ApiError {
    code: string;
    message: string;
    details?: any;
}

export interface RequestOptions {
    headers?: Record<string, string>;
    timeout?: number;
    retries?: number;
}

export interface UploadResponse {
    url: string;
    key: string;
    bucket: string;
}