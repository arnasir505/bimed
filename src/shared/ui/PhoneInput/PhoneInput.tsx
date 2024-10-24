import { Button, Input, InputRef, Space } from 'antd';
import React, { useEffect, useRef } from 'react';
import { CountrySelector, usePhoneInput } from 'react-international-phone';
import './style.css';

interface AntPhoneProps {
  value: string;
  onChange: (_phone: string) => void;
}

export const AntPhone: React.FC<AntPhoneProps> = ({ value, onChange }) => {
  const phoneInput = usePhoneInput({
    defaultCountry: 'kg',
    value,
    onChange: (data) => {
      onChange(data.phone);
    },
  });

  const inputRef = useRef<InputRef>(null);

  // Need to reassign inputRef because antd provides not default ref
  useEffect(() => {
    if (phoneInput.inputRef && inputRef.current?.input) {
      phoneInput.inputRef.current = inputRef.current.input;
    }
  }, [inputRef, phoneInput.inputRef]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <Space.Compact style={{ width: '100%', height: '100%' }}>
        <CountrySelector
          selectedCountry={phoneInput.country.iso2}
          onSelect={(country) => phoneInput.setCountry(country.iso2)}
          renderButtonWrapper={({ children, rootProps }) => (
            <Button {...rootProps} className='country-select-btn'>
              {children}
            </Button>
          )}
          dropdownStyleProps={{
            style: {
              top: '35px',
              fontFamily: 'Inter, sans-serif',
            },
          }}
        />
        <Input
          className='phone-input'
          placeholder='Введите номер телефона'
          type='tel'
          value={phoneInput.inputValue}
          onChange={phoneInput.handlePhoneValueChange}
          ref={inputRef}
          name='phone'
          autoComplete='tel'
        />
      </Space.Compact>
    </div>
  );
};
