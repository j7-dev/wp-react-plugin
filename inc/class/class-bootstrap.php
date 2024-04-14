<?php
/**
 * Bootstrap
 */

declare (strict_types = 1);

namespace J7\WpReactPlugin;

use Micropackage\Singleton\Singleton;
use J7\WpReactPlugin\Utils\Base;
use Kucrut\Vite;

/**
 * Class Bootstrap
 */
final class Bootstrap extends Singleton {


	/**
	 * Constructor
	 */
	public function __construct() {
		require_once __DIR__ . '/utils/index.php';
		require_once __DIR__ . '/admin/index.php';
		require_once __DIR__ . '/front-end/index.php';

		\add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_script' ), 99 );
		\add_action( 'wp_enqueue_scripts', array( $this, 'frontend_enqueue_script' ), 99 );
	}

	/**
	 * Admin Enqueue script
	 * You can load the script on demand
	 *
	 * @param string $hook current page hook
	 *
	 * @return void
	 */
	public function admin_enqueue_script( $hook ): void {
		$this->enqueue_script();
	}


	/**
	 * Front-end Enqueue script
	 * You can load the script on demand
	 *
	 * @return void
	 */
	public function frontend_enqueue_script(): void {
		$this->enqueue_script();
	}

	/**
	 * Enqueue script
	 * You can load the script on demand
	 *
	 * @return void
	 */
	public function enqueue_script(): void {

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
					'BASE_URL'      => Base::BASE_URL,
					'APP1_SELECTOR' => '#' . Base::APP1_SELECTOR,
					'APP2_SELECTOR' => '#' . Base::APP2_SELECTOR,
					'API_TIMEOUT'   => Base::API_TIMEOUT,
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
