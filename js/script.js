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
  if (amount >= 0) {
    return "$" + parseFloat(amount).toFixed(2);
  } else {
    return "($" + parseFloat(Math.abs(amount)).toFixed(2) + ")";
  }
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

$(function() {

    var accounts = [];

    $("#add-account").click(function() {
      $("ul.account-list li").removeClass("active");
      $(this).parent().addClass("active");
      $("#account-info").hide();
      $(".overlay").show();
    });

    $("#cancel").click(function() {
      $(".overlay").hide();
    });

    $("#remove-warning").click(function() {
      $("#warning").hide();
    });

    $("form#add-account").submit(function(event) {
      event.preventDefault();

      var accountHolder = $("input#accountHolder").val();
      var initialDeposit = parseFloat($("input#initialDeposit").val());

      var newAccount = new BankAccount(accountHolder, initialDeposit);
      var accountId = accounts.push(newAccount) - 1;

      var tabHTML = "<li role='presentation' class='account'>" +
                      "<a id='" + accountId + "' class='clickable' data-target='#home' data-toggle='tab'>" +
                      accountHolder + "</a>" +
                    "</li>";
      $("ul.account-list").append(tabHTML);

      $("#" + accountId).click(function() {
        refresh(newAccount);
        $("ul.account-list li").removeClass("active");
        $(this).parent().addClass("active");
        $("#account-info").show();
      });

      $("div#overlay").hide();
      clearInputs();
    });


    $("form#update-account").submit(function(event) {
      event.preventDefault();

      var depositAmount = parseFloat($("input#new-deposit").val());
      var withdrawalAmount = parseFloat($("input#new-withdrawal").val());

      var id = parseInt($("ul.account-list li.active a").attr("id"));
      var account = accounts[id];
      var previousBalance = account.balance;

      if (depositAmount) { account.deposit(depositAmount); }
      if (withdrawalAmount) { account.withdraw(withdrawalAmount); }

      refresh(account);

      if (account.balance < 0) {
        $("#warning").show();
      } else if (previousBalance < 0) {
        $("#warning").hide();
      }

    });
});
