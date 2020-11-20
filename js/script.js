window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
   
    class GetCities {
        constructor(input, defaultList, dropdownList, main, dropdownSelect,
            alldropDowns, btn, listAutocomplete, closeBtn, label){
            this.input = document.getElementById(input);
            this.defaultList = document.querySelector(defaultList);
            this.dropdownList = document.querySelectorAll(dropdownList);
            this.main = document.querySelector(main);
            this.dropdownSelect = document.querySelector(dropdownSelect);
            this.alldropDowns = document.querySelectorAll(alldropDowns);
            this.btn = document.querySelector(btn);
            this.listAutocomplete = document.querySelector(listAutocomplete);
            this.closeBtn = document.querySelector(closeBtn);
            this.label = document.querySelector(label);
        }

        // request to server (JSON data)
        getData(){
            return fetch('./db_cities.json');
        } 

        // update data
        rootList(func, data){
            this.getData()
            .then(response => {
                if (response.status !== 200){
                    throw new Error('Status is not 200');
                }
                return response.json();
            })
            .then((response) => {
                func(response, data);
            })
            .catch(error => console.log(error));
        }

        //Create dropdowns
        createList(data, list, content, country, listNumber=0){
            content.innerHTML = "";
            list.style.display = 'block';
            
            const countryItem = document.createElement('div');
            countryItem.classList.add('dropdown-lists__countryBlock');

                const fillContent = (createdEl, item)=> {
                    createdEl.insertAdjacentHTML('beforeend', `
                    <div class="dropdown-lists__total-line">
                    <div class="dropdown-lists__country">${item.country}</div>
                    <div class="dropdown-lists__count">${item.count}</div>
                    </div>
                `);

                item.cities.sort(function(a,b){
                    return b.count - a.count;
                });
                
                const cityList = (createdEl, elem) => {
                    createdEl.insertAdjacentHTML('beforeend', `
                        <div class="dropdown-lists__line">
                        <div class="dropdown-lists__city">${elem.name}</div>
                        <div class="dropdown-lists__count">${elem.count}</div>
                        </div>
                        `);
                };

                let count = 0;
                item.cities.forEach(element =>{
                    if(listNumber === 1){
                        if(count < 3){
                            cityList(createdEl, element);
                        }
                    } else if(listNumber === 2){
                        cityList(createdEl, element);
                    }
                    
                    count++;
                });
            };

            if(listNumber === 1) {

                data.RU.forEach(item => {
                    fillContent(countryItem, item);
                });

            } else if(listNumber === 2) {

                data.RU.forEach(item => {
                    if(item.country === country){
                        fillContent(countryItem, item);
                    }
                });

            }

            content.appendChild(countryItem);
            this.btn.style.display = '';
        }

        //Default List
        countryList(data){
            this.createList(data, this.defaultList, this.dropdownList[0], 'no', 1);
        }

        //Selected List
        cityList(data, country){
            this.createList(data, this.dropdownSelect, this.dropdownList[1], country, 2);
        }

        //Auto completed List (input)
        autoCompletedList(data, enteredText){
            this.dropdownList[2].innerHTML="";
            const countryItem = document.createElement('div');
            countryItem.classList.add('dropdown-lists__countryBlock');
            
            data.RU.forEach(item=>{
                item.cities.forEach(city => {
                    if(city.name.search(new RegExp("^"+enteredText, "i")) !== -1){
                        countryItem.insertAdjacentHTML('beforeend', `
                        <div class="dropdown-lists__line">
                        <div class="dropdown-lists__city">${city.name}</div>
                        <div class="dropdown-lists__count">${city.count}</div>
                        </div>
                        `);
                    }
                });
            });

           if(countryItem.childNodes.length === 0){
                countryItem.insertAdjacentHTML('beforeend', `
                <div class="dropdown-lists__line">
                <div class="dropdown-lists__city">Не найдено</div>
                </div>
                `);
           }

            this.dropdownList[2].appendChild(countryItem);
       
        }

        // Switcher for default list and completed list
        switchLists(e){
            const {target} = e;
            this.btn.classList.add('disabled_btn');

            const highlightCity = (target) => {
                document.querySelectorAll('.dropdown-lists__city').forEach(item => 
                item.classList.remove('dropdown-lists__city--ip'));

                if (target.matches('.dropdown-lists__city')){
                    target.classList.add('dropdown-lists__city--ip');
                }
            };
            highlightCity(target);

            const fillInput = (classList)=>{
                const country = target.matches(classList)?
                target.childNodes[1].textContent
                :target.textContent;

                this.input.value = country;
                this.label.style.display = "none";
                this.closeBtn.style.display = "block";

                return country;
            };

            if(target.matches('.main')){
                this.clearContent();
                this.input.value = "";
                this.label.style.display = "block";
            }

            if(target.closest('.dropdown-lists__total-line, .dropdown-lists__line')){
                fillInput('.dropdown-lists__total-line, .dropdown-lists__line');
            }

            if(target.closest('.dropdown-lists__total-line') && 
            target.closest('.dropdown-lists__list--default')){
                this.btn.style.display = 'none';
                const country = fillInput('.dropdown-lists__total-line');
                this.clearContent();
                this.rootList(this.cityList.bind(this), country);
            } 
            else if(target.closest('.dropdown-lists__total-line') && 
            target.closest('.dropdown-lists__list--select ')){
                this.clearContent();
                this.btn.style.display = 'none';
                this.rootList(this.countryList.bind(this));
            }

            if(target.closest('.dropdown-lists__line')){
                const city = fillInput('.dropdown-lists__line');
                const getLink = (data, city) => {
                    data.RU.forEach(item=>{
                        item.cities.forEach(el => {
                            if(el.name === city){
                                this.btn.setAttribute('href',el.link);
                                this.btn.classList.remove('disabled_btn');
                            }
                        });
                    });
                    

                };
                this.rootList(getLink.bind(this),city);
            
            }

        }

        // Clear all Dropdowns
        clearContent(){
            this.alldropDowns.forEach(item => item.style.display ="none");
        }

        // Search City
        searchCity(e){
            const {target} = e;
                const enteredText = target.value;
                this.clearContent();
                if(enteredText){
                    this.listAutocomplete.style.display = "block";
                }else{
                    this.listAutocomplete.style.display = "none";
                    this.defaultList.style.display = "block";
                }
                
                this.rootList(this.autoCompletedList.bind(this), enteredText);
        }

        // close button
        closeButton(){
            this.clearContent();
            this.closeBtn.style.display = "none";
            this.input.value = "";
            this.label.style.display = "";
        }

        //submit Button
        submitButton(event){
            const {target} = event;
                if(this.input.value === "" || target.closest('.disabled_btn')){
                    target.href="#";
                    event.preventDefault();
                }
                this.input.value = "";
        }

        // Watch events
        events(){
            this.input.addEventListener('click', () => {
                this.clearContent();
                this.rootList(this.countryList.bind(this));
            });

            this.main.addEventListener('click', this.switchLists.bind(this));

            this.input.addEventListener('input', this.searchCity.bind(this));

            this.closeBtn.addEventListener('click', this.closeButton.bind(this));

            this.btn.addEventListener('click', this.submitButton.bind(this));

        }

        // Additional CSS
        createStyles(){
            const style = document.createElement('style');
            style.innerHTML = `
                .disabled_btn{
                    cursor: not-allowed;
                    opacity: 0.7;
                    text-decoration: none;
                    background: grey;
                }
            `; 
            document.body.insertAdjacentElement('beforeend', style);
        }

        // init Project
        init(){
            this.createStyles();
            this.btn.classList.add('disabled_btn');
            this.clearContent();
            this.events();
        }
    }

    const getCities = new GetCities('select-cities', '.dropdown-lists__list--default',
    '.dropdown-lists__col', '.main', '.dropdown-lists__list--select', '.dropdown-lists__list',
    '.button', '.dropdown-lists__list--autocomplete', '.close-button', 'label');

    getCities.init();

});
