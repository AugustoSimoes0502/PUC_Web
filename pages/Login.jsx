import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate('/principal');
    } catch (error) {
      setMensagemErro('Usuário não está cadastrado ou as credenciais são inválidas.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="E-mail" required value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
        <input type="password" placeholder="Senha" required value={senha} onChange={(e) => setSenha(e.target.value)} /><br/>
        <button type="submit">Acessar Página Principal</button>
      </form>
      {mensagemErro && <p style={{color: 'red'}}>{mensagemErro}</p>}
      <p>Não tem conta? <Link to="/cadastro">Cadastre-se</Link></p>
    </div>
  );
}

export default Login;