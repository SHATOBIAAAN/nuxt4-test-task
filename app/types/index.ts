export interface Banner {
  ID: string
  SORT: string
  NAME: string
  CODE: string
  PREVIEW_PICTURE: string
}

export interface Product {
  ID: string
  SORT: string
  CODE: string
  NAME: string
  PRICE: number
  QUANTITY: number
  PREVIEW_PICTURE: string
}

export interface PageMeta {
  ELEMENT_META_TITLE: string
  ELEMENT_META_DESCRIPTION: string
}

export interface HomePageData {
  ID: string
  NAME: string
  CODE: string
  BANNERS: Banner[]
  HITS: Product[][] // As seen from API, hits is an array of arrays
}

export interface HomePageResponse {
  data: HomePageData
  meta: {
    META: PageMeta
    class: string
    version: string
  }
}

export interface OrderFormData {
  productId: string
  productName: string
  customerName: string
  customerPhone: string
}
