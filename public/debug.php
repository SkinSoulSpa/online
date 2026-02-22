<?php
// debug.php
echo "Current directory: " . getcwd() . "<br>";
echo "Files:<br>";
$files = scandir('.');
foreach ($files as $file) {
    echo $file . "<br>";
}

echo "<hr>";
echo "<h2>index.php content:</h2>";
if (file_exists('index.php')) {
    echo "<textarea style='width:100%; height:400px;'>" . htmlspecialchars(file_get_contents('index.php')) . "</textarea>";
} else {
    echo "index.php not found.";
}
echo "<hr>";
echo "<h2>index.template.html content:</h2>";
if (file_exists('index.template.html')) {
    echo "<textarea style='width:100%; height:400px;'>" . htmlspecialchars(file_get_contents('index.template.html')) . "</textarea>";
} else {
    echo "index.template.html not found.";
}
?>