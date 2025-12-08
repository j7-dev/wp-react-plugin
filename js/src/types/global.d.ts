declare global {
	var appData: {
		env: {
			SITE_URL: string
			API_URL: string
			CURRENT_USER_ID: number
			POST_ID: number
			PERMALINK: string
			AJAX_URL: string
			APP_NAME: string
			KEBAB: string
			SNAKE: string
			NONCE: string
			APP1_SELECTOR: string
			APP2_SELECTOR: string
			ELEMENTOR_ENABLED: boolean
		}
	}
	var wp: {
		blocks: any
	}
}

export {}
