<?php

declare(strict_types=1);

namespace J7\WP_REACT_PLUGIN\React\Admin;

use J7\WP_REACT_PLUGIN\React\Admin\Bootstrap;

class CPT extends Bootstrap
{
	public $post_type = '';
	public $post_metas = [];
	public $rewrite = [];

	function __construct($cpt, $args)
	{
		$this->post_type = $cpt;
		$this->post_metas = $args['post_metas'];
		$this->rewrite = $args['rewrite'] ?? [];

		if (empty($this->post_type)) return;

		\add_action('init', [$this, 'init']);

		if (!empty($args['post_metas'])) {
			\add_action('rest_api_init', [$this, 'add_post_meta']);
		}

		\add_action('load-post.php',     [$this, 'init_metabox']);
		\add_action('load-post-new.php', [$this, 'init_metabox']);

		if (!empty($args['rewrite'])) {
			\add_filter('query_vars', [$this, 'add_query_var']);
			\add_filter('template_include', [$this, 'load_custom_template'], 99);
		}
	}

	public function init(): void
	{
		Functions::register_cpt($this->post_type);

		// add {$this->post_type}/{slug}/test rewrite rule
		if (!empty($this->rewrite)) {
			\add_rewrite_rule('^' . $this->post_type . '/([^/]+)/' . $this->rewrite['slug'] . '/?$', 'index.php?post_type=' . $this->post_type . '&name=$matches[1]&' . $this->rewrite['var'] . '=1', 'top');
			\flush_rewrite_rules();
		}
	}

	public function add_post_meta(): void
	{
		foreach ($this->post_metas as $meta_key) {
			\register_meta('post', $_ENV['SNAKE'] . '_' . $meta_key, [
				'type' => 'string',
				'show_in_rest' => true,
				'single' => true,
			]);
		}
	}

	/**
	 * Meta box initialization.
	 */
	public function init_metabox(): void
	{
		\add_action('add_meta_boxes', [$this, 'add_metaboxs']);
		\add_action('save_post',      [$this, 'save_metabox'], 10, 2);
		\add_filter('rewrite_rules_array', [$this, 'custom_post_type_rewrite_rules']);
	}

	/**
	 * Adds the meta box.
	 */
	public function add_metaboxs(): void
	{
		Functions::add_metabox([
			'id'       => $_ENV['VITE_RENDER_ID_2'],
			'label' 	=> __('Custom MetaBox', $_ENV['KEBAB']),
			'post_type' => $this->post_type,
		]);
	}

	public function add_query_var($vars)
	{
		$vars[] = $this->rewrite['var'];
		return $vars;
	}

	public function custom_post_type_rewrite_rules($rules)
	{
		global $wp_rewrite;
		$wp_rewrite->flush_rules();
		return $rules;
	}

	public function save_metabox($post_id, $post)
	{

		/*
		 * We need to verify this came from the our screen and with proper authorization,
		 * because save_post can be triggered at other times.
		 */

		// Check if our nonce is set.
		if (!isset($_POST['_wpnonce'])) 	return $post_id;

		$nonce = $_POST['_wpnonce'];


		/*
		 * If this is an autosave, our form has not been submitted,
		 * so we don't want to do anything.
		 */
		if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return $post_id;

		$post_type = \sanitize_text_field($_POST['post_type'] ?? '');

		// Check the user's permissions.
		if ($this->post !== $post_type) return $post_id;
		if (!\current_user_can('edit_post', $post_id)) return $post_id;

		/* OK, it's safe for us to save the data now. */

		// Sanitize the user input.
		$meta_data = \sanitize_text_field($_POST[$_ENV['SNAKE'] . '_meta']);


		// Update the meta field.
		\update_post_meta($post_id, $_ENV['SNAKE'] . '_meta', $meta_data);
	}

	/**
	 * 設定 {$_ENV['KEBAB']}/{slug}/report 的 php template
	 */
	public function load_custom_template($template)
	{
		$repor_template_path = Bootstrap::PLUGIN_DIR . 'inc/templates/' . $this->rewrite['template_path'];

		if (\get_query_var($this->rewrite['var'])) {
			if (file_exists($repor_template_path)) {
				return $repor_template_path;
			}
		}
		return $template;
	}
}
