import { Row, Col } from 'antd'
import CreatCompanyCategoryCard from '@/components/CreatCompanyCategoryCard'
import CreatCompanyCategoryInput from '@/components/CreatCompanyCategoryInput'
import {companyCategories} from '@/utils'
import {Form} from 'antd'



const Create = () => {
  const [form] = Form.useForm()
	return (
    <Form form={form}>
      <Form.Item
      name={['project', 'category']}
      noStyle
      initialValue=''
      >

      </Form.Item>
		<Row gutter={[24, 24]}>
			{companyCategories.map((companyCategory, i) => (
				<Col key={companyCategory.key} xl={{ span: 6 }} lg={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 24 }}>
					<CreatCompanyCategoryCard option={{
            name: companyCategory.name,
            key: companyCategory.key,
            image: companyCategory.image
          }} />
				</Col>
			))
			}
			<Col xl={{ span: 6 }} lg={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 24 }}>
				<CreatCompanyCategoryInput />
			</Col>
		</Row>
    </Form>
	)
}

export default Create