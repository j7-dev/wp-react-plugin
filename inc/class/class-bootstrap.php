<?php
/**
 * Bootstrap
 */

declare (strict_types = 1);

namespace J7\WpReactPlugin;

use Kucrut\Vite;

/**
 * Class Bootstrap
 */
final class Bootstrap {


	/**
	 * Constructor
	 */
	public function __construct() {
		require_once __DIR__ . '/admin/index.php';
		require_once __DIR__ . '/front-end/index.php';

		\add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_script' ), 99 );
		\add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_script' ), 99 );
	}

	/**
	 * Enqueue script
	 * You can load the script on demand
	 *
	 * @return void
	 */
	public function enqueue_script(): void {
		/*
		* enquene script on demand
		if (\is_admin()) {
		// match wp-admin screen_id
		$screen = \get_current_screen();
		if (($screen->id !== Plugin::KEBAB)) return;
		} else {
		// match front-end post_type slug {Plugin::KEBAB}
		if (strpos($_SERVER['REQUEST_URI'], Plugin::KEBAB) === false) return;
		}
		*/

		Vite\enqueue_asset(
			Plugin::$dir . '/js/dist',
			'js/src/main.tsx',
			array(
				'handle'    => Plugin::KEBAB,
				'in-footer' => true,
			)
		);

		$post_id   = \get_the_ID();
		$permalink = \get_permalink( $post_id );

		\wp_localize_script(
			Plugin::KEBAB,
			Plugin::SNAKE . '_data',
			array(
				'env' => array(
					'siteUrl'       => \site_url(),
					'ajaxUrl'       => \admin_url( 'admin-ajax.php' ),
					'userId'        => \wp_get_current_user()->data->ID ?? null,
					'postId'        => $post_id,
					'permalink'     => $permalink,
					'APP_NAME'      => Plugin::APP_NAME,
					'KEBAB'         => Plugin::KEBAB,
					'SNAKE'         => Plugin::SNAKE,
					'BASE_URL'      => Utils::BASE_URL,
					'APP1_SELECTOR' => '#' . Utils::APP1_SELECTOR,
					'APP2_SELECTOR' => '#' . Utils::APP2_SELECTOR,
					'API_TIMEOUT'   => Utils::API_TIMEOUT,
					'nonce'         => \wp_create_nonce( Plugin::KEBAB ),
				),
			)
		);

		\wp_localize_script(
			Plugin::KEBAB,
			'wpApiSettings',
			array(
				'root'  => \untrailingslashit( \esc_url_raw( rest_url() ) ),
				'nonce' => \wp_create_nonce( 'wp_rest' ),
			)
		);
	}
}
