# <p align="center"> <img width="30" src="./web/public/vite.svg"> NLW eSports - Find Your Duo
  Uma aplicação para encontrar duos para partidas online desenvolvida durante a NLW eSports [@Rocketseat](https://github.com/rocketseat)

## ⏯️ Demo
  Em breve
  
## 💻 Tecnologias
  Tecnologias:
  - React (Vite)
  - TypeScript
  - Tailwind CSS & Phosphor Icons & Radix UI
  - React Native (Expo)
  - Servidor Express + Prisma
  
## Design (by Rocketseat)
###  🖥️ Desktop
<p align="center">
<img src="https://user-images.githubusercontent.com/69090857/191318693-f2ce6c21-f216-4663-b600-019a7facced9.png">
</p>

## 🏠 Executar localmente

```shell
  # Clone o repositório
  git clone https://github.com/Kiicchan/ignite-lab-event-platform.git
  
  # Acesse a pasta do projeto
  cd find-your-duo-nlw
  code .
  
  # Acesse o projeto web, instale as dependências e inicie o servidor frontend web
  cd web
  npm i
  npm run dev
  
  # Inicie o servidor backend
  cd server
  npm i
  
  ## Crie e configure um arquivo .env com a URL do banco sqlite e a url do frontend
  DATABASE_URL="file:../src/database/db.sqlite"
  FRONTEND_URL="http://127.0.0.1:5173"
 
  ## Execute as migrations do prisma
  npx migrate dev
  
  ## Inicie o backend
  npm run dev
  
  ### A aplicação web já deverá estar funcionando
  
  
  # App Mobile - Expo Start:
  ## acesse a raiz do projeto mobile e instale as dependências
  cd mobile
  npm i
  
  ## Crie um arquivo .env e adicione a chave com a url do backend (usar o endreço IP, e não localhost, como no exemplo http://IP_ADDRESS:PORT)
  API_URL=http://192.168.1.1:3333
  
  ## Inicie o projeto
  npx expo start
  
  ## Utilize o aplicativo Expo Go para acessar o app pelo celular ou utilize o emulador de sua preferência
  
  ### Obs: caso queria executar o app mais uma vez e o servidor backend tenha mudado de endereço, inicie com reset do cache
  npx expo r -c
```
  
---
####  Feito por Marcos Chacon [@Kiicchan](https://github.com/Kiicchan)
