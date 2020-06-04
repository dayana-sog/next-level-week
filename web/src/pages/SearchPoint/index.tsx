import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import ListPoint from '../ListPoint';

import api from '../../services/api';

import './styles.css';

const SearchPoint = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    city: '',
    uf: ''
  });

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { city, uf } = formData;
    
    
    api.get('/points', {
      params: {
        city, 
        uf
      }
    }).then(response => {
      console.log(response.data);
      
    }).catch(error => {
      console.log(error);
    });
  }

  function handleModal() {
    setOpen(!open);
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>
            <h2>Pontos de coleta</h2>
          </legend>

          <div className="field">
              <input 
                type="text" 
                name="city" 
                id="city"
                required
                placeholder="Digite a cidade"
                onChange={handleInputChange}
              />
              <input 
                type="text" 
                name="uf" 
                id="uf"
                required
                placeholder="Digite o estado"
                onChange={handleInputChange}
              />
            </div>
        </fieldset>
        <button type="submit">Buscar</button>
        <Link to="/">
          <FiArrowLeft />
            Voltar para Home
        </Link>
      </form>
    </div>
  );
}

export default SearchPoint;