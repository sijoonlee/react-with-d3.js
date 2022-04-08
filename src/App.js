import BarChart from './BarChart';

// const data = {
//   width: 500,
//   height: 750,
//   dataset: [
//     {label: 'apple', value: 25},
//     {label: 'orange', value: 30},
//     {label: 'banana', value: 50},
//     {label: 'pine apple', value: 60},
//   ],
//   x_display_name: 'Fruit',
//   y_display_name: 'Price',
//   fill: ['lemonChiffon', 'aliceblue', 'sandybrown', 'darksalmon' ],
//   xAxisLabel: 'Fruit',
//   yAxisLabel: 'Price',
//   ticks: 10,
//   barClass: 'barChart', // class name to svg element
// }

const data = [
  [10, 20, 30],
  [10, 20, 30],
  [10, 20, 30]
]


function App() {


  return (
    <div className="App">
      <BarChart
        width={600}
        height={600}
        data={data}
      />
    </div>
  );
}

export default App;

