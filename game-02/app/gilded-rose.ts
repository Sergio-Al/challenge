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

      if (itemType.isConjured) {
        modifyConjuredItem(item);
        return item;
      }

      if (itemType.isBackstagePasses) {
        modifyBackstageQuality(item);
        return item;
      }

      if (itemType.isAgedBrie) {
        modifyAgedQuality(item);
        return item;
      }

      if (itemType.isCommon) {
        modifyCommonQuality(item);
        return item;
      }
    });
  }
}

type ItemTypes = {
  isCommon: boolean;
  isAgedBrie: boolean;
  isBackstagePasses: boolean;
  isConjured: boolean;
  isSulfuras: boolean;
};

export function classifyItem(item: Item): ItemTypes {
  return {
    isAgedBrie: item.name === "Aged Brie",
    isSulfuras: item.name === "Sulfuras, Hand of Ragnaros",
    isBackstagePasses:
      item.name === "Backstage passes to a TAFKAL80ETC concert",
    isConjured: item.name === "Conjured",
    isCommon:
      item.name !== "Aged Brie" &&
      item.name !== "Sulfuras, Hand of Ragnaros" &&
      item.name !== "Conjured" &&
      item.name !== "Backstage passes to a TAFKAL80ETC concert",
  };
}

export function modifyCommonQuality(commonItem: Item) {
  const areSellDatePassed = commonItem.sellIn < 0;
  if (areSellDatePassed) {
    decrementQuality(commonItem, 2);
    return;
  }
  decrementQuality(commonItem);
}

export function modifyConjuredItem(conjuredItem: Item) {
  const areSellDatePassed = conjuredItem.sellIn < 0;
  if (areSellDatePassed) {
    decrementQuality(conjuredItem, 4);
    return;
  }
  decrementQuality(conjuredItem, 2);
}

export function modifyBackstageQuality(rareItem: Item) {
  const tenDaysOrLessToSell = rareItem.sellIn < 11;
  const fiveDaysOrLessToSell = rareItem.sellIn < 6;
  const areSellDatePassed = rareItem.sellIn < 0;

  if (areSellDatePassed) {
    rareItem.quality = 0;
    return;
  }

  if (fiveDaysOrLessToSell) {
    incrementQuality(rareItem, 3);
    return;
  }

  if (tenDaysOrLessToSell) {
    incrementQuality(rareItem, 2);
    return;
  }

  incrementQuality(rareItem);
}

export function modifyAgedQuality(rareItem: Item) {
  const areSellDatePassed = rareItem.sellIn < 0;
  if (areSellDatePassed) {
    incrementQuality(rareItem, 2);
    return;
  }
  incrementQuality(rareItem);
}

export function incrementQuality(
  current: Item,
  increment = 1 as number,
  limitQuality = 50 as number
) {
  if (current.quality < limitQuality) {
    const newQuality = current.quality + increment;
    current.quality = newQuality > limitQuality ? limitQuality : newQuality;
  }
}

export function decrementQuality(current: Item, decrement = 1 as number) {
  if (current.quality > 0) {
    const newQuality = current.quality - decrement;
    current.quality = newQuality < 0 ? 0 : newQuality;
  }
}
