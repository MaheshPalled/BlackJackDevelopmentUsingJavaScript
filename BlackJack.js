var playerCardSum = 0, dealerCardSum = 0;//Variable initiated to check the winner.
var cardNum;//Randomly Generated card number.
var playerName;
var loopBreaker= true;
var onStartAudio = new Audio("https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_2MG.mp3");
var winner = new Audio("https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3");
var looser = new Audio("https://www.kozco.com/tech/piano2-CoolEdit.mp3");
var cardSwipe = new Audio("https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/ETHNIC%20and%20WORLD%20PERCUSSION/Talking%20Drum/36[kb]talking-drum-3.aif.mp3");

window.onload = function () {
    document.getElementById("hitButtons").style.visibility = "hidden"
    document.getElementById("dealButton").style.visibility = "hidden";
    onStartAudio.play();
    onStartAudio.autoplay = true;
}

//create a card
function createCard() {
    cardNum = selectRandomCard();
    var suite = selectRandomSuiteType();
    if (suite == "hearts" || suite == "diams") {
        return "<class='outline' id='Cards' style='color:red'> <div class='top' style='text-align:left;'><span>" + cardNum + "</span><span>&" + suite + ";</span></div>\n<h1 style='text-align:center;'>&" + suite + ";</h1>\n<div style='text-align:right;'><span>&" + suite + ";</span><span>" + cardNum + "</span></div>";
    }
    else {
        return "<class='outline' id='Cards' style= 'color:black'> <div class='top' style='text-align:left;'><span>" + cardNum + "</span><span>&" + suite + ";</span></div>\n<h1 style='text-align:center;'>&" + suite + ";</h1>\n<div style='text-align:right;'><span>&" + suite + ";</span><span>" + cardNum + "</span></div>";
    }
}

//Create a dealer card
function createDealerCard() {
    var newDealerCard = document.createElement("div");
    newDealerCard.setAttribute("id", "dealerCard")
    newDealerCard.innerHTML = createCard();
    document.getElementById("dealerCardsList").appendChild(newDealerCard);
    sumOfDealerCards();
    event.preventDefault();
}

//Create a player card
function createPlayerCard() {
    var newPlayerCard = document.createElement("div");
    newPlayerCard.setAttribute("id", "playerCard")
    newPlayerCard.innerHTML = createCard();
    document.getElementById("playerCardsList").appendChild(newPlayerCard);
    sumOfPlayerCards();
    event.preventDefault();
}

//Helper function to add the player card sum
function sumOfPlayerCards() {
    if (cardNum === "J" || cardNum === "Q" || cardNum === "K") {
        playerCardSum += 10;
    }
    else if (cardNum === "A") {
        if ((playerCardSum + 11) > 21) {
            playerCardSum += 1;
        }
        else {
            playerCardSum += 11;
        }
    }
    else {
        playerCardSum += (parseInt(cardNum));
    }
}

//Helper function to add Dealer card sum
function sumOfDealerCards() {
    if (cardNum === "J" || cardNum === "Q" || cardNum === "K") {
        dealerCardSum += 10;
    }
    else if (cardNum === "A") {
        if ((dealerCardSum + 11) > 21) {
            dealerCardSum += 1;
        }
        else {
            dealerCardSum += 11;
        }
    }
    else {
        dealerCardSum += (parseInt(cardNum));
    }
}

//select a random card
function selectRandomCard() {
    var cards = ["A", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    var randomCardSelectedIs = Math.floor(Math.random() * 13);
    return cards[randomCardSelectedIs];
}

//Select a random card type
function selectRandomSuiteType() {
    let suites = ["spades", "diams", "clubs", "hearts"];
    randomSuite = Math.floor(Math.random() * 4);
    return suites[randomSuite];
}

//Function to start the play game.
function playAGame() {
    playerName = prompt("Enter the player Name !!");
    document.getElementById("welcomePlayer").innerHTML= playerName+" Cards";
    document.getElementById("hitButtons").style.visibility = "visible"
    document.getElementById("dealButton").style.visibility = "visible";
    createDealerCard();
    createPlayerCard();
    createPlayerCard();
    //Condition to check if player made a black jact on the card load
    if (playerCardSum === 21) {
        alert("\nWohooo!! \n it's a black jack! \nCongratulation " + playerName + " won!");
        winner.play();
        onStartAudio.pause();
        disableDealButton();
        disableHitButton();
        congratulatePlayer();
    }
    event.preventDefault();
}

//Function which add cards to player
function hit() {
    createPlayerCard();
    cardSwipe.play();
    event.preventDefault();

    if (playerCardSum > 21) {
        disableDealButton();
        disableHitButton();
        looser.play();
        onStartAudio.pause();
        CongratulateDealer();
        alert("Sorry " + playerName + " !! You lost \n" + playerCardSum + " is sum of your card, which is greater than 21 ! \nTry again to see your luck by selecting Reset button");
    }
    else if (playerCardSum === 21) {
        disableDealButton();
        disableHitButton();
        winner.play();
        onStartAudio.pause();
        congratulatePlayer();
        alert("\nWohooo!! \n it's a black jack! \nCongratulation " + playerName + ". You won!");
    }
}

//Function to disable the Deal button
function disableDealButton() {
    document.getElementById("dealButton").disabled = true;
}

//Function to disable the Hit button
function disableHitButton() {
    document.getElementById("hitButtons").disabled = true;
}

//Function to enable the Deal button
function enableDealButton() {
    document.getElementById("dealButton").disabled = false;
}

//Function to enable hit button
function enableHitButton() {
    document.getElementById("hitButtons").disabled = false;
}


///Function which runs after selecting the Deal button
function finalResult() {
    event.preventDefault();
    disableHitButton();
    createDealerCard();
    while (dealerCardSum<=21 && loopBreaker) {
        cardSwipe.play();
        checkTheWinner();
    }
    if (dealerCardSum>21){
        congratulatePlayer();
        alert("Congratulations !!! " + playerName + " wins!");
        disableDealButton();
        onStartAudio.pause();
        winner.play();
    }
}

//Function for dealer to randomly decide when sum of dealer card is less than sum of player cards.
function delearDecisionOnCardWithdrawal() {
    var decisionAllowed = [true, false];
    return decisionAllowed[Math.floor(Math.random() * 2)];
}

function congratulatePlayer(){
    var imageDiv = document.createElement("div");
    imageDiv.setAttribute("id","playerCongratulate");
    var congratsImage=document.createElement("img");
    congratsImage.src='https://media.giphy.com/media/oNvvWdt3e2s7kj7rrO/giphy.gif';
    document.getElementById("playerCardsList").append(imageDiv);
    document.getElementById("playerCongratulate").append(congratsImage);
    
}

function CongratulateDealer(){
    var imageDiv = document.createElement("div");
    imageDiv.setAttribute("id","dealerCongratulate");
    var congratsImage=document.createElement("img");
    congratsImage.setAttribute("id","dealerCongratulate");
    congratsImage.src='https://media.giphy.com/media/26ufcZICbgCSGe5sQ/giphy.gif';
    document.getElementById("dealerCardsList").append(imageDiv);
    document.getElementById("dealerCongratulate").append(congratsImage);

}

//Function runs upon selecting the Deal button
function checkTheWinner() {
    if (playerCardSum < dealerCardSum){
        CongratulateDealer();
        looser.play();
        onStartAudio.pause();
        alert("Sorry " + playerName + " !! You lost \n" + playerCardSum + " is sum of your card, which is less than dealer cards "+dealerCardSum+" ! \nTry again to see your luck by selecting Reset button");
        loopBreaker=false;
        disableDealButton();
    }
    else if (playerCardSum > dealerCardSum) {
        createDealerCard();
       setTimeout(function(){
           dealerCard.getElementById('dealerCard').style.display="none"
       },5000);
    }
    else if (playerCardSum === dealerCardSum && dealerCardSum<21) {
        if (delearDecisionOnCardWithdrawal()){//Randomly asking delear to continue or not
            createDealerCard();
            disableDealButton();
        }
        else {
            alert("\n OOoooooPpppppS \n It's a tie!!!");
            loopBreaker=false;
            disableDealButton();
        }
    }
    else{
        CongratulateDealer();
        looser.play();
        onStartAudio.pause();
        alert("Sorry " + playerName + " !! You lost \n" + playerCardSum + " is sum of your card, which is less than dealer cards "+dealerCardSum+" ! \nTry again to see your luck by selecting Reset button");
        disableDealButton();
    }
}