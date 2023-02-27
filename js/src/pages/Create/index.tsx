import { Row, Col } from 'antd'
import CreatCompanyCategoryCard from '@/components/CreatCompanyCategoryCard'
import CreatCompanyCategoryInput from '@/components/CreatCompanyCategoryInput'
import { companyCategories } from '@/utils'

const Create = () => {
  return (
    <Row
      gutter={[
        24,
        24,
      ]}
    >
      {companyCategories.map((companyCategory) => (
        <Col
          key={companyCategory.key}
          xl={{ span: 6 }}
          lg={{ span: 8 }}
          sm={{ span: 12 }}
          xs={{ span: 24 }}
        >
          <CreatCompanyCategoryCard
            option={{
              name: companyCategory.name,
              key: companyCategory.key,
              image: companyCategory.image,
            }}
          />
        </Col>
      ))}
      <Col
        xl={{ span: 6 }}
        lg={{ span: 8 }}
        sm={{ span: 12 }}
        xs={{ span: 24 }}
      >
        <CreatCompanyCategoryInput />
      </Col>
    </Row>
  )
}

export default Create
