<?php
/**
 * Base
 */

declare (strict_types = 1);

namespace J7\WpReactPlugin\Utils;

/**
 * Class Base
 */
abstract class Base {
	const BASE_URL      = '/';
	const APP1_SELECTOR = '#my_app';
	const APP2_SELECTOR = '#my_app_metabox';
	const API_TIMEOUT   = '30000';
	const DEFAULT_IMAGE = 'http://1.gravatar.com/avatar/1c39955b5fe5ae1bf51a77642f052848?s=96&d=mm&r=g';

	/**
	 * Is HPOS enabled
	 *
	 * @return bool
	 */
	public static function is_hpos_enabled(): bool {
		return class_exists( \Automattic\WooCommerce\Utilities\OrderUtil::class ) && \Automattic\WooCommerce\Utilities\OrderUtil::custom_orders_table_usage_is_enabled();
	}

	/**
	 * Delete post meta by meta id
	 *
	 * @param int $mid - meta id
	 * @return string
	 */
	public static function delete_post_meta_by_mid( $mid ) {
		global $wpdb;

		// 执行删除查询
		$deleted = $wpdb->query( $wpdb->prepare( "DELETE FROM {$wpdb->prefix}postmeta WHERE meta_id = %d", $mid ) );

		$delete_success = $deleted !== false;

		return $delete_success;
	}
}
