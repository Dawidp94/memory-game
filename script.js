
let cards = [
 "card_1.png",
 "card_1.png",
 "card_2.png",
 "card_2.png",
 "card_3.png",
 "card_3.png",
 "card_4.png",
 "card_4.png",
 "card_5.png",
 "card_5.png",
 "card_6.png",
 "card_6.png"
];

let c0 = document.getElementById("c0");
let c1 = document.getElementById("c1");
let c2 = document.getElementById("c2");
let c3 = document.getElementById("c3");

let c4 = document.getElementById("c4");
let c5 = document.getElementById("c5");
let c6 = document.getElementById("c6");
let c7 = document.getElementById("c7");

let c8 = document.getElementById("c8");
let c9 = document.getElementById("c9");
let c10 = document.getElementById("c10");
let c11 = document.getElementById("c11");

c0.addEventListener("click",function(){revealCard(0);});
c1.addEventListener("click",function(){revealCard(1);});
c2.addEventListener("click",function(){revealCard(2);});
c3.addEventListener("click",function(){revealCard(3);});

c4.addEventListener("click",function(){revealCard(4);});
c5.addEventListener("click",function(){revealCard(5);});
c6.addEventListener("click",function(){revealCard(6);});
c7.addEventListener("click",function(){revealCard(7);});

c8.addEventListener("click",function(){revealCard(8);});
c9.addEventListener("click",function(){revealCard(9);});
c10.addEventListener("click",function(){revealCard(10);});
c11.addEventListener("click",function(){revealCard(11);});

let pierwszaodslonieta = false;
let turnCounter = 0;
let visible_nr;
let lock = false;
let pairLeft = 6;

function randomize(){
    const cardData = cards;
    cardData.sort(() => Math.random() - 0.5);
}
randomize();

function revealCard(nr)
{
    let opacityValue = $("#c"+nr).css("opacity")

    if (opacityValue != 0 && lock == false)
    {
        lock = true;
        let obraz = "url(img/" + cards[nr] + ")";

    $('#c'+ nr).css("background-image", obraz);
    $('#c'+ nr).addClass("card2");
    $('#c'+ nr).removeClass("card");

        if (pierwszaodslonieta == false)
        {
        pierwszaodslonieta = true;
        visible_nr = nr;
        lock = false;
        }
         else
        {
            if(cards[visible_nr] == cards[nr])
            {
            setTimeout(function(){ hide2Card(nr,  visible_nr)}, 800);
            }
            else
            {
            setTimeout(function(){ restore2Card(nr,  visible_nr)}, 1200);
            }

        turnCounter++;
        $(".score").html("Turn counter: " + turnCounter);
        pierwszaodslonieta = false;
        }
    }
} 

function hide2Card(nr1,nr2)
{
    $("#c"+nr1).css('opacity',"0");
    $("#c"+nr2).css('opacity',"0");

    pairLeft--;

    if (pairLeft == 0) 
    {
        $(".board").html("<h2>You win!<br><span>Done in: "+turnCounter+ "</span> turns</h2>")

    }

    lock = false;
}

function restore2Card(nr1, nr2)
{
    $('#c'+ nr1).css("background-image", "url(/img/card_0.png)");
    $('#c'+ nr1).addClass("card");
    $('#c'+ nr1).removeClass("card2");

    $('#c'+ nr2).css("background-image", "url(/img/card_0.png");
    $('#c'+ nr2).addClass("card");
    $('#c'+ nr2).removeClass("card2");

    lock = false;
}