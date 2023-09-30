<?php

/**
 * Plugin Name: WP React Plugin
 * Description: WP React Plugin is a boilerplate for creating a WordPress plugin with React, Tailwind, TypeScript, React Query v4, SCSS and Vite.
 * Author: j7.dev
 * Author URI: https://github.com/j7-dev
 * License: GPLv2
 * Version: 1.1.0
 * Requires PHP: 8.1
 */

/**
 * Tags: woocommerce, shop, order
 * Requires at least: 4.6
 * Tested up to: 4.8
 * Stable tag: 4.3
 */

namespace J7\WP_REACT_PLUGIN\React;

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/inc/admin.php';


use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__, '.env.production');
$dotenv->safeLoad();


$instance = new Admin\Bootstrap();
$instance->init();
