<?php
$dir = __DIR__ . '/resources';
$files = array_diff(scandir($dir), ['..', '.']);
sort($files);
?>
<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Galéria</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
  <script src="js/scripts.js" defer></script>
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="rolunk.html">Rólunk</a></li>
        <li><a href="aikidorol.html">Aikidóról</a></li>
        <li><a href="helyszin.html">Helyszín</a></li>
        <li><a href="kapcsolat.html">Kapcsolat</a></li>
        <li><a href="jelentkezes.html">Jelentkezés</a></li>
        <li><a href="praktikus.html">Praktikus kérdések</a></li>
        <li><a href="gallery.php">Galéria</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <section>
      <h1>Galéria</h1>
      <p><a href="https://harmonia-budose.hu" target="_blank">Harmónia Budo SE</a></p>
      <p><a href="resources/dojo_kezikonyv.pdf" target="_blank">Dojo kézikönyv (PDF)</a></p>
      <div>
<?php
foreach ($files as $file) {
  $path = 'resources/' . $file;
  $ext = pathinfo($file, PATHINFO_EXTENSION);
  if (in_array($ext, ['jpg', 'png', 'jpeg', 'gif'])) {
    echo "<img src='$path' alt='' class='rounded'/>";
  } elseif (in_array($ext, ['mp4', 'webm'])) {
    echo "<video controls class='rounded'><source src='$path' type='video/$ext'></video>";
  }
}
?>
      </div>
    </section>
  </main>
  <footer>
    <p>&copy; Misogi Aikido Dojo</p>
    <p><a href="cookie_policy.html" style="color:white;">Cookie policy</a></p>
  </footer>
  <div id="cookie-banner" class="cookie-banner">
    <span>Ez a weboldal cookie-kat használ.</span>
    <button class="accept" onclick="acceptCookies()">Elfogadom</button>
    <button class="decline" onclick="declineCookies()">Elutasítom</button>
  </div>
</body>
</html>
