interface baseApi {
  namespace: string
}

export interface HelloApi extends baseApi {
  hello(name: string): string
}
