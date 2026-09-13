export const AdminEndpoint = {
    GET_PRODUCTS: "/products",
    GET_PRODUCT_BY_ID: (id: string) => `/products/${id}`,
    CREATE_PRODUCT: "/create",
    EDIT_PRODUCT: "/edit",
    DELETE_PRODUCT: "/delete",
}

