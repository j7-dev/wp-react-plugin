<?php

/**
 * Plugin Name: WP React Plugin (DEV)
 * Description: WP React Plugin is a boilerplate for creating a WordPress plugin with React, Tailwind, TypeScript, React Query v4, SCSS and Vite. * Author: j7.dev
 * Author URI: https://github.com/j7-dev
 * License: GPLv2
 * Version: 1.1.2
 * Requires PHP: 7.4.0
 */

/**
 * Tags: woocommerce, shop, order
 * Requires at least: 4.6
 * Tested up to: 4.8
 * Stable tag: 4.3
 */

namespace J7\WpMyAppPlugin\MyApp\Inc;

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/inc/admin.php';

$instance = new Bootstrap();
$instance->init();
