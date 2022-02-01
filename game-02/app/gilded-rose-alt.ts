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
  limitQuality: number;

  constructor(items = [] as Array<Item>, limitQuality = 50 as number) {
    this.items = items;
    this.limitQuality = limitQuality;
  }

  updateQuality() {
    for (const currentItem of this.items) {
      this.modifyQuantity(currentItem);
    }

    return this.items;
  }

  modifyQuantity(currentItem: Item) {
    if (
      currentItem.name !== "Aged Brie" &&
      currentItem.name !== "Backstage passes to a TAFKAL80ETC concert"
    ) {
      this.decrementQuality(currentItem);
      if (currentItem.name === "Conjured") this.decrementQuality(currentItem);
    } else {
      if (currentItem.quality < this.limitQuality) {
        currentItem.quality++;
        if (currentItem.name === "Backstage passes to a TAFKAL80ETC concert") {
          if (currentItem.sellIn < 11) this.incrementQuality(currentItem);
          if (currentItem.sellIn < 6) this.incrementQuality(currentItem);
        }
      }
    }

    currentItem.sellIn--;

    if (currentItem.sellIn < 0) {
      if (currentItem.name != "Aged Brie") {
        if (currentItem.name != "Backstage passes to a TAFKAL80ETC concert") {
          this.decrementQuality(currentItem);
        } else {
          currentItem.quality = 0;
        }
      } else {
        this.incrementQuality(currentItem);
      }
    }
  }

  incrementQuality(current: Item, increment = 1 as number) {
    if (current.quality < this.limitQuality) {
      current.quality += increment;
    }
  }

  decrementQuality(current: Item, decrement = 1 as number) {
    if (current.quality > 0) {
      current.quality -= decrement;
    }
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
