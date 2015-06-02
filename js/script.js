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
  $("#balance-display").text(formatMoney(account.balance));
  displayLedger(account);
  clearInputs();
};

var clearInputs = function() {
  $("input").val("");
}

var formatMoney = function(amount) {
  return "$" + parseFloat(amount).toFixed(2);
}

var displayLedger = function(account) {
  $("table#ledger td").parent().remove();
  account.ledger.forEach(function(transaction) {
    var row = "<tr>" +
                "<td>" + transaction.transactionType + "</td>" +
                "<td>" + formatMoney(transaction.amount) + "</td>" +
                "<td>" + formatMoney(transaction.newBalance) + "</td>" +
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

    $("#btn-add-account").click(function() {
      $(".overlay").show();
    });

    $("#cancel").click(function() {
      $(".overlay").hide();
    });

    $("form#add-account").submit(function(event) {
      event.preventDefault();

      var accountHolder = $("input#accountHolder").val();
      var initialDeposit = parseFloat($("input#initialDeposit").val());

      var newAccount = new BankAccount(accountHolder, initialDeposit);
      var accountId = accounts.push(newAccount) - 1;

      var optionHTML = "<option value='" + accountId + "'>" + newAccount.accountHolder + "</option>";
      $("select#login-accountHolder").append(optionHTML);
      $("select#login-accountHolder").val(accountId);
      $("#login-panel").show();

      refresh(newAccount);
      $("div#overlay").hide();
    });

    $("select#login-accountHolder").change(function () {
      var id = parseInt($("select#login-accountHolder").val());
      var account = accounts[id];
      refresh(account);
    });

    $("form#update-account").submit(function(event) {
      event.preventDefault();

      var depositAmount = parseFloat($("input#new-deposit").val());
      var withdrawalAmount = parseFloat($("input#new-withdrawal").val());

      var id = parseInt($("select#login-accountHolder").val());
      var account = accounts[id];

      if (depositAmount) { account.deposit(depositAmount); }
      if (withdrawalAmount) { account.withdraw(withdrawalAmount); }
      refresh(account);
    });
});
