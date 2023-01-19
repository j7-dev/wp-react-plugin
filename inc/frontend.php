<?php

declare( strict_types = 1 );

namespace Kucrut\ViteForWPExample\React\Frontend;

use Kucrut\Vite;

/**
 * Frontend bootstrapper
 *
 * @return void
 */
function bootstrap(): void {
	add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_script' );
	add_action( 'wp_footer', __NAMESPACE__ . '\\render_app' );
}

/**
 * Render application's markup
 */
function render_app(): void {
	printf( '<div id="my-app" class="my-app"></div>' );
}

/**
 * Enqueue script
 */
function enqueue_script(): void {
	Vite\enqueue_asset(
		dirname( __DIR__ ) . '/js/dist',
		'js/src/main.tsx',
		[
			'handle' => 'vite-for-wp-react',
			'in-footer' => true,
		]
	);
}
