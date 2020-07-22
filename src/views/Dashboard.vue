<template>
  <div class="dashboard">
    <div class="header">
      {{ siteUrl }}
    </div>
    <div class="d-flex">
      <div class="chart-container">
        <highcharts class="hc" :options="ttfbData" ref="chart"></highcharts>
      </div>
      <div class="chart-container">
        <highcharts class="hc" :options="fcpData" ref="chart"></highcharts>
      </div>
      <div class="chart-container">
        <highcharts class="hc" :options="domLoadData" ref="chart"></highcharts>
      </div>
    </div>
    <div>
      <div style="display: flex; padding-right: 2rem; padding-left: 2rem;">
        <h3 style="flex: 1">Resources</h3>
        <select style="height: 30px" @change="selectDate">
          <option v-for="date in dateList" :key="date">{{ date }}</option>
        </select>
      </div>
      <Table :data="resourcesData" style="padding-right: 2rem; padding-left: 2rem; margin-bottom: 2rem;"></Table>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import dayjs from "dayjs";

export default {
  name: "Dashboard",
  data() {
    return {
      analyticsResults: [],
      selectedItemIndex: 0,
      ttfbOptions: {
        series: [
          {
            data: [10, 2, 3],
          },
        ],
      },
      siteUrl: "myilmaz.net",
    };
  },
  created() {
    this.getResult({ siteUrl: this.siteUrl }).then(res => {
      this.$set(this, "analyticsResults", res.data);
    });
  },
  computed: {
    fcpData() {
      return this.processChartData(this.analyticsResults, "FCP", "fcp");
    },
    ttfbData() {
      return this.processChartData(this.analyticsResults, "TTFB", "ttfb");
    },
    domLoadData() {
      return this.processChartData(this.analyticsResults, "DOM Load Time", "DOMLoadTime");
    },
    dateList() {
      return this.analyticsResults.map(item => dayjs(item.createdAt).format("DD/MM/YYYY HH:mm:ss"));
    },
    resourcesData() {
      if (!this.analyticsResults.length) {
        return {
          header: ["URL", "Duration", "Size", "Type"],
          values: [],
        };
      }
      return {
        header: ["URL", "Duration", "Size", "Type"],
        values: this.analyticsResults[this.selectedItemIndex].data.resources.map(item => {
          return {
            URL: item.name,
            Duration: item.duration.toFixed(2),
            Size: `${item.size} KiB`,
            Type: item.type,
          };
        }),
      };
    },
  },
  methods: {
    ...mapActions(["getResult"]),
    selectDate(item) {
      this.selectedItemIndex = this.dateList.findIndex(date => date === item.target.value);
    },
    processChartData(data, title, key) {
      return {
        title: {
          text: `${title} Graph`,
        },
        tooltip: {
          formatter: function() {
            return this.x + "<br />Value: <b>" + this.y + "</b>";
          },
        },
        series: [
          {
            data: data.map(item => {
              return {
                name: item.data[key],
                y: parseInt(item.data[key]),
              };
            }),
            showInLegend: false,
          },
        ],
        yAxis: {
          title: {
            text: "Milliseconds",
          },
        },
        xAxis: {
          title: {
            text: title,
            style: { fontSize: "18px", fontWeight: "bold" },
            margin: 20,
          },
          categories: data.map(item => dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")),
        },
      };
    },
  },
};
</script>

<style scoped lang="scss">
.dashboard {
  .header {
    background: #ebebeb;
    padding: 1rem;
  }

  .d-flex {
    display: flex;
    justify-content: center;
    padding: 1rem;
    flex-wrap: wrap;
  }

  .chart-container {
    flex: 0 0 calc(100% - 2rem);
    max-width: calc(100% - 2rem);
    margin: 1rem;
  }

  @media (min-width: 576px) {
    .chart-container {
      flex: 0 0 calc(33% - 2rem);
      max-width: calc(33% - 2rem);
    }
  }

  ::v-deep .highcharts-credits {
    display: none;
  }
}
</style>
