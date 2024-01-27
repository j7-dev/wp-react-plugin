<?php

declare(strict_types=1);

namespace J7\WpReactPlugin;

use J7\WpReactPlugin\Utils;

class Api
{
	const AJAXNONCE_API_ENDPOINT = 'ajaxnonce';

	function __construct()
	{
		foreach ([self::AJAXNONCE_API_ENDPOINT] as $action) {
			\add_action('rest_api_init', [$this, "register_{$action}_api"]);
		}
	}

	public function ajaxnonce_callback($request)
	{
		$nonce = \wp_create_nonce(Utils::KEBAB);
		return \rest_ensure_response($nonce);
	}

	public function register_ajaxnonce_api()
	{
		$endpoint = self::AJAXNONCE_API_ENDPOINT;
		\register_rest_route(Utils::KEBAB, "{$endpoint}", array(
			'methods'  => 'GET',
			'callback' => [$this, "{$endpoint}_callback"],
		));
	}
}

new Api();
