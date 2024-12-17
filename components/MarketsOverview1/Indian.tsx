import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  FlatList,
  Dimensions,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

type IndexName = "Sensex" | "Nifty" | "BSE100" | "BSE200" | "BSE500" | "S&P BSE LargeCap" | "MIDCAP" | "SMLCAP";
const periods = ["1D", "1W", "1M", "YTD", "1Y", "3Y"] as const;
type Period = typeof periods[number];

// Your sensexGraphData object here
const sensexGraphData: Record<IndexName, Record<Period, number[]>> = {
  Sensex: {
    "1D": [85300.72, 98000.12, 92000.34, 100000.45, 96500.23, 105000.89],
    "1W":[5300.72, 98000.12, 92000.34, 100000.45, 96500.23, 105000.89],
    "1M":[800.72, 98000.12, 92000.34, 100000.45, 96500.23, 105000.89],
    "YTD":[70300.72, 98000.12, 92000.34, 100000.45, 96500.23, 105000.89],
    "1Y":[65300.72, 98000.12, 92000.34, 100000.45, 96500.23, 105000.89],
    "3Y":[55300.72, 98000.12, 92000.34, 100000.45, 96500.23, 105000.89],
    // ... other periods ...
  },
  Nifty: {
    "1D": [5300.72, 98000.12, 92000.34, 100000.45, 96500.23, 105000.89],
    "1W":[85300.72, 98000.12, 92000.34, 100000.45, 96500.23, 105000.89],
    "1M":[85300.72, 98000.12, 92000.34, 100000.45, 96500.23, 105000.89],
    "YTD":[800.72, 98000.12, 92000.34, 100000.45, 96500.23, 105000.89],
    "1Y":[85300.72, 98000.12, 92000.34, 100000.45, 96500.23, 105000.89],
    "3Y":[85300.72, 98000.12, 92000.34, 100000.45, 96500.23, 105000.89],
    // ... other periods ...
  },
  BSE100: {
    "1D": [0], "1W": [0], "1M": [0], "YTD": [0], "1Y": [0], "3Y": [0]
  },
  BSE200: {
    "1D": [0], "1W": [0], "1M": [0], "YTD": [0], "1Y": [0], "3Y": [0]
  },
  BSE500: {
    "1D": [0], "1W": [0], "1M": [0], "YTD": [0], "1Y": [0], "3Y": [0]
  },
  "S&P BSE LargeCap": {
    "1D": [0], "1W": [0], "1M": [0], "YTD": [0], "1Y": [0], "3Y": [0]
  },
  MIDCAP: {
    "1D": [0], "1W": [0], "1M": [0], "YTD": [0], "1Y": [0], "3Y": [0]
  },
  SMLCAP: {
    "1D": [0], "1W": [0], "1M": [0], "YTD": [0], "1Y": [0], "3Y": [0]
  }
};

const Indian = () => {
  const [graphDataIndices, setGraphDataIndices] = useState({
    TOP_GAINER: {
      name: "TCS Ltd",
      sid: "123",
      dir: 1,
      chgp: "2.5",
    },
    TOP_LOSER: {
      name: "Infosys Ltd",
      sid: "456",
      dir: -1,
      chgp: "-1.8",
    },
    ADVANCES: "125",
    DECLINES: "75",
    NO_CHANGE: "12",
    WEEK_LOW_52: "15,500",
    WEEK_HIGH_52: "18,900",
    WEEK_POINTER_52: "50",
    CurrentPrice: "14,500",
    PreviousClosePerc: {
      D1: "0.5%",
      D1_dir: 1,
      W1: "1.2%",
      W1_dir: 1,
      M1: "-0.8%",
      M1_dir: -1,
      YTD: "5.2%",
      YTD_dir: 1,
      Y1: "12.5%",
      Y1_dir: 1,
      Y3: "45.2%",
      Y3_dir: 1,
    },
  });

  const sampleIndicesData = [
    {
      id: 1,
      sensex: "Sensex" as IndexName,
      cmp: "81,510.05",
      chg: "1.59",
      chgp: "0.00%",
      dir: 1,
    },
    {
      id: 2,
      sensex: "Nifty" as IndexName,
      cmp: "44,510.05",
      chg: "1.59",
      chgp: "0.00%",
      dir: 1,
    }
    // Add other indices data...
  ];

  const [activePeriod, setActivePeriod] = useState<Period>("1D");
  const [selectedGraph, setSelectedGraph] = useState(sampleIndicesData[0]);
  const [graphData, setGraphData] = useState<number[]>(sensexGraphData[selectedGraph.sensex]["1D"]);

  const handlePeriodChange = (period: Period) => {
    setActivePeriod(period);
    setGraphData(sensexGraphData[selectedGraph.sensex][period]);
  };

  const handleGraphClick = (item: typeof sampleIndicesData[0]) => {
    setSelectedGraph(item);
    setGraphData(sensexGraphData[item.sensex][activePeriod]);
  };

  const renderPeriodButton = ({ item }: { item: Period }) => (
    <TouchableOpacity 
      onPress={() => handlePeriodChange(item)}
      style={[styles.periodButton, activePeriod === item && styles.activePeriod]}
    >
      <Text style={[styles.periodText, activePeriod === item && styles.activePeriodText]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderIndicesItem = ({ item }: { item: typeof sampleIndicesData[0] }) => (
    <TouchableOpacity 
      onPress={() => handleGraphClick(item)}
      style={[styles.indicesItem, selectedGraph.id === item.id && styles.selectedIndicesItem]}
    >
      <View style={styles.indicesRow}>
        <Text style={styles.sensexText}>{item.sensex}</Text>
        <Text style={styles.cmpText}>{item.cmp}</Text>
        <Text style={[styles.changeText, item.dir === 1 ? styles.green : styles.red]}>
          {item.chg} ({item.chgp})
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { flex: 1 }]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.content}>
          {/* Period Selector */}
          <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.periodList}
        >
          <View style={styles.periodContainer}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period}
                onPress={() => handlePeriodChange(period)}
                style={[
                  styles.periodButton,
                  activePeriod === period && styles.activePeriod
                ]}
              >
                <Text style={[
                  styles.periodText,
                  activePeriod === period && styles.activePeriodText
                ]}>
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Indices Table */}
        {/* <View style={styles.tableContainer}>
          {sampleIndicesData.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleGraphClick(item)}
              style={[
                styles.tableRow,
                selectedGraph.id === item.id && styles.selectedRow
              ]}
            >
              <View style={styles.indexColumn}>
                <Text style={styles.indexName}>{item.sensex}</Text>
              </View>
              <View style={styles.valueColumn}>
                <Text style={styles.indexValue}>{item.cmp}</Text>
              </View>
              <View style={styles.changeColumn}>
                <Text style={[
                  styles.changeValue,
                  item.dir === 1 ? styles.green : styles.red
                ]}>
                  {item.chg} ({item.chgp})
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View> */}
        <View style={styles.tableContainer}>
  {/* Table Header */}
  {/* <View style={styles.tableRow}>
    <View style={styles.indexColumn}>
      <Text style={styles.tableHeaderText}>Index</Text>
    </View>
    <View style={styles.valueColumn}>
      <Text style={styles.tableHeaderText}>Value</Text>
    </View>
    <View style={styles.changeColumn}>
      <Text style={styles.tableHeaderText}>Change</Text>
    </View>
  </View> */}
  
  {/* Table Rows */}
  {sampleIndicesData.map((item) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleGraphClick(item)}
      style={[
        styles.tableRow,
        selectedGraph.id === item.id && styles.selectedRow
      ]}
    >
      <View style={styles.indexColumn}>
        <Text style={styles.indexName}>{item.sensex}</Text>
      </View>
      <View style={styles.valueColumn}>
        <Text style={styles.indexValue}>{item.cmp}</Text>
      </View>
      <View style={styles.changeColumn}>
        <Text style={[
          styles.changeValue,
          item.dir === 1 ? styles.green : styles.red
        ]}>
          {item.chg} ({item.chgp})
        </Text>
      </View>
    </TouchableOpacity>
  ))}
</View>

          {/* Chart */}
          <View style={styles.chartContainer}>
            <LineChart
              data={{
                labels: [],
                datasets: [{
                  data: graphData
                }]
              }}
              width={Dimensions.get('window').width - 32}
              height={220}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => selectedGraph.dir === 1 
                  ? `rgba(34, 197, 94, ${opacity})`
                  : `rgba(239, 68, 68, ${opacity})`,
                style: {
                  borderRadius: 16
                }
              }}
              bezier
              style={styles.chart}
            />
          </View>

          {/* Market Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Top Gainer</Text>
                <Text style={[styles.statValue, styles.green]}>
                  {graphDataIndices.TOP_GAINER.name}
                </Text>
                <Text style={[styles.statChange, styles.green]}>
                  {graphDataIndices.TOP_GAINER.chgp}%
                </Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Top Loser</Text>
                <Text style={[styles.statValue, styles.red]}>
                  {graphDataIndices.TOP_LOSER.name}
                </Text>
                <Text style={[styles.statChange, styles.red]}>
                  {graphDataIndices.TOP_LOSER.chgp}%
                </Text>
              </View>
            </View>

            {/* Market Breadth */}
            <View style={styles.breadthContainer}>
              <View style={styles.breadthBox}>
                <Text style={styles.breadthLabel}>ADVANCES</Text>
                <Text style={[styles.breadthValue, styles.green]}>
                  {graphDataIndices.ADVANCES} Stocks
                </Text>
              </View>

              <View style={styles.breadthBox}>
                <Text style={styles.breadthLabel}>DECLINES</Text>
                <Text style={[styles.breadthValue, styles.red]}>
                  {graphDataIndices.DECLINES} Stocks
                </Text>
              </View>

              <View style={styles.breadthBox}>
                <Text style={styles.breadthLabel}>NO CHANGE</Text>
                <Text style={styles.breadthValue}>
                  {graphDataIndices.NO_CHANGE} Stocks
                </Text>
              </View>
            </View>

            {/* 52 Week Range */}
            {activePeriod === "1D" && (
              <View style={styles.weekRangeContainer}>
                <View style={styles.weekRangeLabels}>
                  <Text style={styles.weekRangeLabel}>52 Wk Low</Text>
                  <Text style={styles.weekRangeLabel}>52 Wk High</Text>
                </View>
                <View style={styles.weekRangeBar}>
                  <View 
                    style={[
                      styles.weekRangePointer, 
                      { left: `${graphDataIndices.WEEK_POINTER_52}%` }
                    ]} 
                  />
                </View>
                <View style={styles.weekRangeValues}>
                  <Text style={styles.weekRangeValue}>
                    {graphDataIndices.WEEK_LOW_52}
                  </Text>
                  <Text style={styles.weekRangeValue}>
                    {graphDataIndices.WEEK_HIGH_52}
                  </Text>
                </View>
              </View>
            )}

            {/* Previous Close Percentages */}
            <View style={styles.previousCloseContainer}>
              {Object.entries(graphDataIndices.PreviousClosePerc)
                .filter(([key]) => !key.includes('_dir'))
                .map(([key, value]) => {
                  const dirKey = `${key}_dir` as keyof typeof graphDataIndices.PreviousClosePerc;
                  const direction = graphDataIndices.PreviousClosePerc[dirKey];
                  return (
                    <View key={key} style={styles.previousCloseBox}>
                      <Text style={styles.previousCloseLabel}>{key}</Text>
                      <Text style={[
                        styles.previousCloseValue,
                        direction === 1 ? styles.green : styles.red
                      ]}>
                        {value}
                      </Text>
                    </View>
                  );
                })}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 16,
    flex: 1,
  },
  periodList: {
    marginBottom: 16,
  },
  periodContainer: {
    flexDirection: 'row', 
    alignItems: 'center',  
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: '#f7f7f7',
  },
  activePeriod: {
    backgroundColor: '#1f2937',
  },
  periodText: {
    fontSize: 14,
    color: '#1f2937',
  },
  activePeriodText: {
    color: '#ffffff',
  },
  indicesList: {
    marginBottom: 16,
  },
  indicesItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  indicesHeaderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    backgroundColor:'#f7f7f7',
    borderRight:'1px solid #fff',
    fontSize:'14',
    fontWeight: 'bold',
  },
   tableContainer: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  selectedRow: {
    backgroundColor: '#f3f4f6',
  },
  indexColumn: {
    flex: 2,
    justifyContent: 'flex-start',
  },
  valueColumn: {
    flex: 1.5,
    justifyContent: 'center',
  },
  changeColumn: {
    flex: 1.5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6b7280',
  },
  indexName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  indexValue: {
    fontSize: 14,
    color: '#111827',
  },
  changeValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  stockName: {
    fontSize: 14,
  },
  stockPrice: {
    fontSize: 14,
  },
  stockGainLoss: {
    fontSize: 14,
  },
  sensexText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cmpText: {
    fontSize: 14,
  },
  changeText: {
    fontSize: 14,
  },
  green: {
    color: '#0ac488',
  },
  red: {
    color: '#e35744',
  },
  chartContainer: {
    marginBottom: 24,
  },
  chart: {
    borderRadius: 16,
  },
  statsContainer: {
    gap: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f7f7f7',
    marginHorizontal: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statChange: {
    fontSize: 14,
  },
  breadthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  breadthBox: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f7f7f7',
    marginHorizontal: 4,
  },
  breadthLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  breadthValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  weekRangeContainer: {
    marginTop: 16,
  },
  weekRangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekRangeLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  weekRangeBar: {
    height: 4,
    backgroundColor: '#f7f7f7',
    borderRadius: 2,
    marginVertical: 8,
  },
  weekRangePointer: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: '#1f2937',
    borderRadius: 6,
    top: -4,
    marginLeft: -6,
  },
  weekRangeValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekRangeValue: {
    fontSize: 14,
    color: '#1f2937',
  },
  previousCloseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  previousCloseBox: {
    alignItems: 'center',
    flex: 1,
    padding: 8,
    minWidth: '25%',
  },
  previousCloseLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  previousCloseValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Indian;