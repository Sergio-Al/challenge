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
    return this.items.map((item) => {
      const itemType = classifyItem(item);

      if (itemType.isSulfuras) return item;

      item.sellIn--;

      if (itemType.isBackstagePasses) {
        this.modifyBackstageQuality(item);
      } else if (itemType.isAgedBrie) {
        this.modifyAgedQuality(item);
      } else if (itemType.isCommon) {
        this.modifyCommonQuality(item);
      }

      return item;
    });
  }

  modifyCommonQuality(commonItem: Item) {
    const areSellDatePassed = commonItem.sellIn < 0;
    if (areSellDatePassed) {
      this.decrementQuality(commonItem, 2);
      return;
    }
    this.decrementQuality(commonItem);
  }

  modifyBackstageQuality(rareItem: Item) {
    const tenDaysOrLessToSell = rareItem.sellIn < 11;
    const fiveDaysOrLessToSell = rareItem.sellIn < 6;
    const areSellDatePassed = rareItem.sellIn < 0;

    if (areSellDatePassed) {
      rareItem.quality = 0;
      return;
    }

    if (fiveDaysOrLessToSell) {
      this.incrementQuality(rareItem, 3);
      return;
    }

    if (tenDaysOrLessToSell) {
      this.incrementQuality(rareItem, 2);
      return;
    }

    this.incrementQuality(rareItem);
  }

  modifyAgedQuality(rareItem: Item) {
    const areSellDatePassed = rareItem.sellIn < 0;
    if (areSellDatePassed) {
      this.incrementQuality(rareItem, 2);
      return;
    }
    this.incrementQuality(rareItem);
  }

  modifyQuantity(currentItem: Item) {
    const itemType = classifyItem(currentItem);
    if (itemType.isSulfuras) return;
    if (!itemType.isAgedBrie && !itemType.isBackstagePasses) {
      this.decrementQuality(currentItem);
      if (currentItem.name === "Conjured") this.decrementQuality(currentItem);
    } else {
      if (currentItem.quality < this.limitQuality) {
        currentItem.quality++;
        if (itemType.isBackstagePasses) {
          if (currentItem.sellIn < 11) this.incrementQuality(currentItem);
          if (currentItem.sellIn < 6) this.incrementQuality(currentItem);
        }
      }
    }

    currentItem.sellIn--;

    if (currentItem.sellIn < 0) {
      if (!itemType.isAgedBrie) {
        if (!itemType.isBackstagePasses) {
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
      const newQuality = current.quality + increment;
      current.quality =
        newQuality > this.limitQuality ? this.limitQuality : newQuality;
    }
  }

  decrementQuality(current: Item, decrement = 1 as number) {
    if (current.quality > 0) {
      const newQuality = current.quality - decrement;
      current.quality = newQuality < 0 ? 0 : newQuality;
    }
  }
}

type ItemTypes = {
  isCommon: boolean;
  isAgedBrie: boolean;
  isBackstagePasses: boolean;
  isSulfuras: boolean;
};

export function classifyItem(item: Item): ItemTypes {
  return {
    isAgedBrie: item.name === "Aged Brie",
    isSulfuras: item.name === "Sulfuras, Hand of Ragnaros",
    isBackstagePasses:
      item.name === "Backstage passes to a TAFKAL80ETC concert",
    isCommon:
      item.name !== "Aged Brie" &&
      item.name !== "Sulfuras, Hand of Ragnaros" &&
      item.name !== "Backstage passes to a TAFKAL80ETC concert",
  };
}


