import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Hero } from "./hero";
import { HeroService } from "./hero.service";

@Component({
  selector: "my-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  addingHero = false;
  error: any;
  showNgFor = false;

  constructor(private router: Router, private heroService: HeroService) {}

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(
      (heroes) => (this.heroes = heroes),
      (error) => (this.error = error)
    );
  }

  addHero({ sender, dataItem }): void {
    dataItem = {
        id: this.heroes.length + 1,
        name: undefined
    };
    sender.addRow(dataItem);
    // this.addingHero = true;
    // this.selectedHero = null;
  }

  removeHero(sender): void {
    this.heroes.splice(sender.rowIndex, 1);
  }

  saveHero({ sender, dataItem, rowIndex }) {
      if (!dataItem.id) {
          this.heroes.push({
            name: dataItem.name,
            id: this.heroes.length + 1,
          } as Hero);
        }
        sender.closeRow(rowIndex);
  }

  editHero({ sender, rowIndex, dataItem }) {
    sender.editRow(rowIndex);
  }
  close(savedHero: Hero): void {
    this.addingHero = false;
    if (savedHero) {
      this.getHeroes();
    }
  }

  deleteHero(hero: Hero, event: any): void {
    event.stopPropagation();
    this.heroService.delete(hero).subscribe(
      (res) => {
        this.heroes = this.heroes.filter((h) => h !== hero);
        if (this.selectedHero === hero) {
          this.selectedHero = null;
        }
      },
      (error) => (this.error = error)
    );
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(event: any): void {
    this.selectedHero = event.dataItem;
    this.addingHero = false;
  }

  gotoDetail(): void {
    this.router.navigate(["/detail", this.selectedHero.id]);
  }
}
