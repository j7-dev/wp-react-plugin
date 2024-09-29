<?php
/**
 * Custom Post Type: My App
 */

declare(strict_types=1);

namespace J7\WpReactPlugin\Admin;

use J7\WpReactPlugin\Plugin;

if (class_exists('J7\WpReactPlugin\Admin\CPT')) {
	return;
}
/**
 * Class CPT
 */
final class CPT {
	use \J7\WpUtils\Traits\SingletonTrait;

	/**
	 * Constructor
	 */
	public function __construct() {
		\add_action( 'init', [ __CLASS__, 'register_cpt' ] );
		\add_action( 'load-post.php', [ __CLASS__, 'init_metabox' ] );
		\add_action( 'load-post-new.php', [ __CLASS__, 'init_metabox' ] );
	}

	/**
	 * Register my-app custom post type
	 */
	public static function register_cpt(): void {

		$labels = [
			'name'                     => \esc_html__( 'my-app', 'wp_react_plugin' ),
			'singular_name'            => \esc_html__( 'my-app', 'wp_react_plugin' ),
			'add_new'                  => \esc_html__( 'Add new', 'wp_react_plugin' ),
			'add_new_item'             => \esc_html__( 'Add new item', 'wp_react_plugin' ),
			'edit_item'                => \esc_html__( 'Edit', 'wp_react_plugin' ),
			'new_item'                 => \esc_html__( 'New', 'wp_react_plugin' ),
			'view_item'                => \esc_html__( 'View', 'wp_react_plugin' ),
			'view_items'               => \esc_html__( 'View', 'wp_react_plugin' ),
			'search_items'             => \esc_html__( 'Search my-app', 'wp_react_plugin' ),
			'not_found'                => \esc_html__( 'Not Found', 'wp_react_plugin' ),
			'not_found_in_trash'       => \esc_html__( 'Not found in trash', 'wp_react_plugin' ),
			'parent_item_colon'        => \esc_html__( 'Parent item', 'wp_react_plugin' ),
			'all_items'                => \esc_html__( 'All', 'wp_react_plugin' ),
			'archives'                 => \esc_html__( 'my-app archives', 'wp_react_plugin' ),
			'attributes'               => \esc_html__( 'my-app attributes', 'wp_react_plugin' ),
			'insert_into_item'         => \esc_html__( 'Insert to this my-app', 'wp_react_plugin' ),
			'uploaded_to_this_item'    => \esc_html__( 'Uploaded to this my-app', 'wp_react_plugin' ),
			'featured_image'           => \esc_html__( 'Featured image', 'wp_react_plugin' ),
			'set_featured_image'       => \esc_html__( 'Set featured image', 'wp_react_plugin' ),
			'remove_featured_image'    => \esc_html__( 'Remove featured image', 'wp_react_plugin' ),
			'use_featured_image'       => \esc_html__( 'Use featured image', 'wp_react_plugin' ),
			'menu_name'                => \esc_html__( 'my-app', 'wp_react_plugin' ),
			'filter_items_list'        => \esc_html__( 'Filter my-app list', 'wp_react_plugin' ),
			'filter_by_date'           => \esc_html__( 'Filter by date', 'wp_react_plugin' ),
			'items_list_navigation'    => \esc_html__( 'my-app list navigation', 'wp_react_plugin' ),
			'items_list'               => \esc_html__( 'my-app list', 'wp_react_plugin' ),
			'item_published'           => \esc_html__( 'my-app published', 'wp_react_plugin' ),
			'item_published_privately' => \esc_html__( 'my-app published privately', 'wp_react_plugin' ),
			'item_reverted_to_draft'   => \esc_html__( 'my-app reverted to draft', 'wp_react_plugin' ),
			'item_scheduled'           => \esc_html__( 'my-app scheduled', 'wp_react_plugin' ),
			'item_updated'             => \esc_html__( 'my-app updated', 'wp_react_plugin' ),
		];
		$args   = [
			'label'                 => \esc_html__( 'my-app', 'wp_react_plugin' ),
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
			'taxonomies'            => [],
			'rest_controller_class' => 'WP_REST_Posts_Controller',
			'rewrite'               => [
				'with_front' => true,
			],
		];

		\register_post_type( 'my-app', $args );
	}


	/**
	 * Meta box initialization.
	 */
	public static function init_metabox(): void {
		\add_action( 'add_meta_boxes', [ __CLASS__, 'add_metabox' ] );
	}

	/**
	 * Adds the meta box.
	 *
	 * @param string $post_type Post type.
	 */
	public static function add_metabox( string $post_type ): void {
		if ( in_array( $post_type, [ Plugin::$kebab ], true ) ) {
			\add_meta_box(
				Plugin::$kebab . '-metabox',
				__( 'My App', 'wp_react_plugin' ),
				[ __CLASS__, 'render_meta_box' ],
				$post_type,
				'advanced',
				'high'
			);
		}
	}

	/**
	 * Render meta box.
	 */
	public static function render_meta_box(): void {
		echo '<div id="my_app_metabox"></div>';
	}
}
