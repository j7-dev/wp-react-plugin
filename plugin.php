<?php

/**
 * Plugin Name: Boilerplate-React.WordPress-Plugin (BRWP)
 * Description: BRWP is a boilerplate for creating a WordPress plugin with React, Tailwind, Ant Design, TypeScript, Zod, MSW, React Router v6, React Query v4, SCSS and Vite.
 * Author: j7.dev
 * Author URI: https://github.com/j7-dev
 * License: GPLv2
 * Version: 0.0.1
 */

namespace Kucrut\ViteForWPExample\React;

define('PROJECT_NAME', 'your-project');

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/inc/frontend.php';

Frontend\bootstrap();
