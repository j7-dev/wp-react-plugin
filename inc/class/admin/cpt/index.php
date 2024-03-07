<?php

declare(strict_types=1);

namespace J7\WpReactPlugin\Admin;

use J7\WpReactPlugin\Utils;

class CPT {

	public $post_type  = '';
	public $post_metas = array();
	public $rewrite    = array();

	function __construct( $cpt, $args ) {
		$this->post_type  = $cpt;
		$this->post_metas = $args['post_metas'];
		$this->rewrite    = $args['rewrite'] ?? array();

		if ( empty( $this->post_type ) ) {
			return;
		}

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

	public function init(): void {
		$this->register_cpt( $this->post_type, Utils::SNAKE );

		// add {$this->post_type}/{slug}/test rewrite rule
		if ( ! empty( $this->rewrite ) ) {
			\add_rewrite_rule( '^' . $this->post_type . '/([^/]+)/' . $this->rewrite['slug'] . '/?$', 'index.php?post_type=' . $this->post_type . '&name=$matches[1]&' . $this->rewrite['var'] . '=1', 'top' );
			\flush_rewrite_rules();
		}
	}

	public static function register_cpt( $label, $text_domain ): void {

		$kebab = str_replace( ' ', '-', strtolower( $label ) );

		$labels = array(
			'name'                     => \esc_html__( $label, $text_domain ),
			'singular_name'            => \esc_html__( $label, $text_domain ),
			'add_new'                  => \esc_html__( 'Add new', $text_domain ),
			'add_new_item'             => \esc_html__( 'Add new item', $text_domain ),
			'edit_item'                => \esc_html__( 'Edit', $text_domain ),
			'new_item'                 => \esc_html__( 'New', $text_domain ),
			'view_item'                => \esc_html__( 'View', $text_domain ),
			'view_items'               => \esc_html__( 'View', $text_domain ),
			'search_items'             => \esc_html__( 'Search ' . $label, $text_domain ),
			'not_found'                => \esc_html__( 'Not Found', $text_domain ),
			'not_found_in_trash'       => \esc_html__( 'Not found in trash', $text_domain ),
			'parent_item_colon'        => \esc_html__( 'Parent item', $text_domain ),
			'all_items'                => \esc_html__( 'All', $text_domain ),
			'archives'                 => \esc_html__( $label . ' archives', $text_domain ),
			'attributes'               => \esc_html__( $label . ' attributes', $text_domain ),
			'insert_into_item'         => \esc_html__( 'Insert to this ' . $label, $text_domain ),
			'uploaded_to_this_item'    => \esc_html__( 'Uploaded to this ' . $label, $text_domain ),
			'featured_image'           => \esc_html__( 'Featured image', $text_domain ),
			'set_featured_image'       => \esc_html__( 'Set featured image', $text_domain ),
			'remove_featured_image'    => \esc_html__( 'Remove featured image', $text_domain ),
			'use_featured_image'       => \esc_html__( 'Use featured image', $text_domain ),
			'menu_name'                => \esc_html__( $label, $text_domain ),
			'filter_items_list'        => \esc_html__( 'Filter ' . $label . ' list', $text_domain ),
			'filter_by_date'           => \esc_html__( 'Filter by date', $text_domain ),
			'items_list_navigation'    => \esc_html__( $label . ' list navigation', $text_domain ),
			'items_list'               => \esc_html__( $label . ' list', $text_domain ),
			'item_published'           => \esc_html__( $label . ' published', $text_domain ),
			'item_published_privately' => \esc_html__( $label . ' published privately', $text_domain ),
			'item_reverted_to_draft'   => \esc_html__( $label . ' reverted to draft', $text_domain ),
			'item_scheduled'           => \esc_html__( $label . ' scheduled', $text_domain ),
			'item_updated'             => \esc_html__( $label . ' updated', $text_domain ),
		);
		$args = array(
			'label'                 => \esc_html__( $label, $text_domain ),
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

		\register_post_type( $kebab, $args );
	}

	public function add_post_meta(): void {
		foreach ( $this->post_metas as $meta_key ) {
			\register_meta(
				'post',
				Utils::SNAKE . '_' . $meta_key,
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
	 */
	public function add_metabox( string $post_type ): void {
		if ( in_array( $post_type, array( Utils::KEBAB ) ) ) {
			\add_meta_box(
				Utils::KEBAB . '-metabox',
				__( 'My App', Utils::TEXT_DOMAIN ),
				array( $this, 'render_meta_box' ),
				$post_type,
				'advanced',
				'high'
			);
		}
	}

	public function render_meta_box(): void {
		echo '<div id="' . Utils::RENDER_ID_2 . '"></div>';
	}

	public function add_query_var( $vars ) {
		$vars[] = $this->rewrite['var'];
		return $vars;
	}

	public function custom_post_type_rewrite_rules( $rules ) {
		global $wp_rewrite;
		$wp_rewrite->flush_rules();
		return $rules;
	}

	public function save_metabox( $post_id, $post ) {

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
		if ( $this->post_type !== $post_type ) {
			return $post_id;
		}

		if ( ! \current_user_can( 'edit_post', $post_id ) ) {
			return $post_id;
		}

		/* OK, it's safe for us to save the data now. */

		// Sanitize the user input.
		$meta_data = \sanitize_text_field( $_POST[ Utils::SNAKE . '_meta' ] );

		// Update the meta field.
		\update_post_meta( $post_id, Utils::SNAKE . '_meta', $meta_data );
	}

	/**
	 * 設定 {Utils::KEBAB}/{slug}/report 的 php template
	 */
	public function load_custom_template( $template ) {
		$repor_template_path = Utils::get_plugin_dir() . '/inc/templates/' . $this->rewrite['template_path'];

		if ( \get_query_var( $this->rewrite['var'] ) ) {
			if ( file_exists( $repor_template_path ) ) {
				return $repor_template_path;
			}
		}
		return $template;
	}
}

new CPT(
	Utils::KEBAB,
	array(
		'post_metas' => array( 'meta', 'settings' ),
		'rewrite'    => array(
			'template_path' => 'test.php',
			'slug'          => 'test',
			'var'           => Utils::SNAKE . '_test',
		),
	)
);
