<template>
  <div class="table">
    <table>
      <thead>
        <tr class="head">
          <th v-for="(header, index) in headers" :key="header + index">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="values && values.length">
          <tr v-for="(value, index) in values" :key="value + index">
            <td v-for="(header, index) in headers" :key="header + index">{{ value[header] }}</td>
          </tr>
        </template>
        <template v-else>
          <td :colspan="headers.length" style="padding: 1rem">No Record Found</td>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    data: {
      type: Object,
      default: () => {
        return {
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
          maxRecord: 3,
        };
      },
    },
  },
  computed: {
    headers() {
      return this.data.header;
    },
    values() {
      return this.data.values;
    },
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap");

.table {
  overflow-x: auto;

  table {
    width: 100%;
    background-color: #fff;
    font-family: Montserrat;

    th,
    td {
      font-weight: unset;
      padding-right: 10px;
      width: 130px;
      padding-left: 25px;
    }

    @media (max-width: 576px) {
      td,
      th {
        max-width: 200px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }

    .column1 {
      width: 265px;
      padding-left: 42px;
    }

    tr.head th {
      padding-top: 24px;
      padding-bottom: 20px;
    }

    tr td {
      padding-top: 18px;
      padding-bottom: 14px;
    }

    tbody tr {
      border-bottom: 1px solid #e5e5e5;
    }

    td {
      font-size: 14px;
      color: #808080;
      line-height: 1.4;
    }

    th {
      font-weight: 500;
      font-size: 12px;
      color: #fff;
      line-height: 1.4;
      text-transform: uppercase;

      background-color: #6c7ae0;
    }

    tr:hover td {
      background-color: #fcebf5;
    }

    .hov-column-ver3 {
      background-color: #fcebf5;
    }

    .hov-column-head-ver3 {
      background-color: #7b88e3 !important;
    }

    tr td:hover {
      background-color: #e03e9c;
      color: #fff;
    }
  }
}
</style>
