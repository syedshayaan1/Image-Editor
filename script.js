
let setrotate = 0;
let flipHor = 1;
let flipVert = 1;
let setbrightness = "100";
let setsaturation = "100"; 
let setinversion = "0"; 
let setgrayscale = "0";


const inpfile = document.querySelector(".file-input"),
    opfilter = document.querySelectorAll(".filter button"),
    namefilter = document.querySelector(".filter-info .name"),
    valfilter = document.querySelector(".filter-info .value"),
    sliderfilter = document.querySelector(".slider input"),
    rotimg = document.querySelectorAll(".rotate button"),
    imgprev = document.querySelector(".preview-img img"),
    resetall = document.querySelector(".reset-filter"),
    buttonchoose = document.querySelector(".choose-img"),
    buttonsave = document.querySelector(".save-img");



const updateFilter = () => 
{
    valfilter.innerText = `${sliderfilter.value}%`;
    const selectedFilter = document.querySelector(".filter .active");
    if (selectedFilter.id === "brightness") 
{
        brightness = sliderfilter.value;
    } else if (selectedFilter.id === "saturation") 
{
        saturation = sliderfilter.value;
    } else if (selectedFilter.id === "inversion") 
{
        inversion = sliderfilter.value;
    } 
else 
{
        grayscale = sliderfilter.value;
 }

    applyFilter();
}

rotimg.forEach(option =>
 {
    option.addEventListener("click", () => 
{
        if (option.id === "left") 
{
            rotate -= 90;
        } else if (option.id === "right") 
{
            rotate += 90;
        } else if (option.id === "horizontal") 
{
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else
 {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }

        applyFilter();
    });
});

const resetFilter = () => 
{
    brightness = "100"; saturation = "100"; inversion = "0"; grayscale = "0";
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    opfilter[0].click();
    applyFilter();
}

const saveImage = () => 
{
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = imgprev.naturalWidth;
    canvas.height = imgprev.naturalHeight;

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if (rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(imgprev, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    const link = document.createElement("a");
    link.download = "yourimage.jpg";
    link.href = canvas.toDataURL();
    link.click();
}


const loadImage = () =>
 {
    let file = inpfile.files[0];
    if (!file) return;
    imgprev.src = URL.createObjectURL(file);
    imgprev.addEventListener("load", () => 
{
        resetall.click();
        document.querySelector(".container").classList.remove("disable");
    });
}

const applyFilter = () => 
{
    imgprev.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    imgprev.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

opfilter.forEach(option =>
 {
    option.addEventListener("click", () =>
 {
        document.querySelector(".active").classList.remove("active");
        option.classList.add("active");
        namefilter.innerText = option.innerText;
        if (option.id === "brightness") 
{
            sliderfilter.max = "200";
            sliderfilter.value = brightness;
            valfilter.innerText = `${brightness}%`;
} 

else if (option.id === "saturation")
 {
            sliderfilter.max = "200";

            sliderfilter.value = saturation;
            valfilter.innerText = `${saturation}%`
        }

 else if (option.id === "inversion")
 {
            sliderfilter.max = "100";
            sliderfilter.value = inversion;
            valfilter.innerText = `${inversion}%`;
        }

 else 
{
            sliderfilter.max = "100";
            sliderfilter.value = grayscale;
            valfilter.innerText = `${grayscale}%`;
        }

    });

});
sliderfilter.addEventListener("input", updateFilter);
resetall.addEventListener("click", resetFilter);
buttonsave.addEventListener("click", saveImage);
inpfile.addEventListener("change", loadImage);
buttonchoose.addEventListener("click", () => inpfile.click());
