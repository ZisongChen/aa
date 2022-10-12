import "./styles.css";
const jsonQuery = {
  query: [
    {
      code: "Vuosi",
      selection: {
        filter: "item",
        values: [
          "2000",
          "2001",
          "2002",
          "2003",
          "2004",
          "2005",
          "2006",
          "2007",
          "2008",
          "2009",
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021"
        ]
      }
    },
    {
      code: "Alue",
      selection: {
        filter: "item",
        values: ["SSS", "KU020"]
      }
    },
    {
      code: "Tiedot",
      selection: {
        filter: "item",
        values: ["vaesto"]
      }
    }
  ],
  response: {
    format: "json-stat2"
  }
};
console.log(jsonQuery);
const getData = async () => {
  const url =
    "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px";

  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(jsonQuery)
  });
  if (!res.ok) {
    return;
  }
  const data = await res.json();

  return data;
};
const buildChart = async () => {
  const data = await getData();
  console.log(data);
  const values = data.value;
  //console.log(parties)
  //console.log(labels)
  var labels = [];
  var valuelist = [];
  var valuelist1 = [];
  var year = 2000;
  var j = 0;
  for (var i in values) {
    for (var n = 0; n < 44; n++) {
      if (j === 2 * n) {
        labels.push(year);
        year++;
        valuelist.push(values[i]);
        console.log(values[i]);
        break;
      } else if (j === 2 * n + 1) {
        valuelist1.push(values[i]);
        break;
      }
    }
    j++;
  }
  var name;
  var name1;
  var jj = 0;
  for (var iii in data.dimension.Alue.category.label) {
    if (jj === 0) {
      name = data.dimension.Alue.category.label[iii];
    } else if (jj === 1) {
      name1 = data.dimension.Alue.category.label[iii];
    }
    jj++;
  }

  //console.log(parties)

  const chartData = {
    labels: labels,
    datasets: [
      { name: name, values: valuelist },
      { name: name1, values: valuelist1 }
    ]
  };
  const chart = new frappe.Chart("#chart", {
    title: "",
    data: chartData,
    type: "line",
    height: 450,
    colors: ["#eb5146", "#eb5146"]
    /*barOptions: {
        stacked: 1
    },*/
  });
};

buildChart();
