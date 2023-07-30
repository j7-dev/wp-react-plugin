<?php

declare(strict_types=1);

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
			'name'                     => \esc_html__($label, $_ENV['KEBAB']),
			'singular_name'            => \esc_html__($label, $_ENV['KEBAB']),
			'add_new'                  => \esc_html__('Add new', $_ENV['KEBAB']),
			'add_new_item'             => \esc_html__('Add new item', $_ENV['KEBAB']),
			'edit_item'                => \esc_html__('Edit', $_ENV['KEBAB']),
			'new_item'                 => \esc_html__('New', $_ENV['KEBAB']),
			'view_item'                => \esc_html__('View', $_ENV['KEBAB']),
			'view_items'               => \esc_html__('View', $_ENV['KEBAB']),
			'search_items'             => \esc_html__('Search ' . $label, $_ENV['KEBAB']),
			'not_found'                => \esc_html__('Not Found', $_ENV['KEBAB']),
			'not_found_in_trash'       => \esc_html__('Not found in trash', $_ENV['KEBAB']),
			'parent_item_colon'        => \esc_html__('Parent item', $_ENV['KEBAB']),
			'all_items'                => \esc_html__('All', $_ENV['KEBAB']),
			'archives'                 => \esc_html__($label . ' archives', $_ENV['KEBAB']),
			'attributes'               => \esc_html__($label . ' attributes', $_ENV['KEBAB']),
			'insert_into_item'         => \esc_html__('Insert to this ' . $label, $_ENV['KEBAB']),
			'uploaded_to_this_item'    => \esc_html__('Uploaded to this ' . $label, $_ENV['KEBAB']),
			'featured_image'           => \esc_html__('Featured image', $_ENV['KEBAB']),
			'set_featured_image'       => \esc_html__('Set featured image', $_ENV['KEBAB']),
			'remove_featured_image'    => \esc_html__('Remove featured image', $_ENV['KEBAB']),
			'use_featured_image'       => \esc_html__('Use featured image', $_ENV['KEBAB']),
			'menu_name'                => \esc_html__($label, $_ENV['KEBAB']),
			'filter_items_list'        => \esc_html__('Filter ' . $label . ' list', $_ENV['KEBAB']),
			'filter_by_date'           => \esc_html__('Filter by date', $_ENV['KEBAB']),
			'items_list_navigation'    => \esc_html__($label . ' list navigation', $_ENV['KEBAB']),
			'items_list'               => \esc_html__($label . ' list', $_ENV['KEBAB']),
			'item_published'           => \esc_html__($label . ' published', $_ENV['KEBAB']),
			'item_published_privately' => \esc_html__($label . ' published privately', $_ENV['KEBAB']),
			'item_reverted_to_draft'   => \esc_html__($label . ' reverted to draft', $_ENV['KEBAB']),
			'item_scheduled'           => \esc_html__($label . ' scheduled', $_ENV['KEBAB']),
			'item_updated'             => \esc_html__($label . ' updated', $_ENV['KEBAB']),
		];
		$args = [
			'label'               => \esc_html__($label, $_ENV['KEBAB']),
			'labels'              => $labels,
			'description'         => '',
			'public'              => true,
			'hierarchical'        => false,
			'exclude_from_search' => true,
			'publicly_queryable'  => true,
			'show_ui'             => true,
			'show_in_nav_menus'   => false,
			'show_in_admin_bar'   => false,
			'show_in_rest'        => true,
			'query_var'           => false,
			'can_export'          => true,
			'delete_with_user'    => true,
			'has_archive'         => false,
			'rest_base'           => '',
			'show_in_menu'        => true,
			'menu_position'       => 6,
			'menu_icon'           => 'dashicons-store',
			'capability_type'     => 'post',
			'supports'            => ['title', 'editor', 'thumbnail', 'custom-fields', 'author'],
			'taxonomies'          => [],
			'rest_controller_class' => 'WP_REST_Posts_Controller',
			'rewrite'             => [
				'with_front' => true,
			],
		];


		\register_post_type($kebab, $args);
	}
	public static function add_metabox(array $args): void
	{
		\add_meta_box(
			$args['id'],
			__($args['label'], $_ENV['KEBAB']),
			array(__CLASS__, 'render_metabox'),
			$args['post_type'],
			'advanced',
			'default',
			array('id' => $args['id'])
		);
	}

	/**
	 * Renders the meta box.
	 */
	public static function render_metabox($post, $metabox): void
	{
		echo "<div id='{$metabox['args']['id']}'></div>";
	}

	/**
	 * JSON Parse
	 */
	public static function json_parse($stringfy, $default = [])
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
