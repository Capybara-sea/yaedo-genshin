export default interface UserData {
  set<T>(key: string, value: any): Promise<T>
  get<T>(key: string): Promise<T>
}
