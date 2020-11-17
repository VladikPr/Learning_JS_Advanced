window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const converter = document.getElementById('converter');
    const select = document.querySelector('.currency');
    const rub = document.getElementById('homeCurrency');
    const valuta = document.getElementById('valuta');

    const toRUB = (currency) => {
        const valuta = document.getElementById('valuta'),
            rub = document.getElementById('rub');

        if(select.value === 'usd') {
            rub.value = (+valuta.value * currency.usd).toFixed(4);
        } else {
            rub.value = (+valuta.value * currency.eur).toFixed(4);
        }

        if(valuta.value === ''){
            rub.value = "";
        }
        
    };
    
    const toValuta = (currency) => {
        const homeCurrency = document.getElementById('homeCurrency'),
            abroadCurrency = document.getElementById('abroadCurrency');

        if(select.value === 'usd') {
            abroadCurrency.value = (+homeCurrency.value / currency.usd).toFixed(4);
        } else {
            abroadCurrency.value = (+homeCurrency.value / currency.eur).toFixed(4);
        }
        if(homeCurrency.value === ''){
            abroadCurrency.value = "";
        }

    };

    const getCurse = () => {
        let curs;

        const getData = () => {
            return fetch('https://api.exchangeratesapi.io/latest', {
                mode: 'cors'
            });
        };

        getData()
            .then((response)=>{
                if(response.status !== 200){
                    throw new Error('status is not 200');
                }
                return response.json();
            }).then((response) => {
                const map = new Map();

                for (let key in response.rates){
                    if(key === 'RUB' || key === 'USD'){
                        map.set(key, response.rates[key]);
                    }
                }
                
                const curs = {
                    eur: +map.get('RUB'), 
                    usd: +map.get('RUB')*(1/map.get('USD'))
                };
                toRUB(curs);
                toValuta(curs);
            });

    };

    const validate = () => {
        const currency = [rub,valuta];
        currency.forEach((element) => {
            element.addEventListener('input', () => {
                element.value = element.value.replace(/[^0-9]/gi,'');
            });
        });
    };
    validate();

    select.addEventListener('change', (e) =>{
        e.preventDefault();
        if(select.value === 'usd'){
            document.getElementById('label1').textContent = '(USD)';
            document.getElementById('label2').textContent= '(USD)';
        } else{
            document.getElementById('label1').textContent = '(EUR)';
            document.getElementById('label2').textContent = '(EUR)';
        }
        document.querySelectorAll('input').forEach(item => item.value = "");
    });

    converter.addEventListener('submit', (e) => {
        e.preventDefault();
        getCurse();        
    });

});
