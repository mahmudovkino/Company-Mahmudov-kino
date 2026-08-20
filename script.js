const opponents = [

    {
        name: "Петя Новичок",
        face: "😎",
        money: 3000,
        difficulty: "Лёгкий",
        level: 1,
        dialogue: "Ставка 200₽. Играем?",
        win: "Неплохо! Но мне повезло больше.",
        lose: "Чёрт... сегодня явно не мой день."
    },

    {
        name: "Маша Хитрая",
        face: "😏",
        money: 4500,
        difficulty: "Лёгкий",
        level: 2,
        dialogue: "200₽? Слишком мало. Удвоить?",
        win: "Я же говорила, что ты пожалеешь.",
        lose: "Ладно. Этот раунд твой."
    },

    {
        name: "Тимур Риск",
        face: "😈",
        money: 6000,
        difficulty: "Средний",
        level: 3,
        dialogue: "Я ставлю 400₽. Ты точно хочешь играть?",
        win: "Риск иногда окупается.",
        lose: "Вот это уже было больно."
    },

    {
        name: "Азамат",
        face: "🧐",
        money: 7500,
        difficulty: "Средний",
        level: 4,
        dialogue: "Спокойно. Удваиваем.",
        win: "Ты ошибся с расчётом.",
        lose: "Хороший ход."
    },

    {
        name: "Карим Богач",
        face: "🤑",
        money: 10000,
        difficulty: "Средний",
        level: 5,
        dialogue: "Для меня 500₽ вообще не деньги.",
        win: "Деньги любят смелых.",
        lose: "Ты сегодня хорошо заработал."
    },

    {
        name: "Профессор Иван",
        face: "🤓",
        money: 13000,
        difficulty: "Сложный",
        level: 6,
        dialogue: "Математика говорит, что тебе лучше сбросить.",
        win: "Интересно. Очень интересно.",
        lose: "Расчёт оказался верным."
    },

    {
        name: "Карточный Волк",
        face: "🐺",
        money: 16000,
        difficulty: "Сложный",
        level: 7,
        dialogue: "Я чувствую слабость. Удваиваем?",
        win: "Сегодня волк съел тебя.",
        lose: "Неплохой удар."
    },

    {
        name: "Рустам",
        face: "🕶️",
        money: 20000,
        difficulty: "Сложный",
        level: 8,
        dialogue: "1000₽. Без разговоров.",
        win: "Вот теперь начинается игра.",
        lose: "Ты быстро учишься."
    },

    {
        name: "Дон Карло",
        face: "🎩",
        money: 25000,
        difficulty: "Очень сложный",
        level: 9,
        dialogue: "Удваиваю. Твой ход.",
        win: "Деньги снова переходят ко мне.",
        lose: "Поздравляю. Это было достойно."
    },

    {
        name: "Король Карт",
        face: "👑",
        money: 30000,
        difficulty: "Очень сложный",
        level: 10,
        dialogue: "Ты пришёл за моими деньгами?",
        win: "Король остаётся королём.",
        lose: "Кажется, трон теперь твой."
    },

    {
        name: "Миллионер",
        face: "💎",
        money: 50000,
        difficulty: "Эксперт",
        level: 11,
        dialogue: "5000₽. Поднимаю.",
        win: "Вот почему у меня миллионы.",
        lose: "Сегодня рынок явно против меня."
    },

    {
        name: "MAHMUDOV BOSS",
        face: "🔥",
        money: 100000,
        difficulty: "ЛЕГЕНДА",
        level: 12,
        dialogue: "Финальный стол. Ставка 10000₽.",
        win: "Ты действительно дошёл до меня.",
        lose: "Легенду ещё нужно заслужить."
    }

];


let playerMoney =
    Number(localStorage.getItem("mahmudovMoney"))
    || 1000;

let playerLevel =
    Number(localStorage.getItem("mahmudovLevel"))
    || 1;

let unlockedStage =
    Number(localStorage.getItem("unlockedStage"))
    || 1;

let xp =
    Number(localStorage.getItem("mahmudovXP"))
    || 0;


let currentOpponent = null;

let currentBet = 200;

let pot = 0;


/* ЭКРАНЫ */

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });

    document
        .getElementById(id)
        .classList.add("active");

    updateUI();
}


/* ЭТАПЫ */

function openStages() {

    showScreen("stages");

    const container =
        document.getElementById("opponents");

    container.innerHTML = "";

    opponents.forEach((opponent,index) => {

        const stage = index + 1;

        const locked =
            stage > unlockedStage;

        const card =
            document.createElement("div");

        card.className =
            "opponent-card " +
            (locked ? "locked" : "");

        card.innerHTML = `

            <div class="avatar">
                ${locked ? "🔒" : opponent.face}
            </div>

            <h3>
                ${locked
                    ? "Заблокировано"
                    : opponent.name}
            </h3>

            <p>
                ${
                    locked
                    ? "Победи предыдущего соперника."
                    : "Этап " +
                      stage +
                      " • " +
                      opponent.difficulty
                }
            </p>

            <div class="difficulty">
                ${
                    locked
                    ? "🔒 Требуется предыдущий этап"
                    : "⭐ " +
                      opponent.difficulty
                }
            </div>

            ${
                locked

                ? `
                    <button
                        class="play-opponent"
                        disabled>
                        ЗАКРЫТО
                    </button>
                  `

                : `
                    <button
                        class="play-opponent"
                        onclick="startGame(${index})">

                        ИГРАТЬ

                    </button>
                  `
            }

        `;

        container.appendChild(card);

    });
}


/* НАЧАЛО ИГРЫ */

function startGame(index) {

    currentOpponent =
        opponents[index];

    currentBet = 200;

    pot = 0;

    document.getElementById(
        "stageNumber"
    ).textContent =
        currentOpponent.level;

    document.getElementById(
        "opponentName"
    ).textContent =
        currentOpponent.name;

    document.getElementById(
        "opponentTitle"
    ).textContent =
        currentOpponent.name;

    document.getElementById(
        "characterFace"
    ).textContent =
        currentOpponent.face;

    document.getElementById(
        "opponentMoney"
    ).textContent =
        currentOpponent.money
        .toLocaleString();

    document.getElementById(
        "dialogue"
    ).textContent =
        currentOpponent.dialogue;

    document.getElementById(
        "currentBet"
    ).textContent =
        currentBet;

    document.getElementById(
        "pot"
    ).textContent =
        pot;

    showScreen("gameScreen");
}


/* ИГРАЕМ */

function callBet() {

    if (playerMoney < currentBet) {

        notify(
            "Недостаточно денег!"
        );

        return;
    }

    playerMoney -= currentBet;

    pot += currentBet * 2;

    document.getElementById(
        "dialogue"
    ).textContent =
        randomDialogue([

            "Хорошо. Карты на стол.",

            "Играем.",

            "Посмотрим, кому сегодня повезёт.",

            "Ты принял ставку. Интересно."

        ]);

    finishRound();
}


/* УДВОИТЬ */

function doubleBet() {

    const bet =
        currentBet * 2;

    if (playerMoney < bet) {

        notify(
            "Для удвоения не хватает денег!"
        );

        return;
    }

    currentBet = bet;

    document.getElementById(
        "currentBet"
    ).textContent =
        currentBet;

    document.getElementById(
        "dialogue"
    ).textContent =
        randomDialogue([

            "Удвоить? Хорошо. Я принимаю.",

            "Ты решил повысить? Смело.",

            "Вот теперь становится интересно.",

            "Удваиваю в ответ."

        ]);

    notify(
        "Ставка увеличена до ₽"
        + currentBet
    );
}


/* ВТРОЕ */

function tripleBet() {

    const bet =
        currentBet * 3;

    if (playerMoney < bet) {

        notify(
            "Недостаточно денег!"
        );

        return;
    }

    currentBet = bet;

    document.getElementById(
        "currentBet"
    ).textContent =
        currentBet;

    document.getElementById(
        "dialogue"
    ).textContent =
        randomDialogue([

            "Ты решил утроить?",

            "Вот это уже серьёзно.",

            "Хорошо. Принимаю вызов.",

            "Ты действительно готов рискнуть?"

        ]);

    notify(
        "Ставка ×3: ₽"
        + currentBet
    );
}


/* СБРОС */

function foldGame() {

    const loss =
        Math.floor(currentBet / 2);

    playerMoney -= loss;

    if (playerMoney < 0) {
        playerMoney = 0;
    }

    document.getElementById(
        "dialogue"
    ).textContent =
        "Сбросил? Жаль. Я думал, ты рискнёшь.";

    notify(
        "Ты проиграл ₽" + loss
    );

    saveGame();

    updateUI();
}


/* РЕЗУЛЬТАТ */

function finishRound() {

    const playerChance =
        Math.random();

    if (playerChance >= 0.48) {

        const reward = pot;

        playerMoney += reward;

        gainXP(100);

        document.getElementById(
            "dialogue"
        ).textContent =
            currentOpponent.lose;

        notify(
            "ПОБЕДА! +₽" + reward
        );

        unlockNextStage();

    } else {

        playerMoney -= currentBet;

        if (playerMoney < 0) {
            playerMoney = 0;
        }

        document.getElementById(
            "dialogue"
        ).textContent =
            currentOpponent.win;

        notify(
            "Ты проиграл ₽" +
            currentBet
        );
    }

    pot = 0;

    saveGame();

    updateUI();
}


/* XP */

function gainXP(amount) {

    xp += amount;

    const neededXP =
        playerLevel * 300;

    if (xp >= neededXP) {

        xp -= neededXP;

        playerLevel++;

        notify(
            "НОВЫЙ УРОВЕНЬ! ⭐ " +
            playerLevel
        );
    }
}


/* ОТКРЫТИЕ ЭТАПА */

function unlockNextStage() {

    if (!currentOpponent) {
        return;
    }

    const nextStage =
        currentOpponent.level + 1;

    if (
        nextStage > unlockedStage &&
        nextStage <= opponents.length
    ) {

        unlockedStage =
            nextStage;

        notify(
            "Открыт новый соперник!"
        );
    }
}


/* МАГАЗИН */

function buyItem(id,price) {

    if (playerMoney < price) {

        notify(
            "Недостаточно денег."
        );

        return;
    }

    const bought =
        JSON.parse(
            localStorage.getItem(
                "mahmudovShop"
            )
        ) || [];

    if (bought.includes(id)) {

        notify(
            "Этот предмет уже куплен."
        );

        return;
    }

    playerMoney -= price;

    bought.push(id);

    localStorage.setItem(
        "mahmudovShop",
        JSON.stringify(bought)
    );

    saveGame();

    notify(
        "Покупка совершена!"
    );
}


/* UI */

function updateUI() {

    document.getElementById(
        "money"
    ).textContent =
        playerMoney.toLocaleString();

    document.getElementById(
        "playerMoney"
    ).textContent =
        playerMoney.toLocaleString();

    document.getElementById(
        "level"
    ).textContent =
        playerLevel;

    document.getElementById(
        "pot"
    ).textContent =
        pot.toLocaleString();

    if (currentOpponent) {

        document.getElementById(
            "opponentMoney"
        ).textContent =
            currentOpponent.money
            .toLocaleString();

        document.getElementById(
            "currentBet"
        ).textContent =
            currentBet;
    }
}


/* СОХРАНЕНИЕ */

function saveGame() {

    localStorage.setItem(
        "mahmudovMoney",
        playerMoney
    );

    localStorage.setItem(
        "mahmudovLevel",
        playerLevel
    );

    localStorage.setItem(
        "mahmudovXP",
        xp
    );

    localStorage.setItem(
        "unlockedStage",
        unlockedStage
    );
}


/* ДИАЛОГИ */

function randomDialogue(array) {

    return array[
        Math.floor(
            Math.random() *
            array.length
        )
    ];
}


/* УВЕДОМЛЕНИЕ */

function notify(text) {

    const notification =
        document.getElementById(
            "notification"
        );

    notification.textContent =
        text;

    notification.classList.add(
        "show"
    );

    setTimeout(() => {

        notification.classList.remove(
            "show"
        );

    },2200);
}


/* ЗАПУСК */

updateUI();
