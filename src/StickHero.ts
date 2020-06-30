import Jimp from 'jimp';

Jimp.read('./img/sc0.png').then((img)=>{
    let height,width;

    console.log('Height: ',height=img.getHeight());
    console.log('Width: ', width=img.getWidth());

    // Finding starting Y cooredinate for black bar
    let x=10;
    let startY:number=0;
    for(let y=100; y<height; ++y)
    {
        let clor = Jimp.intToRGBA(img.getPixelColour(x,y));
        if(isColorBlack(clor))
        {
            console.log(`x: ${x} y: ${y} clor: `,clor);
            startY = y+20;
            break;
        }
        
    }
    console.log(`Starting Y coordinate of first Piller: ${startY} \n`)

    // Starting coordinate fo first Pillar
    let startXFst=0;
    for(let x=5; x<width; ++x )
    {
        let clor = Jimp.intToRGBA( img.getPixelColor(x,startY) );
        if(isColorBlack(clor))
        {
            console.log(`x: ${x} y: ${startY} color: `, clor);
            startXFst = x;
            console.log(`Start Coordinate of First pillar x: ${startXFst}, y:${startY} \n`);
            break;
        }

    }

    // Last X coordinate of first pillar
    let lastXFst=0;
    for(let x=startXFst; x<width; ++x )
    {
        let clor = Jimp.intToRGBA( img.getPixelColor(x,startY) );
        if(!isColorBlack(clor))
        {
            console.log(`x: ${x} y: ${startY} color: `, clor);
            lastXFst = x-1;
            console.log(`Last Coordinate of First pillar x: ${lastXFst}, y:${startY} \n`);
            break;
        }

    }


    //Finding staring X coordinate for second pillar
    let startXSnd=0;
    for(let x=lastXFst+1; x<width; ++x )
    {
        let clor = Jimp.intToRGBA( img.getPixelColor(x,startY) );
        if(isColorBlack(clor))
        {
            console.log(`x: ${x} y: ${startY} color: `, clor);
            startXSnd = x;
            console.log(`Starting Coordinate of Second pillar x: ${startXSnd}, y:${startY}\n`);
            break;
        }

    }
    
    // Findind X coordinate for Red center of next piller
    let xCordRed=0;
    for(let x=startXSnd; x<width; ++x )
    {
        let clor = Jimp.intToRGBA( img.getPixelColor(x,startY) );
        if(!isColorBlack(clor))
        {
            console.log(`x: ${x} y: ${startY} color: `, clor);
            xCordRed = x;
            console.log(`X of red: ${xCordRed} \n`);
            break;
        }
        
    }
    
    // Finding Last X coordinate of second pillar
    let lastXSnd = 0;
    for(let x = startXSnd+1; x<width; ++x)
    {
        let clor = Jimp.intToRGBA( img.getPixelColor(x,startY+20) );
        if(!isColorBlack(clor))
        {
            console.log(`x: ${x} y: ${startY} color: `, clor);
            lastXSnd = x-1;
            console.log(`Last X coordinate of Second Pillar: ${lastXSnd}\n`);
            break;
        }
    }

    let midSndPillar = Math.round( (lastXSnd - startXSnd) /2) + startXSnd;   
    console.log('mid of Snd Pillar: ',midSndPillar);   
    
    console.log('Length of Stick required [Red]: ',(xCordRed-lastXFst));
    console.log('Length of Stick required [Mid]: ',(midSndPillar-lastXFst));

    const len = (midSndPillar-lastXFst);
    const b = Math.round(len*0.11);
    const use = len - b;
    
    console.log(`\n ${startXFst}---${lastXFst}    ${startXSnd}--${midSndPillar}--${lastXSnd}`);
    console.log('use:', use );

}).catch((err)=>{
    console.log(err);
})

const isColorBlack = (color:any) =>{

    if(color.r < 10 && color.g < 10 && color.b < 10)
        return true;
    else 
        return false;

}



