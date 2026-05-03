import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      // 1. Criar usuário no Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // 2. Gravar dados adicionais no Firestore usando o UID como ID do documento
      await setDoc(doc(db, 'usuarios', user.uid), {
        uid: user.uid,
        nome: nome,
        sobrenome: sobrenome,
        dataNascimento: dataNascimento,
        email: email
      });

      alert('Usuário cadastrado com sucesso!');
      navigate('/login');
    } catch (error) {
      setErro('Erro ao cadastrar: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleCadastro}>
        <input type="text" placeholder="Nome" required value={nome} onChange={(e) => setNome(e.target.value)} /><br/>
        <input type="text" placeholder="Sobrenome" required value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} /><br/>
        <input type="date" required value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} /><br/>
        <input type="email" placeholder="E-mail" required value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
        <input type="password" placeholder="Senha" required value={senha} onChange={(e) => setSenha(e.target.value)} /><br/>
        <button type="submit">Cadastrar</button>
      </form>
      {erro && <p style={{color: 'red'}}>{erro}</p>}
      <p>Já tem conta? <Link to="/login">Faça Login</Link></p>
    </div>
  );
}

export default Cadastro;