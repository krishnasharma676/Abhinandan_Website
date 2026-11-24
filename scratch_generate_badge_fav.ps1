Add-Type -AssemblyName System.Drawing

$logo = New-Object System.Drawing.Bitmap("public/assets/logo.png")
$avatar = New-Object System.Drawing.Bitmap("public/assets/brand/extracted-avatar.png")

# Content bounds of logo.png: minX=148, minY=8, maxX=2004, maxY=716
$minX = 148
$minY = 8
$srcW = 2004 - 148
$srcH = 716 - 8

function GenerateCircleFavicon($size, $outPath) {
    $bmp = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)

    $margin = [int]($size * 0.04)
    $circleDiam = $size - 2 * $margin

    # 1. Outer Gradient/Pink Rim (Matching Instagram Profile Ring)
    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(251, 20, 67), [Math]::Max(2, [int]($size * 0.05)))
    $g.DrawEllipse($pen, $margin, $margin, $circleDiam, $circleDiam)
    $pen.Dispose()

    # 2. Cream/White Background inside circle
    $innerMargin = $margin + [int]($size * 0.02)
    $innerDiam = $size - 2 * $innerMargin
    $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 253, 245, 240))
    $g.FillEllipse($brush, $innerMargin, $innerMargin, $innerDiam, $innerDiam)
    $brush.Dispose()

    # 3. Draw the Logo centered inside the circle
    # Logo aspect ratio is 1856 / 708 = 2.62
    $logoMargin = [int]($size * 0.14)
    $availW = $size - 2 * $logoMargin
    $availH = $size - 2 * $logoMargin
    
    $scale = [Math]::Min($availW / $srcW, $availH / $srcH)
    $destW = [int]($srcW * $scale)
    $destH = [int]($srcH * $scale)
    $destX = [int](($size - $destW) / 2)
    $destY = [int](($size - $destH) / 2)

    $srcRect = New-Object System.Drawing.Rectangle($minX, $minY, $srcW, $srcH)
    $destRect = New-Object System.Drawing.Rectangle($destX, $destY, $destW, $destH)
    $g.DrawImage($logo, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

    $g.Dispose()
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Generated $outPath ($size x $size)"
}

GenerateCircleFavicon 512 "public/favicon.png"
GenerateCircleFavicon 192 "public/favicon-192x192.png"
GenerateCircleFavicon 64  "public/favicon-64x64.png"
GenerateCircleFavicon 32  "public/favicon-32x32.png"
GenerateCircleFavicon 16  "public/favicon-16x16.png"
GenerateCircleFavicon 180 "public/apple-touch-icon.png"

# Also save extracted Instagram avatar directly as public/avatar-badge.png
$avatar.Save("public/avatar-badge.png", [System.Drawing.Imaging.ImageFormat]::Png)

# Generate proper ICO
$icoBitmap = New-Object System.Drawing.Bitmap("public/favicon-32x32.png")
$hIcon = $icoBitmap.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hIcon)
$fs = New-Object System.IO.FileStream("public/favicon.ico", [System.IO.FileMode]::Create)
$icon.Save($fs)
$fs.Close()
$icon.Dispose()
$icoBitmap.Dispose()
Write-Host "Generated public/favicon.ico successfully"

$logo.Dispose()
$avatar.Dispose()

