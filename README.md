# CodeLeap Engineering Test

Este é o projeto desenvolvido para o processo seletivo da CodeLeap, com foco na vaga de **Backend Developer**. A aplicação implementa um sistema de posts com funcionalidades completas de CRUD, integrando um backend em Django REST Framework com um frontend simples em HTML, CSS e JavaScript puro.

---

## ⚙️ Tecnologias Utilizadas

### Backend:
- Python 3.11
- Django 5.x
- Django REST Framework
- SQLite (local)
- CORS Headers

### Frontend:
- HTML5
- CSS3 (estilizado conforme mockup oficial)
- JavaScript (Vanilla JS)

---

![image](https://github.com/user-attachments/assets/051fd7b4-9013-40a8-8ba6-adddc1050db7)

---


## 📌 Funcionalidades

### Backend (API):
- `GET /careers/`: Listar todos os posts (ordem decrescente)
- `POST /careers/`: Criar novo post
- `PATCH /careers/<id>/`: Atualizar título e conteúdo de um post
- `DELETE /careers/<id>/`: Deletar um post

### Frontend:
- Formulário para criar post (com validação)
- Listagem de posts em cards estilizados
- Ações de editar e deletar disponíveis somente para o autor
- Modal de confirmação para exclusão
- Modal de edição com campos preenchidos
- Comentários locais (fake)
- Botão de "like" fake
- Responsividade para mobile
- Hover effects e animações sutis
- Persistência de login local (`localStorage`)

---

## 🚀 Como executar localmente

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/codeleap-backend-test.git
cd codeleap-backend-test
