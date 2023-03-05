<?php

add_filter('rwmb_meta_boxes', 'analytics_and_suggestion');

function analytics_and_suggestion($meta_boxes)
{
  $prefix = '';

  $meta_boxes[] = [
    'title'      => '分析 & 建議',
    'id'         => 'analytics_suggestion',
    'post_types' => ['carbon-project'],
    'fields'     => [
      [
        'name'    => '分析事項',
        'id'      => $prefix . 'analytics',
        'type'    => 'textarea',
        'rows'    => 6,
        'columns' => 6,
      ],
      [
        'name'    => '建議事項',
        'id'      => $prefix . 'suggestion',
        'type'    => 'textarea',
        'rows'    => 6,
        'columns' => 6,
      ],
    ],
  ];

  return $meta_boxes;
}
