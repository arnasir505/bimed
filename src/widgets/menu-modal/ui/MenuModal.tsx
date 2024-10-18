import { Divider, Modal, Typography } from 'antd';
import { categories } from 'data/categories';
import './style.css';
import { useState } from 'react';

interface Props {
  open: boolean;
  closeModal: () => void;
}

export const MenuModal: React.FC<Props> = ({ open, closeModal }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategories, setSubCategories] = useState<string[]>([]);
  return (
    <Modal
      open={open}
      onCancel={closeModal}
      onClose={closeModal}
      mask={false}
      closeIcon={null}
      footer={null}
      className='menu-modal'
    >
      {subCategories.length > 0 ? (
        <>
          <Typography.Text
            className='menu-modal__title back'
            onClick={() => (setSelectedCategory(''), setSubCategories([]))}
          >
            Назад к категориям
          </Typography.Text>
          <Divider className='menu-modal__divider' />
          <Typography.Text className='menu-modal__subtitle'>{selectedCategory}</Typography.Text>
          {subCategories.map((subcategory) => (
            <Typography.Text
              key={subcategory}
              className='menu-modal__category'
              onClick={() => console.log(subcategory)}
            >
              {subcategory}
            </Typography.Text>
          ))}
        </>
      ) : (
        <>
          <Typography.Text className='menu-modal__title'>Категории</Typography.Text>
          <Divider className='menu-modal__divider' />
          {categories.map((category) => (
            <Typography.Text
              key={category.name}
              className='menu-modal__category'
              onClick={() => (
                setSelectedCategory(category.name), setSubCategories(category.children)
              )}
            >
              {category.name}
            </Typography.Text>
          ))}
        </>
      )}
    </Modal>
  );
};
