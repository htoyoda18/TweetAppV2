import LoginStyle from '../styles/login.module.css';

interface FormFieldProps {
    label: string;
    placeholder: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormField: React.FC<FormFieldProps> = ({ label, placeholder, name, onChange }) => (
    <div className={LoginStyle.formField}>
        <label>{label}</label>
        <input
            type="text"
            placeholder={placeholder}
            name={name}
            onChange={onChange}
        />
    </div>
);