<?php

add_filter('elementor_hello_theme_enqueue_style', '__return_false', 999);
add_filter('enabled_daisyui', 'disabled_daisyui_in_cabon_app', 999);
add_action('wp_head', 'hide_login_in_cabon_app', 999);



/**
 * Custom
 */



function disabled_daisyui_in_cabon_app($enabled)
{
  if (strpos($_SERVER['REQUEST_URI'], 'carbon-check-app') !== false && is_user_logged_in()) {
    return false;
  } else {
    return true;
  }
}

function hide_login_in_cabon_app()
{
  if (strpos($_SERVER['REQUEST_URI'], 'carbon-check-app') !== false && is_user_logged_in()) :
?>
    <style>
      .yc_login_form_wrap {
        display: none !important;
      }
    </style>
<?php
  endif;
}
