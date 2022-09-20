declare module 'restify-json-client-promise' {
  interface RestifyClient {
    get: (url: string) => RestifyClient
    post: (url: string, body: Record<string, any>) => Promise<any>
    post: (url: string, body: Record<string, any>) => Promise<any>
    del: (url: string) => Promise<any>
    close: () => void
  }

  export = RestifyClient
}
