import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Table from "@/components/Table.vue";

describe("Table.vue", () => {
  it("renders props.data when passed", () => {
    const tableData = {
      header: ["TRAFFIC SOURCE", "TYPE"],
      values: [
        {
          "TRAFFIC SOURCE": "linkedin.com",
          TYPE: "Social",
        },
        {
          "TRAFFIC SOURCE": "fashionblog.co",
          TYPE: "Referral",
        },
        {
          "TRAFFIC SOURCE": "myilmaz.net",
          TYPE: "Direct",
        },
      ],
    };
    const wrapper = shallowMount(Table, {
      propsData: { data: tableData },
    });

    expect(wrapper.props("data").header.length).to.equal(2);
    expect(wrapper.props("data").values.length).to.equal(3);
  });

  it("renders table content properly", () => {
    const tableData = {
      header: ["TRAFFIC SOURCE", "TYPE"],
      values: [
        {
          "TRAFFIC SOURCE": "linkedin.com",
          TYPE: "Social",
        },
        {
          "TRAFFIC SOURCE": "fashionblog.co",
          TYPE: "Referral",
        },
        {
          "TRAFFIC SOURCE": "myilmaz.net",
          TYPE: "Direct",
        },
      ],
    };
    const wrapper = shallowMount(Table, {
      propsData: { data: tableData },
    });

    expect(wrapper.findAll("tr").length).to.equal(4);
  });

  it("renders table content zero content text when record count is 0", () => {
    const tableData = {
      header: ["TRAFFIC SOURCE", "TYPE"],
      values: [],
    };
    const wrapper = shallowMount(Table, {
      propsData: { data: tableData },
    });

    expect(wrapper.findAll("tr").length).to.equal(2); // One header - one zero state content
    expect(
      wrapper
        .findAll("tr")
        .at(1)
        .find("td")
        .text(),
    ).to.equal("No Record Found");
  });
});
