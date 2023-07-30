<?php
require_once '../index.php';
require_once WP_CORE_PATH;
require_once WC_CORE_PATH;

// 检查 WooCommerce 是否已激活
if (!function_exists('WC')) {
	echo "WooCommerce 未激活";
	exit;
}

try {
	// 計時
	$start_time = microtime(true);

	// get all woocommerce order ids
	$order_ids = wc_get_orders([
		'limit' => -1,
		'status' => 'any',
		'return' => 'ids',
	]);
	$output_order_ids = '';

	foreach ($order_ids as $order_id) {
		wp_delete_post($order_id, true);
		$output_order_ids .= $order_id . ', ';
	}

	//計時結束
	$end_time = microtime(true);
	$execution_time = $end_time - $start_time;

	$output = "\n\n刪除 " . count($order_ids) . " 個訂單成功! 耗時 " . $execution_time .  " 秒\n\n";
	$output .= "訂單編號: " . $output_order_ids . "\n\n";
	$output = str_replace("\n", "" . PHP_EOL, $output);

	echo $output;
} catch (\Throwable $th) {
	echo '刪除訂單失敗!';
	throw $th;
}
