import React, { useState } from 'react';

import type { MenuProps } from 'antd';

import { Layout, Menu, theme } from 'antd';
import Reports from '../Reports/Reports';
import AddFoodItemForm from '../Edit/EntryFood';
import FoodTable from '../Edit/AllFood';
import Billing from '../Billing/Billing';

  

const { Content, Sider } = Layout;

  

const menuData = [

{

 key: 'dashboard',

 label: 'Dashboard',

children: [

      { key: 'reports', label: 'Reports' },

      { key: 'addFood', label: 'Add Foods' },
      { key: 'allFood', label: 'All Foods' },
      { key: 'gb', label: 'Go Back' },

    ],
}
];

  

// Convert `menuData` into the format Ant Design expects

const items2: MenuProps['items'] = menuData.map(({ key, label, children }) => ({

  key,

  label,

  children: children?.map(({ key: childKey, label: childLabel }) => ({

    key: childKey,

    label: childLabel,

  })),

}));

  

const AdminLayout: React.FC = () => {

  const [current, setCurrent] = useState<string>('dashboard'); // Default selection

  const {

    token: { colorBgContainer, borderRadiusLG },

  } = theme.useToken();

  

  const onClick: MenuProps['onClick'] = (e) => {

    console.log('Sideclick ', e);

    setCurrent(e.key);

  };

  

  // Map keys to content dynamically

  const renderContent = (key: string) => {

    const contentMapping: Record<string, React.ReactNode> = {

      'dashboard': 'Welcome to the PALOLIK Admin Dashboard ',

      'reports': <Reports></Reports>,

      'allFood': <FoodTable></FoodTable>,

      'addFood': <AddFoodItemForm></AddFoodItemForm>,

      'gb': <Billing></Billing>,





 };

 return <div>{contentMapping[key] || 'Select an option from the menu'}</div>;

};

  

  return (

    <Layout>

      <Layout>

        <Sider width={200} style={{ background: colorBgContainer }}>

          <Menu

            mode="inline"

            defaultSelectedKeys={['dashboard-overview']}

            style={{ height: '100%', borderRight: 0 }}

            items={items2}

            onClick={onClick}

          />

        </Sider>

        <Layout style={{ padding: '0 24px 24px', marginTop: '30px' }}>

          <Content

            style={{

              padding: 24,

              margin: 0,

              minHeight: 280,

              background: colorBgContainer,

              borderRadius: borderRadiusLG,

            }}

          >

            {renderContent(current)}

          </Content>

        </Layout>

      </Layout>

    </Layout>

  );

};

  

export default AdminLayout;