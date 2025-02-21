export class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`你好，我是 ${this.name}，今年 ${this.age} 歲！`);
  }
}

// 建立 User 物件
// const user1 = new User("小明", 25);
// user1.greet(); // 你好，我是 小明，今年 25 歲！
