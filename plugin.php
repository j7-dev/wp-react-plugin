<?php
/**
 * Plugin Name:       WP React Plugin (DEV)
 * Plugin URI:        https://github.com/j7-dev/wp-react-plugin
 * Description:       WP React Plugin is a boilerplate for creating a WordPress plugin with React, Tailwind, TypeScript, React Query v4, SCSS and Vite.
 * Version:           4.0.12
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

declare ( strict_types=1 );

namespace J7\WpReactPlugin;

if ( \class_exists( 'J7\WpReactPlugin\Plugin' ) ) {
	return;
}

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
		// if your plugin depends on other plugins, you can add them here
		// $this->required_plugins = [
		// [
		// 'name'     => 'WooCommerce',
		// 'slug'     => 'woocommerce',
		// 'required' => true,
		// 'version'  => '7.6.0',
		// ],
		// [
		// 'name'     => 'Powerhouse',
		// 'slug'     => 'powerhouse',
		// 'source'   => 'https://github.com/j7-dev/wp-powerhouse/releases/latest/download/powerhouse.zip',
		// 'version'  => '1.0.14',
		// 'required' => true,
		// ],
		// ];

		$this->init(
			[
				'app_name'    => 'Wp React Plugin',
				'github_repo' => 'https://github.com/j7-dev/wp-react-plugin',
				'callback'    => [ Bootstrap::class, 'instance' ],
			]
		);
	}
}

Plugin::instance();
