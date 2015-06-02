var accounts = [];

//raw js
function BankAccount(name, initialDeposit) {
  "use strict";
  this.balance = 0;
  this.accountHolder = name;
  this.ledger = [];
  this.deposit(initialDeposit);
};

BankAccount.prototype.deposit = function(amount) {
  this.balance += amount;
  var row = {transactionType: "Deposit", amount: amount, newBalance: this.balance};
  this.ledger.push(row);
};

BankAccount.prototype.withdraw = function(amount) {
  this.balance -= amount;
  var row = {transactionType: "Withdrawal", amount: amount, newBalance: this.balance};
  this.ledger.push(row);
};

var refresh = function(account) {
  $("#balance-display").text("$" + account.balance)
  displayLedger(account);
  clearInputs();
};

var clearInputs = function() {
  $("input").val("");
}

var displayLedger = function(account) {
  $("table#ledger td").parent().remove();
  account.ledger.forEach(function(transaction) {
    var row = "<tr>" +
                "<td>" + transaction.transactionType + "</td>" +
                "<td>" + transaction.amount + "</td>" +
                "<td>" + transaction.newBalance + "</td>" +
              "</tr>"
    $("table#ledger").append(row);
    var lastRow = $("tr").last();
    if (transaction.transactionType === "Deposit") {
      lastRow.addClass("success");
    } else {
      lastRow.addClass("danger");
    }
  });
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

      refresh(newAccount);
      $("#login-panel").show();
    });

    $("select#login-accountHolder").change(function () {
      var id = parseInt($("select#login-accountHolder").val());
      var account = accounts[id];
      refresh(account);
    });

    $("form#update-account").submit(function(event) {
      event.preventDefault();

      var depositAmount = parseInt($("input#new-deposit").val());
      var withdrawalAmount = parseInt($("input#new-withdrawal").val());

      var id = parseInt($("select#login-accountHolder").val());
      var account = accounts[id];

      if (depositAmount) { account.deposit(depositAmount); }
      if (withdrawalAmount) { account.withdraw(withdrawalAmount); }
      refresh(account);
    });
});
