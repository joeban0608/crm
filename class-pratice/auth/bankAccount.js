// bankAccount.js

import { User } from "./user-1.js";

export class BankAccount extends User {
  #balance;

  constructor(name, age, initialBalance) {
    super(name, age); // 調用 User 的建構函式
    this.#balance = initialBalance;
  }

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      console.log(`存入 ${amount} 元，當前餘額：${this.#balance} 元`);
    } else {
      console.log("存款金額須大於 0！");
    }
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      console.log(`取出 ${amount} 元，剩餘餘額：${this.#balance} 元`);
    } else {
      console.log("餘額不足或金額無效！");
    }
  }

  getBalance() {
    return `帳戶餘額：${this.#balance} 元`;
  }
}
