while ( 1 -eq 1 ){

    Set-Location ./img/
    adb shell screencap -p /storage/emulated/0/tmp/sc0.png
    adb pull /storage/emulated/0/tmp/sc0.png
    Set-Location ..
    
    # Start-Sleep 1
    
    $out = npm run sh 
    Write-Output $out
    $str = $out | Select-String 'use:'
    $l = $str.ToString().Split(':')[1]
    
    adb shell input swipe 100 100 100 100 $l
    Start-Sleep 3
} 