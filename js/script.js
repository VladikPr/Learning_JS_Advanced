'use strict';
// GEt all required elements
const loginForm = document.querySelector('.login-form'),
      loginInput = document.querySelector('.login-input'),
      pswLogin = document.querySelector('.psw-login'),
      signUp = document.querySelector('.sign-up'),
      wrongInput = document.querySelector('.wrong-input'),
      loginBtn = document.querySelector('.login__btn'),
      account = document.querySelector('.account'),
      accountName = document.querySelector('.account-name'),
      deleteAccount = document.querySelector('.delete-account'),
      accountLogout = document.querySelector('.account-logout'),
      accountInfo = document.querySelector('.account-info'),
      warningWindow = document.querySelector('.warning-window'),
      yesBtn = document.querySelector('.yes-button'),
      noBtn = document.querySelector('.no-button'),
      registrationForm = document.querySelector('.registration-form'),
      registrationName = document.querySelector('.registration-name'),
      registrationLogin = document.querySelector('.registration-login'),
      registrationPsw = document.querySelector('.registration-psw'),
      registrationBtn = document.querySelector('.registration__btn'),
      signIn = document.querySelector('.sign-in'),
      loginAll = document.querySelectorAll('input[placeholder="Login"]'),
      pswAll = document.querySelectorAll('input[placeholder="Password"]'),
      warningMessage = document.querySelector('.warning-message');


      
   


loginForm.addEventListener('submit', function(event){
    event.preventDefault();
    formValidation(loginInput, pswLogin, wrongInput, loginBtn);
    logInAccount();
});

signUp.addEventListener('click', function(event){
    event.preventDefault();
    loginForm.classList.add('deactivate');
    registrationForm.classList.remove('deactivate');
    loginInput.value = "";
    pswLogin.value = "";

});

signIn.addEventListener('click', function(event){
    event.preventDefault();
    registrationForm.classList.add('deactivate');
    loginForm.classList.remove('deactivate');
});

function formValidation(login,psw,message,btn){
    if(login.value.trim() !== "" && psw.value.trim() !==""){
        message.classList.add('deactivate');
    } else{
        message.classList.remove('deactivate');
    }
    btn.blur();
}

function logInAccount(){
    let getData = JSON.parse(localStorage.getItem('accounts')) || [];
    let user = getData.find(item => item.login === loginInput.value);
    let userIndex = getData.findIndex(index => index.login === loginInput.value);

    if (user !== undefined){
        loginForm.classList.add('deactivate');
        loginInput.value = "";
        pswLogin.value = "";
        account.classList.remove('deactivate');
        inAccount(user, userIndex);
    } else{
        wrongInput.classList.remove('deactivate');
        loginInput.value = "";
        pswLogin.value = "";
        setTimeout(()=>{
            wrongInput.classList.add('deactivate');
        }, 1500)
    };

}

function inAccount(unit, index){
    accountInfo.textContent = `Имя: ${unit.firstname}, фамилия ${unit.lastname}, зарегистрирован: ${unit.regDat}`;
    accountName.textContent = unit.firstname;

    accountLogout.addEventListener('click', function(){
        account.classList.add('deactivate');
        loginForm.classList.remove('deactivate');
    });

    deleteAccount.addEventListener('click', function(){
        warningWindow.classList.remove('deactivate');
    });

    yesBtn.addEventListener('click', function(){
        let getData = JSON.parse(localStorage.getItem('accounts')) || [];
        getData.splice(index,1);
        localStorage.setItem('accounts', JSON.stringify(getData));
        warningWindow.classList.add('deactivate');
        account.classList.add('deactivate');
        loginForm.classList.remove('deactivate');
    });

    noBtn.addEventListener('click', function(){
        warningWindow.classList.add('deactivate');
    });
}

function createNewAccount(){
    let userName = registrationName.value.split(" ");
    const newAccount = {
        firstname: userName[0],
        lastname: userName[1],
        login: registrationLogin.value,
        password: registrationPsw.value,
        regDat: new Date().toLocaleString('ru', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        })
    }
    let getData = JSON.parse(localStorage.getItem('accounts')) || [];
    getData.push(newAccount);
    localStorage.setItem('accounts',JSON.stringify(getData));
}


registrationBtn.addEventListener('click', function(event){
    event.preventDefault();
    if(registrationLogin.value.trim() !== "" && registrationPsw.value.trim() !=="" && registrationName.value.trim() !== ""){
        warningMessage.classList.add('deactivate');
        createNewAccount();
    } else{
        warningMessage.classList.remove('deactivate');
    }
    
    registrationLogin.value = "";
    registrationPsw.value = "";
    registrationName.value = "",
    registrationForm.classList.add('deactivate');
    loginForm.classList.remove('deactivate');
});


pswAll.forEach(function(item){
    item.addEventListener('input', function(event){
        let regexp = /[\s]/.exec(event.target.value);
        event.target.value = event.target.value.replace(regexp, "");
    });
})

loginAll.forEach(function(item){
    item.addEventListener('input', function(event){
        let regexp = /[\s]/.exec(event.target.value);
        event.target.value = event.target.value.replace(regexp, "");
    });
})



registrationName.addEventListener('input',function(event){
    let regexp = /[.,-:;+]/.exec(event.target.value);
    event.target.value = event.target.value.replace(regexp, "");

    if (registrationName.value.split(" ").length > 2){
         let fullName = registrationName.value;
         registrationName.value = fullName.split(" ")[0] + " " + fullName.split(" ")[1];
    }
        
});


