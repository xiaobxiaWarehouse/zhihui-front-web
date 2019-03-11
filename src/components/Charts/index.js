import numeral from 'numeral';
import './g2';
import ChartCard from './ChartCard';
import LineChart from './LineChart';
import ColumnChart from './ColumnChart';
import ColumnGroupChart from './ColumnGroupChart';
import TimelineChart from './TimelineChart';
import AreaChart from './AreaChart';
import LadderChart from './LadderChart';
import AnnularChart from './AnnularChart';
import CakeChart from './CakeChart';
import SliderChart from './SliderChart';

const yuan = val => `¥ ${numeral(val).format('0,0')}`;

const Charts = {
  yuan,
  ChartCard,
  LineChart,
  TimelineChart,
  ColumnChart,
  ColumnGroupChart,
  AreaChart,
  LadderChart,
  AnnularChart,
  CakeChart,
  SliderChart,
};

export {
  Charts as default,
  yuan,
  ChartCard,
  LineChart,
  TimelineChart,
  ColumnChart,
  ColumnGroupChart,
  AreaChart,
  LadderChart,
  AnnularChart,
  CakeChart,
  SliderChart,
};
