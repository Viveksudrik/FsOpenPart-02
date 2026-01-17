import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()

        // Check if person exists
        const existingPerson = persons.find(p => p.name === newName)

        if (existingPerson) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const changedPerson = { ...existingPerson, number: newNumber }

                personService
                    .update(existingPerson.id, changedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
                        setSuccessMessage(
                            `Added ${returnedPerson.name}`
                        )
                        setTimeout(() => {
                            setSuccessMessage(null)
                        }, 5000)
                        setNewName('')
                        setNewNumber('')
                    })
                    .catch(error => { // Exercise 2.17
                        setErrorMessage(
                            `Information of ${existingPerson.name} has already been removed from server`
                        )
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                        setPersons(persons.filter(p => p.id !== existingPerson.id))
                    })
            }
            return
        }

        const personObject = {
            name: newName,
            number: newNumber,
        }

        personService
            .create(personObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setSuccessMessage(
                    `Added ${returnedPerson.name}`
                )
                setTimeout(() => {
                    setSuccessMessage(null)
                }, 5000)
                setNewName('')
                setNewNumber('')
            })
    }

    const handleDelete = (id) => {
        const person = persons.find(p => p.id === id)
        if (window.confirm(`Delete ${person.name}?`)) {
            personService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== id))
                })
                .catch(error => {
                    setErrorMessage(
                        `Information of ${person.name} has already been removed from server`
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                    setPersons(persons.filter(p => p.id !== id))
                })
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const personsToShow = filter
        ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        : persons

    return (
        <div>
            <h2>Phonebook</h2>

            <Notification message={successMessage} type="success" />
            <Notification message={errorMessage} type="error" />

            <Filter filter={filter} handleFilterChange={handleFilterChange} />

            <h3>Add a new</h3>

            <PersonForm
                addPerson={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />

            <h3>Numbers</h3>

            <Persons persons={personsToShow} handleDelete={handleDelete} />
        </div>
    )
}

export default App
