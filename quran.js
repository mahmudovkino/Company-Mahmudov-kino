const cover = document.getElementById("cover");
const book = document.getElementById("book");
const contents = document.getElementById("contents");

const startButton = document.getElementById("startButton");
const backButton = document.getElementById("backButton");

const previousButton =
    document.getElementById("previousButton");

const nextButton =
    document.getElementById("nextButton");

const contentsButton =
    document.getElementById("contentsButton");

const closeContents =
    document.getElementById("closeContents");

const themeButton =
    document.getElementById("themeButton");

const bookmarkButton =
    document.getElementById("bookmarkButton");

const fontMinus =
    document.getElementById("fontMinus");

const fontPlus =
    document.getElementById("fontPlus");

const audioButton =
    document.getElementById("audioButton");

const arabicText =
    document.getElementById("arabicText");

const translation =
    document.getElementById("translation");

const pageNumber =
    document.querySelector(".page-number");

const pageCounter =
    document.getElementById("pageCounter");

const surahName =
    document.getElementById("surahName");

const surahInfo =
    document.getElementById("surahInfo");

const surahList =
    document.getElementById("surahList");

const searchInput =
    document.getElementById("searchInput");


/*
    ВРЕМЕННЫЕ ДАННЫЕ ДЛЯ ИНТЕРФЕЙСА

    Здесь пока только несколько сур,
    чтобы проверить дизайн.

    Полный текст будем подключать
    из проверенного источника отдельно.
*/

const surahs = [

    {
        number: 1,
        arabic: "الفاتحة",
        russian: "Аль-Фатиха",
        verses: 7
    },

    {
        number: 2,
        arabic: "البقرة",
        russian: "Аль-Бакара",
        verses: 286
    },

    {
        number: 3,
        arabic: "آل عمران",
        russian: "Али Имран",
        verses: 200
    },

    {
        number: 4,
        arabic: "النساء",
        russian: "Ан-Ниса",
        verses: 176
    },

    {
        number: 5,
        arabic: "المائدة",
        russian: "Аль-Маида",
        verses: 120
    },

    {
        number: 6,
        arabic: "الأنعام",
        russian: "Аль-Анам",
        verses: 165
    },

    {
        number: 7,
        arabic: "الأعراف",
        russian: "Аль-Араф",
        verses: 206
    },

    {
        number: 8,
        arabic: "الأنفال",
        russian: "Аль-Анфаль",
        verses: 75
    },

    {
        number: 9,
        arabic: "التوبة",
        russian: "Ат-Тауба",
        verses: 129
    },

    {
        number: 10,
        arabic: "يونس",
        russian: "Юнус",
        verses: 109
    }

];


/*
    ОТКРЫТЬ КНИГУ
*/

startButton.addEventListener("click", () => {

    cover.classList.add("hidden");

    book.classList.remove("hidden");

    loadBookmark();

});


/*
    НАЗАД
*/

backButton.addEventListener("click", () => {

    book.classList.add("hidden");

    cover.classList.remove("hidden");

});


/*
    ОГЛАВЛЕНИЕ
*/

contentsButton.addEventListener("click", () => {

    contents.classList.remove("hidden");

});


closeContents.addEventListener("click", () => {

    contents.classList.add("hidden");

});


/*
    СПИСОК СУР
*/

function renderSurahs(list = surahs) {

    surahList.innerHTML = "";

    list.forEach(surah => {

        const item =
            document.createElement("div");

        item.className = "surah";

        item.innerHTML = `
            <div>
                <strong>
                    ${surah.number}. ${surah.russian}
                </strong>

                <br>

                <small>
                    ${surah.verses} аятов
                </small>
            </div>

            <strong dir="rtl">
                ${surah.arabic}
            </strong>
        `;

        item.addEventListener("click", () => {

            openSurah(surah);

        });

        surahList.appendChild(item);

    });

}

renderSurahs();


/*
    ОТКРЫТЬ СУРУ
*/

function openSurah(surah) {

    contents.classList.add("hidden");

    surahName.textContent =
        surah.russian;

    surahInfo.textContent =
        `Сура ${surah.number} · ${surah.verses} аятов`;

    pageNumber.textContent = "1";

    pageCounter.textContent =
        `1 / ${surah.verses}`;

    /*
        Пока показываем демонстрационную
        страницу.

        Полный текст добавим следующим этапом.
    */

    if (surah.number === 1) {

        arabicText.textContent =
            "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";

        translation.textContent =
            "Во имя Аллаха, Милостивого, Милосердного.";

    } else {

        arabicText.textContent =
            surah.arabic;

        translation.textContent =
            "Текст этой суры будет загружаться из проверенного источника.";

    }

    saveBookmark(surah.number);

}


/*
    ТЁМНАЯ ТЕМА
*/

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "quranTheme",
        document.body.classList.contains("dark")
            ? "dark"
            : "light"
    );

});


if (
    localStorage.getItem("quranTheme")
    === "dark"
) {

    document.body.classList.add("dark");

}


/*
    РАЗМЕР ТЕКСТА
*/

let fontSize = 42;

fontPlus.addEventListener("click", () => {

    fontSize += 3;

    arabicText.style.fontSize =
        fontSize + "px";

});


fontMinus.addEventListener("click", () => {

    if (fontSize > 25) {

        fontSize -= 3;

        arabicText.style.fontSize =
            fontSize + "px";

    }

});


/*
    ЗАКЛАДКА
*/

function saveBookmark(surahNumber) {

    localStorage.setItem(
        "quranBookmark",
        surahNumber
    );

    bookmarkButton.textContent = "★";

}


function loadBookmark() {

    const saved =
        localStorage.getItem("quranBookmark");

    if (saved) {

        bookmarkButton.textContent = "★";

    }

}


bookmarkButton.addEventListener("click", () => {

    if (
        bookmarkButton.textContent === "★"
    ) {

        localStorage.removeItem(
            "quranBookmark"
        );

        bookmarkButton.textContent = "☆";

    } else {

        saveBookmark(1);

    }

});


/*
    ПОИСК
*/

searchInput.addEventListener("input", () => {

    const query =
        searchInput.value.toLowerCase().trim();

    const result =
        surahs.filter(surah =>

            surah.russian
                .toLowerCase()
                .includes(query)

            ||

            surah.arabic
                .includes(query)

            ||

            String(surah.number)
                .includes(query)

        );

    renderSurahs(result);

});


/*
    КНОПКИ СТРАНИЦ
*/

previousButton.addEventListener("click", () => {

    alert("Предыдущая страница будет загружаться после подключения полного текста Корана.");

});


nextButton.addEventListener("click", () => {

    alert("Следующая страница будет загружаться после подключения полного текста Корана.");

});


/*
    АУДИО
*/

audioButton.addEventListener("click", () => {

    const text =
        arabicText.textContent;

    if (!("speechSynthesis" in window)) {

        alert(
            "Ваш браузер не поддерживает озвучку."
        );

        return;

    }

    const speech =
        new SpeechSynthesisUtterance(text);

    speech.lang = "ar-SA";

    speech.rate = 0.75;

    speechSynthesis.cancel();

    speechSynthesis.speak(speech);

});


/*
    СВАЙПЫ НА ТЕЛЕФОНЕ
*/

let touchStartX = 0;

document.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

    }
);


document.addEventListener(
    "touchend",
    event => {

        const touchEndX =
            event.changedTouches[0].screenX;

        const difference =
            touchStartX - touchEndX;

        if (Math.abs(difference) < 50) {
            return;
        }

        if (difference > 0) {

            nextButton.click();

        } else {

            previousButton.click();

        }

    }
);
