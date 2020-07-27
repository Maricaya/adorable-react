import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {scopedClassMaker} from '../helpers/classes';
import './citySelect.scss';
import pinyin from 'tiny-pinyin';

const scopedClass = scopedClassMaker('xue-citySelect');
const sc = scopedClass;

type DialogProps = {
  onClose: () => void
}

interface Props {
  dataSource: string[],
  onChange: (p1: string) => void
}
type Context = {
  map: { [key: string]: string[] },
  onChange: (p1: string) => void
}
const CitySelectContext = React.createContext<Context>({
  map: {}, onChange: (p1: string) => {}
});

const CitySelect: React.FC<Props> = (props) => {
  const [dialogVisible, setDialogVisible] = useState(true);
  const map: Context['map'] = {};

  props.dataSource.map((city) => {
    const py = pinyin.convertToPinyin(city);
    const index = py[0];
    map[index] = map[index] || [];
    map[index].push(city);
  });
  const onClick = () => {setDialogVisible(true);};
  const onClose = () => {setDialogVisible(false);};

  return (
    <CitySelectContext.Provider value={{map, onChange: props.onChange}}>
      <div onClick={onClick}>{props.children}</div>
      {dialogVisible && <Dialog onClose={onClose}/>}
    </CitySelectContext.Provider>);
};
const Dialog: React.FC<DialogProps> = (props) => {
  const {map, onChange} = useContext(CitySelectContext);
  const cityList = Object.entries(map)
    .sort((a,b) => a[0].charCodeAt(0) - b[0].charCodeAt(0));
  const indexList = Object.keys(map).sort();
  const onClick = (city: string) => {
    onChange(city)
  };

  return ReactDOM.createPortal((
    <div className={sc('dialog')}>
      <header>
        <span className="icon" onClick={props.onClose}>&lt;</span>
        <span>选择城市</span>
      </header>
      <CurrentLocation/>
      <h2>全部城市</h2>
      <ol className={sc('index')}>
        {indexList.map(a => <li key={a}>{a}</li>)}
      </ol>
      <div className="cityList">所有城市</div>
      {cityList.map(([letter, list]) => {
        return (
          <div key={letter} className={sc('citySection')}>
            <h4>{letter}</h4>
            {list.map(city =>
              <div className={sc('cityName')} key={city}
                   onClick={() => onClick(city)}>{city}</div>
            )}
          </div>
        )
      })}
    </div>
  ), document.body);
};

const CurrentLocation: React.FC = () => {
  const [city, setCity] = useState<string>('加载中...');
  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', 'http://ip-api.com/json/?lang=zh-CN');
    xhr.onload = () => {
      const string = xhr.response;
      const obj = JSON.parse(string);
      setCity(obj.regionName);
    };
    xhr.onerror = () => {
      setCity('未知');
    };
    xhr.send();
  }, []);
  return (
    <div className="currentCity">
      当前城市：{city}
    </div>
  );
};

export default CitySelect;
