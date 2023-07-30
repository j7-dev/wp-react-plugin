<?php

declare(strict_types=1);

namespace J7\WP_REACT_PLUGIN\React\Admin;

use J7\WP_REACT_PLUGIN\React\Admin\Bootstrap;

class ShortCode
{

	function __construct($shortcode = '')
	{
		if (!empty($shortcode)) {
			\add_shortcode($shortcode, [$this, 'shortcode_callback']);
		}
	}

	public function shortcode_callback()
	{

		$html = '';
		ob_start();
?>
		<div id="<?= $_ENV['VITE_RENDER_ID_1'] ?>"></div>
<?php
		$html .= ob_get_clean();


		return $html;
	}
}
