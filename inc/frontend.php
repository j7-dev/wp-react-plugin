<?php

declare(strict_types=1);

namespace Kucrut\ViteForWPExample\React\Frontend;

use Kucrut\Vite;

/**
 * Frontend bootstrapper
 *
 * @return void
 */
function bootstrap(): void
{
  add_action('wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_script');
  add_action('wp_footer', __NAMESPACE__ . '\\render_app');
}

/**
 * Render application's markup
 */
function render_app(): void
{
  printf('<div id="my-app" class="my-app"></div>');
}

/**
 * Enqueue script
 */
function enqueue_script(): void
{
  Vite\enqueue_asset(
    dirname(__DIR__) . '/js/dist',
    'js/src/main.tsx',
    [
      'handle' => PROJECT_NAME,
      'in-footer' => true,
    ]
  );

  wp_localize_script(PROJECT_NAME, 'userData', array(
    'userName' => wp_get_current_user()->user_login,
    'userId' => wp_get_current_user()->data->ID,
  ));

  wp_localize_script(PROJECT_NAME, 'wpApiSettings', array(
    'root' => esc_url_raw(rest_url()),
    'nonce' => wp_create_nonce('wp_rest'),
  ));
}



include_once __DIR__ . '/custom/includes.php';
