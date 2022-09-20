declare module 'restify-json-client-promise' {
  interface RestifyClient {
    get: (url: string) => RestifyClient
    post: (url: string, body: Record<string, any>) => Promise<any>
    put: (url: string, body: Record<string, any>) => Promise<any>
    del: (url: string) => Promise<any>
    close: () => void
  }

  type RestifyClientConstructor = (opts: Record<string, any>) => RestifyClient
  export = RestifyClientConstructor
}
