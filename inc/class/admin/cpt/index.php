<?php
/**
 * Custom Post Type: My App
 */

declare(strict_types=1);

namespace J7\WpReactPlugin\Admin;

use J7\WpReactPlugin\Utils;
use J7\WpReactPlugin\Plugin;

/**
 * Class CPT
 */
final class CPT {

	/**
	 * Post metas
	 *
	 * @var array
	 */
	public $post_metas = array();
	/**
	 * Rewrite
	 *
	 * @var array
	 */
	public $rewrite = array();

	/**
	 * Constructor
	 *
	 * @param array $args Arguments.
	 */
	public function __construct( $args ) {
		$this->post_metas = $args['post_metas'];
		$this->rewrite    = $args['rewrite'] ?? array();

		\add_action( 'init', array( $this, 'init' ) );

		if ( ! empty( $args['post_metas'] ) ) {
			\add_action( 'rest_api_init', array( $this, 'add_post_meta' ) );
		}

		\add_action( 'load-post.php', array( $this, 'init_metabox' ) );
		\add_action( 'load-post-new.php', array( $this, 'init_metabox' ) );

		if ( ! empty( $args['rewrite'] ) ) {
			\add_filter( 'query_vars', array( $this, 'add_query_var' ) );
			\add_filter( 'template_include', array( $this, 'load_custom_template' ), 99 );
		}
	}

	/**
	 * Initialize
	 */
	public function init(): void {
		$this->register_cpt();

		// add {$this->post_type}/{slug}/test rewrite rule
		if ( ! empty( $this->rewrite ) ) {
			\add_rewrite_rule( '^my-app/([^/]+)/' . $this->rewrite['slug'] . '/?$', 'index.php?post_type=my-app&name=$matches[1]&' . $this->rewrite['var'] . '=1', 'top' );
			\flush_rewrite_rules();
		}
	}

	/**
	 * Register my-app custom post type
	 */
	public static function register_cpt(): void {

		$labels = array(
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
		);
		$args   = array(
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
			'supports'              => array( 'title', 'editor', 'thumbnail', 'custom-fields', 'author' ),
			'taxonomies'            => array(),
			'rest_controller_class' => 'WP_REST_Posts_Controller',
			'rewrite'               => array(
				'with_front' => true,
			),
		);

		\register_post_type( 'my-app', $args );
	}

	/**
	 * Register meta fields for post type to show in rest api
	 */
	public function add_post_meta(): void {
		foreach ( $this->post_metas as $meta_key ) {
			\register_meta(
				'post',
				Plugin::SNAKE . '_' . $meta_key,
				array(
					'type'         => 'string',
					'show_in_rest' => true,
					'single'       => true,
				)
			);
		}
	}

	/**
	 * Meta box initialization.
	 */
	public function init_metabox(): void {
		\add_action( 'add_meta_boxes', array( $this, 'add_metabox' ) );
		\add_action( 'save_post', array( $this, 'save_metabox' ), 10, 2 );
		\add_filter( 'rewrite_rules_array', array( $this, 'custom_post_type_rewrite_rules' ) );
	}

	/**
	 * Adds the meta box.
	 *
	 * @param string $post_type Post type.
	 */
	public function add_metabox( string $post_type ): void {
		if ( in_array( $post_type, array( Plugin::KEBAB ) ) ) {
			\add_meta_box(
				Plugin::KEBAB . '-metabox',
				__( 'My App', 'wp_react_plugin' ),
				array( $this, 'render_meta_box' ),
				$post_type,
				'advanced',
				'high'
			);
		}
	}

	/**
	 * Render meta box.
	 */
	public function render_meta_box(): void {
		// phpcs:ignore
		echo '<div id="' . Utils::RENDER_ID_2 . '"></div>';
	}


	/**
	 * Add query var
	 *
	 * @param array $vars Vars.
	 * @return array
	 */
	public function add_query_var( $vars ) {
		$vars[] = $this->rewrite['var'];
		return $vars;
	}

	/**
	 * Custom post type rewrite rules
	 *
	 * @param array $rules Rules.
	 * @return array
	 */
	public function custom_post_type_rewrite_rules( $rules ) {
		global $wp_rewrite;
		$wp_rewrite->flush_rules();
		return $rules;
	}

	/**
	 * Save the meta when the post is saved.
	 *
	 * @param int     $post_id Post ID.
	 * @param WP_Post $post    Post object.
	 */
	public function save_metabox( $post_id, $post ) { // phpcs:ignore
		// phpcs:disable
		/*
		* We need to verify this came from the our screen and with proper authorization,
		* because save_post can be triggered at other times.
		*/

		// Check if our nonce is set.
		if ( ! isset( $_POST['_wpnonce'] ) ) {
			return $post_id;
		}

		$nonce = $_POST['_wpnonce'];

		/*
		* If this is an autosave, our form has not been submitted,
		* so we don't want to do anything.
		*/
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return $post_id;
		}

		$post_type = \sanitize_text_field( $_POST['post_type'] ?? '' );

		// Check the user's permissions.
		if ( 'my-app' !== $post_type ) {
			return $post_id;
		}

		if ( ! \current_user_can( 'edit_post', $post_id ) ) {
			return $post_id;
		}

		/* OK, it's safe for us to save the data now. */

		// Sanitize the user input.
		$meta_data = \sanitize_text_field( $_POST[ Plugin::SNAKE . '_meta' ] );

		// Update the meta field.
		\update_post_meta( $post_id, Plugin::SNAKE . '_meta', $meta_data );
	}

	/**
	 * Load custom template
	 * Set {Plugin::KEBAB}/{slug}/report  php template
	 *
	 * @param string $template Template.
	 */
	public function load_custom_template( $template ) {
		$repor_template_path = Plugin::$dir . '/inc/templates/' . $this->rewrite['template_path'];

		if ( \get_query_var( $this->rewrite['var'] ) ) {
			if ( file_exists( $repor_template_path ) ) {
				return $repor_template_path;
			}
		}
		return $template;
	}
}

new CPT(
	array(
		'post_metas' => array( 'meta', 'settings' ),
		'rewrite'    => array(
			'template_path' => 'test.php',
			'slug'          => 'test',
			'var'           => Plugin::SNAKE . '_test',
		),
	)
);
