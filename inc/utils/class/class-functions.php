<?php

declare (strict_types = 1);

namespace J7\WP_REACT_PLUGIN\React\Admin;

use J7\WP_REACT_PLUGIN\React\Admin\Bootstrap;

class Functions
{
    /**
     * Register CPT
     *
     * @param string $label - the name of CPT
     * @param array $meta_keys - the meta keys of CPT ex ['meta', 'settings']
     * @return void
     */
    public static function register_cpt($label): void
    {

        $kebab = str_replace(' ', '-', strtolower($label));
        $snake = str_replace(' ', '_', strtolower($label));

        $labels = [
            'name'                     => \esc_html__($label, Bootstrap::KEBAB),
            'singular_name'            => \esc_html__($label, Bootstrap::KEBAB),
            'add_new'                  => \esc_html__('Add new', Bootstrap::KEBAB),
            'add_new_item'             => \esc_html__('Add new item', Bootstrap::KEBAB),
            'edit_item'                => \esc_html__('Edit', Bootstrap::KEBAB),
            'new_item'                 => \esc_html__('New', Bootstrap::KEBAB),
            'view_item'                => \esc_html__('View', Bootstrap::KEBAB),
            'view_items'               => \esc_html__('View', Bootstrap::KEBAB),
            'search_items'             => \esc_html__('Search ' . $label, Bootstrap::KEBAB),
            'not_found'                => \esc_html__('Not Found', Bootstrap::KEBAB),
            'not_found_in_trash'       => \esc_html__('Not found in trash', Bootstrap::KEBAB),
            'parent_item_colon'        => \esc_html__('Parent item', Bootstrap::KEBAB),
            'all_items'                => \esc_html__('All', Bootstrap::KEBAB),
            'archives'                 => \esc_html__($label . ' archives', Bootstrap::KEBAB),
            'attributes'               => \esc_html__($label . ' attributes', Bootstrap::KEBAB),
            'insert_into_item'         => \esc_html__('Insert to this ' . $label, Bootstrap::KEBAB),
            'uploaded_to_this_item'    => \esc_html__('Uploaded to this ' . $label, Bootstrap::KEBAB),
            'featured_image'           => \esc_html__('Featured image', Bootstrap::KEBAB),
            'set_featured_image'       => \esc_html__('Set featured image', Bootstrap::KEBAB),
            'remove_featured_image'    => \esc_html__('Remove featured image', Bootstrap::KEBAB),
            'use_featured_image'       => \esc_html__('Use featured image', Bootstrap::KEBAB),
            'menu_name'                => \esc_html__($label, Bootstrap::KEBAB),
            'filter_items_list'        => \esc_html__('Filter ' . $label . ' list', Bootstrap::KEBAB),
            'filter_by_date'           => \esc_html__('Filter by date', Bootstrap::KEBAB),
            'items_list_navigation'    => \esc_html__($label . ' list navigation', Bootstrap::KEBAB),
            'items_list'               => \esc_html__($label . ' list', Bootstrap::KEBAB),
            'item_published'           => \esc_html__($label . ' published', Bootstrap::KEBAB),
            'item_published_privately' => \esc_html__($label . ' published privately', Bootstrap::KEBAB),
            'item_reverted_to_draft'   => \esc_html__($label . ' reverted to draft', Bootstrap::KEBAB),
            'item_scheduled'           => \esc_html__($label . ' scheduled', Bootstrap::KEBAB),
            'item_updated'             => \esc_html__($label . ' updated', Bootstrap::KEBAB),
         ];
        $args = [
            'label'                 => \esc_html__($label, Bootstrap::KEBAB),
            'labels'                => $labels,
            'description'           => '',
            'public'                => true,
            'hierarchical'          => false,
            'exclude_from_search'   => true,
            'publicly_queryable'    => true,
            'show_ui'               => true,
            'show_in_nav_menus'     => false,
            'show_in_admin_bar'     => false,
            'show_in_rest'          => true,
            'query_var'             => false,
            'can_export'            => true,
            'delete_with_user'      => true,
            'has_archive'           => false,
            'rest_base'             => '',
            'show_in_menu'          => true,
            'menu_position'         => 6,
            'menu_icon'             => 'dashicons-store',
            'capability_type'       => 'post',
            'supports'              => [ 'title', 'editor', 'thumbnail', 'custom-fields', 'author' ],
            'taxonomies'            => [  ],
            'rest_controller_class' => 'WP_REST_Posts_Controller',
            'rewrite'               => [
                'with_front' => true,
             ],
         ];

        \register_post_type($kebab, $args);
    }
    public static function add_metabox(array $args): void
    {
        \add_meta_box(
            $args[ 'id' ],
            __($args[ 'label' ], Bootstrap::KEBAB),
            array(__CLASS__, 'render_metabox'),
            $args[ 'post_type' ],
            'advanced',
            'default',
            array('id' => $args[ 'id' ])
        );
    }

    /**
     * Renders the meta box.
     */
    public static function render_metabox($post, $metabox): void
    {
        echo "<div id='{$metabox[ 'args' ][ 'id' ]}'></div>";
    }

    /**
     * JSON Parse
     */
    public static function json_parse($stringfy, $default = [  ])
    {
        $out_put = '';
        try {
            $out_put = json_decode(str_replace('\\', '', $stringfy));
        } catch (\Throwable $th) {
            $out_put = $default;
        } finally {
            return $out_put;
        }
    }
}
