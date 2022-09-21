declare module 'restify-json-client-promise' {
  declare function _exports(opts: Record<string, any>): {
    get: (url: string) => Promise<any>
    post: (url: string, body: Record<string, any>) => Promise<any>
    post: (url: string, body: Record<string, any>) => Promise<any>
    del: (url: string) => Promise<any>
    close: () => void
  }

  export = _exports;
}
