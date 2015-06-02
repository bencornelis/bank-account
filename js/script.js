var accounts = [];

//raw js
function BankAccount(name, deposit) {
  "use strict";
  this.balance = deposit;
  this.accountHolder = name;
};

BankAccount.prototype.deposit = function(amount) {
  this.balance += amount;
};

BankAccount.prototype.withdraw = function(amount) {
  this.balance -= amount;
};

var refreshBalance = function(account) {
  $("#balance-display").text("$" + account.balance)
};

//jQuery
$( document ).ready(function() {
  "use strict";
    console.log( "jQuery Ready" );

    $("#jqtest").text("jQuery Ready");

    $("form#add-account").submit(function(event) {
      event.preventDefault();

      var accountHolder = $("input#accountHolder").val();
      var initialDeposit = parseInt($("input#initialDeposit").val());

      var newAccount = new BankAccount(accountHolder, initialDeposit);
      accounts.push(newAccount);

      refreshBalance(newAccount);
    });
});
