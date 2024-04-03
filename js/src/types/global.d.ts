declare global {
  var wpApiSettings: {
    root: string
    nonce: string
  }
  var appData: {
    env: {
      siteUrl: string
      ajaxUrl: string
      ajaxNonce: string
      userId: string
      postId: string
      permalink: string
      APP_NAME: string
      KEBAB: string
      SNAKE: string
      BASE_URL: string
      APP1_SELECTOR: string
      APP2_SELECTOR: string
      API_TIMEOUT: string
    }
  }
  var wp: {
    blocks: any
  }
}

export {}
