import { Button, Container, Input, InputLabel, InputTitle, Select } from "./styles"

import { Item } from '../../types/Item'
import { useState } from "react"
import { categories } from "../../data/categories"

type Props = {
    onAdd: (item: Item) => void
}

export const InputArea = ({onAdd}: Props) => {

    const [dateField, setDateField] = useState('')
    const [categoryField, setCategoryField] = useState('')
    const [titleField, setTitleField] = useState('')
    const [valueField, setValueField] = useState(0)

    let categoryKeys: string[] = Object.keys(categories)
    
    const handleAddEvent = () => {
        let errors: string[] = []

        if (isNaN(new Date(dateField).getTime())) {
            errors.push('Data Inválida!')
        }
        if (!categoryKeys.includes(categoryField)) {
            errors.push('Categoria Inválida!')
        }
        if (titleField === '') {
            errors.push('Título Vazio!')
        }
        if (valueField <= 0) {
            errors.push('Valor Inválido!')
        }

        if (errors.length > 0) {
            alert(errors.join("\n"))
        } else {
            onAdd({
                date: new Date(dateField),
                category: categoryField,
                title: titleField,
                value: valueField,
            })
            clearFields()
        }
    }

    const clearFields = () => {
        setDateField('')
        setCategoryField('')
        setTitleField('')
        setValueField(0)
    }
    
    return (
        <Container>
            <InputLabel>
                <InputTitle>Data</InputTitle>
                <Input type="date" value={dateField} onChange={e => setDateField(e.target.value)} />
            </InputLabel>
            <InputLabel>
                <InputTitle>Categoria</InputTitle>
                <Select value={categoryField} onChange={e => setCategoryField(e.target.value)}>
                    <>
                        <option></option>
                        {categoryKeys.map((key, index) => (
                            <option key={index} value={key}>{categories[key].title}</option>
                        ))}
                    </>
                </Select>
            </InputLabel>
            <InputLabel>
                <InputTitle>Título</InputTitle>
                <Input type="text" value={titleField} onChange={e => setTitleField(e.target.value)} />
            </InputLabel>
            <InputLabel>
                <InputTitle>Valor</InputTitle>
                <Input type="number" value={valueField} onChange={e => setValueField(parseFloat(e.target.value))} />
            </InputLabel>
            <InputLabel>
                <InputTitle>&nbsp;</InputTitle>
                <Button onClick={handleAddEvent}>Adicionar</Button>
            </InputLabel>
        </Container>
    )
}