import React, { useState } from 'react'
import './Form.css'
import Input from './Input'
import SelectForm from './SelectForm'

const PetForm = ({ handleSubmit, petData, btnText }) => {
    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors = ['Branco', 'Preto', 'Cinza', 'Caramelo']

    const onFileChange = (e) => {
        setPreview(Array.from(e.target.files))
        setPet({ ...pet, images: [...e.target.files] })

    }
    const handleChange = (e) => {
        setPet({ ...pet, [e.target.name]: e.target.value })

    }
    const handleColor = (e) => {
        setPet({ ...pet, color: e.target.options[e.target.selectedIndex].text })

    }
    const submit = (e) => {
        e.preventDefault()
        console.log(pet)
        // handleSubmit(pet)

    }

    return (
        <form onSubmit={submit} className='form-container'>
            <div className='preview-images-pet'>
                {preview.length > 0
                    ? preview.map((image, index) => (
                        <img src={URL.createObjectURL(image)} alt={pet.name} key={`${pet.name} + ${index}`} />
                    ))
                    : pet.images && pet.images.map((image, index) =>(
                        <img src={`${import.meta.env.VITE_BASE_URL}images/pets/${image}`} alt={pet.name} key={`${pet.name} + ${index}`} />
                    ))}
            </div>
            <Input text='Imagens do Pet' type='file' name='images' multiple={true} handleOnChange={onFileChange} />
            <Input text='Nome do Pet' type='text' name='name' placeholder='Digite o nome do pet' handleOnChange={handleChange} value={pet.name || ''} />
            <Input text='Idade do Pet' type='text' name='age' placeholder='Digite a idade do pet' handleOnChange={handleChange} value={pet.age || ''} />
            <Input text='Peso do Pet' type='number' name='weight' placeholder='Digite o peso do pet' handleOnChange={handleChange} value={pet.weight || ''} />
            <SelectForm text='Color' name='color' options={colors} handleOnChange={handleColor} value={pet.color || ''} />
            <input type="submit" value={btnText} />
        </form>
    )
}

export default PetForm