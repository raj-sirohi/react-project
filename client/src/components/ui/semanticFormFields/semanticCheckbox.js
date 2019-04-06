import React from 'react';
import { Form, Input } from 'semantic-ui-react';

export const semanticCheckbox = ({ input: { value, onChange, ...input }, type, label, placeholder,
    as: As = Input, ...props }) => {
    return (
        <Form.Field>
            <As  {...input}  {...props}
                checked={!!value}
                label={label}
                onChange={(e, data) => onChange(data.checked)} />
        </Form.Field>
    );
}