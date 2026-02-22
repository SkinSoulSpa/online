<?php
// trigger_rename.php
$template_file = 'index.template.html';
if (file_exists('index.html')) {
    rename('index.html', $template_file);
    echo "Renamed index.html to $template_file";
} else {
    echo "index.html not found (maybe already renamed)";
}
?>