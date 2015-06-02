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
  clearInputs();
};

var clearInputs = function() {
  $("input").val("");
}

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
      var accountId = accounts.push(newAccount) - 1;

      var optionHTML = "<option value='" + accountId + "'>" + newAccount.accountHolder + "</option>";
      $("select#login-accountHolder").append(optionHTML);
      $("select#login-accountHolder").val(accountId);
      var select = $("select#login-accountHolder")

      refreshBalance(newAccount);
      $("#login-panel").show();
    });

    $("select#login-accountHolder").change(function () {
      var id = parseInt($("select#login-accountHolder").val());
      var account = accounts[id];
      refreshBalance(account);
    });

    $("form#update-account").submit(function(event) {
      event.preventDefault();

      var depositAmount = parseInt($("input#new-deposit").val());
      var withdrawalAmount = parseInt($("input#new-withdrawal").val());

      var id = parseInt($("select#login-accountHolder").val());
      var account = accounts[id];

      if (depositAmount) { account.deposit(depositAmount); }
      if (withdrawalAmount) { account.withdraw(withdrawalAmount); }
      refreshBalance(account);
    });
});
