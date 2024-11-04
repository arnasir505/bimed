import { Container, Layout } from 'shared/ui';
import './style.css';
import { Breadcrumb, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { branches } from 'data/branches';
import { BranchesCard } from 'widgets/branches-card';

export const Branches = () => {
  return (
    <Layout>
      <main className='branches-main'>
        <Container>
          <Breadcrumb
            items={[
              { title: <Link to='/'>Главная</Link> },
              { title: <Link to='/branches'>Филиалы</Link> },
            ]}
          />
          <div className='branches'>
            <Typography.Title level={4} className='branches__title'>
              Филиалы
            </Typography.Title>
            <div className='branches__wrapper'>
              {branches.map((item) => (
                <BranchesCard key={item.id} branch={item} />
              ))}
            </div>
          </div>
        </Container>
      </main>
    </Layout>
  );
};
