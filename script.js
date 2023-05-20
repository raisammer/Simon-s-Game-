
var store_pattern = new Array();
var color =new Array ("green" ,"red" ,"yellow" ,"blue");
var score =0 ;
var   start = false ;
var indx=0;

// Giving next sequence using random number generator
function nextSequence()
{
    var random_number = Math.floor(Math.random()*4) ;
    store_pattern.push(random_number);
  
    $("."+color[random_number]).fadeOut(100).fadeIn(100);
    audio = new Audio("sounds/" + color[random_number] +".mp3");
    audio.play();
    return random_number;
}

// Check Whether the current click matches with sequence number
function check(ind, id)
{
    if(color[store_pattern[ind]]== id)
    {
        return true ;
    }
    return false;
}

// Game Over
function GameOver()
{
    $("body").addClass("game-over");
    audio = new Audio("sounds/" + "wrong" +".mp3");
    audio.play();
    setTimeout(function()
    {
        // remove the game-over animation 
        $("body").removeClass("game-over");
    },300);
}


// On button click 
$(".btn").on("click",function(event)
{
    if(start == true)
    {
        // Id clicked as Id 's in my HTML document are respresented by colors 
        var idClicked = event.target.id;

        // For audio 
        audio = new Audio("sounds/" + idClicked +".mp3");
        audio.play();

        // Adding animation on the button clicked by user .
        $("#"+idClicked).addClass("pressed");

        setTimeout(function()
        {
            // Removing animation after a delay of 300 ms 
            $("#"+idClicked).removeClass("pressed");
            
        },300);
        
        // You can do cheating by displaying what have been previously entered .Currently i am commenting it 
        console.log(store_pattern);

        // Checking whether match or not 
        var is = check(indx, idClicked);
        if(is== true)
        {
            indx++;
            // If all matches are done then again call nextSequence
            if(indx== store_pattern.length)
            {
                indx=0;
                score++;

                // If user have reached to the maximum level 
                if(score==score.MAX_VALUE)
                {
                    $("#level-title").text("Hurray You have completed all teh levels ");
                    setTimeout(function()
                    {
                        $("#level-title").text("Press A Key To Start ");
                    },1000);
                    score=0;
                    start = false;
                    store_pattern=[];
                }

                // Setting the value of the score 
                scoreDeterminer(score);

                // To Give the delay 
                setTimeout(function()
                {
                    nextSequence();
                },800);
            }
        }

        else{
            // If he input wrong click then GAME OVERz
            $("#level-title").text("Score : "+score +" :) ☠️ ");
            GameOver();
            setTimeout(function()
            {
                $("#level-title").text("Press A Key To Start ");
            },1000);
            score=0;
            start = false;
            store_pattern=new Array();
            indx=0;
        }
}
})


// Score Determiner
function scoreDeterminer(score)
{
    $("#level-title").text("Level "+score);
}

// flow

$(document).on("keydown", function(event)
{
    if(start == false)
    {
        start= true ;
        var randomChosenColor= nextSequence();
        console.log(randomChosenColor);
        var desired_button= $("."+color[randomChosenColor]);
        console.log(desired_button); 
        scoreDeterminer(score);
    } 
})


