import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Table, Checkbox } from '@kdcloudjs/kdesign'; //https://react.kingdee.design/docs/guide/introduce //第三方基本组件
//import style from "./MaterialRport.css"; //样式
import '@kdcloudjs/kdesign/dist/kdesign.css'

export default function MaterialRport(props) {
  const {
    model,
    data: propsData
  } = props;
  const [cosmicModel, setCosmicModel] = useState()
  const [dataSource, setDataSource] = useState(Array)
  const [cosmicProps, setCosmicPropsData] = useState()
  //数据更新
  useEffect(() => {
    setCosmicPropsData(propsData)
    console.log(propsData)
  }, [propsData])
  //初始化
  useEffect(() => {
    setCosmicModel(model)
    const sofaType = propsData.configItems[0].value
    switch (sofaType) {
      case "sofa1": setDataSource(sofa1)
        break
      case "sofa2": setDataSource(sofa2)
        break
      case "sofa3": setDataSource(sofa3)
        break
      case "sofa4": setDataSource(sofa4)
        break
    }
  }, [])

  const renderTextAndImg = (value) => {
    return (
      <div>
        <span
          dangerouslySetInnerHTML={{
            __html: value.description,
          }}
        />
        <br></br>
        <img src={value.img} alt={value.img} style={{ maxWidth: '140px' }} />
      </div>
    );
  }
  const onChange = (value) => {
    cosmicModel && cosmicModel.invoke('checkbox', value)
    console.log('checkbox checked', value)
  }

  const renderText = (description) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100px' }}>
        <Checkbox.Group onChange={onChange} checkboxType={'default'}>
          <Checkbox value={1}>
            3双
          </Checkbox>
          <Checkbox value={2}>
            3+1+躺
          </Checkbox>
        </Checkbox.Group>

      </div>
    );
  }
  const mergeRow = (value, record, rowIndex) => {
    if (rowIndex === 0) {
      return {
        colSpan: 2,
        style: { background: '#ffffff' },
      }
    }

  }

  const sofa1 = [
    { "style": "现代简约", "format": "3双<br>3+1+躺", "size": "190-200CM", "price1": { img: "./isv/kded/cq/material_report/img/type1/sofa1.jpg", description: "KG.6032棉麻<br>蓝+白<br>196*96/162*98<br>" }, "price2": {}, "price3": {}, "price4": {} },
    { "style": "现代简约", "format": "3双<br>3+1+躺", "size": "200-220CM", "price1": { img: "./isv/kded/cq/material_report/img/type1/sofa2.jpg", description: "KG.6019<br>黑色+黄色<br>201*100/164*100<br>" }, "price2": { img: "./isv/kded/cq/material_report/img/type1/sofa3.jpg", description: "KG.6016<br>石青灰+抹茶绿<br>206/264*153*97<br>" }, "price3": { img: "./isv/kded/cq/material_report/img/type1/sofa4.jpg", description: "KG.6032棉麻<br>石青灰+抹茶绿<br>206/264*153*97<br>" }, "price4": { img: "./isv/kded/cq/material_report/img/type1/sofa5.jpg", description: "KG.6032棉麻<br>蓝+白<br>196*96/162*98<br>" } },
    { "style": "复古传统", "format": "3双<br>3+1+躺", "size": "200-220CM", "price1": {}, "price2": {}, "price3": { img: "./isv/kded/cq/material_report/img/type1/sofa3.jpg", description: "KG.6032棉麻<br>石青灰+抹茶绿<br>206/264*153*97<br>" }, "price4": {} },
    { "style": "复古传统", "format": "3双<br>3+1+躺", "size": "220-250CM", "price1": {}, "price2": {}, "price3": {}, "price4": { img: "./isv/kded/cq/material_report/img/type1/sofa4.jpg", description: "KG.6032棉麻<br>黑色+黄色<br>201*100/164*100<br>" } },
  ]
  const sofa2 = [
    { "style": "现代简约", "format": "3双<br>3+1+躺", "size": "190-200CM", "price1": { img: "./isv/kded/cq/material_report/img/type2/sofa1.jpg", description: "KG.6032棉麻<br>蓝+白<br>196*96/162*98<br>" }, "price2": {}, "price3": {}, "price4": {} },
    { "style": "现代简约", "format": "3双<br>3+1+躺", "size": "200-220CM", "price1": { img: "./isv/kded/cq/material_report/img/type2/sofa2.jpg", description: "KG.6019<br>黑色+黄色<br>201*100/164*100<br>" }, "price2": { img: "./isv/kded/cq/material_report/img/type2/sofa3.jpg", description: "KG.6016<br>石青灰+抹茶绿<br>206/264*153*97<br>" }, "price3": { img: "./isv/kded/cq/material_report/img/type2/sofa4.jpg", description: "KG.6032棉麻<br>石青灰+抹茶绿<br>206/264*153*97<br>" }, "price4": { img: "./isv/kded/cq/material_report/img/type2/sofa5.jpg", description: "KG.6032棉麻<br>蓝+白<br>196*96/162*98<br>" } },
    { "style": "现代简约", "format": "3双<br>3+1+躺", "size": "200-220CM", "price1": {}, "price2": {}, "price3": { img: "./isv/kded/cq/material_report/img/type2/sofa3.jpg", description: "KG.6032棉麻<br>石青灰+抹茶绿<br>206/264*153*97<br>" }, "price4": {} },
    { "style": "潮流", "format": "3双<br>3+1+躺", "size": "220-250CM", "price1": {}, "price2": {}, "price3": {}, "price4": { img: "./isv/kded/cq/material_report/img/type2/sofa4.jpg", description: "KG.6032棉麻<br>黑色+黄色<br>201*100/164*100<br>" } },
  ]
  const sofa3 = [
    { "style": "现代简约", "format": "3双<br>3+1+躺", "size": "190-200CM", "price1": { img: "./isv/kded/cq/material_report/img/type3/sofa1.jpg", description: "KG.6032棉麻<br>蓝+白<br>196*96/162*98<br>" }, "price2": {}, "price3": {}, "price4": {} },
    { "style": "现代简约", "format": "3双<br>3+1+躺", "size": "200-220CM", "price1": { img: "./isv/kded/cq/material_report/img/type3/sofa2.jpg", description: "KG.6019<br>黑色+黄色<br>201*100/164*100<br>" }, "price2": { img: "./isv/kded/cq/material_report/img/type3/sofa3.jpg", description: "KG.6016<br>石青灰+抹茶绿<br>206/264*153*97<br>" }, "price3": { img: "./isv/kded/cq/material_report/img/type3/sofa4.jpg", description: "KG.6032棉麻<br>石青灰+抹茶绿<br>206/264*153*97<br>" }, "price4": { img: "./isv/kded/cq/material_report/img/type3/sofa5.jpg", description: "KG.6032棉麻<br>蓝+白<br>196*96/162*98<br>" } },
    { "style": "现代简约", "format": "3双<br>3+1+躺", "size": "200-220CM", "price1": {}, "price2": {}, "price3": { img: "./isv/kded/cq/material_report/img/type3/sofa3.jpg", description: "KG.6032棉麻<br>石青灰+抹茶绿<br>206/264*153*97<br>" }, "price4": {} },
    { "style": "现代简约", "format": "3双<br>3+1+躺", "size": "220-250CM", "price1": {}, "price2": {}, "price3": {}, "price4": { img: "./isv/kded/cq/material_report/img/type3/sofa4.jpg", description: "KG.6032棉麻<br>黑色+黄色<br>201*100/164*100<br>" } },
  ]
  const sofa4 = [
    { "style": "现代简约", "format": "3双<br>3+1+躺", "size": "190-200CM", "price1": { img: "./isv/kded/cq/material_report/img/type4/sofa1.jpg", description: "KG.6032棉麻<br>蓝+白<br>196*96/162*98<br>" }, "price2": {}, "price3": {}, "price4": {} },
    { "style": "现代简约", "format": "3双<br>3+1+躺", "size": "200-220CM", "price1": { img: "./isv/kded/cq/material_report/img/type4/sofa2.jpg", description: "KG.6019<br>黑色+黄色<br>201*100/164*100<br>" }, "price2": { img: "./isv/kded/cq/material_report/img/type4/sofa3.jpg", description: "KG.6016<br>石青灰+抹茶绿<br>206/264*153*97<br>" }, "price3": { img: "./isv/kded/cq/material_report/img/type4/sofa4.jpg", description: "KG.6032棉麻<br>石青灰+抹茶绿<br>206/264*153*97<br>" }, "price4": { img: "./isv/kded/cq/material_report/img/type4/sofa5.jpg", description: "KG.6032棉麻<br>蓝+白<br>196*96/162*98<br>" } },
    { "style": "现代简约", "format": "3双<br>3+1+躺", "size": "200-220CM", "price1": {}, "price2": {}, "price3": { img: "./isv/kded/cq/material_report/img/type4/sofa3.jpg", description: "KG.6032棉麻<br>石青灰+抹茶绿<br>206/264*153*97<br>" }, "price4": {} },
    { "style": "现代简约", "format": "3双<br>3+1+躺", "size": "220-250CM", "price1": {}, "price2": {}, "price3": {}, "price4": { img: "./isv/kded/cq/material_report/img/type4/sofa4.jpg", description: "KG.6032棉麻<br>黑色+黄色<br>201*100/164*100<br>" } },
  ]
  //let dataSource = sofa1;




  const columns = [
    { code: 'style', name: '风格', width: 100, align: 'center', features: { autoRowSpan: true, sortable: true, filterable: true } },
    {
      code: 'format', name: '规格', width: 200, align: 'left', features: { autoRowSpan: true, sortable: true, filterable: true },
      render: renderText
    },
    { code: 'size', name: '尺寸/价格', width: 200, features: { autoRowSpan: true, sortable: true, filterable: true } },
    {
      name: '2000-3000',
      align: 'center',
      code: 'price12',
      children: [
        {
          code: 'price1', name: '', width: 160, align: 'center',
          render: renderTextAndImg, getCellProps: mergeRow
        },
        {
          code: 'price2', name: '', width: 160, align: 'center',
          render: renderTextAndImg
        },
      ],
    },

    {
      code: 'price3', name: '3000-4000', width: 160, align: 'center',
      render: renderTextAndImg
    },
    {
      code: 'price4', name: '4000-5000', width: 160, align: 'center',
      render: renderTextAndImg
    },
  ]

  const filter = {
    // defaultFilters: [
    //   {
    //     code: 'style',
    //     filter: '现代简约',
    //     filterCondition: 'contain'
    //   }
    // ],
    onChangeFilters: function (nextFilters) {
      console.log('nextFilters', nextFilters)
    }
  }

  const sort = {
    mode: 'single',
    defaultSorts: [{ code: 'order', order: 'asc' }],
    highlightColumnWhenActive: true,
    sortIconHoverShow: true,
    onChangeSorts: function (nextSorts) {
      console.log('nextSorts', nextSorts)
    }
  }


  return (
    <Table style={{ height: '100%', overflow: 'auto' }} className="App"
      useOuterBorder={true}
      dataSource={dataSource}
      columns={columns}
      autoRowSpan={true}
      filter={filter}
      sort={sort}
    />
  );
}
