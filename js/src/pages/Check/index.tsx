import React, {useState} from 'react'
import { Tabs, Typography, theme } from 'antd'
import type { TabsProps } from 'antd'
import ScopeI from './ScopeI'
import ScopeII from './ScopeII'
import Chart from './Chart'
import Export from './Export'

const {useToken} = theme

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'SCOPE I',
    children: <ScopeI />,
  },
  {
    key: '2',
    label: 'SCOPE II',
    children: <ScopeII />,
  },
  {
    key: '3',
    label: '報表',
    children: <Chart />,
  },
  {
    key: '4',
    label: '匯出',
    children: <Export />,
  },
]


const App: React.FC = () => {

  const {token} = useToken()
  const [editableStr, setEditableStr] = useState('○○○○股份有限公司')


  return (
    <>
      <hr style={{borderColor: token.colorPrimary}} />
      <Typography.Title editable={{onChange: setEditableStr}} level={3} className='mt-8'>
        {editableStr}
      </Typography.Title>
      <div className='w-full border-2 border-gray-500 mt-8'>
        <Tabs
          tabPosition='left'
          items={items}
        />
      </div>
    </>
  )
}

export default App