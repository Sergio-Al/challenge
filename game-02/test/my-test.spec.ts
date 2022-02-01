const assert = require("assert");
const GR = require("../app/gilded-rose");

describe("Common items behavior", () => {
  it("Should degrade quality twice after sell by date has passed", () => {
    const otherItem = new GR.Item("Other awesome spell", 0, 14);
    const itemExpected = new GR.Item("Other awesome spell", -1, 12);

    const curretlyStored = new GR.GildedRose([otherItem]);
    const expectedStored = [itemExpected];

    const updatedItems = curretlyStored.updateQuality();

    assert.deepEqual(updatedItems, expectedStored);
  });

  it("Should quality never be negative", () => {
    const otherItem = new GR.Item("Other awesome spell", 0, 0);
    const itemExpected = new GR.Item("Other awesome spell", -1, 0);

    const curretlyStored = new GR.GildedRose([otherItem]);
    const expectedStored = [itemExpected];

    const updatedItems = curretlyStored.updateQuality();

    assert.deepEqual(updatedItems, expectedStored);
  });
});

describe("Rare items behavior", () => {
  describe("Aged Brie behavior", () => {
    it("Should actually increases in Quality the older it gets", () => {
      const otherItem = new GR.Item("Aged Brie", 3, 0);
      const itemExpected = new GR.Item("Aged Brie", 2, 1);

      const curretlyStored = new GR.GildedRose([otherItem]);
      const expectedStored = [itemExpected];

      const updatedItems = curretlyStored.updateQuality();

      assert.deepEqual(updatedItems, expectedStored);
    });

    it("Should Quality never be more than 50", () => {
      const otherItem = new GR.Item("Aged Brie", 3, 50);
      const itemExpected = new GR.Item("Aged Brie", 2, 50);

      const curretlyStored = new GR.GildedRose([otherItem]);
      const expectedStored = [itemExpected];

      const updatedItems = curretlyStored.updateQuality();

      assert.deepEqual(updatedItems, expectedStored);
    });
  });

  describe("'Backstage passes to a TAFKAL80ETC concert' Behavior", () => {
    it("Should Quality never be more than 50", () => {
      const otherItem = new GR.Item(
        "Backstage passes to a TAFKAL80ETC concert",
        3,
        50
      );
      const itemExpected = new GR.Item(
        "Backstage passes to a TAFKAL80ETC concert",
        2,
        50
      );

      const curretlyStored = new GR.GildedRose([otherItem]);
      const expectedStored = [itemExpected];

      const updatedItems = curretlyStored.updateQuality();

      assert.deepEqual(updatedItems, expectedStored);
    });

    it("Should increases in quality as SellIn value approaches", () => {
      const otherItem = new GR.Item(
        "Backstage passes to a TAFKAL80ETC concert",
        15,
        23
      );
      const itemExpected = new GR.Item(
        "Backstage passes to a TAFKAL80ETC concert",
        14,
        24
      );

      const curretlyStored = new GR.GildedRose([otherItem]);
      const expectedStored = [itemExpected];

      const updatedItems = curretlyStored.updateQuality();

      assert.deepEqual(updatedItems, expectedStored);
    });

    it("Should increases in quality by 2 when there are 10 day or less", () => {
      const otherItem = new GR.Item(
        "Backstage passes to a TAFKAL80ETC concert",
        10,
        23
      );
      const itemExpected = new GR.Item(
        "Backstage passes to a TAFKAL80ETC concert",
        9,
        25
      );

      const curretlyStored = new GR.GildedRose([otherItem]);
      const expectedStored = [itemExpected];

      const updatedItems = curretlyStored.updateQuality();

      assert.deepEqual(updatedItems, expectedStored);
    });

    it("Should increases in quality by 3 when there are 5 day or less", () => {
      const otherItem = new GR.Item(
        "Backstage passes to a TAFKAL80ETC concert",
        5,
        23
      );
      const itemExpected = new GR.Item(
        "Backstage passes to a TAFKAL80ETC concert",
        4,
        26
      );

      const curretlyStored = new GR.GildedRose([otherItem]);
      const expectedStored = [itemExpected];

      const updatedItems = curretlyStored.updateQuality();

      assert.deepEqual(updatedItems, expectedStored);
    });

    it("Should drop to 0 after the concert", () => {
      const otherItem = new GR.Item(
        "Backstage passes to a TAFKAL80ETC concert",
        0,
        23
      );
      const itemExpected = new GR.Item(
        "Backstage passes to a TAFKAL80ETC concert",
        -1,
        0
      );

      const curretlyStored = new GR.GildedRose([otherItem]);
      const expectedStored = [itemExpected];

      const updatedItems = curretlyStored.updateQuality();

      assert.deepEqual(updatedItems, expectedStored);
    });
  });

  describe("'Conjured' Behavior", () => {
    it("Should degrades twice after as fast as normal items", () => {
      const otherItem = new GR.Item("Conjured", 12, 23);
      const itemExpected = new GR.Item("Conjured", 11, 21);

      const curretlyStored = new GR.GildedRose([otherItem]);
      const expectedStored = [itemExpected];

      const updatedItems = curretlyStored.updateQuality();

      assert.deepEqual(updatedItems, expectedStored);
    });
    it("Should degrades twice after as fast as normal items below zero", () => {
      const otherItem = new GR.Item(
        "Conjured",
        0,
        23
      );
      const itemExpected = new GR.Item(
        "Conjured",
        -1,
        19
      );

      const curretlyStored = new GR.GildedRose([otherItem]);
      const expectedStored = [itemExpected];

      const updatedItems = curretlyStored.updateQuality();

      assert.deepEqual(updatedItems, expectedStored);
    });
  });
});

describe("Legendary items behavior", () => {
  describe("Sulfuras Behavior", () => {
    it("Should 'Sulfuras, Hand of Ragnaros' never has to be sold or decreases in Quality", () => {
      const otherItem = new GR.Item("Sulfuras, Hand of Ragnaros", 3, 80);
      const itemExpected = new GR.Item("Sulfuras, Hand of Ragnaros", 3, 80);

      const curretlyStored = new GR.GildedRose([otherItem]);
      const expectedStored = [itemExpected];

      const updatedItems = curretlyStored.updateQuality();

      assert.deepEqual(updatedItems, expectedStored);
    });
  });
});
