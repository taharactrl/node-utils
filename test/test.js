const chai = require("chai");
chai.should();

const _utils = require("../index");

describe("Custom utility functions tests", () => {
  describe("Subtract JSON", () => {
    const jsonA = {
      a1: "hoge",
      a2: "foo",
      a3: [123],
    };

    const jsonB = {
      a1: "hoge",
      a2: "foo",
    };

    it("A - B", () => {
      const ret = _utils.subtractJson(jsonA, jsonB);
      ret.should.be.a("array");
      ret.should.have.lengthOf(1);
      ret.map((item) => item.should.be.a("string"));
      ret.should.deep.equal(["a3"]);
    });

    it("B - A", () => {
      const ret = _utils.subtractJson(jsonB, jsonA);
      ret.should.be.a("array");
      ret.should.have.lengthOf(0);
      ret.map((item) => item.should.be.a("string"));
      ret.should.deep.equal([]);
    });
  });

  describe("Include JSON", () => {
    const jsonA = {
      a1: "hoge",
      a2: "foo",
      a3: [123],
    };

    const jsonB = {
      a1: "hoge",
      a2: "foo",
    };

    const jsonC = {
      a1: "hoge",
      a2: "foo",
      a3: [123],
    };

    it("basic case", () => {
      _utils.includeJSON(jsonA, jsonB).should.be.true;
      _utils.includeJSON(jsonB, jsonA).should.be.false;
      _utils.includeJSON(jsonA, jsonC).should.be.true;
    });
  });

  describe("Equal JSON", () => {
    const jsonA = {
      a1: "hoge",
      a2: "foo",
      a3: [123],
    };

    const jsonB = {
      a1: "hoge",
      a2: "foo",
    };

    const jsonC = {
      a1: "hoge",
      a2: "foo",
      a3: [123],
    };

    it("basic case", () => {
      _utils.equalJSON(jsonA, jsonB).should.be.false;
      _utils.equalJSON(jsonB, jsonA).should.be.false;
      _utils.equalJSON(jsonA, jsonC).should.be.true;
    });
  });

  describe("Diff JSON", () => {
    const jsonA = {
      a1: "hoge",
      a2: "foo",
      a3: [123],
    };

    const jsonB = {
      a1: "hoge",
      a2: "foo",
    };

    const jsonC = {
      a1: "hoge",
      a2: "foo",
      a4: [234],
    };

    it("basic case", () => {
      _utils.differenceJSON(jsonA, jsonB).should.deep.equal(["a3"]);
      _utils.differenceJSON(jsonB, jsonA).should.deep.equal(["a3"]);
      _utils.differenceJSON(jsonA, jsonC).should.deep.equal(["a3", "a4"]);
    });

    it("README case", () => {
      const jsonA = {
        a1: "hoge",
        a2: "foo",
        a3: [123],
        a5: [1],
      };

      const jsonB = {
        a1: "hoge",
        a2: "foo",
        a4: [234],
        a5: [2],
      };

      const ret = _utils.differenceJSON(jsonA, jsonB);
      ret.should.deep.equal(["a3", "a5.0", "a4"]);
    });
  });

  describe("JSON Path", () => {
    let jsonA = {
      a1: "hoge",
      a2: "foo",
      a3: [123],
    };

    it("basic case", () => {
      originalJsonA = { ...jsonA };

      const a1 = _utils.objectFromJSONPath(jsonA, "a1");
      a1.should.equal(originalJsonA.a1);
      jsonA.should.deep.equal(originalJsonA);
    });
  });

  describe("Detect recursive object", () => {
    it("README case", () => {
      class A {
        constructor() {
          this.a = { b: this };
          this.c = this;
          this.d = [this];
        }
      }

      const a = new A();

      const ret = _utils.detectRecursiveObject(a);
      ret.should.deep.equal(["a.b", "c", "d.0"]);
    });
  });

  describe("Merge JSON", () => {
    it("README case", () => {
      let jsonA = {
        a1: "hoge",
        a2: "foo",
        a3: [123],
      };

      const jsonB = {
        a1: "hoge",
        a2: "foo",
      };

      const jsonC = {
        a1: "hoge",
        a2: "hei",
        a4: [234],
      };

      const ret = _utils.mergeObjects({ ...jsonA, ...jsonC });
      ret.should.be.a("object");
      ret.should.deep.equal({
        a1: "hoge",
        a2: "hei",
        a3: [123],
        a4: [234],
      });
    });
  });
});
