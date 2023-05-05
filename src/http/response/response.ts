export class HttpResponse<T = any> {
  payload: T
  statusCode: number
  constructor(payload: any, statusCode: number = 200) {
    this.payload = payload
    this.statusCode = statusCode
    console.log(this.statusCode)
  }
}
