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
    <title>Gallery</title>
    <link rel="icon" type="image/png" href="assets/img/logo.png" />
    <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    <link href="dist/css/styles.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
</head>
<body>
<header>
        <div id="navbar-placeholder"></div>
        <div class='container px-4 px-lg-5 text-center my-4'>
            <h1>Gallery</h1>
        </div>
    </header>
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
                <img src="<?= $imgDir . '/' . rawurlencode($img) ?>" class="img-fluid rounded gallery-item" data-type="image" data-src="<?= $imgDir . '/' . rawurlencode($img) ?>" alt="">
            </div>
            <?php endforeach; ?>
            <?php foreach ($videoFiles as $vid): ?>
            <div class="col-md-6 col-sm-12 mb-4 text-center">
                <video controls class="img-fluid rounded gallery-item" data-type="video" data-src="<?= $videoDir . '/' . rawurlencode($vid) ?>">
                    <source src="<?= $videoDir . '/' . rawurlencode($vid) ?>">
                </video>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</main>
<div class="modal fade" id="lightboxModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content bg-transparent border-0">
            <div class="modal-body p-0 text-center"></div>
        </div>
    </div>
</div>
<footer class="border-top">
    <div class="container px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
            <div class="col-md-10 col-lg-8 col-xl-7">
                <div class="small text-center text-muted fst-italic">&copy; Misogi Aikido Dojo</div>
            </div>
        </div>
    </div>
</footer>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="dist/js/scripts.js"></script>
</body>
</html>
