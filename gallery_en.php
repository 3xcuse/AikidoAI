<?php
function list_files($dir, $pattern) {
    $files = array_filter(scandir($dir), function($f) use ($pattern) {
        return preg_match($pattern, $f);
    });
    sort($files, SORT_NATURAL | SORT_FLAG_CASE);
    return $files;
}

$imgDir = 'resources/images';
$videoDir = 'resources/videos';
$imgFiles = file_exists($imgDir) ? list_files($imgDir, '/\.(jpe?g|png|gif)$/i') : [];
$videoFiles = file_exists($videoDir) ? list_files($videoDir, '/\.(mp4|webm|ogg|avi)$/i') : [];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Gallery - Misogi Aikido Dojo">
    <link rel="canonical" href="https://example.com/gallery_en.php">
    <link rel="alternate" hreflang="hu" href="https://example.com/gallery.php">
    <link rel="alternate" hreflang="en" href="https://example.com/gallery_en.php">
    <title>Gallery</title>
    <!--common-head-->
    <link href="dist/css/styles.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
</head>
<body>
<div id="navbar-placeholder"></div>
<div class='container px-4 px-lg-5 text-center my-4'>
    <h1>Gallery</h1>
</div>
<main>
    <div class="container px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
            <div class="col-md-10 col-lg-8 col-xl-7 text-center">
                <img src="assets/img/fejlec_20ev.png" alt="20 years of dojo" class="img-fluid rounded mb-4" />
                <p><a href="https://harmonia-budose.hu" target="_blank">Harmónia Budo SE</a></p>
                <p><a href="resources/dojo_kezikonyv.pdf" target="_blank">Dojo handbook (PDF)</a></p>
            </div>
        </div>
    </div>
    <div class="container px-4 px-lg-5 my-4">
        <div class="row gallery-grid">
            <?php foreach ($imgFiles as $img): ?>
            <div class="col-md-4 col-sm-6 mb-4 text-center">
                <img src="<?= $imgDir . '/' . rawurlencode($img) ?>" class="img-fluid rounded" alt="">
            </div>
            <?php endforeach; ?>
            <?php foreach ($videoFiles as $vid): ?>
            <div class="col-md-6 col-sm-12 mb-4 text-center">
                <video controls class="img-fluid rounded">
                    <source src="<?= $videoDir . '/' . rawurlencode($vid) ?>">
                </video>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</main>
    <div id="footer-placeholder"></div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="dist/js/scripts.js"></script>
</body>
</html>
