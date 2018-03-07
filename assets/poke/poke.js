var BoxOpened = "";
var ImgOpened = "";
var Counter = 0;
var ImgFound = 0;

var Source = "#boxcard";

let ImgSource = [
    "https://vignette.wikia.nocookie.net/pokemon/images/c/c6/027Sandshrew_AG_anime.png/revision/latest?cb=20140906222809",
    "https://vignette.wikia.nocookie.net/pokemon/images/2/21/001Bulbasaur.png/revision/latest/scale-to-width-down/200?cb=20140328190757",
    "https://vignette.wikia.nocookie.net/pokemon/images/7/7e/006Charizard.png/revision/latest/scale-to-width-down/200?cb=20140328191325",
    "https://vignette.wikia.nocookie.net/pokemon/images/3/39/007Squirtle.png/revision/latest/scale-to-width-down/200?cb=20140328191525",
    "https://vignette.wikia.nocookie.net/pokemon/images/6/61/015Beedrill.png/revision/latest/scale-to-width-down/200?cb=20140328191940",
    "https://vignette.wikia.nocookie.net/pokemon/images/0/0d/025Pikachu.png/revision/latest/scale-to-width-down/200?cb=20140328192412",
    "https://vignette.wikia.nocookie.net/pokemon/images/0/0c/042Golbat.png/revision/latest/scale-to-width-down/200?cb=20140328194043",
    "https://vignette.wikia.nocookie.net/pokemon/images/9/9a/057Primeape.png/revision/latest/scale-to-width-down/200?cb=20140328195857",
    "https://vignette.wikia.nocookie.net/pokemon/images/2/2d/062Poliwrath.png/revision/latest/scale-to-width-down/200?cb=20140328202819",
    "https://vignette.wikia.nocookie.net/pokemon/images/c/cc/065Alakazam.png/revision/latest/scale-to-width-down/200?cb=20140328202820",
    "https://vignette.wikia.nocookie.net/pokemon/images/f/f2/076Golem.png/revision/latest/scale-to-width-down/200?cb=20140328203941",
    "https://vignette.wikia.nocookie.net/pokemon/images/3/3f/078Rapidash.png/revision/latest/scale-to-width-down/200?cb=20140328203941",
    "https://vignette.wikia.nocookie.net/pokemon/images/7/72/082Magneton.png/revision/latest/scale-to-width-down/200?cb=20140328204316",
    "https://vignette.wikia.nocookie.net/pokemon/images/8/8c/126Magmar.png/revision/latest/scale-to-width-down/200?cb=20140328210351",
    "https://vignette.wikia.nocookie.net/pokemon/images/a/ab/131Lapras.png/revision/latest/scale-to-width-down/200?cb=20140328210730",
    "https://vignette.wikia.nocookie.net/pokemon/images/e/e8/142Aerodactyl.png/revision/latest/scale-to-width-down/200?cb=20140328211201",
    "https://vignette.wikia.nocookie.net/pokemon/images/d/d5/160Feraligatr.png/revision/latest/scale-to-width-down/200?cb=20140329012508",
    "https://vignette.wikia.nocookie.net/pokemon/images/1/11/176Togetic.png/revision/latest/scale-to-width-down/200?cb=20140329013336",
    "https://vignette.wikia.nocookie.net/pokemon/images/b/ba/208Steelix.png/revision/latest/scale-to-width-down/200?cb=20140329014402",
    "https://vignette.wikia.nocookie.net/pokemon/images/4/47/214Heracross.png/revision/latest/scale-to-width-down/200?cb=20140329014705",
];

function RandomFunction(MaxValue, MinValue) {
    return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
}

function ShuffleImages() {
	var ImgAll = $(Source).children();
	var ImgThis = $(Source + " div:first-child");
	var ImgArr = new Array();

	for (var i = 0; i < ImgAll.length; i++) {
		ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
		ImgThis = ImgThis.next();
	}
	
		ImgThis = $(Source + " div:first-child");

    for (var z = 0; z < ImgAll.length; z++) {
        var RandomNumber = RandomFunction(0, ImgArr.length - 1);
    
            $("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
            ImgArr.splice(RandomNumber, 1);
            ImgThis = ImgThis.next();
    }
}


function ResetGame() {
	ShuffleImages();
	$(Source + " div img").hide();
	$(Source + " div").css("visibility", "visible");
	Counter = 0;
	$("#success").remove();
	$("#counter").html("" + Counter);
	BoxOpened = "";
	ImgOpened = "";
	ImgFound = 0;
	return false;
}


function OpenCard() {
	var id = $(this).attr("id");

	if ($("#" + id + " img").is(":hidden")) {
		$(Source + " div").unbind("click", OpenCard);
	
		$("#" + id + " img").slideDown('fast');

		if (ImgOpened == "") {
			BoxOpened = id;
			ImgOpened = $("#" + id + " img").attr("src");
			setTimeout(function() {
				$(Source + " div").bind("click", OpenCard)
			}, 300);
		} else {
			CurrentOpened = $("#" + id + " img").attr("src");
			if (ImgOpened != CurrentOpened) {
				setTimeout(function() {
					$("#" + id + " img").slideUp('fast');
					$("#" + BoxOpened + " img").slideUp('fast');
					BoxOpened = "";
					ImgOpened = "";
				}, 400);
			} else {
				$("#" + id + " img").parent().css("visibility", "hidden");
				$("#" + BoxOpened + " img").parent().css("visibility", "hidden");
				ImgFound++;
				BoxOpened = "";
				ImgOpened = "";
			}
			setTimeout(function() {
				$(Source + " div").bind("click", OpenCard)
			}, 400);
		}
		Counter++;
		$("#counter").html("" + Counter);

		if (ImgFound == ImgSource.length) {
			$("#counter").prepend('<span id="success">You Found All Pictues With </span>');
		}
	}
}


$(function() {

    for (var y = 1; y < 3 ; y++) {
        $.each(ImgSource, function(i, val) {
            $(Source).append("<div id=card" + y + i + "><img src=" + val + " />");
        });
}
        $(Source + " div").click(OpenCard);
        ShuffleImages();
});