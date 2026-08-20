/* =========================================
   MAHMUDOV MONEY: STREET TYCOON
========================================= */


/* СОСТОЯНИЕ ИГРЫ */

let money =
    Number(localStorage.getItem("tycoonMoney"))
    || 1000;

let day =
    Number(localStorage.getItem("tycoonDay"))
    || 1;

let xp =
    Number(localStorage.getItem("tycoonXP"))
    || 0;

let level =
    Number(localStorage.getItem("tycoonLevel"))
    || 1;

let competitorMoney =
    Number(
        localStorage.getItem(
            "tycoonCompetitor"
        )
    )
    || 2500;


/* УЛУЧШЕНИЯ */

let upgrades = JSON.parse(
    localStorage.getItem(
        "tycoonUpgrades"
    )
) || {

    advertising: 0,

    worker: 0,

    security: 0

};


/* БИЗНЕСЫ */

const businesses = [

    {
        id: "shop",

        name: "Маленький магазин",

        icon: "🏪",

        description:
            "Твой первый бизнес.",

        income: 100,

        price: 0
    },

    {
        id: "cafe",

        name: "Кафе",

        icon: "☕",

        description:
            "Люди любят кофе и еду.",

        income: 250,

        price: 2500
    },

    {
        id: "carwash",

        name: "Автомойка",

        icon: "🚗",

        description:
            "Машины сами себя не помоют.",

        income: 600,

        price: 7000
    },

    {
        id: "market",

        name: "Супермаркет",

        icon: "🛒",

        description:
            "Большой магазин для большого района.",

        income: 1400,

        price: 18000
    },

    {
        id: "office",

        name: "Бизнес-центр",

        icon: "🏢",

        description:
            "Теперь ты начинаешь выглядеть серьёзно.",

        income: 3500,

        price: 50000
    },

    {
        id: "factory",

        name: "Фабрика",

        icon: "🏭",

        description:
            "Настоящая промышленная империя.",

        income: 8000,

        price: 120000
    }

];


/* ВЛАДЕНИЕ */

let ownedBusinesses =
    JSON.parse(
        localStorage.getItem(
            "tycoonBusinesses"
        )
    ) || ["shop"];


/* =========================================
   ОТРИСОВКА БИЗНЕСА
========================================= */

function renderBusinesses() {

    const container =
        document.getElementById(
            "businesses"
        );

    container.innerHTML = "";

    businesses.forEach(business => {

        const owned =
            ownedBusinesses.includes(
                business.id
            );

        const card =
            document.createElement(
                "div"
            );

        card.className =
            "business";

        let income =
            calculateIncome(
                business.income
            );

        card.innerHTML = `

            <div class="business-icon">
                ${business.icon}
            </div>

            <h3>
                ${business.name}
            </h3>

            <p>
                ${business.description}
            </p>

            <div class="business-income">

                <span>
                    Доход / день
                </span>

                <b>
                    ₽ ${income.toLocaleString()}
                </b>

            </div>

            ${
                owned

                ? `
                    <button
                        class="business-buy owned"
                        disabled>

                        ✓ ТВОЙ БИЗНЕС

                    </button>
                  `

                : `
                    <button
                        class="business-buy"
                        onclick="
                            buyBusiness(
                                '${business.id}'
                            )
                        ">

                        Купить · ₽
                        ${business.price.toLocaleString()}

                    </button>
                  `
            }

        `;

        container.appendChild(card);

    });

}


/* =========================================
   ДОХОД
========================================= */

function calculateIncome(baseIncome) {

    let income =
        baseIncome;

    income +=
        upgrades.advertising *
        50;

    income +=
        upgrades.worker *
        100;

    return income;
}


/* =========================================
   ПОКУПКА БИЗНЕСА
========================================= */

function buyBusiness(id) {

    const business =
        businesses.find(
            item =>
                item.id === id
        );

    if (!business) {
        return;
    }

    if (
        ownedBusinesses.includes(
            id
        )
    ) {

        notify(
            "Этот бизнес уже твой."
        );

        return;
    }


    if (
        money <
        business.price
    ) {

        notify(
            "Недостаточно денег."
        );

        return;
    }


    money -=
        business.price;

    ownedBusinesses.push(id);

    addLog(
        "🏪 Ты купил: " +
        business.name
    );

    notify(
        "Бизнес приобретён!"
    );

    saveGame();

    updateUI();

    renderBusinesses();
}


/* =========================================
   ПОКУПКА УЛУЧШЕНИЙ
========================================= */

function buyUpgrade(type) {

    const prices = {

        advertising: 500,

        worker: 750,

        security: 1000

    };


    const price =
        prices[type];


    if (
        money <
        price
    ) {

        notify(
            "Не хватает денег."
        );

        return;
    }


    money -= price;

    upgrades[type]++;

    saveGame();

    updateUI();

    renderBusinesses();


    const names = {

        advertising:
            "📢 Реклама улучшена",

        worker:
            "👨‍💼 Работник нанят",

        security:
            "🛡️ Безопасность улучшена"

    };


    addLog(
        names[type]
    );

    notify(
        "Улучшение куплено!"
    );
}


/* =========================================
   НАЧАЛО ДНЯ
========================================= */

function handleEvent() {

    const events = [

        {
            title:
                "Очередь у магазина",

            text:
                "Сегодня пришло намного больше клиентов.",

            money:
                350,

            xp:
                80
        },

        {
            title:
                "Крупный заказ",

            text:
                "Местная компания сделала большой заказ.",

            money:
                600,

            xp:
                120
        },

        {
            title:
                "Неожиданные расходы",

            text:
                "Придётся заплатить за ремонт.",

            money:
                -250,

            xp:
                40
        },

        {
            title:
                "Вирусная реклама",

            text:
                "Видео твоего бизнеса стало популярным.",

            money:
                900,

            xp:
                180
        },

        {
            title:
                "Тихий день",

            text:
                "Сегодня ничего особенного не произошло.",

            money:
                100,

            xp:
                30
        }

    ];


    const event =
        events[
            Math.floor(
                Math.random() *
                events.length
            )
        ];


    let income =
        getDailyIncome();


    money +=
        income;

    money +=
        event.money;


    xp +=
        event.xp;


    day++;


    competitorAction();


    checkLevel();


    document.getElementById(
        "eventTitle"
    ).textContent =
        event.title;


    document.getElementById(
        "eventText"
    ).textContent =
        event.text;


    document.getElementById(
        "eventButton"
    ).textContent =
        "НАЧАТЬ СЛЕДУЮЩИЙ ДЕНЬ";


    addLog(
        "📅 День " +
        day +
        ": доход ₽" +
        income.toLocaleString()
    );


    if (
        event.money >= 0
    ) {

        addLog(
            "💰 Событие принесло ₽" +
            event.money
        );

    } else {

        addLog(
            "💸 Событие забрало ₽" +
            Math.abs(event.money)
        );

    }


    saveGame();

    updateUI();
}


/* =========================================
   ОБЩИЙ ДОХОД
========================================= */

function getDailyIncome() {

    let total = 0;


    ownedBusinesses.forEach(
        id => {

            const business =
                businesses.find(
                    item =>
                        item.id === id
                );

            if (business) {

                total +=
                    calculateIncome(
                        business.income
                    );

            }

        }
    );


    return total;
}


/* =========================================
   КОНКУРЕНТ
========================================= */

function competitorAction() {

    const growth =
        Math.floor(
            Math.random() *
            700
        ) + 100;


    competitorMoney +=
        growth;


    const messages = [

        "«Я тоже не сижу без дела.»",

        "«Мой бизнес растёт.»",

        "«Тебе меня ещё не догнать.»",

        "«Посмотрим, кто станет богаче.»"

    ];


    document.getElementById(
        "competitorText"
    ).textContent =
        messages[
            Math.floor(
                Math.random() *
                messages.length
            )
        ];


    document.getElementById(
        "competitorMoney"
    ).textContent =
        competitorMoney.toLocaleString();

}


/* =========================================
   УРОВЕНЬ
========================================= */

function checkLevel() {

    const required =
        level * 500;


    if (
        xp >= required
    ) {

        xp -= required;

        level++;


        notify(
            "⭐ Новый уровень: " +
            level
        );


        addLog(
            "⭐ Ты достиг уровня " +
            level
        );

    }

}


/* =========================================
   ЖУРНАЛ
========================================= */

function addLog(text) {

    const log =
        document.getElementById(
            "log"
        );


    const item =
        document.createElement(
            "div"
        );


    item.className =
        "log-item";


    item.textContent =
        text;


    log.prepend(item);


    while (
        log.children.length > 8
    ) {

        log.removeChild(
            log.lastChild
        );

    }

}


/* =========================================
   УВЕДОМЛЕНИЯ
========================================= */

function notify(text) {

    const box =
        document.getElementById(
            "notification"
        );


    box.textContent =
        text;


    box.classList.add(
        "show"
    );


    setTimeout(
        () => {

            box.classList.remove(
                "show"
            );

        },
        2200
    );

}


/* =========================================
   UI
========================================= */

function updateUI() {

    document.getElementById(
        "money"
    ).textContent =
        money.toLocaleString();


    document.getElementById(
        "day"
    ).textContent =
        day;


    document.getElementById(
        "xp"
    ).textContent =
        xp;


    document.getElementById(
        "level"
    ).textContent =
        level;


    document.getElementById(
        "competitorMoney"
    ).textContent =
        competitorMoney
        .toLocaleString();

}


/* =========================================
   СОХРАНЕНИЕ
========================================= */

function saveGame() {

    localStorage.setItem(
        "tycoonMoney",
        money
    );


    localStorage.setItem(
        "tycoonDay",
        day
    );


    localStorage.setItem(
        "tycoonXP",
        xp
    );


    localStorage.setItem(
        "tycoonLevel",
        level
    );


    localStorage.setItem(
        "tycoonCompetitor",
        competitorMoney
    );


    localStorage.setItem(
        "tycoonBusinesses",
        JSON.stringify(
            ownedBusinesses
        )
    );


    localStorage.setItem(
        "tycoonUpgrades",
        JSON.stringify(
            upgrades
        )
    );

}


/* =========================================
   НАВИГАЦИЯ
========================================= */

function scrollToTop() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function scrollToBusiness() {

    document
        .getElementById("businesses")
        .scrollIntoView({
            behavior: "smooth"
        });

}


function scrollToShop() {

    document
        .querySelector(".shop")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================
   СТАРТ
========================================= */

renderBusinesses();

updateUI();

addLog(
    "🏙️ Добро пожаловать в Mahmudov Money!"
);

addLog(
    "💰 Твой стартовый капитал: ₽1000"
);
