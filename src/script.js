var is_root = true;

$(function () {
    // get initial image dimensions. This will be used to adjust the image map size for 
    // the dynamically resized image.
    var img = document.getElementById("interactive_img")
    img.onload = function () {
        img_w = img.naturalWidth
        img_h = img.naturalHeight
        console.log("OG Width: " + img_w)
        console.log("OG Height: " + img_h)
    }

    // Code currently will resize image and will match the image map to this size. Unfortunately
    // the image map won't be updated correctly if the user resizes the window. This is a bug
    // that needs to be fixed
    window.onload = function () {
        var img = document.getElementById("interactive_img")
        img_w = img.width
        img_h = img.height
        console.log("Changed width: " + img_w);
        console.log("Changed height: " + img_h);
        var map = document.getElementsByName("image-map")[0]
        var ImageMap = function () { 
            var n;
            console.log("Trying")
            var areas = map.getElementsByTagName('area');
            console.log("Printing areas")
            console.log(areas)
            var len = areas.length,
                coords = [],
                previousWidth = 3024; // initial width of image 
            for (n = 0; n < len; n++) {
                coords[n] = areas[n].coords.split(',');
            }
            this.resize = function () {
                var n, m, clen,
                    x = img.offsetWidth / previousWidth;
                for (n = 0; n < len; n++) {
                    clen = coords[n].length;
                    for (m = 0; m < clen; m++) {
                        coords[n][m] *= x;
                    }
                    areas[n].coords = coords[n].join(',');
                }
                previousWidth = document.body.clientWidth;
                return true;
            };
            window.onresize = this.resize;
        },
        imageMap = new ImageMap(document.getElementById("image-map"), document.getElementById('interactive_img'));
        imageMap.resize();
    }
});

captions = {}
captions['yang'] = "Yang is arguably the prettiest cat out of all our foster cats. He has elegant, poofy white fur that is fun to pet. \
An interesting quality about Yang is that he likes to ride the Roomba, as you can see above. He is sometimes shy towards human, but has \
recently become more outgoing.Yang also likes to play with his brother's and sister's. Yang was recently adopted into a permanent home"
captions['bailey'] = "Bailey is our original cat, I think we got her in 2008. We all agree that Bailey is the biggest out of all cats. \
She's constantly meowing for us to give her more food, but we don't want her to get more fat then she already is. Bailey can be spotted \
lying on the various couches around the house. She'll come up to you if she wants attention, otherwise it's best to leave her alone."
captions["chai"] = "Chai is definitely our strangest cat. She's a scottish fold, which means she has folded ears, is very flexible, \
and is very vocal. She is friendly to humans but not to other cats. Chai's favourite thing to do when being petted is to collapse on the \
ground and stretch herself out so we can rub her belly. Chai is also a fan of splooting."
captions["merry"] = "Merry-Berry (we call her Merry for short) is our newest permanent cat. We initially got her as a foster kitten, at \
which point she was quite feral. Merry wouldn't even allow us to touch her at first, but thanks to the patience and training from Darryl \
Merry is now very human friendly. Merry has also taken a liking to Chai, although Chai doesn't return that fondness."
captions["froggy"] = "Froggy is the nicest cat out of all our foster cats. Froggy absolutely loves pets and will run toward you as soon \
as you come in the door. Be careful when walking because she likes to run in between your feet to try and get your attention. Froggy has \
found just found her permanent home, where she'll be sharing space with the families dog."
captions["tortellini"] = "Tortellini is another one of our foster cats. He's the biggest out of all his siblings and possibly the most \
friendly. Tortellini was also a fan of walking in between your feet while you tried to walk. Tortellini was adopted into the same home as \
Sweet Potato, so at least he has company!"
captions["sweetpotato"] = "Sweet Potato is one of our foster cats. She's a little strange but cute none-the-less. Sweet Potato has a nice \
colour mix of brown, orange, and white.She has big eyes like Chai which makes her look like she's scared all of the time. Sweet Potato \
also goes by other names. Jasper and Hannah call her Coffee while Paris calls her Miso. Sweet Potato was adopted into the same home as Tortellini!"

// This was my code to change the image without redirecting from the root directory
function change_img(next_img = null, caption = null) {
    console.log("is_root value is: " + is_root)
    if (is_root){
        is_root = false;
        var a = document.createElement("a");
        var linkText = document.createTextNode("Back");
        a.appendChild(linkText);
        a.id = "back-btn";
        a.href = "javascript:change_img()";
        document.body.appendChild(a);

        var img = document.getElementById("interactive_img"),
            caption = document.getElementById("caption"),
            text = captions[next_img.split(".")[0]]
        img.src = "../images/" + next_img
        img.id = "small_img";
        img.style = "max-width:80vw;max-height:80vh;margin:auto;"
        img.removeAttribute("useMap");
        caption.innerHTML = text;
    }
    else{
        is_root = true
        // remove back button
        document.getElementById("back-btn").remove();
        var img = document.getElementById("small_img"),
            text = document.getElementById("caption");
        img.src = "../images/cats.jpg";
        img.useMap = "#image-map";
        img.id = "interactive_img";
        img.removeAttribute("style")        
        text.innerHTML = "Click on a cat for more information!";
    }
}