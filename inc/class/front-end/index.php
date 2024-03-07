<?php

declare(strict_types=1);

namespace J7\WpReactPlugin;

class FrontEnd {

	public function __construct() {
		\add_action( 'wp_footer', array( $this, 'render_app' ) );
	}

	/**
	 * Render application's markup
	 */
	public function render_app(): void {
		echo '<div id="' . Utils::RENDER_ID_1 . '"></div>';
	}
}

new FrontEnd();
