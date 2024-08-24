interface typeHeader {
  API_KEY: string
  AUTHORIZATION: string
  REFRESH_TOKEN: string
  X_CLIENT_ID: string
  BEARER: string
}

const HEADER: typeHeader = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
  REFRESH_TOKEN: 'refresh-token',
  X_CLIENT_ID: 'x-client-id',
  BEARER: 'Bearer '
}

export = HEADER
