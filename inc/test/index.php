<?php
define('WP_CORE_PATH', 'C:\Users\user\Local Sites\wpdev\app\public\wp-load.php');
define('WC_CORE_PATH', 'C:\Users\user\Local Sites\wpdev\app\public\wp-content\plugins\woocommerce\woocommerce.php');

$_ENV = [];
$_ENV['APP_NAME'] = 'My App';
$_ENV['KEBAB'] = str_replace(' ', '-', strtolower($_ENV['APP_NAME']));
$_ENV['SNAKE'] = str_replace(' ', '_', strtolower($_ENV['APP_NAME']));


function getRandomArray($arr)
{
	return $arr[array_rand($arr)];
}

function getRandomTime($format = 'Y-m-d H:i:s', $startDate = '-3 months')
{
	$startDate = strtotime($startDate); // 三個月前的時間
	$endDate = time(); // 現在的時間

	// 隨機生成一個時間戳
	$randomTimestamp = mt_rand($startDate, $endDate);

	// 格式化時間戳為指定的日期時間格式
	$randomTime = date($format, $randomTimestamp);

	return $randomTime;
}
