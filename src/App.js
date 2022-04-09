import VerticalBarChart from './VerticalBarChart';

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

const data = [{ x:10, y:10}, {x:20, y:1}, {x:30, y:2}]

const style = {
  width:'100%',
  height:'1024px',
  display:'flex',
  'justifyContent':'center',
  'alignItems':'center'
}
function App() {
  return (
    <div style={style} className="App">
      <VerticalBarChart
        clsasName="Chart"
        width={600}
        height={600}
        data={data}
      />
    </div>
  );
}

export default App;

