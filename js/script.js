// загрузка json файла_______________________________
function readDataFile(file, callback) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open("GET", file, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status == "200") {
            callback(xhr.responseText);
        }
    }
    xhr.send(null);
}

readDataFile("js/data.json", function (text) {
    var arr = JSON.parse(text);
    // console.log(arr);

    buildData(arr);
});
//____________________________________________________



function buildData(data) {
    var table = document.getElementById('myTable');
    var pagination = document.querySelector('#pagination');

    var notesOnPage = 10; // Количество строк на странице

    var countOfItems = Math.ceil(data.length / notesOnPage); // Переменная хранит число страниц

    var items = [];
    // Цикл рисует номера страниц
    for (var i = 1; i <= countOfItems; i++) {
        var li = document.createElement('li');
        li.innerHTML = i;
        pagination.appendChild(li);
        items.push(li);
    }

    showPage(items[0]);

    // Цикл выводит данные в таблицу
    for (var item of items) {
        item.addEventListener('click', function () {
            showPage(this);

        });
    }

    function showPage(item) {
        // Подсветка активной кнопки--
        var active = document.querySelector('#pagination li.active');
        if (active) {
            active.classList.remove('active');
        }
        //--
        item.classList.add('active');

        var pageNum = +item.innerHTML;

        var start = (pageNum - 1) * notesOnPage;
        var end = start + notesOnPage;

        var notes = data.slice(start, end)
        table.innerHTML = '';
        for (var i = 0; i < notes.length; i++) {
            // Описание выводится в две строки и в конце многоточие. СЫРОЙ ВАРИАНТ!!!
            var size = 120
            if (notes[i].about.length > size) {
                notes[i].about = notes[i].about.substring(0, size) + "...";
            }
            //______________________________________________________________________

            var row = `<tr class = "info">
                    <td class = "res">${notes[i].name.firstName}</td>
                    <td class = "res">${notes[i].name.lastName}</td>
                    <td class = "res edit">${notes[i].about}</td>
                    <td class = "res" style = "background: ${notes[i].eyeColor};"></td>
                </tr>`;
            table.innerHTML += row;

        }
    }

}

// Cортировка столбцов_________________________________________
var table = document.querySelector('.table_striped');
var colIndex = -1;

const sortTable = function (index, type, isSorted) { // ф-ия сортировки
    var tbody = table.querySelector('tbody');

    var compare = function (rowA, rowB) { // ф-я сравнения ячеек
        var rowDataA = rowA.cells[index].innerHTML;
        var rowDataB = rowB.cells[index].innerHTML;
        switch (type) {
            case 'firstName':
            case 'lastName':
            case 'about':
                if (rowDataA < rowDataB) return -1;
                else if (rowDataA > rowDataB) return 1;
                return 0;
                break;

        }
    }

    var rows = [].slice.call(tbody.rows); // создание массива

    rows.sort(compare); // на массиве с помощью полученной ф-ии происходит сортировка

    if (isSorted) rows.reverse();

    table.removeChild(tbody);

    for (let i = 0; i < rows.length; i++) {
        tbody.appendChild(rows[i]);
    }

    table.appendChild(tbody);
}

table.addEventListener('click', (e) => {
    var el = e.target;
    if (el.nodeName != 'TH') return; // произошёл ли клик на заголовке колонке с именем th

    var index = el.cellIndex; // сохраняем индекс колонки
    var type = el.getAttribute('data-type'); // переменная хранит информацию об элементе, на котором был клик

    sortTable(index, type, colIndex == index);
    colIndex = (colIndex == index) ? -1 : index;
    // console.log('click');
})
//_______________________________________________________________________






// редактирование информации

// var btn = document.querySelectorAll('button');

// var noneTable = function (index) {
//     console.log(index);
// }

// for (var i = 0; i < btn.length; i++) {
//     btn[i].addEventListener('click', (f) => {
//         var fl = f.target;
//         var index = fl.cellIndex;

//         noneTable(index);

//         console.log(fl);
//     });
// }


