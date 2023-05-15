// here we define all our constants
const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;
const MODE_ATTACK = 'ATTACK'; // MODE_ATTACK = 0
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'; // MODE_STRONG_ATTACK = 1
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battlelog = [];

let enteredValue = prompt('Maximum life for you and the monster.', '100');

function getMaxLifeValues() {

    let parsedVal = parseInt(enteredValue);

    if (parsedVal === '' || parsedVal === null || isNaN(parsedVal) || parsedVal <= 0)  {  
        throw {message: 'Invalid user input, not a number!'};
    }
    return parsedVal;
}

// if user enters a wrong value, we catch the error and set the default value of 100
try {
    chosenMaxLife = getMaxLifeValues();
} catch (error) {
    console.log(error);
    alert('You entered something wrong, default value of 100 was used.');
    chosenMaxLife = 100;
    //throw error;
} 
adjustHealthBars(chosenMaxLife);

function writeToLog (event,value,monsterHealth,playerHealth) {
    let logEntry = {
        event: event,
        value: value,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    };
    switch (event) {
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry.target = 'PLAYER';
            break;
        case LOG_EVENT_PLAYER_HEAL:
            logEntry.target = 'PLAYER';
            break;
        case LOG_EVENT_GAME_OVER:
            break;
    }    

    battlelog.push(logEntry);

}


function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}


function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamange = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamange;
    writeToLog(LOG_EVENT_MONSTER_ATTACK,playerDamange,currentMonsterHealth,currentPlayerHealth);

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('You would be dead but the bonus life saved you!');
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You won!');
        writeToLog(LOG_EVENT_GAME_OVER,'PLAYER WON',currentMonsterHealth,currentPlayerHealth);
    } else if ( currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You lost!');
        writeToLog(LOG_EVENT_GAME_OVER,'MONSTER WON',currentMonsterHealth,currentPlayerHealth);
    } else if( currentPlayerHealth<=0 && currentMonsterHealth<=0 ){
        alert('You have a draw!');
        writeToLog(LOG_EVENT_GAME_OVER,'A DRAW',currentMonsterHealth,currentPlayerHealth);
    }
    
    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset();
    }

}

function attackMonster(mode) {
    const maxDamage= mode == MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    const logEvent = mode == MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(logEvent,damage,currentMonsterHealth,currentPlayerHealth);

    endRound();

}

function attackHandler() {
    attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
    attackMonster(MODE_STRONG_ATTACK);
}


function healPlayerHandler() {
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert("You can't heal to more than your max initial health.");
        healValue = chosenMaxLife - currentPlayerHealth;
    } else{
        healValue = HEAL_VALUE; 
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(LOG_EVENT_PLAYER_HEAL,healValue,currentMonsterHealth,currentPlayerHealth);
    endRound();
}

function printLogHandler () {
    let i=0;
    for (const logEntry of battlelog) {
        console.log(`#${i}`)
        for (const key in logEntry) {
            console.log(`${key} => ${logEntry[key]}`);
        }
        i++;
    }
}

attackBtn.addEventListener('click', attackHandler);

strongAttackBtn.addEventListener('click', strongAttackHandler);

healBtn.addEventListener('click', healPlayerHandler);

logBtn.addEventListener('click', printLogHandler);

// what does !! do?
// !! converts a value to a boolean and then inverts it
// !!'hello' => true
// !!'' => false , why is this false? empty string is falsy then it is converted to true and then inverted to false
