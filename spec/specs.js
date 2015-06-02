describe("BankAccount", function() {
  "use strict";
  it("has an account holder, a balance, and a ledger", function() {
    var testBankAccount = new BankAccount("Mr. Jones", 500);
    expect(testBankAccount.balance).to.equal(500);
    expect(testBankAccount.accountHolder).to.equal("Mr. Jones");
    var firstTransaction = {transactionType: "Deposit",
                                            amount: 500,
                                            newBalance: 500};
    expect(testBankAccount.ledger).to.eql([firstTransaction]);
  });

  describe("#deposit", function() {
    it("adds deposits to balance", function() {
      var testBankAccount = new BankAccount("Mr. Jones", 500);
      expect(testBankAccount.balance).to.equal(500);
      testBankAccount.deposit(50);
      expect(testBankAccount.balance).to.equal(550);
    });

    it("adds a deposit to the ledger", function() {
      var testBankAccount = new BankAccount("Mr. Jones", 500);
      testBankAccount.deposit(50);
      expect(testBankAccount.ledger[1].transactionType).to.equal("Deposit");
      expect(testBankAccount.ledger[1].amount).to.equal(50);
      expect(testBankAccount.ledger[1].newBalance).to.equal(550);
    });
  });

  describe("#withdraw", function() {
    it("subtracts withdrawals from balance", function() {
      var testBankAccount = new BankAccount("Mr. Jones", 500);
      expect(testBankAccount.balance).to.equal(500);
      testBankAccount.withdraw(50);
      expect(testBankAccount.balance).to.equal(450);
    });

    it("adds a withdrawal to the ledger", function() {
      var testBankAccount = new BankAccount("Mr. Jones", 500);
      testBankAccount.withdraw(50);
      expect(testBankAccount.ledger[1].transactionType).to.equal("Withdrawal");
      expect(testBankAccount.ledger[1].amount).to.equal(50);
      expect(testBankAccount.ledger[1].newBalance).to.equal(450);
    });
  });

});
