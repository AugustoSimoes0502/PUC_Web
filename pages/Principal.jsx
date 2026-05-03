import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

function Principal() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Busca os dados do usuário no Firestore pelo UID
        const docRef = doc(db, 'usuarios', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("Nenhum dado encontrado no Firestore!");
        }
      } else {
        // Se não houver usuário logado, redireciona para o login
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  if (!userData) return <p>Carregando dados do usuário...</p>;

  return (
    <div>
      <h2>Página Principal</h2>
      <h3>Bem-vindo, {userData.nome} {userData.sobrenome}!</h3>
      <p><strong>Nome:</strong> {userData.nome}</p>
      <p><strong>Sobrenome:</strong> {userData.sobrenome}</p>
      <p><strong>Data de Nascimento:</strong> {userData.dataNascimento}</p>
      
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}

export default Principal;