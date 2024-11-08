import { Breadcrumb, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { Container, Layout } from 'shared/ui';
import './style.css';

export const DeliveryTerms = () => {
  return (
    <Layout>
      <main className='delivery-terms-main'>
        <Container>
          <Breadcrumb
            items={[
              { title: <Link to='/'>Главная</Link> },
              { title: <Link to='/delivery-terms'>Условие доставки</Link> },
            ]}
          />
          <section className='delivery-terms'>
            <Typography.Title level={4} className='delivery-terms__title'>
              Условие доставки
            </Typography.Title>
            <Typography.Text className='delivery-terms__text'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas purus integer
              tortor, ac pellentesque. Quis pharetra, quis viverra molestie semper hendrerit urna
              pretium lobortis. Facilisi sit aliquam egestas quis. Sed erat enim vitae scelerisque
              ultricies mauris. Aliquam risus mattis id viverra lectus eget risus, egestas nisl.
              Mauris volutpat hac at morbi nullam suspendisse ut nisi. Malesuada adipiscing ut est
              duis pretium amet. Eget viverra enim, faucibus quis libero, orci erat odio. Leo,
              pretium tincidunt senectus blandit lectus aliquam nisl quam scelerisque. Maecenas
              donec arcu, eu non parturient. Sed dignissim ut id risus lectus eu, quis dui, et.
              Vivamus euismod varius consectetur vulputate commodo gravida nibh. At velit cursus
              quam tincidunt ipsum, lacinia sit. Faucibus pellentesque nam risus amet quisque sit
              facilisis. Et, mauris cursus nulla proin aenean vitae vulputate sollicitudin.
              Vulputate egestas varius nibh non eu. Elit integer at tincidunt turpis massa odio
              nullam ornare. Dictum tellus eleifend proin fringilla purus vitae. Ultrices arcu
              turpis netus lacinia vestibulum urna. Ultrices aliquet auctor facilisis tempus eget
              sed integer iaculis ornare. Tempus nisl, nec nulla enim adipiscing tellus volutpat.
              Massa pulvinar molestie ornare magna arcu consectetur eu. Leo turpis ante sed in. Non
              lacus, lobortis eget nunc amet, lacus feugiat donec justo. <br /> <br /> Pellentesque
              amet amet suspendisse morbi amet. Turpis cras nam bibendum lobortis lectus netus
              adipiscing massa. Auctor morbi mi arcu eget. Tellus ut cursus congue ornare netus
              suspendisse pellentesque. Et enim eget duis pellentesque eget sit pellentesque. Sem
              lectus egestas leo eget ullamcorper elit, tellus, sed. A, platea eu diam sed cursus in
              volutpat feugiat sem. Montes, nisl amet et id dictumst aliquet sed. Quis vel dignissim
              hac condimentum. Quam sodales elementum rutrum purus viverra tempor adipiscing in
              scelerisque. Magna sem eu porttitor amet suspendisse a. Tincidunt massa porttitor
              placerat euismod rhoncus a, dis a convallis.
            </Typography.Text>
          </section>
        </Container>
      </main>
    </Layout>
  );
};
