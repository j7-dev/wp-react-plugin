declare global {
  var wpApiSettings: {
    root: string
    nonce: string
  }
  var appData: {
    siteUrl: string
    ajaxUrl: string
    ajaxNonce: string
    userId: string
    postId: string
    permalink: string
    checkoutUrl: string
  }
  var wp: {
    blocks: any
  }
}

export {}
