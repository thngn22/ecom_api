interface IResponse {
  statusCode: number | string
  message: string
  send?(res: any): void
}

export = IResponse
