<?php
/**
 * Front-end Entry
 */

declare(strict_types=1);

namespace J7\WpReactPlugin\FrontEnd;

use J7\WpReactPlugin\Utils\Base;
/**
 * Class Entry
 */
final class Entry {
	use \J7\WpUtils\Traits\SingletonTrait;

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
		echo '<div id="my_app"></div>';
	}
}

Entry::instance();
