# App React + Firebase: Cadastro e Login de Usuários

Este projeto é uma aplicação web desenvolvida em React para uma atividade acadêmica. A aplicação permite o cadastro de usuários, autenticação via Firebase e exibição de dados protegidos em uma página principal.

## 🚀 Funcionalidades

*   **Página de Cadastro:** Coleta nome, sobrenome, data de nascimento, e-mail e senha. Os dados são salvos no Firestore e a autenticação é criada no Firebase Auth.
*   **Página de Login:** Validação de acesso utilizando e-mail e senha cadastrados.
*   **Página Principal:** Área restrita que recupera e exibe as informações do perfil do usuário logado diretamente do banco de dados.
*   **Navegação:** Gerenciada por um arquivo de rotas centralizado com `React Router Dom`.

## 🛠️ Tecnologias Utilizadas

*   **React.js** (Hooks: `useState`, `useEffect`)
*   **React Router Dom** (Navegação SPA)
*   **Firebase Authentication** (Gestão de usuários)
*   **Firebase Firestore** (Banco de dados NoSQL)
*   **CSS3** (Estilização da interface)

## 📦 Como rodar o projeto localmente

1. **Clone o repositório:**
   ```bash
   git clone [URL-DO-SEU-REPOSITORIO]
