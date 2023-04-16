import './SelectForm.css'

const SelectForm = ({text, name, options, handleOnChange, value}) => {
  return (
    <div className='form-control'>
        <label htmlFor={name}>{text}:</label>
        <select name={name} id={name} onChange={handleOnChange} value={value}>
            <option value={null}>Selecione uma opção</option>
            {options.map((option) => (
                <option key={option.valor} value={option.valor} label={option.texto}>{option.texto}</option>
            ))}
        </select>
    </div>
  )
}

export default SelectForm