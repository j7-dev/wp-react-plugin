<?php

declare (strict_types = 1);

namespace J7\WpReactPlugin;

use Kucrut\Vite;

class Bootstrap
{

    public function __construct()
    {
        require_once __DIR__ . '/api/index.php';
        require_once __DIR__ . '/admin/index.php';
        require_once __DIR__ . '/front-end/index.php';

        \add_action('admin_enqueue_scripts', [ $this, 'enqueue_script' ], 99);
        \add_action('wp_enqueue_scripts', [ $this, 'enqueue_script' ], 99);

        \add_action('init', array($this, 'remove_notices'), 20);
    }

    /**
     * Enqueue script
     */
    public function enqueue_script(): void
    {
        /*
         * enquene script on demand
        if (\is_admin()) {
        // match wp-admin screen_id
        $screen = \get_current_screen();
        if (($screen->id !== Utils::KEBAB)) return;
        } else {
        // match front-end post_type slug {Utils::KEBAB}
        if (strpos($_SERVER['REQUEST_URI'], Utils::KEBAB) === false) return;
        }
         */

        Vite\enqueue_asset(
            Utils::get_plugin_dir() . '/js/dist',
            'js/src/main.tsx',
            [
                'handle'    => Utils::KEBAB,
                'in-footer' => true,
             ]
        );

        $post_id   = \get_the_ID();
        $permalink = \get_permalink($post_id);

        \wp_localize_script(Utils::KEBAB, Utils::SNAKE . '_data', array(
            'env' => [
                'siteUrl'       => \site_url(),
                'ajaxUrl'       => \admin_url('admin-ajax.php'),
                'userId'        => \wp_get_current_user()->data->ID ?? null,
                'postId'        => $post_id,
                'permalink'     => $permalink,
                "APP_NAME"      => Utils::APP_NAME,
                "KEBAB"         => Utils::KEBAB,
                "SNAKE"         => Utils::SNAKE,
                "BASE_URL"      => Utils::BASE_URL,
                "APP1_SELECTOR" => '#' . Utils::APP1_SELECTOR,
                "APP2_SELECTOR" => '#' . Utils::APP2_SELECTOR,
                "API_TIMEOUT"   => Utils::API_TIMEOUT,
             ],
        ));

        \wp_localize_script(Utils::KEBAB, 'wpApiSettings', array(
            'root'  => \untrailingslashit(\esc_url_raw(rest_url())),
            'nonce' => \wp_create_nonce('wp_rest'),
        ));
    }

    public function remove_notices(): void
    {
        \remove_action('admin_notices', array(TGM_Plugin_Activation::$instance, 'notices'));
    }
}
