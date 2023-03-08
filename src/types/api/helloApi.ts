import BaseApi from './baseApi'

export default interface HelloApi extends BaseApi<'HelloApi'> {
  hello(name: string): string
}
