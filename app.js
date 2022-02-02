
/* Created by Manesh ram || Github - https://github.com/manesh1234  */

fetch("prize.json")
    .then(Response => Response.json())
    .then(data => {
        totalData = data;
        var length = totalData.prizes.length; //totalData.prizes -> Array
        var arr = [];
        for (var i = 0; i < length; i++) {
            var sub = totalData.prizes[i].laureates; // sub(laureates) are Arrays in totalData.prizes Array 
            for (var j = 0; j < sub.length; j++) {
                const a = { ...sub[j], year: totalData.prizes[i].year, category: totalData.prizes[i].category }
                arr.push(a);
            }
        }
        for (var i = 0; i < length; i++) {
            var sub = totalData.prizes[i].laureates; // sub(laureates) are Arrays in totalData.prizes Array
            var tr = document.createElement('tr');
            document.querySelector('.maintab').append(tr);
            for (var j = 0; j < 4; j++) {
                var td = document.createElement('td');
                td.setAttribute("id", "td_" + i + j);
                tr.append(td);
            }
            document.querySelector('#td_' + i + 0).innerHTML = i + 1;
            document.querySelector('#td_' + i + 1).innerHTML = arr[i].firstname + " " + arr[i].surname;
            document.querySelector('#td_' + i + 2).innerHTML = arr[i].year;
            document.querySelector('#td_' + i + 3).innerHTML = arr[i].category;
        }
    })

var checkNumValidation = (e) => {
    if (e.key >= '0' && e.key <= '9') return true;
    else return false;
}
var checkAlphaValidation = (e) => {
    if ((e.key >= 'a' && e.key < 'z') || (e.key >= 'A' && e.key <= 'Z')) return true;
    else return false;
}

var hideOthers = (q1) => {
    const sel = '.q' + q1 + '_block';
    for (var i = 1; i <= 4; i++) {
        var temp = '.q' + i + '_block';
        if (temp != sel) {
            var t = document.querySelector(temp).id;
            if (t != 'NoDis') {
                document.querySelector(temp).setAttribute('id', 'noDis');
            }
        }
    }
}
var fun = (r) => {
    document.querySelector('.maintab').removeAttribute('id');
    for (var i = 1; i <= 4; i++) {
        const sel = '.tab_' + i;
        document.querySelector(sel).setAttribute('id', 'noDis');
    }
    const sel = '.tab_' + r;
    var myTable = document.querySelector(sel);
    var rowCount = myTable.rows.length;
    for (var x = rowCount - 1; x > 0; x--) {
        myTable.deleteRow(x);
    }
}
var toChange = () => {
    var select = document.querySelector('#opt');
    if (select.selectedOptions[0].value != 'none') {
        const seVal = select.selectedOptions[0].value;
        if (seVal == "byName") {
            document.querySelector('.q1_block').removeAttribute('id');
            document.querySelector('.errBlock').setAttribute('id', 'noDis');
            fun(1);
            hideOthers(1);
        }
        else if (seVal == "byYear") {
            document.querySelector('.q2_block').removeAttribute('id');
            document.querySelector('.errBlock').setAttribute('id', 'noDis');
            fun(2);
            hideOthers(2);
        }
        else if (seVal == "byYearNCat") {
            document.querySelector('.q3_block').removeAttribute('id');
            document.querySelector('.errBlock').setAttribute('id', 'noDis');
            fun(3);
            hideOthers(3);
        }
        else {
            document.querySelector('.q4_block').removeAttribute('id');
            document.querySelector('.errBlock').setAttribute('id', 'noDis');
            fun(4);
            hideOthers(4);
        }
    }
}


var q_1 = () => {
    document.querySelector('.maintab').setAttribute('id', 'noDis');
    var totalData;
    var firstName = document.querySelector('#fname').value;
    setTimeout(() => {
        document.querySelector('#fname').value = "";
    }, 5000);
    firstName = firstName.toLowerCase();
    firstName = firstName.split(' ');
    firstName = firstName.join('');
    if (firstName == "") {
        document.querySelector('.errBlock').removeAttribute('id');
        return;
    }
    fetch("prize.json")
        .then(Response => Response.json())
        .then(data => {
            var tot = 0;
            totalData = data;
            var length = totalData.prizes.length; //totalData.prizes -> Array
            for (var i = 0; i < length; i++) {
                var sub = totalData.prizes[i].laureates; // sub(laureates) are Arrays in totalData.prizes Array 
                for (var j = 0; j < sub.length; j++) {
                    var fullName = totalData.prizes[i].laureates[j].firstname + totalData.prizes[i].laureates[j].surname;
                    fullName = fullName.toLowerCase();
                    fullName = fullName.split(' ');
                    fullName = fullName.join('');
                    if (fullName.includes(firstName)) {
                        tot++;
                        break;
                    }
                }
                if (tot) break;
            }
            if (!tot) {
                document.querySelector('.errBlock').removeAttribute('id');
                return;
            }
            if (tot) {
                document.querySelector('.tab_1').removeAttribute('id');
                var tr = document.createElement('tr');
                document.querySelector('.tab_1').append(tr);
                for (var k = 0; k < 4; k++) {
                    var td = document.createElement('td');
                    td.setAttribute("id", "ts_" + k);
                    tr.append(td);
                }
                document.querySelector('#ts_0').innerHTML = 1;
                document.querySelector('#ts_1').innerHTML = totalData.prizes[i].laureates[j].firstname + " " + totalData.prizes[i].laureates[j].surname;
                document.querySelector('#ts_2').innerHTML = totalData.prizes[i].year;
                document.querySelector('#ts_3').innerHTML = totalData.prizes[i].category;
            }
        })
}

var q_2 = () => {
    document.querySelector('.maintab').setAttribute('id', 'noDis');
    var totalData;
    var yearName = document.querySelector('#yname').value;
    yearName = parseInt(yearName);
    setTimeout(() => {
        document.querySelector('#yname').value = "";
    }, 5000);
    var tot = 0;
    fetch("prize.json")
        .then(Response => Response.json())
        .then(data => {
            totalData = data;
            var length = totalData.prizes.length; //totalData.prizes -> Array
            var arr = [];
            for (var i = 0; i < length; i++) {
                if (totalData.prizes[i].year == yearName) {
                    tot++;
                    var sub = totalData.prizes[i].laureates; // sub(laureates) are Arrays in totalData.prizes Array 
                    for (var j = 0; j < sub.length; j++) {
                        const a = { ...sub[j], year: totalData.prizes[i].year, category: totalData.prizes[i].category }
                        arr.push(a);
                    }
                }
            }
            if (!tot) {
                document.querySelector('.errBlock').removeAttribute('id');
                return;
            }
            document.querySelector(".tab_2").removeAttribute('id');
            for (var i = 0; i < arr.length; i++) {
                var tr = document.createElement('tr');
                document.querySelector('.tab_2').append(tr);
                for (var j = 0; j < 4; j++) {
                    var td = document.createElement('td');
                    td.setAttribute("id", "td__" + i + j);
                    tr.append(td);
                }
                document.querySelector('#td__' + i + 0).innerHTML = i + 1;
                document.querySelector('#td__' + i + 1).innerHTML = arr[i].firstname + " " + arr[i].surname;
                document.querySelector('#td__' + i + 2).innerHTML = arr[i].year;
                document.querySelector('#td__' + i + 3).innerHTML = arr[i].category;
            }

        })
}
var q_3 = () => {
    document.querySelector('.maintab').setAttribute('id', 'noDis');
    var totalData;
    var yearName = document.querySelector('#yname_1').value;
    yearName = parseInt(yearName);
    var category = document.querySelector('#cat').value;
    category = category.toLowerCase();
    setTimeout(() => {
        document.querySelector('#yname_1').value = "";
        document.querySelector('#cat').value = "";
    }, 5000);
    var tot = 0;
    fetch("prize.json")
        .then(Response => Response.json())
        .then(data => {
            totalData = data;
            var length = totalData.prizes.length; //totalData.prizes -> Array
            var arr = [];
            for (var i = 0; i < length; i++) {
                if (totalData.prizes[i].year == yearName && totalData.prizes[i].category.toLowerCase() == category) {
                    var sub = totalData.prizes[i].laureates; // sub(laureates) are Arrays in totalData.prizes Array 
                    tot++;
                    for (var j = 0; j < sub.length; j++) {
                        const a = { ...sub[j], year: totalData.prizes[i].year, category: totalData.prizes[i].category }
                        arr.push(a);
                    }
                }
            }
            if (!tot) {
                document.querySelector('.errBlock').removeAttribute('id');
                return;
            }
            document.querySelector(".tab_3").removeAttribute('id');
            for (var i = 0; i < arr.length; i++) {
                var tr = document.createElement('tr');
                document.querySelector('.tab_3').append(tr);
                for (var j = 0; j < 4; j++) {
                    var td = document.createElement('td');
                    td.setAttribute("id", "td___" + i + j);
                    tr.append(td);
                }
                document.querySelector('#td___' + i + 0).innerHTML = i + 1;
                document.querySelector('#td___' + i + 1).innerHTML = arr[i].firstname + " " + arr[i].surname;
                document.querySelector('#td___' + i + 2).innerHTML = arr[i].year;
                document.querySelector('#td___' + i + 3).innerHTML = arr[i].category;
            }

        })
}
var q_4 = () => {
    document.querySelector('.maintab').setAttribute('id', 'noDis');
    var totalData;
    fetch("prize.json")
        .then(Response => Response.json())
        .then(data => {
            totalData = data;
            var length = totalData.prizes.length; //totalData.prizes -> Array
            var arr = [];
            for (var i = 0; i < length; i++) {
                var sub = totalData.prizes[i].laureates; // sub(laureates) are Arrays in totalData.prizes Array 
                for (var j = 0; j < sub.length; j++) {
                    const a = { ...sub[j], year: totalData.prizes[i].year, category: totalData.prizes[i].category }
                    arr.push(a);
                }
            }
            arr.sort(function (a, b) {
                if (a.firstname < b.firstname) { return -1; }
                else if (a.firstname > b.firstname) { return 1; }
                return 0;
            })

            document.querySelector(".tab_4").removeAttribute('id');
            for (var i = 0; i < arr.length; i++) {
                var tr = document.createElement('tr');
                document.querySelector('.tab_4').append(tr);
                for (var j = 0; j < 4; j++) {
                    var td = document.createElement('td');
                    td.setAttribute("id", "td____" + i + j);
                    tr.append(td);
                }
                document.querySelector('#td____' + i + 0).innerHTML = i + 1;
                document.querySelector('#td____' + i + 1).innerHTML = arr[i].firstname + " " + arr[i].surname;
                document.querySelector('#td____' + i + 2).innerHTML = arr[i].year;
                document.querySelector('#td____' + i + 3).innerHTML = arr[i].category;
            }

        })
}