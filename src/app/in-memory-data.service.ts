import { Hero } from './hero';

export class InMemoryDataService {
  createDb() {
    const heroes: Array<Hero> = [
      { id: 1, name: "Cheetara", filePath: "assets/images/1.jpg" },
      { id: 2, name: "Lion-O", filePath: "assets/images/2.jpg" },
      { id: 3, name: "Panthro", filePath: "assets/images/3.jpg" },
      { id: 4, name: "Tygra", filePath: "assets/images/4.jpg" },
      { id: 5, name: "Snarf", filePath: "assets/images/5.jpg" },
      { id: 6, name: "Wilykit", filePath: "assets/images/6.jpg" },
      { id: 7, name: "Wilykat", filePath: "assets/images/7.jpg" },
    ];
    return { heroes };
  }
}
