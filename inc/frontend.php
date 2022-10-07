<?php

declare( strict_types = 1 );

namespace Kucrut\ViteForWPExample\React\Frontend;

/**
 * Frontend bootstrapper
 *
 * @return void
 */
function bootstrap(): void {
	add_action( 'wp_footer', __NAMESPACE__ . '\\render_app' );
}

/**
 * Render application's markup
 */
function render_app(): void {
	printf( '<div id="my-app"></div>' );
}
