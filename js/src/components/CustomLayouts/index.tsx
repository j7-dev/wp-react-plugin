import React from 'react'
import {Row, Col, theme} from 'antd'
import { defaultRouterMetas } from '@/Router'

type Props = {
  children?: React.ReactNode;
};

const {useToken} = theme

const CustomLayouts = (props:Props) => {
	const {token} = useToken()
	const { children } = props
	const pathname = window.location.pathname
	const title = defaultRouterMetas.find((item) => item.path === pathname)?.title

	return (
		<div className="container">
			<Row gutter={[24, 24]}>
				<Col span={24}>
					<h1 style={{color: token.colorText}} className='text-2xl'>{title}</h1>
				</Col>
			</Row>
			{children}
		</div>
	)
}

export default CustomLayouts