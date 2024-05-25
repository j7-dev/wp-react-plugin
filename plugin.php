<?php
/**
 * Plugin Name:       WP React Plugin (DEV)
 * Plugin URI:        https://github.com/j7-dev/wp-react-plugin
 * Description:       WP React Plugin is a boilerplate for creating a WordPress plugin with React, Tailwind, TypeScript, React Query v4, SCSS and Vite.
 * Version:           4.0.0
 * Requires at least: 5.7
 * Requires PHP:      8.0
 * Author:            J7
 * Author URI:        https://github.com/j7-dev
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wp_react_plugin
 * Domain Path:       /languages
 * Tags: vite, react, tailwind, typescript, react-query, scss, WordPress, WordPress plugin
 */

declare (strict_types = 1);

namespace J7\WpReactPlugin;

if ( ! \class_exists( 'J7\WpReactPlugin\Plugin' ) ) {
	require_once __DIR__ . '/vendor/autoload.php';

	/**
	 * Class Plugin
	 */
	final class Plugin {
		use \J7\WpUtils\Traits\PluginTrait;
		use \J7\WpUtils\Traits\SingletonTrait;

		/**
		 * Constructor
		 */
		public function __construct() {
			require_once __DIR__ . '/inc/class/class-bootstrap.php';

			// $this->required_plugins = array(
			// array(
			// 'name'     => 'WooCommerce',
			// 'slug'     => 'woocommerce',
			// 'required' => true,
			// 'version'  => '7.6.0',
			// ),
			// array(
			// 'name'     => 'WP Toolkit',
			// 'slug'     => 'wp-toolkit',
			// 'source'   => 'Author URL/wp-toolkit/releases/latest/download/wp-toolkit.zip',
			// 'required' => true,
			// ),
			// );

			$this->init(
				[
					'app_name'    => 'My App',
					'github_repo' => 'https://github.com/j7-dev/wp-react-plugin',
					'callback'    => [ '\J7\WpReactPlugin\Bootstrap', 'instance' ],
				]
			);
		}
	}

	Plugin::instance();
}
