describe("BankAccount", function() {
  "use strict";
  it("has an account holder and a balance", function() {
    var testBankAccount = new BankAccount("Mr. Jones", 500);
    expect(testBankAccount.balance).to.equal(500);
    expect(testBankAccount.accountHolder).to.equal("Mr. Jones");
  });

  it("adds deposits to balance", function() {
    var testBankAccount = new BankAccount("Mr. Jones", 500);
    expect(testBankAccount.balance).to.equal(500);
    testBankAccount.deposit(50);
    expect(testBankAccount.balance).to.equal(550);
  });

  it("subtracts withdrawals from balance", function() {
    var testBankAccount = new BankAccount("Mr. Jones", 500);
    expect(testBankAccount.balance).to.equal(500);
    testBankAccount.withdraw(50);
    expect(testBankAccount.balance).to.equal(450);
  });

});
