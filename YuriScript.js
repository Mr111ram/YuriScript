"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;(function () {
    /* CORE */
    var YuriCore = function YuriCore(arg) {
        _classCallCheck(this, YuriCore);

        this.self = this;
        this.core.apply(this, arguments);
    };

    /* PROTO */


    {
        var proto = YuriCore.prototype,
            _proto_ = YuriCore.__proto__;

        proto.self = this;

        proto.core = function () {
            var arg = arguments,
                cell = [];

            /* Проверяет все элементы по типу */
            for (var i = 0; i < arg.length; i++) {
                var elem = arg[i];
                switch (typeof elem === "undefined" ? "undefined" : _typeof(elem)) {
                    /* Если элемент строка, тогда просто поиск по элементу */
                    case "string":
                        search(elem);
                        break;
                    /* Если элемент - обьект,  тогда происходит перебор массива, и поиск по элементам массива */
                    case "object":
                        for (var x = 0; x < elem.length; x++) {
                            search(elem[x]);
                        }
                        break;
                    /* Если элемент функция, она выполняется после загрузки страницы */
                    case "function":
                        this.load(elem);
                        break;
                    default:
                        break;
                }
            }

            /* Функция поиска */
            function search(elem) {
                var element = document.querySelectorAll(elem);
                for (var _i = 0; _i < element.length; _i++) {
                    cell.push(element[_i]);
                }
            }
            this.cell = cell;
            return this;
        };

        proto.load = _proto_.load = function (f) {
            return window.onload = f;
        };

        proto.log = function () {
            console.log(this.cell);
            return this;
        };

        /* Стилизация */
        proto.css = function (style) {
            var elem = this.cell,
                type = typeof style === "undefined" ? "undefined" : _typeof(style),
                length = elem.length,
                styleList = "";

            switch (type) {
                case "object":
                    if (style[0] === undefined) {
                        for (var key in style) {
                            styleList += key + ":" + style[key] + ";";
                        }
                    } else {
                        for (var i = 0; i < style.length; i++) {
                            styleList += style[i] + ";";
                        }
                    }
                    break;
                case "string":
                    styleList = style;
                    break;
                default:
                    break;
            }
            for (var _i2 = 0; _i2 < length; _i2++) {
                elem[_i2].setAttribute("style", styleList);
            }
        };

        /* Backup */
        proto.backup = function (date) {
            var backup = void 0;
            backup = this.backup.cell;
            this.backup.cell = this.cell;
            this.cell = backup;
            return this;
        };

        /* Фильтрация */
        proto.filter = function () {
            var self = this,
                cell = self.cell,
                arg = arguments,
                elements = [];

            for (var i = 0; i < arg.length; i++) {
                filtration(arg[i]);
            }
            function filtration(selector) {
                var type = typeof selector === "undefined" ? "undefined" : _typeof(selector);
                switch (type) {
                    case "number":
                        if (cell[selector] !== undefined || cell[selector] !== null) {
                            elements.push(cell[selector]);
                        }
                        break;
                    case "string":
                        if (selector === "odd" || selector === "even") {
                            if (selector === "even") {
                                /* Только четные элементы */
                                for (var _i3 = 0; _i3 < cell.length; _i3++) {
                                    if (_i3 % 2 !== 0) elements.push(cell[_i3]);
                                }
                            } else {
                                /* Только не четные элементы */
                                for (var _i4 = 0; _i4 < cell.length; _i4++) {
                                    if (_i4 % 2 === 0) elements.push(cell[_i4]);
                                }
                            }
                        } else {
                            var e_elem = document.querySelectorAll(selector);
                            for (var _i5 = 0; _i5 < e_elem.length; _i5++) {
                                for (var x = 0; x < cell.length; x++) {
                                    if (e_elem[_i5] === cell[x]) elements.push(cell[x]);
                                }
                            }
                        }
                        break;
                    case "object":
                        for (var _i6 = 0; _i6 < selector.length; _i6++) {
                            filtration(selector[_i6]);
                        }break;
                    default:
                        break;
                }
            }
            self.backup.cell = cell;
            self.cell = elements;
            return self;
        };

        proto.return = function () {
            return this.cell;
        };

        /* Click */
        proto.click = function (func) {
            var _this = this;

            var cell = this.cell;
            for (var i = 0; i < cell.length; i++) {
                cell[i].onclick = function () {
                    return func(_this);
                };
            }
            return this;
        };

        /* Работа с атрибутами */
        proto.herAttr = function (attrebutes) {
            var cell = this.cell,
                status = false;
            for (var i = 0; i < cell.length; i++) {
                status = cell[i].hasAttribute(attrebutes);
            }
            return status;
        };

        proto.attr = function (attr, modify) {
            var cell = this.cell,
                mod = modify;

            for (var i = 0; i < cell.length; i++) {
                if (modify[0] === "+") mod = cell[i].getAttribute(attr) + " " + modify.slice(1);
                cell[i].setAttribute(attr, mod);
            }
        };

        /* Events */
        proto.event = function (event, func) {
            var self = this,
                cell = this.cell;
            for (var i = 0; i < cell.length; i++) {
                cell[i].addEventListener(event, func);
            }
            return this;
        };

        proto.this = function (event) {
            var self = this;
            self.cell = [];
            self.cell.push(event.target);
            return self;
        };

        proto.removeEvent = function (event, func) {
            var self = this,
                cell = this.cell;

            for (var i = 0; i < cell.length; i++) {
                cell[i].removeEventListener(event, func);
            }
            return this;
        };

        /* DOM */
        proto.innerHTML = function (value) {
            var cell = this.cell;
            for (var i = 0; i < cell.length; i++) {
                if (value === undefined) cell[i].innerHTML = "";else cell[i].innerHTML = value;
            }
            return this;
        };

        proto.removeHTML = function () {
            var cell = this.cell;
            for (var i = 0; i < cell.length; i++) {
                cell[i].innerHTML = "";
            }
            return this;
        };
    }

    /* SETUP */
    window.Yuri = function () {
        return new (Function.prototype.bind.apply(YuriCore, [null].concat(Array.prototype.slice.call(arguments))))();
    };
})();