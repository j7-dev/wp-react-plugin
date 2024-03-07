<?php

declare (strict_types = 1);

namespace J7\WpReactPlugin;

abstract class Utils
{
    const PLUGIN_DIR_NAME = 'wp-react-plugin';
    const APP_NAME        = 'My App';
    const KEBAB           = 'my-app';
    const SNAKE           = 'my_app';
    const TEXT_DOMAIN     = self::SNAKE;

    const BASE_URL      = '/';
    const APP1_SELECTOR = 'my_app';
    const APP2_SELECTOR = 'my_app_metabox';
    const API_TIMEOUT   = '30000';

    const RENDER_ID_1 = 'my_app';
    const RENDER_ID_2 = 'my_app_metabox';

    const DEFAULT_IMAGE = 'http://1.gravatar.com/avatar/1c39955b5fe5ae1bf51a77642f052848?s=96&d=mm&r=g';
    const GITHUB_REPO   = 'https://github.com/j7-dev/wp-react-plugin';

    public static function get_plugin_dir(): string
    {
        $plugin_dir = \untrailingslashit(\wp_normalize_path(ABSPATH . 'wp-content/plugins/' . self::PLUGIN_DIR_NAME));
        return $plugin_dir;
    }

    public static function get_plugin_url(): string
    {
        $plugin_url = \untrailingslashit(\plugin_dir_url(Utils::get_plugin_dir() . '/plugin.php'));
        return $plugin_url;
    }

    public static function get_plugin_ver(): string
    {
        $plugin_data = \get_plugin_data(Utils::get_plugin_dir() . '/plugin.php');
        $plugin_ver  = $plugin_data[ 'Version' ];
        return $plugin_ver;
    }
}
