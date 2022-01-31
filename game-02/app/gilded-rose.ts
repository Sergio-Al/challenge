export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

  updateQuality() {
    for (const currentItem of this.items) {
      const limitQuality = 50;

      const incrementQuality = (): void => {
        if (currentItem.quality < limitQuality) {
          currentItem.quality++;
        }
      };

      const decrementQuality = (): void => {
        if (currentItem.quality > 0) {
          currentItem.quality--;
        }
      };

      if (currentItem.name === "Sulfuras, Hand of Ragnaros") continue;

      if (
        currentItem.name !== "Aged Brie" &&
        currentItem.name !== "Backstage passes to a TAFKAL80ETC concert"
      ) {
        decrementQuality();
        if (currentItem.name === "Conjured") decrementQuality();
      } else {
        if (currentItem.quality < limitQuality) {
          currentItem.quality++;
          if (
            currentItem.name === "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (currentItem.sellIn < 11) incrementQuality();
            if (currentItem.sellIn < 6) incrementQuality();
          }
        }
      }

      currentItem.sellIn--;

      if (currentItem.sellIn < 0) {
        if (currentItem.name != "Aged Brie") {
          if (currentItem.name != "Backstage passes to a TAFKAL80ETC concert") {
            decrementQuality();
          } else {
            currentItem.quality = 0;
          }
        } else {
          incrementQuality();
        }
      }
    }

    return this.items;
  }
}

// Test Items
const firstItem = new Item("Backstage passes to a TAFKAL80ETC concert", 12, 14);
const secondItem = new Item("Sulfuras, Hand of Ragnaros", 12, 80);
const thirdItem = new Item("Aged Brie", 12, 14);
const fourthItem = new Item("Conjured", 12, 14);
const otherItem = new Item("Other awesome spell", 12, 14);
const business = new GildedRose([
  firstItem,
  secondItem,
  thirdItem,
  fourthItem,
  otherItem,
]);

// Run this code with `npx ts-node GildedRose.ts`
// Quit process with `control+C`
setInterval(() => console.log(business.updateQuality()), 2000);
