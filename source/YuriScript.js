;(function(){
    /* CORE */
    class YuriCore{
        constructor(arg){
            this.self = this;
            this.core(...arguments);
        }
    }

    /* PROTO */
    {
        let proto   = YuriCore.prototype,
            _proto_ = YuriCore.__proto__;

        proto.self = this;

        proto.core = function(){
            let arg = arguments,
                cell = [];
            
            /* Проверяет все элементы по типу */
            for(let i = 0; i < arg.length; i++){
                let elem = arg[i];
                switch (typeof elem) {
                    /* Если элемент строка, тогда просто поиск по элементу */
                    case "string":
                        search(elem);
                        break;
                    /* Если элемент - обьект,  тогда происходит перебор массива, и поиск по элементам массива */
                    case "object":
                        for(let x = 0; x < elem.length; x++){
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
            function search(elem){
                let element = document.querySelectorAll(elem);
                for(let i = 0; i < element.length; i++){
                    cell.push(element[i]);
                }
            }
            this.cell = cell;
            return this;
        }

        proto.load = _proto_.load = f => window.onload = f;

        proto.log = function(){
            console.log(this.cell);
            return this;
        }

        /* Стилизация */
        proto.css = function(style){
            let elem        = this.cell,
                type        = typeof style,
                length      = elem.length,
                styleList   = "";

            switch (type) {
                case "object":
                    if(style[0] === undefined){
                        for(let key in style){
                            styleList += `${key}:${style[key]};`;
                        } 
                    } else {
                        for(let i = 0; i < style.length; i++){
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
            for(let i = 0; i < length; i++){
                elem[i].setAttribute("style", styleList)
            }
        }

        /* Backup */
        proto.backup = function(date){
            let backup;
            backup = this.backup.cell;
            this.backup.cell = this.cell;
            this.cell = backup;
            return this;
        }

        /* Фильтрация */
        proto.filter = function(){
            let self        = this,
                cell        = self.cell,
                arg         = arguments,
                elements    = [];

            for(let i = 0; i < arg.length; i++){
                filtration(arg[i])
            }
            function filtration(selector){
                let type = typeof selector;
                switch(type){
                    case "number":
                        if((cell[selector] !== undefined) || (cell[selector] !== null)){
                            elements.push(cell[selector]);
                        }
                        break;
                    case "string":
                        if((selector === "odd") || (selector === "even")){
                            if(selector === "even"){
                                /* Только четные элементы */
                                for(let i = 0; i < cell.length; i++)
                                    if(i % 2 !== 0) elements.push(cell[i]);
                            } else {
                                /* Только не четные элементы */
                                for(let i = 0; i < cell.length; i++)
                                    if(i % 2 === 0) elements.push(cell[i]);
                            }
                        } else {
                            let e_elem = document.querySelectorAll(selector);
                            for(let i = 0; i < e_elem.length; i++){
                                for(let x = 0; x < cell.length; x++){
                                    if(e_elem[i] === cell[x]) elements.push(cell[x]);
                                }
                            }
                        }
                        break;
                    case "object":
                        for(let i = 0; i < selector.length; i++) filtration(selector[i]);                
                        break;
                    default:
                        break;
                }
            }
            self.backup.cell = cell;
            self.cell = elements;
            return self;
        }

        proto.return = function(){
            return this.cell;
        }

        /* Click */
        proto.click = function(func){
            let cell = this.cell;
            for(let i = 0; i < cell.length; i++){
                cell[i].onclick = () => func(this); 
            }
            return this;
        }

        /* Работа с атрибутами */
        proto.herAttr = function(attrebutes){
            let cell    = this.cell,
                status  = false;
            for(let i = 0; i < cell.length; i++){
                status = cell[i].hasAttribute(attrebutes);
            }
            return status;
        }

        proto.attr = function(attr, modify){
            let cell    = this.cell,
                mod     = modify;
            
            for(let i = 0; i < cell.length; i++){
                if(modify[0] === "+") mod = cell[i].getAttribute(attr) + " " + modify.slice(1);
                cell[i].setAttribute(attr, mod);
            }
        }

        /* Events */
        proto.event = function(event, func){
            let self = this,
                cell = this.cell;  
            for(let i = 0; i < cell.length; i++){   
                cell[i].addEventListener(event, func);
            }
            return this;
        }

        proto.this = function(event){
            let self = this;
            self.cell = [];
            self.cell.push(event.target);
            return self;
        }

        proto.removeEvent = function(event, func){
            let self = this,
                cell = this.cell;
        
            for(let i = 0; i < cell.length; i++){    
                cell[i].removeEventListener(event, func);
            }
            return this;
        }

        /* DOM */
        proto.innerHTML = function(value){
            let cell = this.cell;
            for(let i = 0; i < cell.length; i++){
                if(value === undefined) cell[i].innerHTML = "";
                else cell[i].innerHTML = value;
            }
            return this;
        }

        proto.removeHTML = function(){
            let cell = this.cell;
            for(let i = 0; i < cell.length; i++){
                cell[i].innerHTML = "";
            }
            return this;
        }
    }

    /* SETUP */
    window.Yuri = function(){
        return new YuriCore(...arguments);
    }

})();