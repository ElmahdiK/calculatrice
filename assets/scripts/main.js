/* 
  ---
  TITLE: Calculatrice
  AUTHOR: Elmahdi KORFED <elmahdi.korfed@gmail.com>
  DATE: 2022-09-27
  STATUT: not finished
  SOURCE: https://fr.shopping.rakuten.com/photo/1506086640_L.jpg
  --- 
  */
// const _nums = [...Array(10).keys()]; // 0-9
// const _ops = [`+`, `-`, `X`, `÷`];
// const _spe1 = [`.`, `x10`, `ANS`, `EXE`];
// const _spe2 = [`DEL`, `AC`];

const buttons = [
  "7",
  "8",
  "9",
  "DEL",
  "AC",
  "4",
  "5",
  "6",
  "X",
  "÷",
  "1",
  "2",
  "3",
  "+",
  "-",
  "0",
  ".",
  "x10",
  "ANS",
  "EXE",
];
let _resultMode = false;
let _on = false;
let _exe = "";
let _res = 0;
let _ANS = 0;
let _result = "";

window.onload = (_) => {
  _result = document.querySelector(`#result`);
  _result.onkeydown = (e) => false;

  let _html = "";
  let _className = "";
  let _supX = "";
  for (let i = 0; i < buttons.length; i++) {
    _className = buttons[i] === "DEL" || buttons[i] === "AC" ? "red" : "";
    _supX = buttons[i] === "x10" ? "<sup>x</sup>" : "";
    _html += `<button class="${_className}" onclick="_touch('${buttons[i]}')">${buttons[i]}${_supX}</button>`;
  }
  document.querySelector("#touches").innerHTML = _html;
};

const _touch = (_touch) => {
  if (_touch === "AC" && _on === false) {
    _on = true;
    _result.removeAttribute(`readonly`);
    _result.focus();
  } else if (_on === true) {
    if (_result.value === "ERR") _result.value = "";
    if (_touch === "AC") {
      _result.value = "";
      _result.focus();
    } else if (_touch === "EXE") {
      if (!_result.value) _result.focus();
      else {
        _exe = _result.value;
        _exe = _exe.replaceAll("x10", "*10**");
        _exe = _exe.replaceAll("X", "*");
        _exe = _exe.replaceAll("÷", "/");
        _exe = _exe.replaceAll("ANS", _ANS);

        try {
          _res = eval(_exe);
          // check division / 0 infinity
          if (isFinite(_res)) {
            _res = _res.toFixed(8);
            _res = parseFloat(_res.toString());
            _result.value = _ANS = _res;
          } else throw "error infinity";
        } catch (error) {
          //console.log(error);
          _result.value = `ERR`;
        }
      }
    } else if (_touch === "DEL") {
      if (_result.value.length == 0) _result.focus();
      else if (_result.value.length > 0) {
        _result.value = _result.value.slice(0, -1);
        if (_result.value.length == 0) _result.focus();
      }
    } else {
      _result.value += _touch;
      _result.focus();
    }
  }
};
