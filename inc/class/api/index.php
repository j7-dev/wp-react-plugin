<?php

declare(strict_types=1);

namespace J7\WpReactPlugin;

use J7\WpReactPlugin\Utils;

class Api
{
	const ENV_API_ENDPOINT = 'env';

	function __construct()
	{
		foreach ([self::ENV_API_ENDPOINT] as $action) {
			\add_action('rest_api_init', [$this, "register_{$action}_api"]);
		}
	}

	public function env_callback($request)
	{
		$env = [
			'siteUrl'     => \site_url(),
			'ajaxUrl'     => \admin_url('admin-ajax.php'),
			'userId'      => \get_current_user_id(),
			"APP_NAME"    => Utils::APP_NAME,
			"KEBAB"       => Utils::KEBAB,
			"SNAKE"       => Utils::SNAKE,
			"BASE_URL"    => Utils::BASE_URL,
			"RENDER_ID_1" => Utils::RENDER_ID_1,
			"RENDER_ID_2" => Utils::RENDER_ID_2,
			"API_TIMEOUT" => Utils::API_TIMEOUT,
		];
		return \rest_ensure_response($env);
	}

	public function register_env_api()
	{
		$endpoint = self::ENV_API_ENDPOINT;
		\register_rest_route(Utils::KEBAB, "{$endpoint}", array(
			'methods'  => 'GET',
			'callback' => [$this, "{$endpoint}_callback"],
		));
	}
}

new Api();
