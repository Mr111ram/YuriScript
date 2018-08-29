# Пользовательский гайд YiriScript
## 1. Работа с элементами


#### В YuriScript для поиска элемента в дом используется такой синтаксес.
```javascript 
Yuri("div"); //Работает аналогично $ из jQuery.
``` 
#### Для упрощение дебагинга кода в YuriScript есть функция `log()`;
```javascript 
Yuri("div").log(); //Функция log() выведет в консоли найденные элементы.
``` 
#### YuriScript поддерживает разнообразные способы работы с селекторами.
```javascript 
Yuri("#block-1", "#block-4"); // Через запятую
Yuri(["#block-1", "#block-4"]); // Массивом
Yuri(["#block-1", "#block-4"], "#block-2"); // И даже так
```
#### В YuriScript есть возможность фильтровать элементы.
```javascript 
Yuri(".block")
    .log() // Все элементы с классов block
    .filter(1, 2) // Принимает несколько значений через запятую или массивом
    .log(); // 1 и 2 элемент с классом block
    
Yuri(".block")
        .log() // Все элементы с классов block
        .filter("#block-2", "#block-1") // Принимает несколько значений через запятую или массивом
        .log(); // Только элементы с классом block и id block-2 и block-1
        
Yuri(".block")
        .log() // Все элементы с классов block
        .filter("odd") // Принимает несколько значений через запятую или массивом
        .log(); // Только не четные элементы c классом block

Yuri(".block")
        .log() // Все элементы с классов block
        .filter("even") // Принимает несколько значений через запятую или массивом
        .log(); // Только четные элементы c классом block
        
Yuri(".block")
        .log() // Все элементы с классов block
        .filter("#block-2", "#block-1") // Принимает несколько значений через запятую или массивом
        .log() // Только элементы с классом block и id block-2 и block-1
        .backup() // Возвращяет значение до filter();
        .log(); // Всеэ элементы с классом block
        
``` 
#### Если вы хотите работать с выхлопами YuriScript с помощью ванильных функция вам поможет функция `return();`
```javascript
    let elem = Yuri("#block-1").return(); // Возвращяет массив с найденными элементами, даже есди в найден всего один элемент
    elem[0].style.backgroundColor = "crimson";
```
#### Работа с атрибутами.
```javascript
Yuri(".block").herAttr("class") // Ищет атребут, и возвращяет true или false в зависимости  от результата.

Yuri("#block-1").attr("class", "head"); // Заменяет значение атрибута, первый аргумент название атребута, второй его значение

Yuri("#block-2").attr("class", "+head"); //Если стоит + первым символом, то он сохранит предыдущее значение атрибута, и добавит новый
```
#### Работа с HTML.
```javascript
let div = "<input type='text'>"
    Yuri(".block")
        .innerHTML(div) // Вставляет узел в DOM
        .filter("even")
        .innerHTML(); // Если вызвать с пустыми скобками, просто удалит узел DOM

let div = "<input type='text'>"
    Yuri(".block")
        .innerHTML(div) 
        .filter("even")
        .removeHTML(); // Аналог .innerHTML();
```

## 2. Стилизация

#### Для работы со стилями в YuriScript есть свойство `css();`
```javascript
// Функция css поддерживает различные варианты рабботы со стилями.
Yuri("#block-1").css({
        "background-color": "crimson",
        "border-radius": "25px"
}); // В виде обьекта

Yuri("#block-1").css([
        "background-color: crimson",
        "border-radius: 25px"
]); // В виде массива

Yuri("#block-1").css("background-color: crimson;border-radius: 25px;"); // И в строку
```

## 3. События
```javascript
Yuri.load(function(){
    document.write("Hello World!");
}); // Выполняет функцию после загрузки странницы

Yuri(function(){
    document.write("Hello World!");
}); //Более краткий варриант функции load

Yuri("#block-2").click(function(cell){ //Вещает событие клик на элемент. В качестве 1 аргумента в фунцию подается выхлоп фукнции, с которым в дальнейшем можно взаимодействовать с помощью функцию YuriScript.
    console.log(cell);
    cell.css([
        "background-color: crimson",
    ]);
});

function helloworld(){
    console.log("hello world");
}
Yuri(".block")
    .event("click", helloworld); // Создает событие 
Yuri("#block-1", "#block-6")
    .removeEvent("click", helloworld); // Удаляет событие
```
