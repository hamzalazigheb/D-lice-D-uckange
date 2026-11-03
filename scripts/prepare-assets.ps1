# Prépare les images fournies : renomme par contenu réel, recadre, optimise.
# Usage : powershell -ExecutionPolicy Bypass -File scripts/prepare-assets.ps1
Add-Type -AssemblyName System.Drawing
$root = Split-Path -Parent $PSScriptRoot
$out = Join-Path $root "public\images"
New-Item -ItemType Directory -Force -Path $out | Out-Null

function Get-JpegCodec { [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" } }

function Save-Jpeg($bmp, $path, $quality = 92) {
  $p = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)
  $bmp.Save($path, (Get-JpegCodec), $p)
}

# Recadre (x,y,w,h) la source puis agrandit par $scale en bicubique haute qualité.
function Export-Crop($srcPath, $dest, $x, $y, $w, $h, $scale = 2) {
  $src = [System.Drawing.Image]::FromFile($srcPath)
  $bmp = New-Object System.Drawing.Bitmap([int]($w * $scale), [int]($h * $scale))
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $dst = New-Object System.Drawing.Rectangle(0, 0, $bmp.Width, $bmp.Height)
  $g.DrawImage($src, $dst, $x, $y, $w, $h, [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose(); $src.Dispose()
  Save-Jpeg $bmp (Join-Path $out $dest)
  $bmp.Dispose()
}

# --- Les fichiers fournis sont étiquetés dans le désordre : on mappe par CONTENU réel ---
$srcBread = Join-Path $root "categorie-patisseries (1).jpg"     # contient du pain
$srcViennoiserie = Join-Path $root "hero-boulangerie (1).jpg"   # contient des croissants
$srcPatisserie = Join-Path $root "categorie-viennoiseries (1).jpg" # contient tartelettes / éclair
$srcCake = Join-Path $root "categorie-pains (1).jpg"            # contient le gâteau aux fraises
$srcRef = Join-Path $root "icone-et-palette-reference (1).jpg"  # maquette complète (1088x510)

# Les 4 vignettes ont une bordure claire sur ~8px : on la rogne.
$W = 368; $H = 140; $X = 12; $Y = 10
Export-Crop $srcBread "carte-categorie-pains.jpg" $X $Y $W $H
Export-Crop $srcViennoiserie "carte-categorie-viennoiseries.jpg" $X $Y $W $H
Export-Crop $srcPatisserie "carte-categorie-patisseries.jpg" $X $Y $W $H
Export-Crop $srcCake "carte-categorie-gateaux.jpg" $X $Y $W $H

Export-Crop $srcBread "photo-pain-artisanal.jpg" $X $Y $W $H
Export-Crop $srcViennoiserie "photo-croissant.jpg" $X $Y $W $H
Export-Crop $srcPatisserie "photo-tarte-fruits.jpg" $X $Y $W $H
Export-Crop $srcCake "photo-gateau-fraises.jpg" $X $Y $W $H

# Détails extraits de la maquette de référence (1088x510)
Export-Crop $srcRef "photo-baguette.jpg" 712 20 376 180 2
Export-Crop $srcRef "photo-pain-chocolat.jpg" 170 332 410 148 2

# --- Hero / devanture : photo haute définition fournie (backround delice 2.png) ---
$heroSrc = Get-ChildItem $root -Filter "backround delice*.png" | Select-Object -First 1
if ($heroSrc) {
  $full = [System.Drawing.Image]::FromFile($heroSrc.FullName)
  Export-Crop $heroSrc.FullName "hero-banner-boulangerie.jpg" 0 0 $full.Width $full.Height (1600 / $full.Width)
  $full.Dispose()
}

# --- Logo : PNG transparent, rogné au contenu, redimensionné ---
$logoSrc = Get-ChildItem $root -Filter "Logo de boulangerie*.png" | Select-Object -First 1
$img = New-Object System.Drawing.Bitmap($logoSrc.FullName)
$minX = $img.Width; $minY = $img.Height; $maxX = 0; $maxY = 0
for ($yy = 0; $yy -lt $img.Height; $yy += 2) {
  for ($xx = 0; $xx -lt $img.Width; $xx += 2) {
    if ($img.GetPixel($xx, $yy).A -gt 20) {
      if ($xx -lt $minX) { $minX = $xx }; if ($xx -gt $maxX) { $maxX = $xx }
      if ($yy -lt $minY) { $minY = $yy }; if ($yy -gt $maxY) { $maxY = $yy }
    }
  }
}
$pad = 6
$minX = [Math]::Max(0, $minX - $pad); $minY = [Math]::Max(0, $minY - $pad)
$cw = [Math]::Min($img.Width - $minX, $maxX - $minX + 2 * $pad); $ch = [Math]::Min($img.Height - $minY, $maxY - $minY + 2 * $pad)
$tw = 900; $th = [int]($ch * $tw / $cw)
$bmp = New-Object System.Drawing.Bitmap($tw, $th, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $tw, $th)), $minX, $minY, $cw, $ch, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose(); $img.Dispose()
$bmp.Save((Join-Path $out "logo-delice-duckange.png"), [System.Drawing.Imaging.ImageFormat]::Png)
"logo: ${tw}x${th}"
$bmp.Dispose()
"done"


