const surahs = [

    "Аль-Фатиха",
    "Аль-Бакара",
    "Али Имран",
    "Ан-Ниса",
    "Аль-Маида",
    "Аль-Анам",
    "Аль-Араф",
    "Аль-Анфаль",
    "Ат-Тауба",
    "Юнус",
    "Худ",
    "Юсуф",
    "Ар-Раад",
    "Ибрахим",
    "Аль-Хиджр",
    "Ан-Нахль",
    "Аль-Исра",
    "Аль-Кахф",
    "Марьям",
    "Та Ха",
    "Аль-Анбия",
    "Аль-Хадж",
    "Аль-Муминун",
    "Ан-Нур",
    "Аль-Фуркан"

];


let currentSurah = 0;


const list =
    document.getElementById(
        "surahList"
    );


const counter =
    document.getElementById(
        "counter"
    );


function showSurahList() {

    list.innerHTML = "";

    surahs.forEach(
        (surah, index) => {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "surah";

            div.innerHTML = `

                <div class="surah-name">

                    ${index + 1}.
                    ${surah}

                </div>

                <div class="surah-number">

                    سورة ${index + 1}

                </div>

            `;

            div.onclick = () => {

                currentSurah =
                    index;

                counter.textContent =
                    `${index + 1} / 25`;

                alert(
                    `Открыта сура: ${surah}`
                );

            };

            list.appendChild(div);

        }
    );

}


function nextSurah() {

    if (
        currentSurah <
        surahs.length - 1
    ) {

        currentSurah++;

    }

    counter.textContent =
        `${currentSurah + 1} / 25`;

}


function previousSurah() {

    if (
        currentSurah > 0
    ) {

        currentSurah--;

    }

    counter.textContent =
        `${currentSurah + 1} / 25`;

}


showSurahList();
