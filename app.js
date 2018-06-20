var characters = {
    Obi: {
        AttackPower: 12,
        CounterPower: 5,
        Health: 150,
    },

    Luke: {
        AttackPower: 12,
        CounterPower: 5,
        Health: 150,
    },

    Maul: {
        AttackPower: 9,
        CounterPower: 25,
        Health: 180,
    },

    Sidious: {
        AttackPower: 11,
        CounterPower: 20,
        Health: 150,
    },
};

var currentCharacter;
var enemies = [];
var currentEnemy;
var test = "";
var currentHealth = 0;
var attackBoost = 0;
var killCount = 0;
var challengerKilled = false;


$(document).ready(function() {


    function startOver () { 

        var charactersList = Object.keys(characters);

        //function to shuffle the order of the array in the characterList
        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;
          
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
          
              // Pick a remaining element...
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
          
              // And swap it with the current element.
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }
          
            return array;
          }
    
        shuffle(charactersList);

        //prints shuffled characters in charactersList onto the page
        //assigns a name attribute of character names for each ID (to be called later)
        $("#character1").text(charactersList[0]).attr("name", charactersList[0]);
        $("#character1-health").text(characters[charactersList[0]].Health);

        $("#character2").text(charactersList[1]).attr("name", charactersList[1]);
        $("#character2-health").text(characters[charactersList[1]].Health);

        $("#character3").text(charactersList[2]).attr("name", charactersList[2]);
        $("#character3-health").text(characters[charactersList[2]].Health);

        $("#character4").text(charactersList[3]).attr("name", charactersList[3]); 
        $("#character4-health").text(characters[charactersList[3]].Health);

        //resets HTML 
        $(".currentCharacter").html("");
        $(".currentCharacterHealth").html("");
        $(".currentEnemy").html("");
        $("#CurrentEnemy").removeClass("card col-lg-3");
        $("#currentCharacter").removeClass("card col-lg-3");
        $("#Enemy0").removeClass("card col-lg-3");
        $("#Enemy1").removeClass("card col-lg-3");
        $("#Enemy2").removeClass("card col-lg-3");
        $(".currentEnemyHealth").html("");
        $(".enemy").html("");
        $(".enemyhealth").html("");
        $("#alertcharacter").html(""); 
        $("#alertenemy").html("");
        $("#choosecharacters").show();
        
        //resets HTML
        $("#attack").show();
        $(".select").show();
        $(".restart-button").hide();

        //resets counters
        attackBoost = 0;
        killCount = 0;
        enemies = [];

    };

    startOver();

    // 'choose a character' section 
    $(".select").find("h2").on("click", function() {
        // clears out 'select section' when a character is chosen
        $("#choosecharacters").hide();
        //assigns the name of character to currentCharacter variable
        currentCharacter = $(this).attr("name");
        currentHealth = characters[currentCharacter].Health;
        $(".currentCharacter").html(currentCharacter);
        $(".currentCharacterHealth").html(currentHealth);
        //assigns bootstrap attributes for styling purposes
        $("#currentCharacter").attr("class", "card col-lg-3");
        for(var property in characters) {
            //sets up an 'enemies array' by putting all characters that are not currentCharacter into the enemies array
            if(currentCharacter !== property) {
                enemies.push(property);
            }
        }

        //prints characters in enemies array onto HTML via jQuery
        for(i=0; i< enemies.length; i++) {
            $("#enemy" + i).html(enemies[i]);
            enemyHealth = characters[enemies[i]].Health;
            $("#enemyhealth" + i).html(enemyHealth);
            $("#enemy" + i).attr("name", enemies[i]);
            $("#enemy" + i).attr("health", enemyHealth);
            $("#Enemy0").attr("class", "card col-lg-3");
            $("#Enemy1").attr("class", "card col-lg-3");
            $("#Enemy2").attr("class", "card col-lg-3");
        }
    });

    $(".enemy").on("click", function() {
        currentEnemy = ($(this).attr("name"));
        //this works to disable the attack button (see below)
        challengerKilled = false;
        $("#attack").removeAttr("disabled");
        currentEnemyHealth = characters[currentEnemy].Health;
        //hides currentEnemy from the 'Enemies Available to Fight' section
        for(i=0; i< enemies.length; i++) {
            if(currentEnemy === enemies[i]) {
                $("#enemy" + i).html("");
                $("#enemyhealth" + i).html("");
                $("#Enemy" + i).removeClass("card col-lg-3");
        }
        $(".currentEnemy").html(currentEnemy);
        $(".currentEnemyHealth").html(currentEnemyHealth);
        $("#CurrentEnemy").attr("class", "card col-lg-3");
    }
    });

    $("#attack").on("click", function() {
        attackBoost++;
        currentHealth = currentHealth - characters[currentEnemy].CounterPower;
        currentEnemyHealth = currentEnemyHealth - (characters[currentCharacter].AttackPower * attackBoost);
        $(".currentCharacterHealth").html(currentHealth);
        $(".currentEnemyHealth").html(currentEnemyHealth);

        $("#alertcharacter").html("You attacked " + currentEnemy + " for " + (characters[currentCharacter].AttackPower * attackBoost) + " damage");
        $("#alertenemy").html(currentEnemy + " attacked you back for " + characters[currentEnemy].CounterPower + " damage");


       if (currentHealth <= 0) {
            $("#alertcharacter").html("YOU LOST!!!!"); 
            $("#alertenemy").html("");
            $("#attack").hide();
            $(".restart-button").show();
            
        }
        else if (currentEnemyHealth <= 0) {
            $(".currentEnemy").html("");
            $(".currentEnemyHealth").html("");
            $("#CurrentEnemy").removeClass("card col-lg-3");
            killCount++;
            challengerKilled = true;
        }

        if(killCount === enemies.length) {
            $("#alertcharacter").html("YOU WIN!!!!"); 
            $("#alertenemy").html("");
            $("#attack").hide();
            $(".restart-button").show();
        }

        if(challengerKilled === true) {
            //disables attack button after challenger is killed
            $("#attack").prop("disabled", true);
        }

    });

    $(".restart-button").on("click", function() {
        startOver();
        $(".restart-button").hide();

    });

});

