# Проект Mesto. REST API для одностраничного приложения

---

## Стек

- Node.js
- Express
- MongoDB

## Директории

`/models` – папка с схемами и моделями пользователя и карточки
`/routes` — папка с файлами роутера  
`/errors` – папка с модулями ошибок 400 и 404
`/controllers` – папка с контроллерами
`/middlewares` – папка с мидлварами

## Запуск проекта

Для запуска проекта:
1. Клонировать репозиторий
2. Установить зависимости `npm install`
3. Запустить проект `npm start`

## Запросы
1. **Регистрация:**
  POST https://api.mst.students.nomoreparties.co/signup
  В теле запроса передать объект 
    { "email": "example@example.com",
      "password": "password",
      "name": "Жак-Ив Кусь",
      "about": "Человек и пароход",
      "avatar": "https://ichef.bbci.co.uk/news/976/cpsprodpb/15C06/production/_109449098_catsstaring.jpg"
    }
  При успехе в ответе приходит объект пользователя со статусом 201.
  
  
2. **Авторизация:**
  POST https://api.mst.students.nomoreparties.co/signin
  В теле запроса передать объект 
    {
      "email": "example@example.com",
      "password": "password"
    }
  При неправильных почте и/или пароле приходит ответ `Неправильные email или пароль`

