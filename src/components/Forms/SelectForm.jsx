import './Forms.css'

const SelectForm = ({text, name, options, handleOnChange, value}) => {
  return (
    <div className='form-control'>
        <label htmlFor={name}>{text}:</label>
        <select name={name} id={name} onChange={handleOnChange} value={value}>
            <option>Selecione uma opção</option>
            {options.map((option) => (
                <option key={option.value} value={option.value} label={option.text}>{option.text}</option>
            ))}
        </select>
    </div>
  )
}

export default SelectForm