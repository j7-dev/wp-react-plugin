<?php
/**
 * Front-end
 */

declare(strict_types=1);

namespace J7\WpReactPlugin;

/**
 * Class FrontEnd
 */
final class FrontEnd {

	/**
	 * Constructor
	 */
	public function __construct() {
		\add_action( 'wp_footer', array( $this, 'render_app' ) );
	}

	/**
	 * Render application's markup
	 */
	public function render_app(): void {
		// phpcs:ignore
		echo '<div id="' . Utils::APP1_SELECTOR . '"></div>';
	}
}

new FrontEnd();
