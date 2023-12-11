<?php

declare (strict_types = 1);

namespace J7\WP_REACT_PLUGIN\React\Admin;

class Api
{

    function __construct($shortcode = '')
    {
        \add_action('rest_api_init', 'register_custom_api_routes');
    }

    public static function custom_get_post_meta_endpoint($request)
    {
        $post_id = $request[ 'id' ];

        // 檢查文章是否存在
        if (\get_post_status($post_id)) {
            $post_meta           = \get_post_meta($post_id);
            $formatted_post_meta = [  ];
            foreach ($post_meta as $key => $value) {
                $formatted_post_meta[ $key ] = $value[ 0 ];
            }

            // 在此處理 post_meta 資訊，你可以根據需要進行資料處理

            return \rest_ensure_response($formatted_post_meta);
        } else {
            return new \WP_Error('post_not_found', '文章不存在', array('status' => 404));
        }
    }

    public function register_custom_api_routes()
    {
        \register_rest_route('wrp', 'postmeta/(?P<id>\d+)', array(
            'methods'  => 'GET',
            'callback' => self::custom_get_post_meta_endpoint,
        ));
    }
}
